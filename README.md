# join

Offline JSON

Push an new File to -→
joinUsers[userI]['userTasks']['inprogress'][0]["subtask-done"] = [];

Delete Object from JSON -→
delete joinUsers[userI]['object'];


Für Board

async function deleteTask(taskNameKey) {
    delete joinUsers[userI]['userTasks'][taskNameKey];
    delete joinUsers[userI]['alternativeTaskNames'][taskNameKey];

    await loadJSONtoServer();
    await loadJSONfromServer();

    renderTasks();
    closeTaskOptions();
}


async function deleteTask(taskNameKey) {
    delete joinUsers[userI]['userTasks'][taskNameKey];
    delete joinUsers[userI]['alternativeTaskNames'][taskNameKey];

    await loadJSONtoServer();
    await loadJSONfromServer();

    renderTasks();
}

function renderTasks() {
    let boardTasks = element('render-tasks');
    boardTasks.innerHTML = ``;

    Object.keys(joinUsers[userI].userTasks).forEach((TASK, b) => {
        boardTasks.innerHTML += boardTemp(TASK, b);
        loadTasks(TASK, b);
    });
}

function closeTaskOptions() {
    // Hier die Funktion zum Schließen der Task-Optionen implementieren
}