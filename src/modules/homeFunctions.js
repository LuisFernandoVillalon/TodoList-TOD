import {Project, myList} from "./project";
import { taskConstructor } from "./task";
import { todayTasksListImportanceBtn, allTasksImportance, displayEndofTask, displayFrontofTask, importantTasksListBtn, weekTasksListImportanceBtn} from "./individualTask";

//eventlisteners that activate a function to display the according list depending on 
//the selection made

const displayAllTasksBtn = document.getElementById("allTasks");
export const displayAllTaskList = () => {
     displayAllTasksBtn.addEventListener('click', () => {
        displayAllTasks();
        allTasksImportance();
     });
}
export function displayAllTasks()  {

        const pnlTitle = document.getElementById("panelTitle");
        pnlTitle.innerHTML = '<i class="fa-solid fa-list-check"></i>'+" All Tasks";
        const addTaskBtn = document.querySelector(".task-btn");
        addTaskBtn.style.display = "none";
        let taskList = document.querySelector(".task-list");
        taskList.innerHTML = "";
              for (let i = 0; i < myList.length; i++) {
                 for (let j = 0; j < myList[i].task.length; ++j) {
                       let temp = myList[i].task[j];
                       let currentTask = new taskConstructor(temp.taskTitle, temp.details, temp.date, temp.time);
                       let task = document.createElement('div');
                       task.id = "whole-taskStatus-" + j;
                       if (myList[i].task[j].status == false) {
                           task.classList.add('taskTitle');
                       } else {
                           task.classList.add('taskTitle','doneTask');
                       }
                       Project.task = currentTask;
                      task.appendChild(displayFrontofTask(Project.task.taskTitle, Project.task.details, j, i, myList[i].task[j].status));
                      task.appendChild(displayEndofTask(Project.task.date, Project.task.time, j, myList[i].task[j].importance));
                       
                    const trashElement = document.createElement("div");
                    trashElement.classList.add("trashTaskBtn");
                    trashElement.id = "trashTask-" + j;
                    trashElement.innerHTML = '<i class="fa-solid fa-trash"></i>';
                    trashElement.addEventListener("click", () => {
                        currentTask.deleteTask(j, myList[i].task);
                        taskList.innerHTML = "";
                        displayAllTasks();
                        allTasksImportance();
                    });
                    task.appendChild(trashElement);
                    taskList.appendChild(task);
             }
         }
}
const displayImportantTasksBtn = document.getElementById("important");
export const displayImportantList = () => {
    displayImportantTasksBtn.addEventListener('click', () => {
       displayImportantTasks();
       importantTasksListBtn();
    });
}
export function displayImportantTasks() {
    const pnlTitle = document.getElementById("panelTitle");
        pnlTitle.innerHTML = '<i class="fa-solid fa-star"></i>'+" Important Tasks";
        const addTaskBtn = document.querySelector(".task-btn");
        addTaskBtn.style.display = "none";
        let taskList = document.querySelector(".task-list");
        taskList.innerHTML = "";
              for (let i = 0; i < myList.length; i++) {
                 for (let j = 0; j < myList[i].task.length; ++j) {
                    if (myList[i].task[j].importance) {
                       let temp = myList[i].task[j];
                       let currentTask = new taskConstructor(temp.taskTitle, temp.details, temp.date, temp.time);
                        let task = document.createElement('div');
                        task.id = "whole-taskStatus-" + j;
                       if (myList[i].task[j].status == false) {
                           task.classList.add('taskTitle');
                       } else {
                           task.classList.add('taskTitle','doneTask');
                       }
                       Project.task = currentTask;
                      task.appendChild(displayFrontofTask(Project.task.taskTitle, Project.task.details, j, i, myList[i].task[j].status));
                      task.appendChild(displayEndofTask(Project.task.date, Project.task.time, j, myList[i].task[j].importance));

                        const trashElement = document.createElement("div");
                        trashElement.classList.add("trashTaskBtn");
                        trashElement.id = "trashTask-" + j;
                        trashElement.innerHTML = '<i class="fa-solid fa-trash"></i>';
                        trashElement.addEventListener("click", () => {
                            currentTask.deleteTask(j, myList[i].task);
                            taskList.innerHTML = "";
                            displayImportantTasks();
                            importantTasksListBtn();
                        });
                        task.appendChild(trashElement);
                        taskList.appendChild(task);
                        }
             }
         }
}
const displayTodayTasksBtn = document.getElementById("today");
export const displayTodayTasks = () => {
    displayTodayTasksBtn.addEventListener('click', () => {
       displayTodayTasksList();
       todayTasksListImportanceBtn();
    });
}
 export function displayTodayTasksList() {
    const pnlTitle = document.getElementById("panelTitle");
        pnlTitle.innerHTML = '<i class="fa-solid fa-calendar-day"></i>'+" Today's Tasks";
        const addTaskBtn = document.querySelector(".task-btn");
        addTaskBtn.style.display = "none";
        let taskList = document.querySelector(".task-list");
        taskList.innerHTML = "";
              for (let i = 0; i < myList.length; i++) {
                 for (let j = 0; j < myList[i].task.length; ++j) {
                    const date = new Date();
                    let day = ("0" + date.getDate()).slice(-2);
                    let month = ("0" + date.getMonth() + 1).slice(-2);
                    let year = date.getFullYear();
                    let currentDate = `${year}-${month}-${day}`;
                    if (myList[i].task[j].date == currentDate) {
                       let temp = myList[i].task[j];
                       let currentTask = new taskConstructor(temp.taskTitle, temp.details, temp.date, temp.time);
                        let task = document.createElement('div');
                        task.id = "whole-taskStatus-" + j;
                       if (myList[i].task[j].status == false) {
                           task.classList.add('taskTitle');
                       } else {
                           task.classList.add('taskTitle','doneTask');
                       }
                       Project.task = currentTask;
                      task.appendChild(displayFrontofTask(Project.task.taskTitle, Project.task.details, j, i, myList[i].task[j].status));
                      task.appendChild(displayEndofTask(Project.task.date, Project.task.time, j, myList[i].task[j].importance));

                        const trashElement = document.createElement("div");
                        trashElement.classList.add("trashTaskBtn");
                        trashElement.id = "trashTask-" + j;
                        trashElement.innerHTML = '<i class="fa-solid fa-trash"></i>';
                        trashElement.addEventListener("click", () => {
                            currentTask.deleteTask(j, myList[i].task);
                            taskList.innerHTML = "";
                            displayTodayTasksList();
                            todayTasksListImportanceBtn();
                        });
                        task.appendChild(trashElement);
                        taskList.appendChild(task);
                        }
             }
         }
}
const displayWeekTasksBtn = document.getElementById("week");
export const displayWeekTasks = () => {
    displayWeekTasksBtn.addEventListener('click', () => {
       displayWeekTasksList();
       weekTasksListImportanceBtn();
    });
}
 export function displayWeekTasksList() {
    const pnlTitle = document.getElementById("panelTitle");
        pnlTitle.innerHTML = '<i class="fa-solid fa-calendar-week"></i>'+" This week's tasks";
        const addTaskBtn = document.querySelector(".task-btn");
        addTaskBtn.style.display = "none";
        let taskList = document.querySelector(".task-list");
        taskList.innerHTML = "";
        for (let i = 0; i < myList.length; i++) {
             for (let j = 0; j < myList[i].task.length; ++j) {
                const date = new Date();
                Date.prototype.addDays = function(days) {
                        var dat = new Date(this.valueOf())
                        dat.setDate(dat.getDate() + days);
                        return dat;
                }
                function getDates(startDate, stopDate) {
                       var dateArray = new Array();
                       var currentDate = startDate;
                       while (currentDate <= stopDate) {
                        let day = ('0' + currentDate.getDate()).slice(-2);
                        let month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
                        let year = currentDate.getFullYear();
                        let properCurrentDate = `${year}-${month}-${day}`;
                         dateArray.push(properCurrentDate)
                         currentDate = currentDate.addDays(1);
                       }
                       return dateArray;
                 }
                var dateArray = getDates(date, (date).addDays(7));
                if (dateArray.includes(myList[i].task[j].date)) {
                    let temp = myList[i].task[j];
                    let currentTask = new taskConstructor(temp.taskTitle, temp.details, temp.date, temp.time);
                    let task = document.createElement('div');
                    task.id = "whole-taskStatus-" + j;
                    if (myList[i].task[j].status == false) {
                        task.classList.add('taskTitle');
                    } else {
                        task.classList.add('taskTitle','doneTask');
                    }
                    Project.task = currentTask;
                    task.appendChild(displayFrontofTask(Project.task.taskTitle, Project.task.details, j, i, myList[i].task[j].status));
                    task.appendChild(displayEndofTask(Project.task.date, Project.task.time, j, myList[i].task[j].importance));
                    const trashElement = document.createElement("div");
                    trashElement.classList.add("trashTaskBtn");
                    trashElement.id = "trashTask-" + j;
                    trashElement.innerHTML = '<i class="fa-solid fa-trash"></i>';
                    trashElement.addEventListener("click", () => {
                        currentTask.deleteTask(j, myList[i].task);
                        taskList.innerHTML = "";
                        displayWeekTasksList();
                        weekTasksListImportanceBtn();
                    });
                        task.appendChild(trashElement);
                        taskList.appendChild(task);
                    }
                }
            }
}