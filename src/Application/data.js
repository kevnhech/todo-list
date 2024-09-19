import { dateFormatter } from "./date";
import { Project } from "./project";
import { Todo, newTodo } from "./todo";

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
    newTodo(Todo("Thanks for checking out my To-Do Application.", "Have fun!", dateFormatter("").today, "High", "None", false, "Default"));
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

export { listOfProjects, updateStorage, returnStorage, fetchStorage };