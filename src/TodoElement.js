import { formatDistanceToNow } from "date-fns";

export function createTodoElement(item) {
  return `
    <div class="collapsibleElement">

      <div class="collapsible">
        <span class="priorityMarker" data-priority="${item.priority}"></span>
        <span class="taskName">${item.title}</span>
        <span class="dueDate">Due ${getDueDate(item.dueDate)}</span>
      </div>

      <div class="content">
        <p>${item.description}</p>
        <div class="buttons">
          <button class="removeButton" data-index="${item.index}">Remove</button>
          <button class="statusToggle" data-index="${item.index}">Change priority</button>
        </div>
      </div>
    </div>
  `
}

export function makeCollapsibleElement() {
  const elements = document.querySelectorAll(".collapsible");

  elements.forEach(element => {
    element.addEventListener("click", () => {
      element.classList.toggle("active");

      const content = element.nextElementSibling;
      if (content.style.display === "flex") {
        content.style.display = "none";
      } else {
        content.style.display = "flex";
      }
    })
  })
}

function getDueDate(dueDate) {  
  return formatDistanceToNow(dueDate, {addSuffix: true});
}