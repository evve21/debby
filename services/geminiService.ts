
import { GoogleGenAI, Type } from "@google/genai";
import { PoemResult } from "../types";

export const generateRomanticPoem = async (partnerName: string, traits: string): Promise<PoemResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Write a beautiful, soul-touching romantic poem for my girlfriend ${partnerName}. 
               Incorporate these traits: ${traits}. 
               Keep it elegant, passionate, and sincere.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          content: { type: Type.STRING }
        },
        required: ["title", "content"]
      }
    }
  });

  return JSON.parse(response.text);
};

export const generateLoveIllustration = async (description: string): Promise<string | null> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [{ text: `A beautiful, soft romantic digital painting in a Ghibli or Pixar style: ${description}. Warm lighting, pastel colors, magical atmosphere.` }]
            },
            config: {
                imageConfig: {
                    aspectRatio: "1:1"
                }
            }
        });

        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                return `data:image/png;base64,${part.inlineData.data}`;
            }
        }
        return null;
    } catch (error) {
        console.error("Error generating image:", error);
        return null;
    }
};
