// JS Board

// Functions

/**
 * Creates your tasks on your board.
 */
async function renderTasks() {
    const boardTasks = element('render-tasks');
    boardTasks.innerHTML = '';

    const taskKeys = Object.keys(joinUsers[userI].userTasks);

    for (let b = 0; b < taskKeys.length; b++) {
        const mainFolder = taskKeys[b];

        boardTasks.innerHTML += boardTemp(mainFolder, b);
        await loadTasks(mainFolder, b);
    }
}

/**
 * Creates the task folder.
 * @param {object} mainFolder Current task folder.
 * @param {index} b Index number of the tasks folder.
 * @returns 
 */
function boardTemp(mainFolder, b) {
    let boardTaskName = joinUsers[userI].alternativeTaskNames[mainFolder];
    return /*html */ `
        <div class="task-main d-flex-start-column" ondrop="moveTaskTo('${mainFolder}')" ontouchstart="moveTouchTask('${mainFolder}')" ondragover="allowDrop(event, ${b})">
            <div class="task-title-contain d-flex-center">
                <span class="font-inter">${boardTaskName}</span>
                <div class="task-add d-flex-center" onclick="boardAddTaskTo('${mainFolder}')">
                    <img src="img/icon/plus-task.png" class="task-add-img">
                    <img src="img/icon/plus-task-blue.png" class="task-add-img-blue">
                </div>
            </div>
            <div id="board-task-contain${b}" class="board-task-contain1 d-flex-center-column">
                <div class="board-task-empty d-flex-center font-inter">
                    <h5>No Task<br>${boardTaskName}</h5>
                </div>
            </div>
            <div id="drop-area${b}" class="drop-area"></div>
        </div>
    `;
}

/**
 * Loads the tasks from the task folder.
 * @param {object} mainFolder Current task folder.
 * @param {index} b Index number of the tasks folder.
 */
async function loadTasks(mainFolder, b) {
    const loadedTasks = joinUsers[userI]['userTasks'][mainFolder];
    const boardTask = element(`board-task-contain${b}`);
    
    if ( loadedTasks.length ) { boardTask.innerHTML = ``; }

    for (let t = 0; t < loadedTasks.length; t++) {
        const loadedTask = loadedTasks[t];

        boardTask.innerHTML += taskTemp(loadedTask, mainFolder, b, t);
        takeCategoryColor(loadedTask, b, t, 'board');
        subtaskDone(loadedTask, mainFolder, b, t);
        loadAssigns(mainFolder, b, t);
        boardSetPrioTo(mainFolder, b, t);
    }
}

/**
 * Creates the task.
 * @param {array} loadedTask Array with the tasks from the task folder.
 * @param {object} mainFolder Current task folder.
 * @param {index} b Index number of the tasks folder.
 * @param {index} t Index number of created tasks.
 * @returns 
 */
function taskTemp(loadedTask, mainFolder, b, t) {
    return /*html */ `
        <div    id="dragged-task-${b}-${t}"
                class="board-task-contain2 d-flex-center"
                onclick="openTask(${b}, ${t})"
                draggable="true"
                ondragstart="dragTask(${b}, ${t})"
                ontouchstart="startDragTimer(event, ${b}, ${t})"
                ontouchend="clearTouchDrag(${b}, ${t})">
            <div class="board-task-contain3 d-flex-start-column">
                <div id="task-category-frame${b}${t}" class="task-category-frame d-flex-center">
                    <span class="task-category-text font-inter">${loadedTask['category']}</span>
                </div>
                <span class="task-title-text font-inter">${loadedTask['title']}</span>
                <p class="task-description font-inter">${loadedTask['description']}</p>
                <div class="in-progress-contain d-flex-start-center">
                    <div class="progress-bar">
                        <div id="progress${b}${t}" class="progress"></div>
                    </div>
                    <span id="progress-ratio${b}${t}" class="progress-ratio font-inter"></span>
                </div>
                <div class="assign-and-prio d-flex-center" onclick="event.stopPropagation()">
                    <div id="board-task-assign${b}${t}" class="board-task-assign d-flex-start-center"></div>
                    <div class="board-task-prio d-flex-center">
                        <img id="board-task-prio-img${b}${t}" class="board-task-prio-img">
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Get Category Color

/**
 * Gives the correct color to the category.
 * @param {array} loadedTask Array with the tasks from the task folder.
 * @param {index} b Index number of the tasks folder.
 * @param {index} t Index number of created tasks.
 * @param {ID} frame Requested by.
 */
function takeCategoryColor(loadedTask, b, t, frame) {
    let categoryColor = loadedTask['category-color'];
    getCategoryColor(categoryColor, b, t, frame);
}

/**
 * Extracts the color name.
 * @param {object} categoryColor Color of the category.
 * @param {index} b Index number of the tasks folder.
 * @param {index} t Index number of created tasks.
 * @param {ID} frame Requested by.
 */
function getCategoryColor(categoryColor, b, t, frame) {
    let link = categoryColor;
    let start = link.lastIndexOf("/") + 1;
    let end = link.lastIndexOf(".");
    let extracted = link.substring(start, end);

    determineExtractedColor(extracted, b, t, frame);
}

/**
 * Converts the color name to the correct color and passes this on to the element.
 * @param {object} extracted Extracted color name.
 * @param {index} b Index number of the tasks folder.
 * @param {index} t Index number of created tasks.
 * @param {ID} frame Requested by.
 */
function determineExtractedColor(extracted, b, t, frame) {
    const colorMap = {
        'circle-blue': '--category-blue',
        'circle-green': '--category-green',
        'circle-pink': '--category-pink',
        'circle-red': '--category-red',
        'circle-turquoise': '--category-turquoise',
        'circle-yellow': '--category-yellow'
    };

    const extractedCategoryColor = frame === 'board'
        ? element(`task-category-frame${b}${t}`)
        : element('open-task-category-frame');

    if (colorMap.hasOwnProperty(extracted)) {
        extractedCategoryColor.style.backgroundColor = `var(${colorMap[extracted]})`;
    }
}

// Check Subtasks Done

/**
 * Determines how many subtasks are already "Done" and displays this in the form of a line and numbers.
 * @param {array} loadedTask Array with the tasks from the task folder.
 * @param {object} mainFolder Current task folder.
 * @param {index} b Index number of the tasks folder.
 * @param {index} t Index number of created tasks.
 * @return End the function here.
 */
function subtaskDone(loadedTask, mainFolder, b, t) {
    const subtasks = joinUsers[userI]?.userTasks?.[mainFolder]?.[t];
    if (!subtasks) return;

    const subtaskLength = subtasks['subtask-list'].length;
    const doneSubtasks = subtasks['subtask-done'] ? subtasks['subtask-done'].length : 0;

    const arrayLengthInPercent = (doneSubtasks / subtaskLength) * 100;

    element(`progress-ratio${b}${t}`).innerHTML = `${doneSubtasks} / ${subtaskLength} Done`;
    element(`progress${b}${t}`).style = `width: ${arrayLengthInPercent}%`;
}

// Load Assigns

/**
 * Loads the people working on this task.
 * @param {object} mainFolder Current task folder.
 * @param {index} b Index number of the tasks folder.
 * @param {index} t Index number of created tasks.
 * @return End the function here.
 */
function loadAssigns(mainFolder, b, t) {
    const taskAssigns = joinUsers[userI]?.userTasks?.[mainFolder]?.[t]?.['assigned-user'];
    if (!taskAssigns) return;
    userContacts = [];

    taskAssigns.forEach((cMail) => {
        findContactByMail(cMail);
    });

    const taskAssignContain = element(`board-task-assign${b}${t}`);
    taskAssignContain.innerHTML = '';

    userContacts.forEach(taskAssign => {
        const contactInfos = findUserByName(taskAssign);
        if (!contactInfos) return;

        const { userName, userColor } = contactInfos;
        const initials = extractedInitials(userName);

        taskAssignContain.innerHTML += /*html*/ `
            <div class="board-task-assign-contact d-flex-center" style="background-color: ${userColor};"><span class="assign-contact-font font-inter">${initials}</span></div>
        `;
    });
}

// Set Prio to

/**
 * Specifies the priority this task has.
 * @param {object} mainFolder Current task folder.
 * @param {index} b Index number of the tasks folder.
 * @param {index} t Index number of created tasks.
 */
function boardSetPrioTo(mainFolder, b, t) {
    let taskPrio = joinUsers[userI]['userTasks'][mainFolder][t]['priority'];
    let taskPrioIMG = element(`board-task-prio-img${b}${t}`);
    taskPrioIMG.src = `${taskPrio}`;
}

// Open Add Task

/**
 * Opens Add Task on the board by click on the Add task + button.
 */
function boardAddTask() {
    element('board-add-task').classList.add('scale');
    renderCloseBTN('closeAddTask()');
    loadAddEventListener();
}

/**
 * Closes Edit Task.
 */
function closeEditTask() {
    element('board-add-task').classList.remove('scale');
    element('add-task-title').innerText = 'Add Task';
    renderFinishBTN('createNewTask()', 'Create Task ');
    clearAddTask();
}

/**
 * Closes AddTask.
 */
function closeAddTask() {
    element('board-add-task').classList.remove('scale');
    clearAddTask();
}

/**
 * Opens Add Task on the board by click on the + button from task folder.
 * @param {object} mainFolder Current task folder.
 */
function boardAddTaskTo(mainFolder) {
    element('board-add-task').classList.add('scale');
    element('selector-add-to-task-input').classList.add('d-none');
    element('selector-add-to-task-select-contain').classList.add('d-none');
    renderCloseBTN('closeAddTask()');
    loadAddEventListener();

    addTaskTo = mainFolder;
    const showedName = joinUsers[userI].alternativeTaskNames[mainFolder];

    let taskSelected = element('selector-add-to-task-selected');
    taskSelected.classList.add('d-show');
    taskSelected.innerHTML = `<span class="add-to-task-name font-inter">${showedName}</span>`;
}

/**
 * Opens Edit Task on the board by click on the Edit button on open task.
 * @param {object} mainFolder Current task folder.
 */
function editAddTaskTo(mainFolder) {
    element('board-add-task').classList.add('scale');
    element('selector-add-to-task-input').classList.add('d-none');
    element('selector-add-to-task-select-contain').classList.add('d-none');

    addTaskTo = mainFolder;
    const showedName = joinUsers[userI].alternativeTaskNames[mainFolder];

    let taskSelected = element('selector-add-to-task-selected');
    taskSelected.classList.add('d-show');
    taskSelected.innerHTML = `<span class="add-to-task-name font-inter">${showedName}</span>`;
}

// Search Task

// Globals

let searchArray = [];

// Functions

/**
 * Search function for the board.
 */
function searchTask() {
    let searchInput = element('search-task').value.toLowerCase();

    if (searchInput !== '') {
        for (let t = 0; t < Object.keys(joinUsers[userI].userTasks).length; t++) {
            const mainFolder = Object.keys(joinUsers[userI].userTasks)[t];

            for (let i = 0; i < joinUsers[userI]['userTasks'][mainFolder].length; i++) {
                const inTask = joinUsers[userI]['userTasks'][mainFolder][i];

                searchByInput(searchInput, inTask, t, i);
            }
        }
        renderSearchedTasks();
    } else {
        renderTasks();
    }
}

/**
 * Searches all tasks and content after entering it in the search field.
 * @param {object} searchInput Search field content.
 * @param {object} inTask Tasks from the Tasks folder.
 * @param {index} t Index number of created tasks.
 * @param {index} i Index number of tasks.
 */
function searchByInput(searchInput, inTask, t, i) {
    if ([inTask.title, inTask.priority, inTask.description, inTask.category].some(item => item.toLowerCase().includes(searchInput)) || searchForAssign(inTask, searchInput)) {
        addTaskToSearchArray(t, i);
    } else {
        removeTaskFromSearchArray(t, i);
    }
}

/**
 * Searches for people contributing to a task.
 * @param {object} inTask Tasks from the Tasks folder.
 * @param {object} searchInput Search field content.
 * @returns Returns true.
 */
function searchForAssign(inTask, searchInput) {
    for (let a = 0; a < inTask['assigned-user'].length; a++) {
        const assignedUser = inTask['assigned-user'][a];
        if (assignedUser.toLowerCase().includes(searchInput)) {
            return true;
        }
    }
}

/**
 * Adds matching tasks to the searchArray.
 * @param {index} t Index number of created tasks.
 * @param {index} i Index number of tasks.
 */
function addTaskToSearchArray(t, i) {
    let searchIndex = `${t}, ${i}`;
    if (getSearchIndex(searchIndex) == -1) searchArray.push(searchIndex);
}

/**
 * Deletes unmatched tasks from the "searchArray".
 * @param {index} t Index number of created tasks.
 * @param {index} i Index number of tasks.
 */
function removeTaskFromSearchArray(t, i) {
    let searchIndex = `${t}, ${i}`;
    let arrayIndex = getSearchIndex(searchIndex);
    if (arrayIndex >= 0) {
        searchArray.splice(arrayIndex, 1);
    }
}

/**
 * Checks whether a task already exists in the "searchArray".
 * @param {object} searchIndex Task.
 * @returns Return the result.
 */
function getSearchIndex(searchIndex) {
    return searchArray.indexOf(searchIndex);
}

/**
 * Rendering Task folrders.
 */
async function renderSearchedTasks() {
    let boardTasks = element('render-tasks');
    boardTasks.innerHTML = ``;

    for (let b = 0; b < Object.keys(joinUsers[userI].userTasks).length; b++) {
        const mainFolder = Object.keys(joinUsers[userI].userTasks)[b];

        boardTasks.innerHTML += boardTemp(mainFolder, b);
    }

    renderSearchResult();
}

/**
 * Splits the Index IDs from the "searchArray".
 */
async function renderSearchResult() {
    for (let sa = 0; sa < searchArray.length; sa++) {
        const taskIndex = searchArray[sa];
        let indexArray = taskIndex.split(',');

        let t = parseInt(indexArray[0]);
        let i = parseInt(indexArray[1]);

        let mainFolder = Object.keys(joinUsers[userI].userTasks)[t];
        await loadSearchResult(mainFolder, t, i);
    }
}

/**
 * Renders all tasks from the "searchArray".
 * @param {object} mainFolder Current task folder.
 * @param {index} t Index number of created tasks.
 * @param {index} i Index number of tasks.
 */
async function loadSearchResult(mainFolder, t, i) {
    const searchTask = joinUsers[userI]['userTasks'][mainFolder][i];

    let boardTask = element(`board-task-contain${t}`);
    boardTask.innerHTML = ``;

    boardTask.innerHTML += taskTemp(searchTask, mainFolder, t, i);
    takeCategoryColor(searchTask, t, i, 'board');
    subtaskDone(searchTask, mainFolder, t, i);
    loadAssigns(mainFolder, t, i);
    boardSetPrioTo(mainFolder, t, i);
}

// Drag and Drop

// Globals

let fromMainFolder;
let draggedTask;
let draggedTaskIndex;

// Funktions

/**
 * Start drag.
 * @param {index} b Index number of the tasks folder.
 * @param {index} t Index number of created tasks.
 */
function dragTask(b, t) {
    fromMainFolder = Object.keys(joinUsers[userI].userTasks)[b];
    draggedTask = joinUsers[userI]['userTasks'][fromMainFolder][t];
    draggedTaskIndex = t;

    element(`dragged-task-${b}-${t}`).classList.add('rotate');
    createPossibleDropLevels(b);
}

/**
 * Shows possible fields in which the task can be dropped.
 * @param {event} ev 
 * @param {index} b Index number of the tasks folder.
 */
function allowDrop(ev, b) {
    ev.preventDefault();

    let droppableArea = element(`drop-area${b}`);

    droppableArea.addEventListener('dragover', (event) => {
        event.preventDefault();
        droppableArea.classList.add('bg-dark-blue');
    });

    droppableArea.addEventListener('dragleave', (event) => {
        event.preventDefault();
        droppableArea.classList.remove('bg-dark-blue');
    });
}

/**
 * Drops the task in the appropriate folder.
 * @param {object} mainFolder 
 */
async function moveTaskTo(mainFolder) {
    joinUsers[userI]['userTasks'][mainFolder].push(draggedTask);
    joinUsers[userI]['userTasks'][fromMainFolder].splice(draggedTaskIndex, 1);
    await updateTaskData();
    deletePossibleDropLevels();
    await renderTasks();
}

/**
 * Creates possible drop fields in the respective folders.
 * @param {index} b Index number of the tasks folder.
 */
function createPossibleDropLevels(b) {
    for (let b = 0; b < Object.keys(joinUsers[userI].userTasks).length; b++) {

        element(`drop-area${b}`).classList.add('d-show');
    }
    element(`drop-area${b}`).classList.remove('d-show');
}

/**
 * Deletes possible drop fields in the respective folders after the drop.
 */
function deletePossibleDropLevels() {
    for (let b = 0; b < Object.keys(joinUsers[userI].userTasks).length; b++) {
        element(`drop-area${b}`).classList.remove('d-show');
    }
}

/* Touch to Touch */

let touchDragging = false;

/**
 * Starts moving the element after a long touch.
 * @param {event} event 
 * @param {index} b Index number of the tasks folder.
 * @param {index} t Index number of created tasks.
 */
function startTouchDrag(event, b, t) {
    event.preventDefault();
    touchDragging = true;

    fromMainFolder = Object.keys(joinUsers[userI].userTasks)[b];
    draggedTask = joinUsers[userI]['userTasks'][fromMainFolder][t];
    draggedTaskIndex = t;

    element(`dragged-task-${b}-${t}`).classList.add('rotate');
    createPossibleDropLevels(b);
}

/**
 * Inserts the previously selected element into the typed area.
 * @param {object} mainFolder 
 */
async function moveTouchTask(mainFolder) {
    if (touchDragging) {
        joinUsers[userI]['userTasks'][mainFolder].push(draggedTask);
        joinUsers[userI]['userTasks'][fromMainFolder].splice(draggedTaskIndex, 1);
        touchDragging = false;
        dragIsStartet = false;
        await new Promise((resolve) => setTimeout(resolve, 500));
        await updateTaskData();
        deletePossibleDropLevels();
        await renderTasks();
    }
}

/**
 * Cancels the move process.
 * @param {index} b Index number of the tasks folder.
 * @param {index} t Index number of created tasks.
 */
async function clearTouchDrag(b, t) {
    if (!dragIsStartet) {
        touchDragging = false;
        clearDragTimer();
        await renderTasks();
        openTask(b, t);
    }
}

/* Drag Timer */

let dragTimer;
let dragIsStartet = false;

/**
 * Starts the “drag timer”.
 * @param {event} event 
 * @param {index} b Index number of the tasks folder.
 * @param {index} t Index number of created tasks.
 */
function startDragTimer(event, b, t) {
    dragTimer = setTimeout(function() {
        dragIsStartet = true;
        startTouchDrag(event, b, t);
    }, 500);
}

/**
 * Clears the “drag timer”.
 */
function clearDragTimer() {
    if (dragTimer) {
        clearTimeout(dragTimer);
    }
}