import { addTasktoProject, displayTaskList } from "../Task/taskList";
import { taskImportance } from "../Task/individualTask";
import { myList } from "../project.js"


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
            //taskImportance();
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
