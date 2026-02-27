function emptyDiv(div){
    while (div.firstChild) {
        div.removeChild(div.lastChild);
    }
}

let _player = null;
let _computer = null;
let currentTurn = 'player';

function displayOpponent(){
    const opponentGrid = document.querySelector(".opponent-grid");
    console.log('displayOpponent: rendering opponent grid');
    emptyDiv(opponentGrid);
    for(let i = 0; i < 10; i++){
        for(let j = 0; j < 10; j++){
            let cell = document.createElement("div");
            cell.setAttribute("id", i + "-" + j);
            const val = _player.gameboard.opponent[i][j];
            if(val === 0) cell.setAttribute("class", "empty");
            else if (val === -1) cell.setAttribute("class", "miss");
            else if (val < 0) {
                // hit recorded as negative ship length
                const len = -val;
                cell.setAttribute("class", "hit hit-" + len);
            }

            cell.addEventListener('click', () => {
                console.log('opponent cell clicked', cell.id, 'currentTurn=', currentTurn);
                if(currentTurn !== 'player') return;
                const [xStr, yStr] = cell.id.split('-');
                const x = parseInt(xStr, 10);
                const y = parseInt(yStr, 10);
                // do not allow re‑attacking a square we've already recorded
                if(_player.gameboard.opponent[x][y] !== 0) return;

                const len = _computer.gameboard.matrix[x][y][1];
                const wasShip = len > 0;

                _computer.gameboard.receiveAttack(x, y);
                _player.gameboard.sendAttack(x, y);
                // record result in player's opponent view: store negative length for hits
                _player.gameboard.opponent[x][y] = wasShip ? -len : -1;

                if(wasShip){
                    cell.className = 'hit hit-' + len;
                } else {
                    cell.className = 'miss';
                }

                // check game over
                if(_computer.gameboard.hasLost()){
                    alert('You win!');
                    currentTurn = null;
                    return;
                }

                // switch to computer turn
                currentTurn = 'computer';
                // small delay to show result then perform computer move
                setTimeout(computerMove, 400);
            });

            opponentGrid.appendChild(cell);
        }
    }
}

function displayBoard(){
    const myGrid = document.querySelector(".my-grid");
    emptyDiv(myGrid);
    for(let i = 0; i < 10; i++){
        for(let j = 0; j < 10; j++){
            let cell = document.createElement("div");
            cell.setAttribute("id", i + "-" + j);
            const v = _player.gameboard.matrix[i][j][1];
            if(v === 0) cell.setAttribute("class", "empty");
            else if (v === 1) cell.setAttribute("class", "boat");
            else if (v === 2) cell.setAttribute("class", "sub");
            else if (v === 3) cell.setAttribute("class", "destroyer");
            else if (v === 4) cell.setAttribute("class", "battleship");
            else if (v === -1) cell.setAttribute("class", "miss");
            else if (v < 0) {
                const len = -v;
                cell.setAttribute("class", "hit hit-" + len);
            }
            myGrid.appendChild(cell);
        }
    }
}

function computerMove(){
    // choose a random untargeted cell on player's board
    let x, y;
    let attempts = 0;
    do{
        x = Math.floor(Math.random()*10);
        y = Math.floor(Math.random()*10);
        attempts++;
        if(attempts > 200) break;
    } while(_player.gameboard.matrix[x][y][1] < 0);

    const len = _player.gameboard.matrix[x][y][1];
    const wasShip = len > 0;
    _computer.gameboard.sendAttack(x, y);
    _player.gameboard.receiveAttack(x, y);
    // if it was a ship, annotate player's matrix with negative length for coloring
    if(wasShip){
        _player.gameboard.matrix[x][y][1] = -len;
    }

    // update displays
    displayBoard();
    displayOpponent();

    // check if player lost
    if(_player.gameboard.hasLost()){
        alert('Computer wins!');
        currentTurn = null;
        return;
    }

    // switch back to player
    currentTurn = 'player';
}

export function setup(player, computer){
    _player = player;
    _computer = computer;
    currentTurn = 'player';
    displayBoard();
    displayOpponent();
}
