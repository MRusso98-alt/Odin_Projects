import { toDo, Project } from "./logic.js";

function createProjectContainer(){
    const content = document.querySelector(".projects-container");
    const projectDiv = document.createElement("div");
    projectDiv.setAttribute("class", "single-project");
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
}

function renderOneTodo(element, list){
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
    task.appendChild(text);
    task.appendChild(date);
    task.appendChild(priority);
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
    container.appendChild(footer);
}

function renderProject(project){
    const container = createProjectContainer();
    createProjectHeader(project, container);
    renderAllTodos(project, container);
    createProjectFooter(project, container);
}

export function renderAllProjects(listOfProjects){
    listOfProjects.forEach(element => {
        renderProject(element);
    });
}
