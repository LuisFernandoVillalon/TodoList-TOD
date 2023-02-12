
import { myList} from "../project";
import { displayTaskList } from "./taskList";
import { saveListwithTask } from "../storage/LocalStorage"
import { displayAllTasks } from "../Home/allTasks";
import { displayImportantTasks } from "../Home/allImportantTasks";
import { displayTodayTasksList } from "../Home/todayTasks";
import { displayWeekTasksList } from "../Home/weekTasks";
import { showEditTaskForm } from "../Forms/TaskEditForm";


//populate individual tasks with eventlisteners and appropriate date to display

export function displayEndofTask(date, time, id, prjLocation, importance) {
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
    importanceElement.addEventListener("click", () => {
        console.log(myList[prjLocation].tasks)
        if (!(importance)) {
            importanceElement.innerHTML = '<i class="fa-solid fa-star"></i>';
            importance = true;
            myList[prjLocation].tasks[id].task.importance = true;
            saveListwithTask(myList);
        } else {
            importanceElement.innerHTML = '<i class="fa-regular fa-star"></i>';
            importance = false;
            myList[prjLocation].tasks[id].task.importance = false;
            saveListwithTask(myList);
        }
    })
    dataContainer.appendChild(importanceElement);

    return dataContainer;
}
export function displayFrontofTask(title, description, id,  prjLocation, status, wholeTask) {
    const containerDescription= document.createElement("div");
    containerDescription.classList.add("containerDescription");

    const frontTaskContainer = document.createElement("div");
    frontTaskContainer.classList.add("frontTaskContainer");

    const editBtn = document.createElement("div");
    editBtn.innerHTML = '<i class="fa-solid fa-ellipsis-vertical"></i>';
    editBtn.classList.add("taskEditBtn")
    editBtn.addEventListener("click", () => {
        showEditTaskForm(wholeTask, prjLocation);
    })

    frontTaskContainer.appendChild(editBtn)


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
            myList[prjLocation].tasks[id].task.status = true;
            saveListwithTask( myList);
        } else {
            checkBtn.innerHTML= '<i class="fa-solid fa-rotate"></i>';
            status = false;
            myList[prjLocation].tasks[id].task.status = false;
            saveListwithTask( myList);
        }
        const prjTitle = document.getElementById("panelTitle");
            if (prjTitle.innerHTML == '<i class="fa-solid fa-list-check"></i>'+" All Tasks") {
                displayAllTasks();
            } else if (prjTitle.innerHTML == '<i class="fa-solid fa-star"></i>'+" Important Tasks") {
                displayImportantTasks();
            } else if (prjTitle.innerHTML == '<i class="fa-solid fa-calendar-day"></i>'+" Today's Tasks") {
                displayTodayTasksList();
             } else if (prjTitle.innerHTML == '<i class="fa-solid fa-calendar-week"></i>'+" This week's tasks") {
                displayWeekTasksList();
             } else {
                displayTaskList(prjLocation);
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
