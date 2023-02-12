import { myList } from "../project";
import { displayFrontofTask, displayEndofTask } from "../Task/individualTask";
import { taskConstructor } from "../Task/taskList";


export function displayAllTasks()  {

    const pnlTitle = document.getElementById("panelTitle");
    pnlTitle.innerHTML = '<i class="fa-solid fa-list-check"></i>'+" All Tasks";
    const addTaskBtn = document.querySelector(".task-btn");
    addTaskBtn.style.display = "none";
    let taskList = document.querySelector(".task-list");
    taskList.innerHTML = "";
          for (let i = 0; i < myList.length; i++) {
             for (let j = 0; j < myList[i].tasks.length; ++j) {
                   let temp = myList[i].tasks[j].task;
                   let currentTask = new taskConstructor(temp.taskTitle, temp.details, temp.date, temp.time);
                   let task = document.createElement('div');
                   task.id = "whole-taskStatus-" + j;
                   if (myList[i].tasks[j].task.status == false) {
                       task.classList.add('taskTitle');
                   } else {
                       task.classList.add('taskTitle','doneTask');
                   }
                   const myTask = myList[i].tasks[j].task;
                  task.appendChild(displayFrontofTask(myTask.taskTitle, myTask.details, j, i, myTask.status, myTask));
                  task.appendChild(displayEndofTask(myTask.date, myTask.time, j, i, myTask.importance));
                   
                const trashElement = document.createElement("div");
                trashElement.classList.add("trashTaskBtn");
                trashElement.id = "trashTask-" + j;
                trashElement.innerHTML = '<i class="fa-solid fa-trash"></i>';
                trashElement.addEventListener("click", () => {
                    currentTask.deleteTask(j, myList[i].tasks);
                    taskList.innerHTML = "";
                    displayAllTasks();
                    //allTasksImportance();
                });
                task.appendChild(trashElement);
                taskList.appendChild(task);
         }
     }
}