import { myList } from "../project";
import { displayFrontofTask, displayEndofTask } from "./individualTask";
import { saveListwithTask } from "../storage/LocalStorage";


export function saveTaskStat(taskStat) {
    localStorage.setItem('taskStat', JSON.stringify(taskStat));
}

export function taskConstructor (taskTitle, details, date, time) {
    this.task = {
        taskTitle : taskTitle,
        details : details,
        date : date,
        time : time,
        status : false,
        importance : false,
    }
}
taskConstructor.prototype.deleteTask = function(index, taskList) {
    taskList.splice(index,1);
    saveListwithTask(myList);
}
export function addTasktoProject(taskTitle, details, date, time, prjLocation) {
    let newTask = new taskConstructor(taskTitle, details, date, time);
    myList[prjLocation].tasks.push(newTask);
    saveListwithTask(myList);
}
export function updateTaskList( storedList) {
    const prjTitle = document.getElementById("panelTitle");
    let prjLocation = 0;
    for (let i = 0; i < storedList.length; ++i) {
        if (storedList[i].title == prjTitle.textContent) {
            prjLocation = i;
        }
    }
    const taskList = document.querySelector(".task-list");
    taskList.innerHTML = "";
    taskList.id = prjLocation;
    let objTaskList =  storedList[prjLocation].tasks;
    if (!objTaskList) {
        objTaskList = 0;
    }
     for (let i = 0; i < Object.keys(objTaskList).length; ++i) {
        let temp = storedList[prjLocation].tasks[i];
        let currentTask = new taskConstructor(temp.taskTitle, temp.details, temp.date, temp.time);
         let task = document.createElement('div');
         task.id = "whole-taskStatus-" + i;
         if (storedList[prjLocation].tasks[i].task.status == false) {
            task.classList.add('taskTitle');
         } else {
            task.classList.add('taskTitle','doneTask');
         }
         const myTask = storedList[prjLocation].tasks[i].task;
         task.appendChild(displayFrontofTask(myTask.taskTitle, myTask.details, i, prjLocation, myTask.status, myTask));
         task.appendChild(displayEndofTask(myTask.date, myTask.time, i, prjLocation, myTask.importance));
         const trashElement = document.createElement("div");
            trashElement.classList.add("trashTaskBtn");
            trashElement.id = "trashTask-" + i;
            trashElement.innerHTML = '<i class="fa-solid fa-trash"></i>';
            trashElement.addEventListener("click", () => {
                 currentTask.deleteTask(i, storedList[prjLocation].tasks);
                  taskList.innerHTML = "";
                  updateTaskList(storedList);
            });
            task.appendChild(trashElement);
         taskList.appendChild(task);
     }
}

export function displayTaskList(prjLocation) {
        let taskList = document.querySelector(".task-list");
        taskList.innerHTML = "";
        const objTaskList =  myList[prjLocation].tasks;
        for (let i = 0; i < Object.keys(objTaskList).length; i++) {
            let temp = myList[prjLocation].tasks[i];
            // console.log(objTaskList)
            let currentTask = new taskConstructor(temp.task.taskTitle, temp.task.details, temp.task.date, temp.task.time);
            let task = document.createElement('div');
            task.id = "whole-taskStatus-" + i;
            if (myList[prjLocation].tasks[i].task.status == false) {
                task.classList.add('taskTitle');
             } else {
                task.classList.add('taskTitle','doneTask');
             }
             
            task.appendChild(displayFrontofTask(currentTask.task.taskTitle, currentTask.task.details, i, prjLocation, myList[prjLocation].tasks[i].task.status, currentTask.task));
            task.appendChild(displayEndofTask(currentTask.task.date, currentTask.task.time, i, prjLocation, myList[prjLocation].tasks[i].task.importance));

            const trashElement = document.createElement("div");
            trashElement.classList.add("trashTaskBtn");
            trashElement.id = "trashTask-" + i;
            trashElement.innerHTML = '<i class="fa-solid fa-trash"></i>';
            trashElement.addEventListener("click", () => {
                  currentTask.deleteTask(i, myList[prjLocation].tasks);
                  taskList.innerHTML = "";
                  displayTaskList(prjLocation);
            });
            task.appendChild(trashElement);
            taskList.appendChild(task);
        }
    }


