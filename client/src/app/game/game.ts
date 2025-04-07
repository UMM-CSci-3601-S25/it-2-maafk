export interface Game {
  _id: string;
  prompts: string[];
  rounds: number;
  currentRound: number;
  currentPrompt: string;
  responses: {text: string, player: string}[];
  players: string[];
  scores: {player: string, score: number}[];
  joincode: string;
  currentCzar: string;
}