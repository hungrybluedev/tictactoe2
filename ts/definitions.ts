export enum Status {
  UNINITIALISED,
  ERROR,
  READY,
  BUSY,
  DONE,
}

export enum Player {
  HUMAN,
  CPU,
}

export enum GameMode {
  HVH,
  HVC,
  // CVC,
}

export type State = {
  buttons: Array<HTMLButtonElement>;
  status: Status;
  errorMessage: string;
  mode: GameMode;
  playerX: Player;
  playerO: Player;
  summary: Int8Array;
  steps: number;
};

export const lines = [
  // Rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // Cols
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // Diagonals
  [0, 4, 8],
  [2, 4, 6],
];

export const checkVictory = (summary: Int8Array): number => {
  for (const line of lines) {
    for (const player of [-1, +1]) {
      let playerHasWon = true;
      for (const position of line) {
        if (summary[position] !== player) {
          playerHasWon = false;
          break;
        }
      }

      if (playerHasWon) {
        return player;
      }
    }
  }
  return 0;
};
