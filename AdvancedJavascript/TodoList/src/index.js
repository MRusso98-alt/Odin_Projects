import "./styles.css";
import { renderAllProjects } from "./scripts/render.js";
import { toDo, Project } from "./scripts/logic.js";
import {handleAddProject, handleAddTask, handleSubmitTask} from "./scripts/events.js";

export let listOfProjects = [];
listOfProjects.push(new Project());
renderAllProjects(listOfProjects);

const addProjectButton = handleAddProject(listOfProjects);
const submitTaskButton = handleSubmitTask(listOfProjects);

/*
Change project names;
Delete a todo.
Set a todo complete*/ 