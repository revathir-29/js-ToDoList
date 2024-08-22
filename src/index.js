import TodoItem from "./TodoItem.js";
import { addTodoItem, removeTodoItem, changeItemPriority} from "./TodoListController.js";
import Project from "./Project.js";
import { getAllProjects, saveAllProjects, updateIndexes, removeProject, addNewProject, setCurrentProject, getCurrentProject } from "./StorageManager.js";
import { getProjectList, getTodoList } from "./DisplayManager.js";
import "./style.css";