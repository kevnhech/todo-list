import _ from 'lodash';
import './style.css';

// Date
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const date = new Date();
const month = (date.getMonth() + 1).toString().padStart(2, '0');
const day = date.getDate().toString().padStart(2, '0');
const today = date.getFullYear() + "-" + month + '-' + day;

function dateFormatter(date) {
  return `${MONTHS[+date.slice(5, 7) - 1]} ` + `${date.slice(8)}`;
}

// Store data
const listOfProjects = {};

function updateStorage() {
  localStorage.setItem("listOfProjects", JSON.stringify(listOfProjects));
}

function returnStorage() {
  return JSON.parse(localStorage.getItem("listOfProjects"));
}

function fetchStorage() {
  let localStorageObj = returnStorage();

  if (localStorageObj == null) {
    Project("Default");
    newTodo(Todo("Thanks for checking out my To-Do Application.", "Have fun!", today, "High", "None", false, "Default"));
    localStorageObj = returnStorage();
  }

  Object.keys(localStorageObj).forEach((project) => {
    listOfProjects[project] = [];
  });

  localStorageObj["Default"].forEach((task) => {
    if (task.project == "Default") {
      listOfProjects[task.project].push(task);
    } else if (task.project != "Default" && listOfProjects[task.project] == undefined) {
      Project(task.project);
      listOfProjects[task.project].push(task);
      listOfProjects["Default"].push(task);
    } else {
      listOfProjects[task.project].push(task);
      listOfProjects["Default"].push(task);
    }
  });
}

fetchStorage();

// Todos
function Todo(title, desc, dueDate, priority = "None", notes = "None", checkList = false, project = "Default") {
  return {title, desc, dueDate, priority, notes, checkList, project};
}

function newTodo(task) {
  if (task.project == "Default") {
    listOfProjects[task.project].push(task);
  } else if (task.project != "Default" && listOfProjects[task.project] == undefined) {
    Project(task.project);
    listOfProjects[task.project].push(task);
    listOfProjects["Default"].push(task);
  } else {
    listOfProjects[task.project].push(task);
    listOfProjects["Default"].push(task);
  }

  updateStorage();
}

function checkTodo(task) {
  if (task.checkList == false) {
    task.checkList = true;
  } else {
    task.checkList = false;
  }

  updateStorage();
}

function priorityTodo(task, priority) {
  task.priority = priority;
}

function deleteTodo(task) {
  listOfProjects[task.project] = listOfProjects[task.project].filter((obj) => obj != task);
  listOfProjects["Default"] = listOfProjects["Default"].filter((obj) => obj != task);
  updateStorage();
}

// Projects
function Project(title) {
  const arr = Object.keys(listOfProjects);

  if (arr.find((e) => e == title) == undefined) {
    listOfProjects[title] = [];
    updateStorage();
  }
}

function deleteProject(project) {
  listOfProjects["Default"] = listOfProjects["Default"].filter((obj) => obj.project != project);
  delete listOfProjects[project];
  updateStorage();
}

function ScreenController() {
  const projectsDiv = document.querySelector(".project-group");
  const boardDiv = document.querySelector("#board");

  // Sidebar stuff
  const addProjectBtn = document.querySelector(".add-project");
  const projectForm = document.querySelector("#project-form");

  // Add project inputs
  const projectNameInput = document.querySelector("#project-name");
  const cancelProject = document.querySelector(".project-cancel-btn");
  const addProject = document.querySelector(".project-add-btn");

  // Task form
  const newTaskForm = document.createElement("form");
  newTaskForm.innerHTML = `<input type="text" id="task-name" placeholder="Task name"> <input type="text" id="task-desc" placeholder="Description"> <div class="form-row"><input type="date" id="task-date"><select name="task-priority" id="task-priority"> <option value="" disabled="" selected="">Priority</option> <option value="High">High</option> <option value="Medium">Medium</option> <option value="Low">Low</option> <option value="None">None</option> </select></div>  <div class="form-second-row"><select name="task-project" id="task-project"><option value="Default">Default</option></select><div class="form-buttons"><input type="button" id="cancel-task-btn" value="Cancel"> <input type="submit" id="add-task-btn" value="Add"></div></div>`;
  newTaskForm.setAttribute("id", "task-form");

  // Edit form
  const editTaskForm = document.createElement("form");
  editTaskForm.innerHTML = `<input type="text" id="task-name" placeholder="Task name"> <input type="text" id="task-desc" placeholder="Description"> <div class="form-row"><input type="date" id="task-date"><select name="task-priority" id="task-priority"> <option value="" disabled="" selected="">Priority</option> <option value="High">High</option> <option value="Medium">Medium</option> <option value="Low">Low</option> <option value="None">None</option> </select></div>  <div class="form-second-row"><select name="task-project" id="task-project"><option value="Default">Default</option></select><div class="form-buttons"><input type="button" id="cancel-task-btn" value="Cancel"> <input type="submit" id="edit-task-btn" value="Edit"></div></div>`;
  editTaskForm.setAttribute("id", "task-form");

  const addTaskForm = () => {
    boardDiv.appendChild(newTaskForm);
  }

  const addTaskDOM = () => {
    const projectHeader = document.querySelector("h2").textContent;
    const taskForm = document.querySelector("#task-form");
    const taskName = document.querySelector("#task-name");
    const taskDesc = document.querySelector("#task-desc");
    const taskDate = document.querySelector("#task-date");
    const taskPriority = document.querySelector("#task-priority");
    const taskProject = document.querySelector("#task-project");
    const addTaskCancel = document.querySelector("#cancel-task-btn");
    const addTaskConfirm = document.querySelector("#add-task-btn");
    const addTaskModalBtn = document.querySelector(".add-task");
    
    const resetInputFields = () => {
      taskName.value = "";
      taskDesc.value = "";
      taskDate.value = today;
      taskPriority.value = "None";
      taskProject.value = projectHeader;
    }

    addTaskModalBtn.addEventListener("click", () => {
      taskForm.style.display = "flex";
      resetInputFields();
    });
  
    addTaskCancel.addEventListener("click", () => {
      taskForm.style.display = "none";
      resetInputFields();
    });
  
    addTaskConfirm.addEventListener("click", (btn) => {
      btn.preventDefault();
      btn.stopImmediatePropagation();
      newTodo(Todo(taskName.value, taskDesc.value, taskDate.value, taskPriority.value, "None", false, taskProject.value));
      displayProjectDOM(taskProject.value);
      resetInputFields();
      taskForm.style.display = "none";
    });
  }

  const displayCheckedList = () => {
    let checkboxes = document.querySelectorAll(".checkbox");
    let projectHeader = document.querySelector("h2").textContent;
    checkboxes.forEach((box) => {
      let currentTask = listOfProjects[projectHeader][Array.from(checkboxes).indexOf(box)];
      let text = box.nextSibling;
      if (currentTask.checkList) {
        box.setAttribute("class", "checkbox checked");
        text.setAttribute("class", "checked-span");
      } else {
        box.setAttribute("class", "checkbox");
        text.classList.remove("checked-span");
      }
    });
  }

  const markTaskChecked = () => {
    let checkboxDiv = document.querySelectorAll(".task");
    let projectHeader = document.querySelector("h2").textContent;

    checkboxDiv.forEach((task) => {
      let clickedTask = listOfProjects[projectHeader][Array.from(checkboxDiv).indexOf(task)];
      task.querySelector("input").addEventListener("click", function(event) {
        event.stopPropagation();
        checkTodo(clickedTask);
        displayCheckedList();
      });
    });
  }

  // task settings ellipsis
  const ellipsisOnClick = () => {
    let projectHeader = document.querySelector("h2").textContent;
    const ellipsis = document.querySelectorAll(".ellipsis");
    // const taskSettingsAll = document.querySelectorAll(".task-settings-all");

    ellipsis.forEach((e) => {
      e.addEventListener("click", () => {
        const currentTaskSettings = e.nextSibling;
        const condition = currentTaskSettings.classList.value;

        if (condition == "task-settings-all hidden") {
          currentTaskSettings.classList.remove("hidden");
        } else {
          currentTaskSettings.setAttribute("class", "task-settings-all hidden");
        }
      });
    });

    const editSetting = document.querySelectorAll(".task-settings-edit");

    editSetting.forEach((e) => {
      const currentTaskSettings = e.parentNode;

      e.addEventListener("click", () => {
        const currentTask = listOfProjects[projectHeader][Array.from(editSetting).indexOf(e)];
        const taskDiv = e.parentNode.parentNode.parentNode.parentNode;

        const resetInputFields = () => {
          editTaskForm.querySelector("#task-name").value = currentTask.title;
          editTaskForm.querySelector("#task-desc").value = currentTask.desc;
          editTaskForm.querySelector("#task-date").value = currentTask.dueDate;
          editTaskForm.querySelector("#task-priority").value = currentTask.priority;
          editTaskForm.querySelector("#task-project").value = currentTask.project;
        }
        resetInputFields();

        taskDiv.appendChild(editTaskForm);
        editTaskForm.style.display = "flex";

        const cancelTaskBtn = document.querySelector("#cancel-task-btn");
        cancelTaskBtn.addEventListener("click", () => {
          editTaskForm.remove();
        });

        const editTaskBtn = document.querySelector("#edit-task-btn");
        editTaskBtn.addEventListener("click", (btn) => {
          btn.preventDefault();
          btn.stopImmediatePropagation();
          
          const projectHeader = document.querySelector("h2").textContent;
          const form = document.querySelector("#task-form");
          const tasks = document.querySelectorAll(".task");
          const currentTask = listOfProjects[projectHeader][Array.from(tasks).indexOf(form.parentNode)];
          const taskName = document.querySelector("#task-name").value;
          const taskDesc = document.querySelector("#task-desc").value;
          const taskDate = document.querySelector("#task-date").value;
          const taskPriority = document.querySelector("#task-priority").value;
          const taskProject = document.querySelector("#task-project").value;

          deleteTodo(currentTask);
          newTodo(Todo(taskName, taskDesc, taskDate, taskPriority, "None", false, taskProject));
          resetInputFields();

          displayProjectDOM(projectHeader);
        });

        currentTaskSettings.setAttribute("class", "task-settings-all hidden"); // hides task settings
      });
    });

    const deleteSetting = document.querySelectorAll(".task-settings-delete");
    
    deleteSetting.forEach((e) => {
      e.addEventListener("click", () => {
        const currentTask = listOfProjects[projectHeader][Array.from(deleteSetting).indexOf(e)];
        deleteTodo(currentTask);
        displayProjectDOM(projectHeader);
      });
    });

    const infoSetting = document.querySelectorAll(".task-settings-info");

    infoSetting.forEach((e) => {
      const currentTaskSettings = e.parentNode;

      e.addEventListener("click", () => {
        const currentTask = listOfProjects[projectHeader][Array.from(infoSetting).indexOf(e)];
        const taskInfo = document.createElement("div");
        taskInfo.setAttribute("class", "task-info");

        const title = document.createElement("span");
        const desc = document.createElement("span");
        const dueDate = document.createElement("span");
        const priority = document.createElement("span");
        const project = document.createElement("span");
        const button = document.createElement("div");

        button.addEventListener("click", () => {
          taskInfo.remove();
        });

        title.textContent = `Title: ${currentTask.title}`;
        desc.textContent = `Description: ${currentTask.desc}`;
        dueDate.textContent = `Due: ${currentTask.dueDate}`;
        priority.textContent = `Priority: ${currentTask.priority}`;
        project.textContent = `Project: ${currentTask.project}`;
        button.textContent = "Close";
        button.setAttribute("class", "task-info-button");

        taskInfo.appendChild(title);
        taskInfo.appendChild(desc);
        taskInfo.appendChild(dueDate);
        taskInfo.appendChild(priority);
        taskInfo.appendChild(project);
        taskInfo.appendChild(button);

        boardDiv.appendChild(taskInfo);

        currentTaskSettings.setAttribute("class", "task-settings-all hidden"); // hides task settings
      });
    });
  }

  function displayProjectTabs() {
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

      // Project option
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
      taskDate.textContent = dateFormatter(task.dueDate);
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

  const addTaskBtn = () => {
    let addTaskDiv = document.createElement("div");
    addTaskDiv.setAttribute("class", "text-primary add-task");
    addTaskDiv.innerHTML = `<svg class="icon icon-primary add-task" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg>`;
    let taskSpan = document.createElement("span");
    taskSpan.textContent = "Add task";
    addTaskDiv.appendChild(taskSpan);
    
    boardDiv.appendChild(addTaskDiv);
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
      taskDate.textContent = dateFormatter(task.dueDate);
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

  // Project tab click logic
  const projectTabOnClick = () => {
    const taskForm = document.querySelector("#task-form");

    document.querySelectorAll(".icon-title").forEach((tab) => {
      tab.addEventListener("click", () => {
        displayProjectDOM(tab.querySelector("li").textContent); // display the project
        taskForm.style.display = "none";
      });
    });

    document.querySelectorAll(".trash").forEach((trash) => {
      trash.addEventListener("click", () => {
        deleteProject(trash.parentNode.parentNode.querySelector("li").textContent);
        console.log(listOfProjects);
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

  updateScreen();

  addTaskDOM();
  showProjectForm();
  markTaskChecked();
  displayCheckedList();
  ellipsisOnClick();
  displayProjectTabs();
  projectTabOnClick();
}

ScreenController();