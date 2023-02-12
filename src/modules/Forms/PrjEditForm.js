import { myList } from "../project";
import { saveListwithTask } from "../storage/LocalStorage";

export let prjTitle = {};

export function showPrjEditForm (index, title) {
    const editForm = document.createElement('div');
    editForm.classList.add("edit-form-container");

    const inputLabel = document.createElement("p");
    inputLabel.innerHTML = "Enter new title for project:";
    inputLabel.classList.add("inputLabel");
    editForm.appendChild(inputLabel);

    const inputTitle = document.createElement("input");
    inputTitle.type = "text";
    inputTitle.classList.add("editPrjInput");
    editForm.appendChild(inputTitle);

    const flexContainer = document.createElement("div");
    flexContainer.classList.add("button-container")

    const submitEditForm = document.createElement("button");
    submitEditForm.innerHTML = "Submit";
    submitEditForm.classList.add("Btn")
    submitEditForm.addEventListener('click', (event) => {
        let prjTitle = document.getElementById(index);
        const panelTitle = document.getElementById("panelTitle")
        event.preventDefault();
        prjTitle.innerHTML = inputTitle.value;
        for (let i = 0; i < myList.length; ++i) {
            if (myList[i].title == title) {
                myList[i].title = inputTitle.value;
                prjTitle = inputTitle.value;
                panelTitle.textContent = "Project \"" + title + "\"  has been changed to \"" + inputTitle.value + "\"";
                saveListwithTask(myList);
            }
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