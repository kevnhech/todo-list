import { fetchStorage } from "../Application/data.js";

import { 
  addTaskDOM,
  markTaskChecked,
  displayCheckedList,
  ellipsisOnClick,
} from "./Todos/todo.js";

import {
  updateScreen,
  showProjectForm,
  displayProjectTabs,
  projectTabOnClick,
} from "./Projects/project.js";

fetchStorage();

const boardDiv = document.querySelector("#board");
const addProjectBtn = document.querySelector(".add-project");
const projectForm = document.querySelector("#project-form");
const projectNameInput = document.querySelector("#project-name");
const cancelProject = document.querySelector(".project-cancel-btn");
const addProject = document.querySelector(".project-add-btn");

const newTaskForm = document.createElement("form");
newTaskForm.innerHTML = `<input type="text" id="task-name" placeholder="Task name"> <input type="text" id="task-desc" placeholder="Description"> <div class="form-row"><input type="date" id="task-date"><select name="task-priority" id="task-priority"> <option value="" disabled="" selected="">Priority</option> <option value="High">High</option> <option value="Medium">Medium</option> <option value="Low">Low</option> <option value="None">None</option> </select></div>  <div class="form-second-row"><select name="task-project" id="task-project"><option value="Default">Default</option></select><div class="form-buttons"><input type="button" id="cancel-task-btn" value="Cancel"> <input type="submit" id="add-task-btn" value="Add"></div></div>`;
newTaskForm.setAttribute("id", "task-form");

const editTaskForm = document.createElement("form");
editTaskForm.innerHTML = `<input type="text" id="task-name" placeholder="Task name"> <input type="text" id="task-desc" placeholder="Description"> <div class="form-row"><input type="date" id="task-date"><select name="task-priority" id="task-priority"> <option value="" disabled="" selected="">Priority</option> <option value="High">High</option> <option value="Medium">Medium</option> <option value="Low">Low</option> <option value="None">None</option> </select></div>  <div class="form-second-row"><select name="task-project" id="task-project"><option value="Default">Default</option></select><div class="form-buttons"><input type="button" id="cancel-task-btn" value="Cancel"> <input type="submit" id="edit-task-btn" value="Edit"></div></div>`;
editTaskForm.setAttribute("id", "task-form");

function ScreenController() {
  updateScreen();
  addTaskDOM();
  showProjectForm();
  markTaskChecked();
  displayCheckedList();
  ellipsisOnClick();
  displayProjectTabs();
  projectTabOnClick();
}

export { ScreenController, boardDiv, addProjectBtn, projectForm, projectNameInput, cancelProject, addProject, newTaskForm, editTaskForm };