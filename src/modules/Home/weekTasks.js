import { myList } from "../project"
import { taskConstructor } from "../Task/taskList";
import { displayFrontofTask, displayEndofTask } from "../Task/individualTask";

export function displayWeekTasksList() {
    const pnlTitle = document.getElementById("panelTitle");
        pnlTitle.innerHTML = '<i class="fa-solid fa-calendar-week"></i>'+" This week's tasks";
        const addTaskBtn = document.querySelector(".task-btn");
        addTaskBtn.style.display = "none";
        let taskList = document.querySelector(".task-list");
        taskList.innerHTML = "";
        for (let i = 0; i < myList.length; i++) {
             for (let j = 0; j < myList[i].tasks.length; ++j) {
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
                if (dateArray.includes(myList[i].tasks[j].task.date)) {
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
                        currentTask.deleteTask(j, myList[i].tasks);
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