function createGrid(container, size){
    for(let i = 0; i < size; i++){
        const row = document.createElement("div");
        row.setAttribute("class", "row");
        for(let j = 0; j < size; j++){
            const square = document.createElement("div");
            square.setAttribute("class", "square-grid");
            row.appendChild(square);
        }
        container.appendChild(row);
    }
}

const container = document.querySelector(".container");
const basicSize = 16;
createGrid(container, basicSize);