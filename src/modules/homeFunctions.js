import { displayAllTasks } from "./Home/allTasks";
import { displayImportantTasks } from "./Home/allImportantTasks";
import { displayTodayTasksList } from "./Home/todayTasks";
import { displayWeekTasksList } from "./Home/weekTasks";

//eventlisteners that activate a function to display the according list depending on 
//the selection made

const displayAllTasksBtn = document.getElementById("allTasks");
export const displayAllTaskList = () => {
     displayAllTasksBtn.addEventListener('click', () => {
        displayAllTasks();
     });
}
const displayImportantTasksBtn = document.getElementById("important");
export const displayImportantList = () => {
    displayImportantTasksBtn.addEventListener('click', () => {
       displayImportantTasks();
    });
}

const displayTodayTasksBtn = document.getElementById("today");
export const displayTodayTasks = () => {
    displayTodayTasksBtn.addEventListener('click', () => {
       displayTodayTasksList();
    });
}
const displayWeekTasksBtn = document.getElementById("week");
export const displayWeekTasks = () => {
    displayWeekTasksBtn.addEventListener('click', () => {
       displayWeekTasksList();
    });
}
