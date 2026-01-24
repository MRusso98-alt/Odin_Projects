function createGrid(container, size){
    for(let i = 0; i < size; i++){
        const row = document.createElement("div");
        row.setAttribute("class", "row");
        for(let j = 0; j < size; j++){
            const square = document.createElement("div");
            square.setAttribute("class", "square-grid");
            square.setAttribute("opacity", 0.5);
            row.appendChild(square);
        }
        container.appendChild(row);
    }
}

function colorPixels(element){
    const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
    const r = randomBetween(0, 255);
    const g = randomBetween(0, 255);
    const b = randomBetween(0, 255);
    const alpha = parseFloat(element.getAttribute("opacity"));
    console.log(alpha);
    const color = "rgb(" + r + ", " + g + "," + b+ ")";
    element.setAttribute("style", "background:" + color);
    if(alpha < 1.0){
        console.log(alpha+0.05);
        element.setAttribute("opacity", alpha + 0.05);
    }
}

const container = document.querySelector(".container");
const basicSize = 16;
createGrid(container, basicSize);

const pixels = document.querySelectorAll(".square-grid");

pixels.forEach(element => {
    element.addEventListener("mouseover", function(){
        colorPixels(element);
    });
});

const resize = document.querySelector(".resize");

resize.addEventListener("click", () => {
    let size = prompt("How many pixels should the grid have on each side");
    const rows = document.querySelectorAll(".row");
    rows.forEach(element =>{
        container.removeChild(element);
    })
    
    if(size > 100){
        size = 100;
        console.log(size);
    }

    createGrid(container, size);
    const pixels = document.querySelectorAll(".square-grid");

    pixels.forEach(element => {
        element.addEventListener("mouseover", function(){
            colorPixels(element);
        });
    });
})