function Player(name, symbol){
    return {name, symbol};
}

function GameLogic(){
    const player1 = Player("Player1", "X");
    const player2 = Player("Player2", "O");
    let currentPlayer = player1;
    let numOfMoves = 0;
    let isStarted = false;
    const board = document.querySelectorAll(".boardspace");

    const nextTurn = () =>{
        numOfMoves++;
        if(currentPlayer === player1) currentPlayer = player2;
        else currentPlayer = player1;
    };

    const handleInput = (e) =>{
        if(!e.target.hasChildNodes()){
            const text = document.createElement("h4");
            text.textContent = currentPlayer.symbol;
            e.target.appendChild(text);
            if(checkWin()){
                console.log(currentPlayer.name + " wins!");
                deactivateBoard();
            }
            if(!checkWin() && numOfMoves === 8){
                console.log("It's a tie!");
                deactivateBoard();
            }
            nextTurn();
        }
    }

    const start = () =>{
        if(isStarted === false){
            isStarted = true;
            board.forEach(element => {
                element.addEventListener("click", handleInput);
            });
        }
    };

    const deactivateBoard = () =>{
        board.forEach(element => {
            element.removeEventListener("click", handleInput);
        });
    };

    const checkWin = () =>{
        if(numOfMoves < 3) return false;
        let boardArray = Array.from(board);

        if(boardArray[0].textContent === boardArray[1].textContent && boardArray[1].textContent === boardArray[2].textContent)
            if(boardArray[0].textContent === "X" || boardArray[0].textContent === "O") return true; 

        if(boardArray[3].textContent === boardArray[4].textContent && boardArray[4].textContent === boardArray[5].textContent)
            if(boardArray[3].textContent === "X" || boardArray[3].textContent === "O") return true; 

        if(boardArray[6].textContent === boardArray[7].textContent && boardArray[7].textContent === boardArray[8].textContent)
            if(boardArray[6].textContent === "X" || boardArray[6].textContent === "O") return true; 

        if(boardArray[0].textContent === boardArray[3].textContent && boardArray[3].textContent === boardArray[6].textContent)
            if(boardArray[0].textContent === "X" || boardArray[0].textContent === "O") return true; 

        if(boardArray[1].textContent === boardArray[4].textContent && boardArray[4].textContent === boardArray[7].textContent)
            if(boardArray[1].textContent === "X" || boardArray[1].textContent === "O") return true; 

        if(boardArray[2].textContent === boardArray[5].textContent && boardArray[5].textContent === boardArray[8].textContent)
            if(boardArray[2].textContent === "X" || boardArray[2].textContent === "O") return true; 

        if(boardArray[0].textContent === boardArray[4].textContent && boardArray[4].textContent === boardArray[8].textContent)
            if(boardArray[0].textContent === "X" || boardArray[0].textContent === "O") return true; 

        if(boardArray[2].textContent === boardArray[4].textContent && boardArray[4].textContent === boardArray[6].textContent)
            if(boardArray[2].textContent === "X" || boardArray[2].textContent === "O") return true; 
        
        return false;
    }

    const resetBoard = () =>{
        isStarted = false;
        numOfMoves = 0;
        currentPlayer = player1;
        board.forEach(element => {
            if(element.hasChildNodes()) element.removeChild(element.lastChild);
        });
    };

    return {start, resetBoard};
}

const startGame = document.querySelector(".start-game");
const resetGame = document.querySelector(".reset-game");
const gameControl = GameLogic();
startGame.addEventListener("click", function(){
    gameControl.start();
});
startGame.addEventListener("mouseover", function(){
    startGame.style.backgroundColor = "red";
});
startGame.addEventListener("mouseout", function(){
    startGame.style.backgroundColor = "rgba(25, 146, 212)";
});

resetGame.addEventListener("click", function(){
    gameControl.resetBoard();
});
resetGame.addEventListener("mouseover", function(){
    resetGame.style.backgroundColor = "red";
});
resetGame.addEventListener("mouseout", function(){
    resetGame.style.backgroundColor = "rgba(25, 146, 212)";
});