
export type DateActivity = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export type ProposalState = 'initial' | 'asking' | 'accepted' | 'planning';

export interface PoemResult {
  title: string;
  content: string;
}
