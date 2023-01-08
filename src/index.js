import {closeProjectForm, displayProjectForm, submitProjectForm} from "./modules/project";
import { displayAllTaskList, displayImportantList, displayTodayTasks, displayWeekTasks } from "./modules/homeFunctions";

//functions that run for the "ADD PROJECT BUTTON"
displayProjectForm();
submitProjectForm();
closeProjectForm();
//function that run for the buttons under "HOME"
displayAllTaskList();
displayTodayTasks();
displayWeekTasks();
displayImportantList();

