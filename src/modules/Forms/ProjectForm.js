import {myList, createProject, addProjecttoList, displayProjectList} from "../project.js";

const addProjectBtn = document.getElementById("add-project");
export const displayProjectForm = () => {
    addProjectBtn.addEventListener('click', () => {
        openForm();
    });
}
export function openForm() {
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