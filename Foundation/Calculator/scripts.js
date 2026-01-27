function add(a, b){
    return (parseFloat(a) + parseFloat(b)).toFixed(2);
}

function subtract(a, b){
    return (parseFloat(a) - parseFloat(b)).toFixed(2);
}

function multiply(a, b){
    return (parseFloat(a) * parseFloat(b)).toFixed(2);
}

function divide(a, b){
    if(b === 0) alert("Come on.");
    return (parseFloat(a) / parseFloat(b)).toFixed(2);
}

function operate(a, b, operator){
    switch(operator){
        case "x":
            return multiply(a,b);
        case "+":
            return add(a,b);
        case "-":
            return subtract(a,b);
        case "/":
            return divide(a,b);
        default:
            alert("Error!");
    }
}

function performCalculation(operator){
    if(operator === "="){
        firstValue = operate(firstValue, secondValue, currentOperator);
        updateText(firstValue);
        currentOperator = "?";
    } else {
        firstValue = operate(firstValue, secondValue, currentOperator);
        updateText(firstValue);
        currentOperator = operator;
    }
}

function updateValues(){
    if(currentOperator === "?"){
        firstValue = textArea.value;
    } else {
        secondValue = textArea.value;
    }
}

function updateOperator(operator){
    if(currentOperator === "?"){
        if(operator === "=") return;
        currentOperator = operator;
    } else {
        performCalculation(operator);
    }
}

function resetText(){
    textArea.value = "|";
    return;
}

function resetValues(){
    firstValue = Infinity;
    secondValue = Infinity;
    currentOperator = "?";
}

function updateText(text){
    if(textArea.value === "|" || operatorPressed === true || backspacePressed == true){
        textArea.value = text;
    } else {
        textArea.value += text;
    }
    return;
}


function disableOperators(){
    operators.forEach((button) => {
        button.disabled = true;
    });
}

function enableOperators(){
    operators.forEach((button) => {
        button.disabled = false;
    });
}

function disablePoint(){
    pointButton.disabled = true;
}

function enablePoint(){
    pointButton.disabled = false;
}

const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const textArea = document.querySelector("#calculator-text");
const resetButton = document.querySelector(".reset");
const pointButton = document.querySelector(".point");
const backspaceButton = document.querySelector(".backspace");

textArea.value = "|"; //default value

let firstValue = Infinity;
let secondValue = Infinity;
let currentOperator = "?";
let operatorPressed = false;
let backspacePressed = false;

numbers.forEach((button) =>{
    button.addEventListener("click", () => {
        updateText(button.textContent);
        updateValues();
        enableOperators();
        operatorPressed = false;
    });
});

operators.forEach((button) => {
    button.addEventListener("click", ()=>{
       operatorPressed = true;
       updateOperator(button.textContent);
       if(button.textContent != "=") disableOperators();
       enablePoint();
    });
});

resetButton.addEventListener("click", () => {
    resetText();
    resetValues();
});

pointButton.addEventListener("click", () => {
    updateText(pointButton.textContent);
    updateValues();
    disablePoint();
});

backspaceButton.addEventListener("click", () => {
    if(textArea.value != "|" && operatorPressed == false){
        backspacePressed = true;
        updateText(textArea.value.substring(0, textArea.value.length - 1));
        updateValues();
        backspacePressed = false;
    }
});