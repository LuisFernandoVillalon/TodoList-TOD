import { displayTaskList, updateTaskList } from "../Task/taskList";
import { myList } from "../project";
import { saveListwithTask } from "../storage/LocalStorage";
import { displayAllTasks } from "../Home/allTasks";
import { displayTodayTasksList } from "../Home/todayTasks";
import { displayWeekTasksList } from "../Home/weekTasks";
import { displayImportantTasks } from "../Home/allImportantTasks";

export function showEditTaskForm (task, prjLocation) {

    const editForm = document.createElement('div');
    editForm.classList.add("edit-task-container");

    const inputLabel = document.createElement("h1");
    inputLabel.innerHTML = "Edit task info:";
    inputLabel.classList.add("inputLabel");
    editForm.appendChild(inputLabel);

    const inputTitleContainer = document.createElement("div");
    inputTitleContainer.classList.add("input-container");
    const titleLabel = document.createElement("p");
    titleLabel.innerHTML = "title:";
    inputTitleContainer.appendChild(titleLabel);
    const inputTitle = document.createElement("input");
    inputTitle.type = "text";
    inputTitle.value = task.taskTitle;
    inputTitleContainer.appendChild(inputTitle);
    editForm.appendChild(inputTitleContainer);

    const inputDescriptionContainer = document.createElement("div");
    inputDescriptionContainer.classList.add("input-container");
    const descriptionLabel = document.createElement("p");
    descriptionLabel.innerHTML = "description:";
    inputDescriptionContainer.appendChild(descriptionLabel);
    const inputDescription = document.createElement("textarea");
    inputDescription.value = task.details;
    inputDescriptionContainer.appendChild(inputDescription)
    editForm.appendChild(inputDescriptionContainer);

    const inputDateContainer = document.createElement("div");
    inputDateContainer.classList.add("input-container");
    const dateLabel = document.createElement("p");
    dateLabel.innerHTML = "date:";
    inputDateContainer.appendChild(dateLabel);
    const inputDate = document.createElement("input");
    inputDate.type = "date"; 
    inputDate.value = task.date;
    inputDateContainer.appendChild(inputDate);
    editForm.appendChild(inputDateContainer);

    const inputTimeContainer = document.createElement("div");
    inputTimeContainer.classList.add("input-container");
    const timeLabel = document.createElement("p");
    timeLabel.innerHTML = "time:"
    inputTimeContainer.appendChild(timeLabel);
    const inputTime = document.createElement("input");
    inputTime.type = "time";
    inputTime.value = task.time;
    inputTimeContainer.appendChild(inputTime);
    editForm.appendChild(inputTimeContainer);

    const flexContainer = document.createElement("div");
    flexContainer.classList.add("button-container")

    const submitEditForm = document.createElement("button");
    submitEditForm.innerHTML = "Submit";
    submitEditForm.classList.add("Btn");
    submitEditForm.addEventListener('click', (event) => {
        task.taskTitle = inputTitle.value;
        task.details = inputDescription.value;
        task.date = inputDate.value;
        task.time = inputTime.value;
        const panelTitle = document.getElementById("panelTitle");
        saveListwithTask(myList);
        console.log(panelTitle.innerHTML)
        if (panelTitle.innerHTML == "<i class=\"fa-solid fa-list-check\"></i> All Tasks") {
            displayAllTasks();
        } else if (panelTitle.innerHTML == "<i class=\"fa-solid fa-calendar-day\"></i> Today's Tasks") {
            displayTodayTasksList();
        } else if(panelTitle.innerHTML == "<i class=\"fa-solid fa-calendar-week\"></i> This week's tasks") {
            displayWeekTasksList();
        } else if (panelTitle.innerHTML == "<i class=\"fa-solid fa-star\"></i> Important Tasks") {
            displayImportantTasks();
        } else {
            updateTaskList(myList);
        }
        editForm.classList.add("hide");
    });
    flexContainer.appendChild(submitEditForm)

    const closeEditForm = document.createElement("button");
    closeEditForm.innerHTML = "Close";
    closeEditForm.classList.add("Btn")
    closeEditForm.addEventListener('click', () => {
        editForm.classList.add("hide");
    });
    flexContainer.appendChild(closeEditForm)

    editForm.appendChild(flexContainer);


    document.body.appendChild(editForm);
}