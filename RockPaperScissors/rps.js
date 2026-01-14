function getComputerChoice(){
    let num = Math.random();
    if(num <= 0.33){
        return "rock";
    } else if (num <= 0.66){
        return "paper";
    } else if (num <= 1){
        return "scissors";
    }
}

function getUserChoice(){
    let command = prompt("Choose what to play: Rock (R), Paper (P), Scissors (S)");
    if(command.toLowerCase() === "r"){
        return "rock";
    } else if (command.toLowerCase() === "p"){
        return "paper";
    } else {
        return "scissors";
    }
}

function determineWinner(human, computer){
    if(human === "rock"){
        if(computer === "paper"){
            return "C";
        } else if(computer === "scissors"){
            return "H";
        }
    } else if (human === "paper"){
        if(computer === "scissors"){
            return "C";
        } else if(computer === "rock"){
            return "H";
        }
    } else if (human === "scissors"){
        if(computer === "rock"){
            return "C";
        } else if(computer === "paper"){
            return "H";
        }
    }
    return "N";
}

function playRound(){
    let userChoice = getUserChoice();
    let computerChoice = getComputerChoice();
    let winner = determineWinner(userChoice, computerChoice);

    if(winner === "H"){
        console.log("You win! " + userChoice + " beats " + computerChoice);
        return "H";
    } else if (winner === "C"){
       console.log("You lose! " + computerChoice + " beats " + userChoice); 
       return "C";
    } else {
        console.log("It's even!");
        return "N";
    }
}

function playGame(human, computer){
    for(let i = 0; i < 5; i++){
        let winner = playRound(human, computer);
        if (winner === "H"){
            human++;
        } else if (winner === "C") {
            computer++;
        }

        console.log("Scores: you: " + human + ", computer: " + computer + ".")
    }
}

let humanScore = 0;
let computerScore = 0;
playGame(humanScore, computerScore);
