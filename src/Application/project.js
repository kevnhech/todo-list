import { listOfProjects, updateStorage } from "./data.js";

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

export { Project, deleteProject }