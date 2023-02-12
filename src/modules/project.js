

import { updateTaskList } from "./Task/taskList"
import { displayTaskForm, closeTaskForm, submitTaskForm } from "./Forms/TaskForm"
import { displayTaskBtn } from "./Forms/TaskForm"
import { saveListwithTask } from "./storage/LocalStorage"
import { showPrjEditForm } from "./Forms/PrjEditForm"
import { prjTitle } from "./Forms/PrjEditForm"

function projectConstructor (title) {
    this.title = title;
    this.tasks = [];
}
projectConstructor.prototype.deletePrj = function(index) {
    let numIndex = index.replace("project-Title-", "");
    numIndex = Number(numIndex);
    let storedList = JSON.parse(localStorage.getItem("storedListwithTask"));
    storedList.splice(numIndex, 1);
    localStorage.setItem('storedListwithTask', JSON.stringify(storedList));
    myList.splice(numIndex,1);
}
export let myList = [];
window.onload = () => {
    if (localStorage.getItem("storedListwithTask") === null) {
        myList= [];
    } else  {
        let storedList = JSON.parse(localStorage.getItem("storedListwithTask"));
        storedList.forEach((key) => {
          myList.push(key);
        });
        displayProjectList(myList);
    }
}
export function addProjecttoList (newProject) {
    myList.push(newProject);
    saveListwithTask(myList);
}
export function createProject(title) {
    return new projectConstructor(title);
}
export function displayProjectList(storedList) {
     let list = document.querySelector(".project-list");
     list.innerHTML = "";
     for (let i = 0; i < storedList.length; i++) {
        let temp = storedList[i];
        let currentPrj = new projectConstructor(temp.title);

        const prjContainer = document.createElement('div');
        prjContainer.classList.add("prjContainer");
        const prjTitle = document.createElement('div');
        prjTitle.id = "project-Title-"+i;

        const prjEditBtn = document.createElement('div');
        prjEditBtn.classList.add("prjEditBtn");
        prjEditBtn.innerHTML = '<i class="fa-solid fa-ellipsis-vertical"></i>';
        prjEditBtn.addEventListener("click", (event) => {
            showPrjEditForm(prjTitle.id, currentPrj.title);
        });
        prjContainer.appendChild(prjEditBtn);

        prjTitle.classList.add('prjTitle');
        prjTitle.innerHTML = currentPrj.title;
        prjContainer.appendChild(prjTitle);

        const prjTrashBtn = document.createElement('div');
        prjTrashBtn.classList.add("trashBtn");
        prjTrashBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
        prjTrashBtn.addEventListener("click", (event) => {
                currentPrj.deletePrj(prjTitle.id);
                list.innerHTML = "";
                const addTaskBtn = document.querySelector(".task-btn");
                addTaskBtn.style.display = "none";
                const pnlTitle = document.getElementById("panelTitle");
                pnlTitle.innerHTML = "Project \"" + currentPrj.title + "\" has been deleted.";
                displayProjectList(storedList);
        });
        prjContainer.appendChild(prjTrashBtn);

        prjTitle.addEventListener("click", (event) => {
            const pnlTitle = document.getElementById("panelTitle");
            pnlTitle.textContent = prjTitle.innerHTML;
            displayTaskBtn();
            updateTaskList(storedList);
        });
        list.appendChild(prjContainer);
     }
     return list;
}
     displayTaskForm();
     submitTaskForm();
     closeTaskForm();

 