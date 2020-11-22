export var Status;
(function (Status) {
    Status[Status["UNINITIALISED"] = 0] = "UNINITIALISED";
    Status[Status["ERROR"] = 1] = "ERROR";
    Status[Status["READY"] = 2] = "READY";
    Status[Status["BUSY"] = 3] = "BUSY";
    Status[Status["DONE"] = 4] = "DONE";
})(Status || (Status = {}));
export var Player;
(function (Player) {
    Player[Player["HUMAN"] = 0] = "HUMAN";
    Player[Player["CPU"] = 1] = "CPU";
})(Player || (Player = {}));
export var GameMode;
(function (GameMode) {
    GameMode[GameMode["HVH"] = 0] = "HVH";
    GameMode[GameMode["HVC"] = 1] = "HVC";
})(GameMode || (GameMode = {}));
export const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
export const checkVictory = (summary) => {
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
