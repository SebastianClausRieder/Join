// Summary

// Task Watch

/**
 * Loads overview of tasks on the board.
 */
function loadWatch() {
    watchTasksOnBoard('all', 'how-many-tasks-on-board');
    watchTasksOnBoard('inprogress', 'how-many-tasks-in-progress');
    watchTasksOnBoard('awaitingfeedback', 'how-many-tasks-awaiting-feedback');
    urgentDeadlines = [];
    watchTasksOnBoard('urgent', 'how-many-urgent-tasks');
    watchTasksOnBoard('todo', 'how-many-tasks-todo');
    watchTasksOnBoard('done', 'how-many-tasks-done');
    greeting();
}

/**
 * Show your Tasks fron Board.
 * @param {object} category Category to be displayed.
 * @param {element} target Container into which the number of tasks is written.
 */
function watchTasksOnBoard(category, target) {
    allTasks = [];
    mostUrgentDeadline = undefined;

    if (category === 'all' || category === 'urgent') {
        for (const mainFolder of Object.keys(joinUsers[userI].userTasks)) {
            sumTasksByCategoryOnSummary(mainFolder,category, target);
        }
    } else {
        const mainFolder = category;
        sumTasksByCategoryOnSummary(mainFolder, category, target);
    }
}

/**
 * Sums up all tasks from the folder in question.
 * @param {folder} mainFolder Folder from which the tasks should be displayed.
 * @param {object} category Category to be displayed.
 * @param {element} target Container into which the number of tasks is written.
 */
function sumTasksByCategoryOnSummary(mainFolder, category, target) {
    const folderTasks = joinUsers[userI]['userTasks'][mainFolder];

    for (const task of folderTasks) {
        if (category !== 'urgent') {
            allTasks.push(task);
        } else if (category === 'urgent') {
            lookForUrgentContacts(task);
        }
    }

    if (category === 'urgent' && mostUrgentDeadline === undefined) {
        element('prio-date').innerText = 'No urgent task';
    }

    writeInContacts(target);
}

// Greeting the User.

/**
 * Starts the user's greeting.
 */
function greeting() {
    writeUserName();
    changeGreeting();
}

/**
 * Write the Name from the User.
 */
function writeUserName() {
    const userName = joinUsers[userI]['userName'];
    element('user-full-name').innerText = userName;
}

/**
 * The greeting changes depending on the time.
 */
function changeGreeting() {
    const currentHour = currentDate.getHours();
    const greeting = element('user-greeting');

    let message = '';

    switch (true) {
        case currentHour >= 6 && currentHour < 10:
            message = 'Good Morning';
            break;
        case currentHour >= 10 && currentHour < 14:
            message = 'Hello';
            break;
        case currentHour >= 14 && currentHour < 18:
            message = 'Good Afternoon';
            break;
        case currentHour >= 18 && currentHour < 22:
            message = 'Good Evening';
            break;
        default:
            message = 'Good Night';
    }

    greeting.innerText = message;
}
