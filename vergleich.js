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