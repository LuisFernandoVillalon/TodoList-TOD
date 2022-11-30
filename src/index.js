
import { displayAllTaskList, displayImportantList, displayTodayTasks, displayWeekTasks } from "./modules/homeFunctions";
import {closeProjectForm, displayProjectForm, submitProjectForm} from "./modules/project";

displayProjectForm();
submitProjectForm();
closeProjectForm();

displayAllTaskList();
displayImportantList();

displayTodayTasks();
displayWeekTasks();
