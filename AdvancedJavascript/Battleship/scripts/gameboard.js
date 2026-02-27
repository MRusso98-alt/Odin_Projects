import { Ship } from "./ship.js";

class Coordinates{
    x;
    y;

    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

export class Gameboard{
    matrix;
    opponent;
    ships;

    constructor(){
        this.matrix = new Array(10).fill().map(() => new Array(10).fill(0).map(() => new Array(2).fill(0)));
        this.opponent = new Array(10).fill().map(() => new Array(10).fill(0));
        this.ships = new Array();
        this.#randomPlaceShips();
    }

    #checkSpace(x, y, length){
        for(let i = 0; i < length; i++){
            if(y+i >= 10 || this.matrix[x][y+i][1] != 0) return false;
        }
        return true;
    }

    #setShipOnBoard(x, y, length, newShipToPlace){
        for(let i = 0; i < length; i++){
            this.matrix[x][y+i][0] = newShipToPlace;
            this.matrix[x][y+i][1] = length;
        }
    }

    #placeShip(x, y, length){
        if(this.ships.length >= 10) alert("You can't place more ships");
        if(!this.#checkSpace(x, y, length)) return false;

        const newShipToPlace = new Ship(length);
        this.ships.push(newShipToPlace);
        this.#setShipOnBoard(x, y, length, newShipToPlace);
        return true;
    }

    receiveAttack(x, y){
        if(this.matrix[x][y][1] > 0){
            this.matrix[x][y][0].hit();
            this.matrix[x][y][1] = -2; // mark as hit
        } else {
            this.matrix[x][y][1] = -1; // mark as miss
        }
    }

    sendAttack(x, y){
        this.opponent[x][y] = -1;
    }

    hasLost(){
        for(let i = 0; i < this.ships.length; i++){
            if(!this.ships[i].isSunk()) return false;
        }
        return true;
    }

    #randomPlaceBoats(){
        let placed = 0;
        while(1){
            const x = Math.floor(Math.random()*10);
            const y = Math.floor(Math.random()*10);
            if(this.#placeShip(x,y,1)) placed++;
            if(placed === 4) return;
        }
    }

    #randomPlaceSubs(){
        let placed = 0;
        while(1){
            const x = Math.floor(Math.random()*10);
            const y = Math.floor(Math.random()*10);
            if(this.#placeShip(x,y,2)) placed++;
            if(placed === 3) return;
        }
    }

    #randomPlaceDestroyers(){
        let placed = 0;
        while(1){
            const x = Math.floor(Math.random()*10);
            const y = Math.floor(Math.random()*10);
            if(this.#placeShip(x,y,3)) placed++;
            if(placed === 2) return;
        }
    }

    #randomPlaceBattleships(){
        let placed = 0;
        while(1){
            const x = Math.floor(Math.random()*10);
            const y = Math.floor(Math.random()*10);
            if(this.#placeShip(x,y,4)) placed++;
            if(placed === 1) return;
        }
    }

    #randomPlaceShips(){
        this.#randomPlaceBoats();
        this.#randomPlaceSubs();
        this.#randomPlaceDestroyers();
        this.#randomPlaceBattleships();
        console.log(this.ships.length);
    }
}