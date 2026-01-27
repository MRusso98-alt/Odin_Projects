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

function checkEnd(){
    if(humanScore === 5 || computerScore === 5){
        const container = document.querySelector("body > div");
        const text = document.createElement("h3");
        text.textContent = "Game Over!";
        container.appendChild(text);

        const choiceButtons = document.querySelectorAll("body > button");

        choiceButtons.forEach((button) => {
            button.setAttribute("disabled", "");
        });
    }
}

function playRound(id){
    let userChoice = id;
    let computerChoice = getComputerChoice();
    let winner = determineWinner(userChoice, computerChoice);

    const humanPoints = document.querySelector(".human-points");
    const computerPoints = document.querySelector(".computer-points");

    if(winner === "H"){
        console.log("You win! " + userChoice + " beats " + computerChoice);
        humanScore++;
        humanPoints.textContent = "Human: " + humanScore;
    } else if (winner === "C"){
       console.log("You lose! " + computerChoice + " beats " + userChoice); 
       computerScore++;
       computerPoints.textContent= "Computer: " + computerScore;
    } else {
        console.log("It's even!");
    }

    checkEnd();
}

let humanScore = 0;
let computerScore = 0;

const choiceButtons = document.querySelectorAll("body > button");

choiceButtons.forEach((button) => {
    button.addEventListener("click", () =>{
        playRound(button.id);
    });
});
