export class Ship{
    length;
    timesHit;
    sunk;

    constructor(length){
        this.length = length;
        this.timesHit = 0;
        this.sunk = false;
    }

    hit(){
        this.timesHit++;
        if(this.timesHit >= this.length) this.sunk = true;
    }

    isSunk(){
        return this.sunk;
    }
}