import { checkVictory, lines } from "./definitions.js";
export const letCPUTakeAShot = (state, identifier) => {
    const availablePositions = [];
    for (let i = 0; i < 9; i++) {
        if (state.summary[i] === 0) {
            availablePositions.push(i);
        }
    }
    if (availablePositions.length === 0) {
        return -1;
    }
    if (availablePositions.length === 1) {
        return availablePositions[0];
    }
    const moves = generateAllMoves(state.summary, identifier);
    if (moves.length === 0) {
        return -1;
    }
    if (moves.length === 1) {
        return moves[0].index;
    }
    let nextMove = -1;
    let lastMaximum = -Infinity;
    for (const move of moves) {
        const value = evaluateSummary(move.summary, identifier, 4);
        if (lastMaximum < value) {
            lastMaximum = value;
            nextMove = move.index;
        }
    }
    if (!Number.isFinite(lastMaximum) && lastMaximum > 0) {
        return nextMove;
    }
    const opponent = -1 * identifier;
    for (const line of lines) {
        let count = 0;
        let empty = -1;
        for (const index of line) {
            if (state.summary[index] === opponent) {
                count++;
            }
            else if (state.summary[index] === 0) {
                empty = index;
            }
        }
        if (count === 2 && empty !== -1) {
            nextMove = empty;
            break;
        }
    }
    if (nextMove === -1) {
        const index = Math.floor(Math.random() * availablePositions.length);
        nextMove = availablePositions[index];
    }
    return nextMove;
};
const generateAllMoves = (summary, identifier) => {
    const moves = new Array();
    for (let i = 0; i < 9; i++) {
        if (summary[i] === 0) {
            const copy = new Int8Array(summary);
            copy[i] = identifier;
            const move = {
                summary: copy,
                index: i,
            };
            moves.push(move);
        }
    }
    return moves;
};
const evaluateSummary = (summary, identifier, depth) => {
    if (depth === 0) {
        return 0;
    }
    const opponent = -1 * identifier;
    const winner = checkVictory(summary);
    if (winner === identifier) {
        return +Infinity;
    }
    if (winner === opponent) {
        return -Infinity;
    }
    let openings = 0;
    for (const line of lines) {
        let openLine = true;
        for (const index of line) {
            if (summary[index] !== identifier) {
                openLine = false;
                break;
            }
        }
        if (openLine) {
            openings++;
        }
    }
    const moves = generateAllMoves(summary, opponent);
    let evaluation = 0;
    for (const move of moves) {
        const value = evaluateSummary(move.summary, opponent, depth - 1);
        evaluation = Math.max(value, evaluation);
    }
    return openings - evaluation;
};
