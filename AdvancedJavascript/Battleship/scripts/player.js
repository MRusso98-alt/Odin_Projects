import { Gameboard } from "./gameboard.js";

export class Player{
    type;
    gameboard;

    constructor(type){
        this.type = type;
        this.gameboard = new Gameboard();
    }
}