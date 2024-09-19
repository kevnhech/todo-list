import { listOfProjects, updateStorage } from "./data.js";

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

export { Todo, newTodo, checkTodo, priorityTodo, deleteTodo };