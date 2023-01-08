
import { taskImportance } from "./individualTask";
import {saveListwithTask, closeTaskForm, displayTaskBtn, displayTaskForm, submitTaskForm, updateTaskList} from "./task";

export const Project = {
    title: "",
    task: [],
}
function projectConstructor (title) {
    this.title = title;
    this.task = [];
}
projectConstructor.prototype.deletePrj = function(index) {
    let storedList = JSON.parse(localStorage.getItem("storedListwithTask"));
    storedList.splice(index, 1);
    localStorage.setItem('storedListwithTask', JSON.stringify(storedList));
    myList.splice(index,1);
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
function addProjecttoList (newProject) {
    myList.push(newProject);
    saveListwithTask(myList);
}
function createProject(title) {
    return new projectConstructor(title);
}
const addProjectBtn = document.getElementById("add-project");
export const displayProjectForm = () => {
    addProjectBtn.addEventListener('click', () => {
        openForm();
    });
}
function openForm() {
    let formPage = document.getElementById("projectForm");
    formPage.classList.remove("hide");
}
const submitBtn = document.querySelector('.submitBtn');
export const submitProjectForm = () => {
    submitBtn.addEventListener('click', (event) => {
        let newProject = document.getElementById("projectName");
        event.preventDefault();
                if ((newProject.value !== "")) {
                    let newPrj = createProject(newProject.value);
                    for (let i = 0; i < myList.length; ++i) {
                        if (newPrj.title == myList[i].title) {
                            window.alert("Project title cannot be repeated or be blank.")
                            return;
                        } 
                    }   
                        addProjecttoList(newPrj);
                        displayProjectList(myList);
                        closeForm();
                    
                } 
    });
}
const closeBtn = document.querySelector('.closeBtn');
export const closeProjectForm = () => {
    closeBtn.addEventListener('click', () => {
        closeForm();
    });
}
function closeForm() {
    let formPage = document.querySelector("form");
    formPage.classList.add("hide");
    clearForm();
}
function clearForm() {
    document.forms["formInfo"].reset();
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
        prjTitle.id = i;
        Project.title = currentPrj.title;
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
                taskImportance();
        });
        prjContainer.appendChild(prjTrashBtn);

        prjTitle.addEventListener("click", (event) => {
            const pnlTitle = document.getElementById("panelTitle");
            pnlTitle.textContent = currentPrj.title;
            displayTaskBtn();
            updateTaskList(storedList);
            taskImportance();
        });
        list.appendChild(prjContainer);
     }
     return list;
}
     displayTaskForm();
     submitTaskForm();
     closeTaskForm();

 