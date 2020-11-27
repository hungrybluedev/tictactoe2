if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("sw.js", {
        scope: "/tictactoe2/",
    })
        .catch((err) => console.log(err));
}
import { letCPUTakeAShot } from "./cpu.js";
import { GameMode, Player, Status, checkVictory, } from "./definitions.js";
const populateButtons = (state) => {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const id = `${i}${j}`;
            const element = document.getElementById(id);
            if (element === null) {
                state.status = Status.ERROR;
                state.errorMessage = `Could not retrieve button with ID: ${id}`;
                return;
            }
            const button = element;
            state.buttons.push(button);
            button.addEventListener("click", () => {
                click(state, 3 * i + j);
                if (state.mode === GameMode.HVC) {
                    const nextMove = letCPUTakeAShot(state, -1);
                    if (nextMove >= 0) {
                        click(state, nextMove);
                    }
                }
            });
        }
    }
};
const updateSummary = (state, index) => {
    if (state.summary[index] !== 0) {
        return;
    }
    state.summary[index] = state.steps % 2 === 0 ? -1 : +1;
};
const getButton = (id) => {
    const element = document.getElementById("button-" + id);
    return element ? element : null;
};
const getMode = (name) => {
    switch (name) {
        case "HVH":
            return GameMode.HVH;
        case "HVC":
            return GameMode.HVC;
        default:
            return GameMode.HVC;
    }
};
const initializeState = () => {
    let state = {
        buttons: new Array(),
        status: Status.UNINITIALISED,
        errorMessage: "",
        mode: getMode(localStorage.getItem("gamemode")),
        playerX: Player.HUMAN,
        playerO: Player.HUMAN,
        summary: new Int8Array([0, 0, 0, 0, 0, 0, 0, 0, 0]),
        steps: 0,
    };
    populateButtons(state);
    state.buttons.forEach((button) => {
        button.disabled = false;
        button.textContent = "";
        button.classList.add("clickable");
    });
    return state;
};
const click = (state, index) => {
    if (state.status === Status.DONE) {
        return;
    }
    state.steps++;
    updateSummary(state, index);
    const button = state.buttons[index];
    button.textContent = state.steps % 2 === 0 ? "⭕" : "❌";
    button.classList.remove("clickable");
    button.disabled = true;
    const winner = checkVictory(state.summary);
    if (winner === 0) {
        if (state.steps === 9) {
            state.status = Status.DONE;
            announce("Draw!");
        }
        return;
    }
    state.status = Status.DONE;
    announceWinner(winner);
};
const announce = (message) => {
    const element = document.getElementById("message");
    if (element === null) {
        state.status === Status.ERROR;
        state.errorMessage = message + " But could not update message box";
        return;
    }
    const messageBox = element;
    messageBox.textContent = message;
};
const announceWinner = (player) => {
    const winner = player === -1 ? "⭕" : "❌";
    const message = `${winner} wins! 🎉`;
    announce(message);
};
const cycleMode = (name) => {
    switch (name) {
        case "HVH":
            return "HVC";
        case "HVC":
            return "HVH";
        default:
            return "HVC";
    }
};
const refreshPage = () => {
    window.location.reload();
};
let state = initializeState();
const mode = localStorage.getItem("gamemode") || "HVC";
const resetButton = getButton("reset");
const cycleButton = getButton("cycle");
const aboutButton = getButton("about");
if (cycleButton) {
    switch (state.mode) {
        case GameMode.HVH:
            document.getElementById("hvc-icon")?.classList.add("hidden");
            break;
        case GameMode.HVC:
            document.getElementById("hvh-icon")?.classList.add("hidden");
            break;
        default:
            state.status = Status.ERROR;
            state.errorMessage = "Invalid game mode.";
    }
}
resetButton?.addEventListener("click", () => {
    refreshPage();
});
cycleButton?.addEventListener("click", () => {
    localStorage.setItem("gamemode", cycleMode(mode));
    refreshPage();
});
aboutButton?.addEventListener("click", () => {
    window.open("https://github.com/hungrybluedev/tictactoe2", "_blank");
});
if (state.status === Status.ERROR) {
    console.log("An error occurred: ", state.errorMessage);
    console.log("Please create an issue in the Github repository.");
}
