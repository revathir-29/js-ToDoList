import Project from "./Project.js";

export function getAllProjects() {

  if (!localStorage.getItem("projects")) {
    localStorage.setItem(
      "projects",
      JSON.stringify([new Project("Default")])
    );
    updateIndexes();
  }

  return JSON.parse(localStorage.getItem("projects"));
}

export function saveAllProjects(projects) {
  localStorage.setItem("projects", JSON.stringify(projects));
}

export function updateIndexes() {
  const projects = getAllProjects();

  projects.forEach((project, idx) => {
    project.index = idx;
  })
  
  saveAllProjects(projects);
}

export function removeProject(index) {
  const projects = getAllProjects();

  projects.splice(index, 1);

  saveAllProjects(projects);
  updateIndexes();
}

export function addNewProject(projectName) {
  const projects = getAllProjects();
  const newProject = new Project(projectName);
  projects.push(newProject);
  
  saveAllProjects(projects);
  updateIndexes();
}

export function getCurrentProject() {
  if (!localStorage.getItem("currentProject")) {
    localStorage.setItem("currentProject", JSON.stringify(0));
  }
  return JSON.parse(localStorage.getItem("currentProject"));
}

export function setCurrentProject(index) {
  localStorage.setItem("currentProject", JSON.stringify(index));
}