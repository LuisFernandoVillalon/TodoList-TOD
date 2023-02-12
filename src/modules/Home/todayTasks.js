import { myList } from "../project"
import { taskConstructor } from "../Task/taskList";
import { displayFrontofTask, displayEndofTask } from "../Task/individualTask";

export function displayTodayTasksList() {
    const pnlTitle = document.getElementById("panelTitle");
        pnlTitle.innerHTML = '<i class="fa-solid fa-calendar-day"></i>'+" Today's Tasks";
        const addTaskBtn = document.querySelector(".task-btn");
        addTaskBtn.style.display = "none";
        let taskList = document.querySelector(".task-list");
        taskList.innerHTML = "";
              for (let i = 0; i < myList.length; i++) {
                 for (let j = 0; j < myList[i].tasks.length; ++j) {
                    const date = new Date();
                    let day = ("0" + date.getDate()).slice(-2);
                    let tempMonth = "0" + (date.getMonth() + 1);
                    let month = tempMonth.slice(-2);
                    let year = date.getFullYear();
                    let currentDate = `${year}-${month}-${day}`;
                    if (myList[i].tasks[j].task.date == currentDate) {
                       let temp = myList[i].tasks[j];
                       let currentTask = new taskConstructor(temp.task.taskTitle, temp.task.details, temp.task.date, temp.task.time);
                        let task = document.createElement('div');
                        task.id = "whole-taskStatus-" + j;
                       if (myList[i].tasks[j].task.status == false) {
                           task.classList.add('taskTitle');
                       } else {
                           task.classList.add('taskTitle','doneTask');
                       }
                       const myTask = myList[i].tasks[j].task;
                      task.appendChild(displayFrontofTask(myTask.taskTitle, myTask.details, j, i, myTask.status,  myTask));
                      task.appendChild(displayEndofTask(myTask.date, myTask.time, j, i, myTask.importance));

                        const trashElement = document.createElement("div");
                        trashElement.classList.add("trashTaskBtn");
                        trashElement.id = "trashTask-" + j;
                        trashElement.innerHTML = '<i class="fa-solid fa-trash"></i>';
                        trashElement.addEventListener("click", () => {
                            currentTask.deleteTask(j, myList[i].taska);
                            taskList.innerHTML = "";
                            displayTodayTasksList();
                        });
                        task.appendChild(trashElement);
                        taskList.appendChild(task);
                        }
             }
         }
}