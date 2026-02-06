import { toDo, Project } from "./logic.js";
import {listOfProjects} from "../index.js";
import { handleAddTask, handleChangeTitle } from "./events.js";

function emptyPage(){
    const content = document.querySelector(".projects-container");
    while(content.hasChildNodes()) content.removeChild(content.lastChild);
}

function createProjectContainer(project){
    const content = document.querySelector(".projects-container");
    const projectDiv = document.createElement("div");
    projectDiv.setAttribute("class", "single-project");
    projectDiv.setAttribute("id", project.getId());
    content.appendChild(projectDiv);
    return projectDiv;
}

function createProjectHeader(project, container){
    const header = document.createElement("div");
    header.setAttribute("class", "project-header");
    const headerText = document.createElement("p");
    headerText.textContent = project.getName();
    header.appendChild(headerText);
    container.appendChild(header);
    handleChangeTitle(header);
}

function colorBasedOnPriority(task, priority){
    if(priority === "2") task.setAttribute("style", "background-color: #90d5355d;");
    else if (priority === "3") task.setAttribute("style", "background-color: #d2d53557;");
    else if (priority === "4") task.setAttribute("style", "background-color: #eaa524;");
    else if (priority === "5") task.setAttribute("style", "background-color: #ea5224;");
}

function renderOneTodo(element){
    const task = document.createElement("li");
    const text = document.createElement("p");
    text.setAttribute("class", "title");
    text.textContent = element.getTitle();
    const date = document.createElement("p");
    date.setAttribute("class", "due-date");
    date.textContent = element.getdueDate();
    const priority = document.createElement("p");
    priority.setAttribute("class", "priority-lvl");
    priority.textContent = element.getPriority();
    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "erase-task");
    deleteButton.textContent = "X";
    task.setAttribute("id", element.getId());
    task.appendChild(text);
    task.appendChild(date);
    task.appendChild(priority);
    task.appendChild(deleteButton);
    colorBasedOnPriority(task, priority.textContent);
    return task;
}

function renderAllTodos(project, container){
    const list = document.createElement("ol");
    list.setAttribute("class", "list-of-tasks");
    const arrayTodo = project.getTodos();
    arrayTodo.forEach(element => {
        const task = renderOneTodo(element, list);
        list.appendChild(task);
    });
    
    container.appendChild(list);
}

function createProjectFooter(project, container){
    const footer = document.createElement("div");
    footer.setAttribute("class", "project-footer");
    const text = document.createElement("div");
    text.textContent = "Tasks to complete: " + project.getTodos().length;
    footer.appendChild(text);
    const addTask = document.createElement("button");
    addTask.textContent = "Add task";
    addTask.setAttribute("id", "add-task-button");
    footer.appendChild(addTask);
    container.appendChild(footer);
    handleAddTask(container);
}

function renderProject(project){
    const container = createProjectContainer(project);
    createProjectHeader(project, container);
    renderAllTodos(project, container);
    createProjectFooter(project, container);
}

export function renderAllProjects(){
    emptyPage();
    listOfProjects.forEach(element => {
        renderProject(element);
    });
}
