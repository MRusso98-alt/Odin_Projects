import "./styles.css";
import { renderAllProjects } from "./scripts/render.js";
import { toDo, Project } from "./scripts/logic.js";
import { addProject } from "./scripts/events.js";

let listOfProjects = [];
listOfProjects.push(new Project());
renderAllProjects(listOfProjects);

const addProjectButton = document.querySelector("button #addProject");
addProjectButton.addEventListener("click", function(){
    addProject();
});

/*
Functionalities to add: change to do colors based on priority
The look of the User Interface is up to you, but it should be able to do the following:
View all projects.
View all todos in each project (probably just the title and duedate… perhaps changing color for different priorities).
Expand a single todo to see/edit its details.
Delete a todo.*/ 