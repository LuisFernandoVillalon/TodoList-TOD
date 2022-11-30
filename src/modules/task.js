import {Project, myList} from "./project";
import {displayFrontofTask, displayEndofTask, taskImportance} from "./individualTask"

export function taskConstructor (taskTitle, details, date, time) {
    this.taskTitle = taskTitle;
    this.details = details;
    this.date = date;
    this.time = time;
    this.status = false;
    this.importance = false;
}
taskConstructor.prototype.deleteTask = function(index, taskList) {
    taskList.splice(index,1);
}
function addTasktoProject(taskTitle, details, date, time, prjLocation) {
    let newTask = new taskConstructor(taskTitle, details, date, time);
    myList[prjLocation].task.push(newTask);
}
export function updateTaskList() {
    const prjTitle = document.getElementById("panelTitle");
    let prjLocation = 0;
    for (let i = 0; i < myList.length; ++i) {
        if (myList[i].title == prjTitle.textContent) {
            prjLocation = i;
        }
    }
    const taskList = document.querySelector(".task-list");
    taskList.innerHTML = "";
    taskList.id = prjLocation;
     for (let i = 0; i < myList[prjLocation].task.length; ++i) {
        let temp = myList[prjLocation].task[i];
        let currentTask = new taskConstructor(temp.taskTitle, temp.details, temp.date, temp.time);
         let task = document.createElement('div');
         task.id = "whole-taskStatus-" + i;
         if (myList[prjLocation].task[i].status == false) {
            task.classList.add('taskTitle');
         } else {
            task.classList.add('taskTitle','doneTask');
         }
         task.appendChild(displayFrontofTask(myList[prjLocation].task[i].taskTitle, myList[prjLocation].task[i].details, i, prjLocation, myList[prjLocation].task[i].status));
         task.appendChild(displayEndofTask(myList[prjLocation].task[i].date, myList[prjLocation].task[i].time, i, myList[prjLocation].task[i].importance));
         const trashElement = document.createElement("div");
            trashElement.classList.add("trashTaskBtn");
            trashElement.id = "trashTask-" + i;
            trashElement.innerHTML = '<i class="fa-solid fa-trash"></i>';
            trashElement.addEventListener("click", () => {
                 currentTask.deleteTask(i, myList[prjLocation].task);
                  taskList.innerHTML = "";
                  updateTaskList();
                  taskImportance();
            });
            task.appendChild(trashElement);
         taskList.appendChild(task);
     }
}
const taskBtn = document.getElementById("task-btn");
export  function displayTaskBtn() {
     taskBtn.textContent = "+ Add Task";
     taskBtn.classList.add("task-btn");
     if (taskBtn.style.display == "none") {
        taskBtn.style.display = "flex";
     }
}
export const displayTaskForm = () => {
    taskBtn.addEventListener('click', () => {
        openTaskForm();
    });
}
function openTaskForm() {
    let taskForm = document.getElementById("projectTaskForm");
    taskForm.classList.remove("hide");
}
const closeBtn = document.querySelector('.closeTaskBtn');
export const closeTaskForm = () => {
    closeBtn.addEventListener('click', () => {
        closeForm();
    });
}
function closeForm() {
    let formPage = document.querySelector(".taskForm");
    formPage.classList.add("hide");
    clearForm();
}
function clearForm() {
    document.forms["formInfo"].reset();
}
const submitBtn = document.querySelector(".submitTaskBtn");
export const submitTaskForm = () => {
    submitBtn.addEventListener('click', (event) => {
        let newTaskTitle = document.getElementById("taskTitle");
        let newTaskDetails = document.getElementById("details");
        let newDate = document.getElementById("date");
        let newTime = document.getElementById("time");
        const prjTitle = document.getElementById("panelTitle");
        let prjLocation = 0;
        for (let i = 0; i < myList.length; ++i) {
            if (myList[i].title == prjTitle.textContent) {
                 prjLocation = i;
            }
        }
        event.preventDefault();
            addTasktoProject(newTaskTitle.value, newTaskDetails.value, newDate.value, newTime.value, prjLocation);
            displayTaskList(prjLocation);
            taskImportance();
            closeForm();
    });
}
export function displayTaskList(prjLocation) {
        let taskList = document.querySelector(".task-list");
        taskList.innerHTML = "";
        for (let i = 0; i < myList[prjLocation].task.length; i++) {
            let temp = myList[prjLocation].task[i];
            let currentTask = new taskConstructor(temp.taskTitle, temp.details, temp.date, temp.time);
            let task = document.createElement('div');
            task.id = "whole-taskStatus-" + i;
            if (myList[prjLocation].task[i].status == false) {
                task.classList.add('taskTitle');
             } else {
                task.classList.add('taskTitle','doneTask');
             }
            Project.task = currentTask;
            task.appendChild(displayFrontofTask(Project.task.taskTitle, Project.task.details, i, prjLocation, myList[prjLocation].task[i].status));
            task.appendChild(displayEndofTask(Project.task.date, Project.task.time, i, myList[prjLocation].task[i].importance));

            const trashElement = document.createElement("div");
            trashElement.classList.add("trashTaskBtn");
            trashElement.id = "trashTask-" + i;
            trashElement.innerHTML = '<i class="fa-solid fa-trash"></i>';
            trashElement.addEventListener("click", () => {
                 currentTask.deleteTask(i, myList[prjLocation].task);
                  taskList.innerHTML = "";
                  displayTaskList(prjLocation);
                  taskImportance();
            });
            task.appendChild(trashElement);
            taskList.appendChild(task);
        }
    }


