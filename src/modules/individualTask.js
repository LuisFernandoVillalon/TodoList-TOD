import { displayImportantTasks, displayAllTasks, displayTodayTasksList, displayWeekTasksList } from "./homeFunctions";
import {Project, myList} from "./project";
import { displayTaskList } from "./task";

export function displayEndofTask(date, time, id, importance) {
    const dataContainer = document.createElement("div");
    dataContainer.classList.add("dataContainer");

    const dateElement = document.createElement("div");
    dateElement.classList.add("date");
    dateElement.innerHTML = date;
    dataContainer.appendChild(dateElement);

    const timeElement = document.createElement("div");
    timeElement.classList.add("time");
    timeElement.innerHTML = time;
    dataContainer.appendChild(timeElement);

    const importanceElement = document.createElement("div");
    importanceElement.classList.add("importantBtn");
    if (importance) {
        importanceElement.innerHTML = '<i class="fa-solid fa-star"></i>';
    } else {
        importanceElement.innerHTML = '<i class="fa-regular fa-star"></i>';
    }
    importanceElement.id = "taskImportance-"+id;
    dataContainer.appendChild(importanceElement);

    return dataContainer;
}
export function displayFrontofTask(title, description, id,  prjLocation, status) {
    const containerDescription= document.createElement("div");
    containerDescription.classList.add("containerDescription");

    const frontTaskContainer = document.createElement("div");
    frontTaskContainer.classList.add("frontTaskContainer");

    const checkBtn = document.createElement("button");
    checkBtn.setAttribute("type", "checkbox");
    checkBtn.classList.add("check-btn");
     if (status) {
         checkBtn.innerHTML= '<i class="fa-solid fa-check"></i>';
     } else {
         checkBtn.innerHTML= '<i class="fa-solid fa-rotate"></i>';
     }
    checkBtn.id = "taskStatus-"+id;
    checkBtn.addEventListener("click", () => {
        if (!(status)) {
            checkBtn.innerHTML= '<i class="fa-solid fa-check"></i>';
            status = true;
            myList[prjLocation].task[id].status = true;
            const prjTitle = document.getElementById("panelTitle");
            if (prjTitle.innerHTML == '<i class="fa-solid fa-list-check"></i>'+" All Tasks") {
                displayAllTasks();
                allTasksImportance();
            } else if (prjTitle.innerHTML == '<i class="fa-solid fa-star"></i>'+" Important Tasks") {
                displayImportantTasks();
                importantTasksListBtn();
            } else if (prjTitle.innerHTML == '<i class="fa-solid fa-calendar-day"></i>'+" Today's Tasks") {
                displayTodayTasksList();
                todayTasksListImportanceBtn();
             } else if (prjTitle.innerHTML == '<i class="fa-solid fa-calendar-week"></i>'+" This week's tasks") {
                displayWeekTasksList();
                weekTasksListImportanceBtn();
             } else {
                displayTaskList(prjLocation);
                taskImportance();
            }
        } else {
            checkBtn.innerHTML= '<i class="fa-solid fa-rotate"></i>';
            status = false;
            myList[prjLocation].task[id].status = false;
            const prjTitle = document.getElementById("panelTitle");
            if (prjTitle.innerHTML == '<i class="fa-solid fa-list-check"></i>'+" All Tasks") {
                displayAllTasks();
                allTasksImportance();
            } else if (prjTitle.innerHTML == '<i class="fa-solid fa-star"></i>'+" Important Tasks") {
                displayImportantTasks();
                allTasksImportance();
            } else if (prjTitle.innerHTML == '<i class="fa-solid fa-calendar-day"></i>'+" Today's Tasks") {
                displayTodayTasksList();
                todayTasksListImportanceBtn();
            } else if (prjTitle.innerHTML == '<i class="fa-solid fa-calendar-week"></i>'+" This week's tasks") {
                displayWeekTasksList();
                weekTasksListImportanceBtn();
            } else {
                displayTaskList(prjLocation);
                taskImportance();
            }
        }
    });
    frontTaskContainer.appendChild(checkBtn);

    const titleElement = document.createElement("div");
    titleElement.innerHTML = title;
    titleElement.classList.add("indvTaskTitle");
    frontTaskContainer.appendChild(titleElement);

    containerDescription.appendChild(frontTaskContainer);

    const descriptionText = document.createElement("div");
    descriptionText.classList.add("taskDetails");
    descriptionText.innerHTML = description;
    containerDescription.appendChild(descriptionText);
    
    return containerDescription;
}
export const taskImportance = () => {
    let prjLocation = 0;
    const prjTitle = document.getElementById("panelTitle");
    for (let i = 0; i < myList.length; ++i) {
        if (myList[i].title == prjTitle.textContent) {
             prjLocation = i;
        }
    }
    for (let i = 0; i < myList[prjLocation].task.length; ++i) {
        const importanceBtn = document.getElementById("taskImportance-"+i);
        importanceBtn.addEventListener("click", () => {
            // let taskImportance = myList[prjLocation].task[i].importance;
            const {importance: taskImportance} = myList[prjLocation].task[i];
            if (!(taskImportance)) {
                importanceBtn.innerHTML = '<i class="fa-solid fa-star"></i>';
                myList[prjLocation].task[i].importance = true;
            } else if(taskImportance) {
                importanceBtn.innerHTML = '<i class="fa-regular fa-star"></i>';
                myList[prjLocation].task[i].importance = false;
            } 
        });
    }
}

export const allTasksImportance = () => {
    let tempAllTasks = [];
    let counter = 0;
    for (let i = 0; i < myList.length; i++){
        for (let j = 0; j < myList[i].task.length; ++j) {
            const importanceBtn = document.getElementById("taskImportance-"+j);
            importanceBtn.id = "allTaskImp-"+counter;
            tempAllTasks.push(myList[i].task[j]);
            ++counter;
        }
    }
    for (let i = 0; i < tempAllTasks.length; i++) {
            const importanceBtn = document.getElementById("allTaskImp-"+i);
            importanceBtn.addEventListener("click", () => {
                const {importance: taskImportance} = tempAllTasks[i];
                if (!(taskImportance)) {
                    importanceBtn.innerHTML = '<i class="fa-solid fa-star"></i>';
                    tempAllTasks[i].importance = true;
                } else if(taskImportance) {
                    importanceBtn.innerHTML = '<i class="fa-regular fa-star"></i>';
                    tempAllTasks[i].importance = false;
                } 
            });
        }
    }

export const importantTasksListBtn = () => {
    let tempImportantTasks = [];
    let counter = 0;
    for (let i = 0; i < myList.length; i++){
        for (let j = 0; j < myList[i].task.length; ++j) {
            if (myList[i].task[j].importance) {
                const importanceBtn = document.getElementById("taskImportance-"+j);
                importanceBtn.id = "onlyImpTaskBtn-"+counter;
                tempImportantTasks.push(myList[i].task[j]);
                ++counter;
            }
        }
    }
    for (let i = 0; i < tempImportantTasks.length; i++) {
        const importanceBtn = document.getElementById("onlyImpTaskBtn-"+i);
        importanceBtn.addEventListener("click", () => {
            const {importance: taskImportance} = tempImportantTasks[i];
            if (!(taskImportance)) {
                importanceBtn.innerHTML = '<i class="fa-solid fa-star"></i>';
                tempImportantTasks[i].importance = true;
                displayImportantTasks();
                importantTasksListBtn();
            } else if(taskImportance) {
                importanceBtn.innerHTML = '<i class="fa-regular fa-star"></i>';
                tempImportantTasks[i].importance = false;
                displayImportantTasks();
                importantTasksListBtn();
            } 
        });
    }
}

export const todayTasksListImportanceBtn = () => {
    let tempTodayTasks = [];
    let counter = 0;
    for (let i = 0; i < myList.length; i++){
        for (let j = 0; j < myList[i].task.length; ++j) {
            const date = new Date();
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            let currentDate = `${year}-${month}-${day}`;
            if (myList[i].task[j].date == currentDate) {
                const importanceBtn = document.getElementById("taskImportance-"+j);
                importanceBtn.id = "todayImpTaskBtn-"+counter;
                tempTodayTasks.push(myList[i].task[j]);
                ++counter;
            }
        }
    }
    for (let i = 0; i < tempTodayTasks.length; i++) {
        const importanceBtn = document.getElementById("todayImpTaskBtn-"+i);
        importanceBtn.addEventListener("click", () => {
            const {importance: taskImportance} = tempTodayTasks[i];
            if (!(taskImportance)) {
                importanceBtn.innerHTML = '<i class="fa-solid fa-star"></i>';
                tempTodayTasks[i].importance = true;
                displayTodayTasksList();
                todayTasksListImportanceBtn();
            } else if(taskImportance) {
                importanceBtn.innerHTML = '<i class="fa-regular fa-star"></i>';
                tempTodayTasks[i].importance = false;
                displayTodayTasksList();
                todayTasksListImportanceBtn();
            } 
        });
    }
}

export const weekTasksListImportanceBtn = () => {
    let tempWeekTasks = [];
    let counter = 0;
    for (let i = 0; i < myList.length; i++){
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
                const importanceBtn = document.getElementById("taskImportance-"+j);
                importanceBtn.id = "weekImpTaskBtn-"+counter;
                tempWeekTasks.push(myList[i].task[j]);
                ++counter;
            }
        }
    }
    for (let i = 0; i < tempWeekTasks.length; i++) {
        const importanceBtn = document.getElementById("weekImpTaskBtn-"+i);
        importanceBtn.addEventListener("click", () => {
            const {importance: taskImportance} = tempWeekTasks[i];
            if (!(taskImportance)) {
                importanceBtn.innerHTML = '<i class="fa-solid fa-star"></i>';
                tempWeekTasks[i].importance = true;
                displayWeekTasksList();
                weekTasksListImportanceBtn();
            } else if(taskImportance) {
                importanceBtn.innerHTML = '<i class="fa-regular fa-star"></i>';
                tempWeekTasks[i].importance = false;
                displayWeekTasksList();
                weekTasksListImportanceBtn();
            } 
        });
    }
}