import "./styles.css";
import { renderAllProjects } from "./scripts/render.js";
import { toDo, Project } from "./scripts/logic.js";
import {handleAddProject, handleAddTask, handleSubmitTask} from "./scripts/events.js";

export let listOfProjects = [];

document.addEventListener("DOMContentLoaded", () => {
  const storedData = localStorage.getItem("projects");
  
  if (storedData) {
    // Parse stored JSON and recreate Project and toDo instances
    const parsedData = JSON.parse(storedData);
    listOfProjects = parsedData.map(p => {
      const proj = Object.assign(new Project(p.name), p);
      proj.todos = (p.todos || []).map(t => Object.assign(new toDo(t.title, t.description, t.dueDate, t.priority), t));
      return proj;
    });
  } else {
    listOfProjects.push(new Project());
  }

  renderAllProjects(); 
});

const addProjectButton = handleAddProject(listOfProjects);
const submitTaskButton = handleSubmitTask(listOfProjects);

