import {closeProjectForm, displayProjectForm, submitProjectForm} from "./modules/project";
import { displayAllTaskList, displayImportantList, displayTodayTasks, displayWeekTasks } from "./modules/homeFunctions";





const themeBtn = document.getElementById("themeBtn");
const root = document.querySelector(":root");

themeBtn.addEventListener( "click", () => {
    if (themeBtn.innerHTML == "Day") {
        themeBtn.innerHTML = "Night";
        root.style.setProperty('--blue', '#FFFFFF');

        root.style.setProperty('--white', '#14213D');
    
        root.style.setProperty('--black', '#E5E5E5');

        root.style.setProperty('--platinum', '#FCA311');

        root.style.setProperty('--yellow', '#E5E5E5');
    } else {
        themeBtn.innerHTML = "Day";
        root.style.setProperty('--blue', '#14213D');

        root.style.setProperty('--white', '#FFFFFF');
    
        root.style.setProperty('--black', '#000000');

        root.style.setProperty('--platinum', '#E5E5E5');

        root.style.setProperty('--yellow', '#FCA311');
    }


}) ;





//functions that run for the "ADD PROJECT BUTTON"
displayProjectForm();
submitProjectForm();
closeProjectForm();
//function that run for the buttons under "HOME"
displayAllTaskList();
displayTodayTasks();
displayWeekTasks();
displayImportantList();
