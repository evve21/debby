
import React, { useState } from 'react';
import { ProposalState, PoemResult } from './types';
import FloatingHearts from './components/FloatingHearts';

const NO_PHRASES = [
  "No",
  "Are you sure?",
  "Really?",
  "Think again!",
  "Last chance!",
  "Surely not?",
  "You're breaking my heart...",
  "Give it a thought!",
  "Maybe next time?",
  "Wait, reconsider!",
  "Is that your final answer?",
  "Oops, missed!",
  "Nice try!",
  "Catch me if you can!",
  "Don't be like that!"
];

const MY_LETTER: PoemResult = {
  title: "FOR MY BUBUB",
  content: `Love, jujur yaa aku nggak tahu mau tulis apa. You know I’m not good with words, but I guess I just wanna say thank you for choosing me. Thank you for coming to meet me twice. Terima kasih udah jadi pacarku yang pengertian dan selalu ada buat aku. Terima kasih juga udah tetap sayang aku walaupun aku banyak kurangnya dan sering kayak anak kecil waktu sama kamu.

I didn’t think I could find someone who I’m comfortable being myself with again. Aku tahu belakangan ini kita sering berantem dan hurt each other, and I’m sorry for that. Aku mau kamu tahu kalau aku beneran sayang dan peduli sama kamu.

Semoga ke depannya kita bisa lebih saling mengerti, percaya, dan makin dewasa for each other, but tetap bisa jadi goofy dan jadi diri sendiri, okay?

Dan terakhir, thank you for giving me a better ending than the one I wrote for myself.

I WOLF YOU ALWAYS 🐺🤍`
};

const App: React.FC = () => {
  const [state, setState] = useState<ProposalState>('initial');
  const [isOpening, setIsOpening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [noButtonText, setNoButtonText] = useState(NO_PHRASES[0]);

  const handleOpenLetter = () => {
    setIsOpening(true);
    // Short delay to simulate the envelope opening animation and build anticipation
    setTimeout(() => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setState('asking');
      }, 800);
    }, 1000);
  };

  const moveNoButton = () => {
    const x = Math.max(50, Math.random() * (window.innerWidth - 200));
    const y = Math.max(50, Math.random() * (window.innerHeight - 100));
    setNoButtonPos({ x, y });
    
    const randomPhrase = NO_PHRASES[Math.floor(Math.random() * NO_PHRASES.length)];
    setNoButtonText(randomPhrase);
  };

  const handleYes = () => {
    setState('accepted');
  };

  return (
    <div className="min-h-screen w-full relative flex flex-col items-center justify-center p-4 bg-[#fff5f5] selection:bg-rose-200 overflow-hidden">
      <FloatingHearts />

      {/* Hero Section: The Envelope */}
      {state === 'initial' && !loading && (
        <div className="z-10 flex flex-col items-center">
          <div 
            onClick={!isOpening ? handleOpenLetter : undefined}
            className={`relative w-72 h-48 md:w-96 md:h-64 cursor-pointer transition-all duration-1000 transform ${isOpening ? 'scale-110' : 'hover:scale-105'}`}
          >
            <div className="absolute inset-0 bg-rose-100 rounded-b-xl shadow-2xl z-10 border-t-0 border-2 border-rose-200"></div>
            <div className={`absolute top-0 left-0 w-full h-full bg-rose-200 rounded-t-xl z-30 origin-top transition-transform duration-1000 border-2 border-rose-300 ${isOpening ? '-rotate-x-180 -translate-y-full' : ''}`} 
                 style={{ clipPath: 'polygon(0 0, 100% 0, 50% 50%)', transformStyle: 'preserve-3d' }}>
            </div>
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 text-4xl md:text-5xl transition-all duration-700 ${isOpening ? 'opacity-0 scale-150 rotate-45' : 'animate-pulse'}`}>
              ❤️
            </div>
            <div className="absolute inset-x-4 top-4 bottom-0 bg-white shadow-inner rounded-t-lg z-0 overflow-hidden">
               <div className="p-4 space-y-2 opacity-20">
                  <div className="h-2 w-3/4 bg-rose-200 rounded"></div>
                  <div className="h-2 w-full bg-rose-200 rounded"></div>
                  <div className="h-2 w-5/6 bg-rose-200 rounded"></div>
               </div>
            </div>
          </div>
          <p className={`mt-8 font-serif text-rose-400 italic text-xl transition-opacity duration-500 ${isOpening ? 'opacity-0' : 'animate-bounce'}`}>
            Buka surat rahasiamu...
          </p>
        </div>
      )}

      {loading && (
        <div className="z-10 text-center space-y-4 animate-pulse">
          <div className="text-6xl mb-4">✨</div>
          <h2 className="text-2xl font-serif text-rose-600 italic">Membuka pesan spesial untukmu...</h2>
        </div>
      )}

      {state === 'asking' && (
        <div className="z-10 w-full max-w-5xl flex flex-col items-center gap-8 animate-in slide-in-from-bottom-20 fade-in duration-1000">
          <div className="grid md:grid-cols-2 gap-8 items-center w-full">
            <div className="bg-white/95 backdrop-blur-md p-8 md:p-12 rounded-[2rem] shadow-2xl border border-white relative flex flex-col h-full">
              <div className="absolute -top-4 -left-4 text-4xl opacity-20 font-serif">"</div>
              <h2 className="text-4xl font-cursive text-rose-600 mb-6 text-center">{MY_LETTER.title}</h2>
              <div className="whitespace-pre-line text-rose-800 font-serif leading-relaxed text-base md:text-lg italic text-justify overflow-y-auto custom-scrollbar flex-grow px-2">
                {MY_LETTER.content}
              </div>
              <div className="absolute -bottom-4 -right-4 text-4xl opacity-20 font-serif">"</div>
            </div>
            
            <div className="flex flex-col items-center gap-8">
              <div className="relative group">
                <div className="w-72 h-72 md:w-96 md:h-96 bg-gradient-to-br from-rose-100 to-rose-200 rounded-[3rem] flex flex-col items-center justify-center border-8 border-white shadow-2xl transform transition-transform group-hover:rotate-1 overflow-hidden relative">
                    <div className="text-9xl mb-4 z-10">🐺🤍</div>
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/soft-wallpaper.png')]"></div>
                    <p className="text-rose-400 font-cursive text-xl z-10">Forever & Always</p>
                </div>
                <div className="absolute -top-4 -right-4 bg-rose-500 text-white p-4 rounded-full animate-bounce shadow-lg">
                    ✨
                </div>
              </div>

              <div className="text-center space-y-6">
                <h3 className="text-4xl md:text-5xl font-serif text-rose-700 drop-shadow-md">
                  Will you be my Valentine?
                </h3>
                <div className="flex gap-4 justify-center relative min-h-[70px] w-full max-w-xs mx-auto">
                  <button
                    onClick={handleYes}
                    className="px-12 py-4 bg-rose-500 hover:bg-rose-600 text-white text-2xl font-bold rounded-2xl shadow-xl shadow-rose-200 transition-all hover:scale-110 active:scale-95 z-20"
                  >
                    Yes! ❤️
                  </button>
                  <button
                    onMouseEnter={moveNoButton}
                    onClick={moveNoButton}
                    style={noButtonPos.x !== 0 ? {
                      position: 'fixed',
                      left: `${noButtonPos.x}px`,
                      top: `${noButtonPos.y}px`,
                      zIndex: 100,
                      transition: 'all 0.15s ease-out'
                    } : {}}
                    className="px-8 py-4 bg-white/70 backdrop-blur-sm text-rose-400 text-xl font-medium rounded-2xl border border-rose-100 transition-all shadow-sm hover:shadow-md whitespace-nowrap"
                  >
                    {noButtonText}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {state === 'accepted' && (
        <div className="z-10 w-full max-w-2xl text-center space-y-12 animate-in fade-in zoom-in duration-700 px-4">
          <div className="relative inline-block mb-8">
             <div className="w-64 h-64 md:w-80 md:h-80 mx-auto bg-gradient-to-tr from-rose-400 to-pink-300 rounded-full flex items-center justify-center text-9xl animate-pulse shadow-2xl">
              🐺🤍
             </div>
             <div className="absolute inset-0 animate-ping bg-rose-200 rounded-full -z-10 opacity-30"></div>
          </div>
          
          <div className="space-y-6">
            <h1 className="text-7xl md:text-9xl font-cursive text-rose-600 animate-bounce">YAY! ❤️</h1>
            <p className="text-3xl md:text-5xl font-serif text-rose-800 italic">
              It's a date!
            </p>
          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(254, 205, 211, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #fecdd3;
          border-radius: 10px;
        }
        .rotate-x-180 {
          transform: rotateX(180deg);
        }
      `}</style>
    </div>
  );
};

export default App;
