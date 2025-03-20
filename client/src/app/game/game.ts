export interface Game {
  prompts: string[];
  rounds: number;
  currentRound: number;
  currentPrompt: string;
  responses: string[];
  players: string[];
  scores: number[];
}
