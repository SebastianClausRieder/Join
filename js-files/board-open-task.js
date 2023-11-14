// Open Task

// Functions

/**
 * Opens the clicked task.
 * @param {index} b Index number of the tasks folder.
 * @param {index} t Index number of created tasks.
 */
function openTask(b, t) {
    const TASK = Object.keys(joinUsers[userI].userTasks)[b];
    const clickedTask = joinUsers[userI]['userTasks'][TASK][t];
    const openTask = element('open-task');
    const date = new Date(clickedTask['due-date']);

    writeDate(date);

    openTask.classList.add('d-show');
    openTask.innerHTML = openTaskTemp(clickedTask, b, t);
    
    takeCategoryColor(clickedTask, b, t, 'openTask');
    findSubtasks(clickedTask, b, t);

    element('prio-text').innerText = extractedWord(clickedTask['priority']);
    openTaskAssign(clickedTask);
}

/**
 * Renders the clicked task.
 * @param {string} clickedTask Folder with the data of the task.
 * @param {index} b Index number of the tasks folder.
 * @param {index} t Index number of created tasks.
 * @returns Returns the HTML construct.
 */
function openTaskTemp(clickedTask, b, t) {
    return /*html */ `
        <div class="open-task-main-contain d-flex-center" onclick="event.stopPropagation()">
            <div class="open-task-inside d-flex-start-column">
                <div class="parting-container d-flex-start-column">
                    <div id="open-task-category-frame"class="task-category-frame d-flex-center">
                        <span class="task-category-text font-inter">${clickedTask['category']}</span>
                    </div>
                    <h2 class="open-task-title">${clickedTask['title']}</h2>
                    <p class="open-task-description font-inter">${clickedTask['description']}</p>
                    <div class="open-task-contain d-flex-start-column">
                        <span class="open-task-subtitle font-inter">Subtasks: </span>
                        <div id="open-task-subtasks" class="open-task-subtasks d-flex-start-column"></div>
                    </div>
                </div>
                <div class="parting-container d-flex-start-column">
                    <div class="open-task-contain d-flex-start-center">
                        <span class="font-inter">Due date: </span>
                        <span class="due-date-text font-inter">${formattedDate}</span>
                    </div>
                    <div class="open-task-contain d-flex-start-center">
                        <span class="font-inter">Priority: </span>
                        <div class="prio-contain d-flex-center">
                            <span id="prio-text" class="prio-text font-inter"></span>
                            <img src="${clickedTask['priority']}" class="board-task-prio-img">
                        </div>
                    </div>
                    <div class="open-task-contain d-flex-start-column">
                        <span class="open-task-subtitle font-inter">Assigned To: </span>
                        <div id="open-task-assign" class="open-task-assign d-flex-start-column"></div>
                    </div>
                </div>
            </div>
            <div onclick="closeTask()" class="closeTask-contain d-flex-center">
                <img src="img/icon/x-mark-blue.png" alt="X-Mark" class="closeTask-icon">
            </div>
            <div class="open-task-btn-contain d-flex-center">
                <div class="open-task-delete-btn d-flex-center" onclick="deleteOpenTask(${b}, ${t})">
                    <img src="img/icon/delete.png" class="open-task-btn-img">
                    <img src="img/icon/delete-blue.png" class="open-task-btn-img-blue">
                </div>
                <div class="open-task-edit-btn d-flex-center" onclick="editOpenTask(${b}, ${t})">
                    <img src="img/icon/edit.png" class="open-task-btn-img">
                </div>
            </div>
        </div>
    `;
}

/**
 * Renders all subtasks.
 * @param {string} clickedTask Folder with the data of the task.
 * @param {index} b Index number of the tasks folder.
 * @param {index} t Index number of created tasks.
 */
function findSubtasks(clickedTask, b, t) {
    const mySubtasks = clickedTask['subtask-list'];
    const openTaskSubtasks = element('open-task-subtasks');

    for (let s = 0; s < mySubtasks.length; s++) {
        const subtask = mySubtasks[s];

        openTaskSubtasks.innerHTML += /*html */ `
            <div class="loaded-subtask-contain d-flex-start-center">
                <div onclick="subtaskReady(${s}, ${b}, ${t})" id="subtaskReady-checkbox${s}" class="checkbox d-flex-center">
                    <img src="" id="subtaskReady-checkmark${s}" class="checkmark">
                </div>
                <span class="loaded-subtask-name font-inter">${subtask}</span>
            </div>
        `;

        checkDone(s, b, t);
    }
}

/**
 * Checks whether the subtask has already been completed.
 * @param {index} s Index number of the subtask list.
 * @param {index} b Index number of the tasks folder.
 * @param {index} t Index number of created tasks.
 */
function checkDone(s, b, t) {
    const TASK = Object.keys(joinUsers[userI].userTasks)[b];
    const checkdSubtask = joinUsers[userI].userTasks[TASK][t]['subtask-checkd'][s];
    const checkmark = element(`subtaskReady-checkmark${s}`);

    if (checkdSubtask === 'check') {
        checkmark.src = `img/icon/check-mark.png`;
    }
}

/**
 * Saves whether the subtask is done and ticks or unchecks accordingly.
 * @param {index} s Index number of the subtask list.
 * @param {index} b Index number of the tasks folder.
 * @param {index} t Index number of created tasks.
 */
async function subtaskReady(s, b, t) {
    const taskType = Object.keys(joinUsers[userI].userTasks)[b];
    const clickedTask = joinUsers[userI]['userTasks'][taskType][t];
    const readySubtask = joinUsers[userI]['userTasks'][taskType][t]['ready-subtask'][s];

    if (!readySubtask) {
        completeSubtask(s, clickedTask);
    } else {
        uncompleteSubtask(s, clickedTask);
    }

    await updateTaskData();
    await renderTasks();
}

/**
 * Ticks when the subtask is done.
 * @param {index} s Index number of the subtask list.
 * @param {object} clickedTask Created task. 
 */
function completeSubtask(s, clickedTask) {
    clickedTask['ready-subtask'][s] = true;
    updateSubtaskUI(s, 'check-mark.png');
    clickedTask['subtask-done'].push('done');
    clickedTask['subtask-checkd'][s] = 'check';
}

/**
 * Takes the set hook if the subtask is not finished after all.
 * @param {index} s Index number of the subtask list.
 * @param {object} clickedTask Created task. 
 */
function uncompleteSubtask(s, clickedTask) {
    clickedTask['ready-subtask'][s] = false;
    updateSubtaskUI(s, '');
    clickedTask['subtask-done'].splice(0, 1);
    clickedTask['subtask-checkd'][s] = 'not checkd';
}

/**
 * Updates the subtask's checkbox.
 * @param {index} s Index number of the subtask list.
 * @param {object} clickedTask Created task. 
 */
function updateSubtaskUI(s, checkmarkImage) {
    element(`subtaskReady-checkmark${s}`).src = `img/icon/${checkmarkImage}`;
}

/**
 * Extracts the color name from the image.
 * @param {object} img colored circle.
 * @returns Returns the name of the color.
 */
function extractedWord(img) {
    const imagePath = img;
    const imageName = imagePath.split('/').slice(-1)[0].split('-')[1].split('.')[0];
    return imageName;
}

/**
 * Creates a list of people working on this "task".
 * @param {object} clickedTask Created task. 
 */
function openTaskAssign(clickedTask) {
    const taskAssigns = clickedTask['assigned-user'];
    const taskAssignContain = element('open-task-assign');
    taskAssignContain.innerHTML = '';

    taskAssigns.forEach(taskAssign => {
        const contactInfos = findUserByName(taskAssign);
        const initials = extractedInitials(contactInfos['userName']);
        const taskAssignColor = contactInfos['userColor'];

        const assignContact = /*html */ `
            <div class="open-task-contain-assign d-flex-start-center">
                <div class="board-task-assign-contact d-flex-center" style="background-color: ${taskAssignColor};"><span class="assign-contact-font font-inter">${initials}</span></div>
                <span class="prio-text font-inter">${taskAssign}</span>
            </div>
        `;

        taskAssignContain.insertAdjacentHTML('beforeend', assignContact);
    });
}

/**
 * Closes the open task.
 */
function closeTask() {
    element('open-task').classList.remove('d-show');
}

// Delete Tasks

/**
 * Deletes the open task.
 * @param {index} b Index number of the tasks folder.
 * @param {index} t Index number of created tasks.
 */
async function deleteOpenTask(b, t) {
    let TASK = Object.keys(joinUsers[userI].userTasks)[b];
    joinUsers[userI]['userTasks'][TASK].splice(t, 1);
    element('open-task').classList.remove('d-show');

    await updateTaskData();
    await renderTasks();
}

// Edit Task

/**
 * Opens the Task Editor and already fills in the fields accordingly.
 * @param {index} b Index number of the tasks folder.
 * @param {index} t Index number of created tasks.
 */
function editOpenTask(b, t) {
    let TASK = Object.keys(joinUsers[userI].userTasks)[b];
    openTaskContent = joinUsers[userI]['userTasks'][TASK][t];

    boardAddTask();
    changeAddTask(TASK, t);
    fillInputFields(openTaskContent);
    editAddTaskTo(TASK);
    loadAddEventListener();
}

/**
 * Changes the "addTaskTemp.js" to Edit.
 * @param {Object} TASK Current task folder.
 * @param {index} t Index number of created tasks.
 */
function changeAddTask(TASK, t) {
    element('add-task-title').innerText = 'Edit Task';
    renderFinishBTN(`editTask('${TASK}', ${t})`, 'Edit Task ');
    renderCloseBTN('closeEditTask()');
}

/**
 * Fills in the data of the task in the corresponding fields.
 * @param {Object} openTaskContent Data of the current task.
 */
function fillInputFields(openTaskContent) {
    element('title-input').value = openTaskContent['title'];
    element('description-input').value = openTaskContent['description'];
    fillCategory(openTaskContent);
    fillAssignUser(openTaskContent);
    fillDueDate(openTaskContent);
    fillPriority(openTaskContent);
    fillSubtasks(openTaskContent);
}

/**
 * Fill in the category field.
 * @param {Object} openTaskContent Data of the current task.
 */
function fillCategory(openTaskContent) {
    const taskCategoryName = openTaskContent['category'];
    const taskCategoryColor = openTaskContent['category-color'];
    selectCategory(taskCategoryName, taskCategoryColor);
}

/**
 * Fill in the assign field.
 * @param {Object} openTaskContent Data of the current task.
 */
function fillAssignUser(openTaskContent) {
    assignContacts = openTaskContent['assigned-user'];
    showAssign();
}

/**
 * Fill in the date field.
 * @param {Object} openTaskContent Data of the current task.
 */
function fillDueDate(openTaskContent) {
    const originalDate = openTaskContent['due-date'];

    const dateObject = new Date(originalDate);

    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const day = String(dateObject.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;

    element("due-date-input").value = formattedDate;
}

/**
 * Marks the selected priority button.
 * @param {Object} openTaskContent Data of the current task.
 */
function fillPriority(openTaskContent) {
    const prio = extractedWord(openTaskContent['priority']);
    setPrioTo(prio);
}

/**
 * Fill in the subtask field.
 * @param {Object} openTaskContent Data of the current task.
 */
function fillSubtasks(openTaskContent) {
    subtasksArray = openTaskContent['subtask-list'];
    renderSubtask();
}

/**
 * Edits the open task.
 * @param {Object} TASK Current task folder.
 * @param {index} t Index number of created tasks.
 */
function editTask(TASK, t) {
    joinUsers[userI]['userTasks'][TASK].splice(t, 1);
    createNewTask();    
}