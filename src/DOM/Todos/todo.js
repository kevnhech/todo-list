import { dateFormatter } from "../../Application/date.js";
import { listOfProjects } from "../../Application/data.js";
import { Todo, newTodo, deleteTodo, checkTodo } from "../../Application/todo.js";
import { displayProjectDOM } from "../Projects/project.js";
import { boardDiv, newTaskForm, editTaskForm } from "../screen-controller.js";

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
    taskDate.value = dateFormatter("").today;
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

const addTaskBtn = () => {
  let addTaskDiv = document.createElement("div");
  addTaskDiv.setAttribute("class", "text-primary add-task");
  addTaskDiv.innerHTML = `<svg class="icon icon-primary add-task" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg>`;
  let taskSpan = document.createElement("span");
  taskSpan.textContent = "Add task";
  addTaskDiv.appendChild(taskSpan);
  
  boardDiv.appendChild(addTaskDiv);
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

const ellipsisOnClick = () => {
  let projectHeader = document.querySelector("h2").textContent;
  const ellipsis = document.querySelectorAll(".ellipsis");

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

      currentTaskSettings.setAttribute("class", "task-settings-all hidden");
    });
  });
}

export { addTaskForm, addTaskDOM, addTaskBtn, displayCheckedList, markTaskChecked, ellipsisOnClick };