import { Player } from "./scripts/player.js";
import { setup } from "./scripts/dom.js";

function startGame(player, computer){
    setup(player, computer);
}

const player = new Player("real");
const computer = new Player("computer");

startGame(player, computer);