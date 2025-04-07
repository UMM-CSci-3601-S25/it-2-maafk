export interface Response {
  _id: string;
  player: string;
  text: string;
  responses: {text: string, player: string}[];

}
