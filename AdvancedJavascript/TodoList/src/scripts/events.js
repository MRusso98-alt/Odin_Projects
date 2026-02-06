import { toDo, Project } from "./logic.js";
import { renderAllProjects } from "./render.js";
import { listOfProjects } from "../index.js";

let projectToModify;

function addProject(){
    listOfProjects.push(new Project());
    renderAllProjects(listOfProjects);
};

export function handleAddProject(){
    const addProjectButton = document.querySelector("#addProject");
    addProjectButton.addEventListener("click", function(){
        addProject(listOfProjects);
    });
    return addProjectButton;
}

function addTask(event){
    const dialog = document.querySelector("dialog");
    dialog.showModal();
    let project = event.target.parentNode.parentNode;
    projectToModify = project.getAttribute("id");
}

export function handleAddTask(container){
    const addTaskButton = container.querySelector("#add-task-button");
    addTaskButton.addEventListener("click", function(e){
        addTask(e);
    });
}

function pushTodo(toDo){
    listOfProjects.forEach(element =>{
        if(element.getId() === projectToModify){
            element.addTodo(toDo);
        }
    });
}

function submitTask(e){
    e.preventDefault();
    const dialog = document.querySelector("dialog");
    const title = document.querySelector("#taskName").value;
    const dueDate = document.querySelector("#dueDate").value;
    const description = document.querySelector("#description").value;
    const priority = document.querySelector("#priority").value;
    const notes = document.querySelector("#notes").value;

    pushTodo(new toDo(title, description, dueDate, priority));
    projectToModify = "";
    renderAllProjects(); 
    dialog.close();
}

export function handleSubmitTask(){
    const submitButton = document.querySelector("#submit-task");
    submitButton.addEventListener("click", function(e){
        submitTask(e);
    });
    return submitButton;
}

export function handleChangeTitle(container){
    const title = container.querySelector("p");
    title.addEventListener("click", function(){
        title.setAttribute("contenteditable", "true");
        title.focus();
    });

    title.addEventListener("input", () => {
        console.log("Current value:", title.textContent);
    });

    title.addEventListener("blur", () => {
        title.removeAttribute("contenteditable");
    });
}