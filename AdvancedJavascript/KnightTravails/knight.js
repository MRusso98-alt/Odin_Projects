class Coordinates{
    x;
    y;

    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    print(){
        console.log("x: " + this.x + ", y: " + this.y);
    }

    isEqual(obj){
        if(this.x === obj.x && this.y === obj.y) return true;
        return false;
    }
}

class KnightGraph{
    edges;
    size;

    constructor(size){
        this.size = size;
        this.edges = new Array(this.size).fill().map(() => new Array(this.size).fill());
        this.#populateEdges();
    }

    #findEdges(x, y){
        let edges = [];
        if(x >=2){
            if(y>=1) edges.push(new Coordinates(x-2, y-1));
            if(y<this.size-1) edges.push(new Coordinates(x-2, y+1));
        }

        if(x <= this.size-3){
            if(y>=1) edges.push(new Coordinates(x+2, y-1));
            if(y<=this.size-2) edges.push(new Coordinates(x+2, y+1));
        }

        if(y >= 2){
            if(x>=1) edges.push(new Coordinates(x-1, y-2));
            if(x<this.size-1) edges.push(new Coordinates(x+1, y-2));
        }

        if(y <= this.size-3){
            if(x>=1) edges.push(new Coordinates(x-1, y+2));
            if(x<=this.size-2) edges.push(new Coordinates(x+1, y+2));
        }

        return edges;
    }

    #populateEdges(){
        for(let i = 0; i < this.size; i++){
            for(let j = 0; j < this.size; j++){
                this.edges[i][j] = [];
                this.edges[i][j] = this.edges[i][j].concat(this.#findEdges(i,j));
            }
        }
    }

    print(){
        for(let i = 0; i < this.size; i++){
            for(let j = 0; j < this.size; j++){
                process.stdout.write("(" + i + ", " + j + ") - ");
                for(let k = 0; k < this.edges[i][j].length; k++){
                    process.stdout.write("[" + this.edges[i][j][k].x + ", " + this.edges[i][j][k].y + "] ");
                }
                process.stdout.write("\n");
            }
        }
    }

    #contains(array, coordinate){
        for(let i = 0; i < array.length; i++){
            if(array[i][0].isEqual(coordinate)) return true;
        }
        return false;
    }

    #getPath(visited, start, parent){
        let path = [];
        path.push(start);
        while(parent){
            path.push(parent);
            let found = false;
            for(let i = 0; i < visited.length; i++){
                if(visited[i][0].isEqual(parent)){
                    parent = visited[i][1];
                    found = true;
                    break;
                }
            }
            if(!found) break;
        }
        return path.reverse();
    }

    #knightUtil(current, moves, visited, end){
        if(!current) return null;
        
        const [start, parent] = current;
        
        if(this.#contains(visited, start)) {
            return this.#knightUtil(moves.shift(), moves, visited, end);
        }
        if(start.isEqual(end)){
            visited.push([start, parent]);
            return this.#getPath(visited, start, parent);
        }
        visited.push([start, parent]);

        for(let i = 0; i < this.edges[start.x][start.y].length; i++){
            const neighbor = this.edges[start.x][start.y][i];
            if(!this.#contains(visited, neighbor)){
                moves.push([neighbor, start]);
            }
        }

        return this.#knightUtil(moves.shift(), moves, visited, end);
    }

    knightMoves(start, end){
        let moves = [];
        let visited = [];
        const startCoord = new Coordinates(start[0], start[1]);
        moves.push([startCoord, null]);
        return this.#knightUtil(moves.shift(), moves, visited, new Coordinates(end[0], end[1]));
    }
}

myGraph = new KnightGraph(8);
console.log(myGraph.knightMoves([0,0],[7,7]));