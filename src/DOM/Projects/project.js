import { returnStorage } from "../../Application/data.js";
import { dateFormatter } from "../../Application/date.js";
import { addTaskBtn } from "../Todos/todo.js";
import { addTaskForm } from "../Todos/todo.js";
import { addTaskDOM } from "../Todos/todo.js";
import { markTaskChecked } from "../Todos/todo.js";
import { displayCheckedList } from "../Todos/todo.js";
import { ellipsisOnClick } from "../Todos/todo.js";
import { Project, deleteProject } from "../../Application/project.js";
import { boardDiv, addProjectBtn, projectForm, projectNameInput, cancelProject, addProject, newTaskForm, editTaskForm } from "../screen-controller.js";

const displayProjectTabs = () => {
  const taskProject = newTaskForm.querySelector("#task-project");
  const editProject = editTaskForm.querySelector("#task-project");
  const groupOfTabs = document.querySelector(".project-group");
  
  groupOfTabs.innerHTML = '<div><svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path></svg><li>Projects</li></div>';

  taskProject.innerHTML = "";
  editProject.innerHTML = "";

  Object.keys(returnStorage()).forEach((projectName) => {
    let projectTab = document.createElement("div");
    projectTab.setAttribute("class", "project-tab");
    let iconTitleDiv = document.createElement("div");
    iconTitleDiv.setAttribute("class", "icon-title");
    let icon = document.createElement("svg");
    icon.innerHTML = `<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M181.3 32.4c17.4 2.9 29.2 19.4 26.3 36.8L197.8 128l95.1 0 11.5-69.3c2.9-17.4 19.4-29.2 36.8-26.3s29.2 19.4 26.3 36.8L357.8 128l58.2 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-68.9 0L325.8 320l58.2 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-68.9 0-11.5 69.3c-2.9 17.4-19.4 29.2-36.8 26.3s-29.2-19.4-26.3-36.8l9.8-58.7-95.1 0-11.5 69.3c-2.9 17.4-19.4 29.2-36.8 26.3s-29.2-19.4-26.3-36.8L90.2 384 32 384c-17.7 0-32-14.3-32-32s14.3-32 32-32l68.9 0 21.3-128L64 192c-17.7 0-32-14.3-32-32s14.3-32 32-32l68.9 0 11.5-69.3c2.9-17.4 19.4-29.2 36.8-26.3zM187.1 192L165.8 320l95.1 0 21.3-128-95.1 0z"/></svg>`;
    let projectTabName = document.createElement("li");
    projectTabName.textContent = projectName;
    let trash = document.createElement("svg");
    trash.innerHTML = `<svg class="icon trash" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M170.5 51.6L151.5 80l145 0-19-28.4c-1.5-2.2-4-3.6-6.7-3.6l-93.7 0c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80 368 80l48 0 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-8 0 0 304c0 44.2-35.8 80-80 80l-224 0c-44.2 0-80-35.8-80-80l0-304-8 0c-13.3 0-24-10.7-24-24S10.7 80 24 80l8 0 48 0 13.8 0 36.7-55.1C140.9 9.4 158.4 0 177.1 0l93.7 0c18.7 0 36.2 9.4 46.6 24.9zM80 128l0 304c0 17.7 14.3 32 32 32l224 0c17.7 0 32-14.3 32-32l0-304L80 128zm80 64l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16z"/></svg>`;
    iconTitleDiv.appendChild(icon);
    iconTitleDiv.appendChild(projectTabName);
    projectTab.appendChild(iconTitleDiv);

    if (projectTabName.textContent != "Default") {
      projectTab.appendChild(trash);
    }

    let taskProjectOption = document.createElement("option");
    taskProjectOption.value = projectName;
    taskProjectOption.textContent = projectName;

    let editProjectOption = document.createElement("option");
    editProjectOption.value = projectName;
    editProjectOption.textContent = projectName;

    if (document.querySelectorAll(".project-tab").length < Object.keys(returnStorage()).length) {
      groupOfTabs.appendChild(projectTab);
      taskProject.appendChild(taskProjectOption);
      editProject.appendChild(editProjectOption);
    }
  });
}

const displayDefaultDOM = () => {
  let projectHeader = document.createElement("h2");
  projectHeader.textContent = "Default";
  boardDiv.appendChild(projectHeader);

  let taskGroup = document.createElement("div");
  taskGroup.setAttribute("class", "task-col");

  returnStorage()["Default"].forEach(task => {
    let taskDiv = document.createElement("div");
    taskDiv.setAttribute("class", "task");
    let firstTaskRow = document.createElement("div");
    firstTaskRow.setAttribute("class", "task-row");
    let secondTaskRow = document.createElement("div");
    secondTaskRow.setAttribute("class", "task-row");
    let taskSettings = document.createElement("span");
    taskSettings.setAttribute("class", "task-settings");
    let taskSettingsAll = document.createElement("div");
    taskSettingsAll.setAttribute("class", "task-settings-all hidden");
    let taskSettingsEdit = document.createElement("div");
    taskSettingsEdit.setAttribute("class", "task-settings-edit");
    taskSettingsEdit.textContent = "Edit";
    let taskSettingsDelete = document.createElement("div");
    taskSettingsDelete.setAttribute("class", "task-settings-delete");
    taskSettingsDelete.textContent = "Delete";
    let taskSettingsInfo = document.createElement("div");
    taskSettingsInfo.setAttribute("class", "task-settings-info");
    taskSettingsInfo.textContent = "Info";
    let taskIcon = document.createElement("svg");
    taskIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"/></svg>`;
    taskIcon.childNodes[0].setAttribute("class", "ellipsis");
    let taskLabel = document.createElement("label");
    taskLabel.setAttribute("class", "task-label");
    let taskCheck = document.createElement("input");
    taskCheck.type = "checkbox";
    taskCheck.setAttribute("class", "checkbox");
    let taskDate = document.createElement("span");
    taskDate.setAttribute("class", "task-date");
    taskDate.textContent = dateFormatter(task.dueDate).newFormat;
    let taskProject = document.createElement("span");
    taskProject.setAttribute("class", "task-project");
    taskProject.textContent = task.project;
    let projectIcon = document.createElement("svg");
    projectIcon.innerHTML = `<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M181.3 32.4c17.4 2.9 29.2 19.4 26.3 36.8L197.8 128l95.1 0 11.5-69.3c2.9-17.4 19.4-29.2 36.8-26.3s29.2 19.4 26.3 36.8L357.8 128l58.2 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-68.9 0L325.8 320l58.2 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-68.9 0-11.5 69.3c-2.9 17.4-19.4 29.2-36.8 26.3s-29.2-19.4-26.3-36.8l9.8-58.7-95.1 0-11.5 69.3c-2.9 17.4-19.4 29.2-36.8 26.3s-29.2-19.4-26.3-36.8L90.2 384 32 384c-17.7 0-32-14.3-32-32s14.3-32 32-32l68.9 0 21.3-128L64 192c-17.7 0-32-14.3-32-32s14.3-32 32-32l68.9 0 11.5-69.3c2.9-17.4 19.4-29.2 36.8-26.3zM187.1 192L165.8 320l95.1 0 21.3-128-95.1 0z"/></svg>`;
    projectIcon.childNodes[0].setAttribute("class", "task-project-icon");
    let taskProjectDiv = document.createElement("div");
    taskProjectDiv.setAttribute("class", "task-project-info");

    taskLabel.appendChild(taskCheck);
    let span = document.createElement("span");
    span.textContent = task.title;
    taskLabel.appendChild(span);
    firstTaskRow.appendChild(taskLabel);
    taskSettings.appendChild(taskIcon.childNodes[0]);
    taskSettingsAll.appendChild(taskSettingsEdit);
    taskSettingsAll.appendChild(taskSettingsDelete);
    taskSettingsAll.appendChild(taskSettingsInfo);
    taskSettings.appendChild(taskSettingsAll);
    firstTaskRow.appendChild(taskSettings);
    taskDiv.appendChild(firstTaskRow);
    secondTaskRow.appendChild(taskDate);
    taskProjectDiv.appendChild(projectIcon.childNodes[0]);
    taskProjectDiv.appendChild(taskProject);
    secondTaskRow.appendChild(taskProjectDiv);
    taskDiv.appendChild(secondTaskRow);
    taskGroup.appendChild(taskDiv);
    taskGroup.appendChild(document.createElement("hr"));
    
    boardDiv.appendChild(taskGroup);
    displayProjectTabs();
  });
}

const displayProjectDOM = (e) => {
  boardDiv.textContent = "";

  let projectHeader = document.createElement("h2");
  projectHeader.textContent = e;
  boardDiv.appendChild(projectHeader);

  let taskGroup = document.createElement("div");
  taskGroup.setAttribute("class", "task-col");

  returnStorage()[e].forEach(task => {
    let taskDiv = document.createElement("div");
    taskDiv.setAttribute("class", "task");
    let firstTaskRow = document.createElement("div");
    firstTaskRow.setAttribute("class", "task-row");
    let secondTaskRow = document.createElement("div");
    secondTaskRow.setAttribute("class", "task-row");
    let taskSettings = document.createElement("span");
    taskSettings.setAttribute("class", "task-settings");
    let taskSettingsAll = document.createElement("div");
    taskSettingsAll.setAttribute("class", "task-settings-all hidden");
    let taskSettingsEdit = document.createElement("div");
    taskSettingsEdit.setAttribute("class", "task-settings-edit");
    taskSettingsEdit.textContent = "Edit";
    let taskSettingsDelete = document.createElement("div");
    taskSettingsDelete.setAttribute("class", "task-settings-delete");
    taskSettingsDelete.textContent = "Delete";
    let taskSettingsInfo = document.createElement("div");
    taskSettingsInfo.setAttribute("class", "task-settings-info");
    taskSettingsInfo.textContent = "Info";
    let taskIcon = document.createElement("svg");
    taskIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"/></svg>`;
    taskIcon.childNodes[0].setAttribute("class", "ellipsis");
    let taskLabel = document.createElement("label");
    taskLabel.setAttribute("class", "task-label");
    let taskCheck = document.createElement("input");
    taskCheck.type = "checkbox";
    taskCheck.setAttribute("class", "checkbox");
    let taskDate = document.createElement("span");
    taskDate.setAttribute("class", "task-date");
    taskDate.textContent = dateFormatter(task.dueDate).newFormat;
    let taskProject = document.createElement("span");
    taskProject.setAttribute("class", "task-project");
    taskProject.textContent = task.project;
    let projectIcon = document.createElement("svg");
    projectIcon.innerHTML = `<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M181.3 32.4c17.4 2.9 29.2 19.4 26.3 36.8L197.8 128l95.1 0 11.5-69.3c2.9-17.4 19.4-29.2 36.8-26.3s29.2 19.4 26.3 36.8L357.8 128l58.2 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-68.9 0L325.8 320l58.2 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-68.9 0-11.5 69.3c-2.9 17.4-19.4 29.2-36.8 26.3s-29.2-19.4-26.3-36.8l9.8-58.7-95.1 0-11.5 69.3c-2.9 17.4-19.4 29.2-36.8 26.3s-29.2-19.4-26.3-36.8L90.2 384 32 384c-17.7 0-32-14.3-32-32s14.3-32 32-32l68.9 0 21.3-128L64 192c-17.7 0-32-14.3-32-32s14.3-32 32-32l68.9 0 11.5-69.3c2.9-17.4 19.4-29.2 36.8-26.3zM187.1 192L165.8 320l95.1 0 21.3-128-95.1 0z"/></svg>`;
    projectIcon.childNodes[0].setAttribute("class", "task-project-icon");
    let taskProjectDiv = document.createElement("div");
    taskProjectDiv.setAttribute("class", "task-project-info");

    taskLabel.appendChild(taskCheck);
    let span = document.createElement("span");
    span.textContent = task.title;
    taskLabel.appendChild(span);
    firstTaskRow.appendChild(taskLabel);
    taskSettings.appendChild(taskIcon.childNodes[0]);
    taskSettingsAll.appendChild(taskSettingsEdit);
    taskSettingsAll.appendChild(taskSettingsDelete);
    taskSettingsAll.appendChild(taskSettingsInfo);
    taskSettings.appendChild(taskSettingsAll);
    firstTaskRow.appendChild(taskSettings);
    taskDiv.appendChild(firstTaskRow);
    secondTaskRow.appendChild(taskDate);
    taskProjectDiv.appendChild(projectIcon.childNodes[0]);
    taskProjectDiv.appendChild(taskProject);
    secondTaskRow.appendChild(taskProjectDiv);
    taskDiv.appendChild(secondTaskRow);
    taskGroup.appendChild(taskDiv);
    taskGroup.appendChild(document.createElement("hr"));
    
    boardDiv.appendChild(taskGroup);
    displayProjectTabs();
  });

  addTaskBtn();
  addTaskForm();
  addTaskDOM();
  projectTabOnClick();
  markTaskChecked();
  displayCheckedList();
  ellipsisOnClick();
}

const projectTabOnClick = () => {
  const taskForm = document.querySelector("#task-form");

  document.querySelectorAll(".icon-title").forEach((tab) => {
    tab.addEventListener("click", () => {
      displayProjectDOM(tab.querySelector("li").textContent);
      taskForm.style.display = "none";
    });
  });

  document.querySelectorAll(".trash").forEach((trash) => {
    trash.addEventListener("click", () => {
      deleteProject(trash.parentNode.parentNode.querySelector("li").textContent);
      displayProjectDOM("Default");
      taskForm.style.display = "none";
    });
  });
}

const showProjectForm = () => {
  const taskProject = newTaskForm.querySelector("#task-project");
  const editProject = editTaskForm.querySelector("#task-project");

  addProjectBtn.addEventListener("click", () => {
    projectForm.style.display = "flex";
  });

  cancelProject.addEventListener("click", () => {
    projectForm.style.display = "none";
    projectNameInput.value = "";
  });

  addProject.addEventListener("click", () => {
    Project(projectNameInput.value);
    projectForm.style.display = "none";
    projectNameInput.value = "";
    displayProjectTabs();
    projectTabOnClick();
  });
}

const updateScreen = () => {
  boardDiv.textContent = "";

  displayDefaultDOM();
  addTaskBtn();
  addTaskForm();
}

export { displayProjectTabs, displayDefaultDOM, projectTabOnClick, displayProjectDOM, showProjectForm, updateScreen };