import { getAllProjects, getCurrentProject, addNewProject, saveAllProjects, setCurrentProject, removeProject, updateIndexes } from "./StorageManager.js"
import { addTodoItem, removeTodoItem, updateItemIndexes, changeItemPriority } from "./TodoListController.js";
import TodoItem from "./TodoItem.js";
import { format, formatDistanceToNow } from "date-fns";
import { createTodoElement, makeCollapsibleElement } from "./TodoElement.js";

export function getProjectList() {
  const projects = getAllProjects();
  const projectList = document.createElement("ul");

  projects.forEach(project => {
    const projectName = document.createElement("p");
    const li = document.createElement("li");
    li.classList.add("projectName");
    const nameContainer = document.createElement("div");
    const removeButton = document.createElement("div");
    removeButton.classList.add("removeProject");
    nameContainer.classList.add("nameContainer");

    projectName.textContent = project.name;
    nameContainer.addEventListener("click", () => {
      const projects = document.querySelectorAll(".projectName");
      projects.forEach(projectName => projectName.classList.remove("activeProject"));
      li.classList.add("activeProject");
      setCurrentProject(project.index);
      renderTodoList();
    });

    removeButton.addEventListener("click", () => {
      removeProject(project.index);
      setCurrentProject(0);
      renderProjects();
      const defaultProject = document.querySelectorAll('.projectName')[0];
      defaultProject.classList.add('activeProject');
      renderTodoList();
    });

    removeButton.innerHTML = "&#128465;";

    nameContainer.appendChild(projectName);
    li.appendChild(nameContainer);

    if (project.index > 0) {
      li.appendChild(removeButton);
    }

    projectList.appendChild(li);
  })

  return projectList;
}

export function getTodoList() {
  const currentProject = getCurrentProject();
  const projects = getAllProjects();
  const todoList = document.createElement("ul");

  projects[currentProject].todoList.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = createTodoElement(item);
    todoList.appendChild(li);
  })
  return todoList;
}

function enableStatusButtons() {
  const currentProject = getCurrentProject();
  const projects = getAllProjects();
  const buttons = document.querySelectorAll(".statusToggle");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      changeItemPriority(projects[currentProject].todoList, button.dataset.index);
      const collapsible = button.parentElement.parentElement.previousElementSibling;
      const priorityMarker = collapsible.querySelector(".priorityMarker");
      if (priorityMarker.dataset.priority === "high") {
        priorityMarker.dataset.priority = "low";
      } else {
        priorityMarker.dataset.priority = "high";
      }

      saveAllProjects(projects);
    })
  })
}

function enableDeleteButtons() {
  const buttons = document.querySelectorAll(".removeButton");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const currentProject = getCurrentProject();
      const projects = getAllProjects();
      removeTodoItem(projects[currentProject].todoList, button.dataset.index);
      updateItemIndexes(projects[currentProject].todoList);
      saveAllProjects(projects);
      renderTodoList();
    })
  })
}
export function renderProjects() {
  const div = document.getElementById("projects");
  div.innerHTML = '';
  div.appendChild(getProjectList());
  const allProjects = document.querySelectorAll(".projectName");
  allProjects[getCurrentProject()].classList.add("activeProject");
}

export function renderTodoList() {
  const div = document.getElementById("todoList");
  div.innerHTML = "";
  div.appendChild(getTodoList());
  enableDeleteButtons();
  enableStatusButtons();
  makeCollapsibleElement();
}

const projectForm = document.getElementById("newProject");
projectForm.addEventListener("submit", e => {
  e.preventDefault();
  const formData = new FormData(e.target);
  addNewProject(formData.get("projectName"));
  setCurrentProject(getAllProjects().length - 1);
  renderProjects();
  renderTodoList();
  const allProjects = document.querySelectorAll(".projectName");
  const addedProject = allProjects[allProjects.length - 1];
  addedProject.classList.add("activeProject");
  projectForm.reset();
});

const todoForm = document.getElementById("newItem");
const dateInput = document.getElementById("dateInput");
dateInput.setAttribute("min", format(new Date, "yyyy-MM-dd"));

todoForm.addEventListener("submit", e => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const todoItem = new TodoItem(
    formData.get("title"),
    formData.get("description"),
    formData.get("date"),
    formData.get("priority")
  );
  const projects = getAllProjects();
  const currentProject = getCurrentProject();

  addTodoItem(projects[currentProject].todoList, todoItem);
  saveAllProjects(projects);
  renderTodoList();
  todoForm.reset();
})

renderProjects();
renderTodoList();