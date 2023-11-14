// Global init

let currentDate = new Date();


// Functions

/**
 * Executes various functions after loading index-login.html.
 */
async function initLogin() {
    loadLoginDataFrom();
    await loadJSONfromServer();
    loadguestDataFrom();
    deletIndex();
}

/**
 * Executes various functions after loading summary.html.
 */
async function initSummary() {
    await includeHTML();
    await loadJSONfromServer();
    btnDisabled('summary');
    await loadIndexFrom();
    writeDate(currentDate);
    await displayUserImageOrInitials('userButton');
    loadWatch();
}

/**
 * Executes various functions after loading summary.html.
 */
async function initBoard() {
    await includeHTML();
    await loadJSONfromServer();
    btnDisabled('board');
    await loadIndexFrom();
    renderTasks();
    renderAddTask('render-container');
    writeDate(currentDate);
    await displayUserImageOrInitials('userButton');
}

/**
 * Executes various functions after loading add-task.html.
 */
async function initAddTask() {
    await includeHTML();
    await loadJSONfromServer();
    btnDisabled('addTask');
    renderAddTask('container');
    await loadIndexFrom();
    writeDate(currentDate);
    await displayUserImageOrInitials('userButton');
}

/**
 * Executes various functions after loading summary.html.
 */
async function initContacts() {
    await includeHTML();
    await loadJSONfromServer();
    btnDisabled('contacts');
    await loadIndexFrom();
    writeDate(currentDate);
    await displayUserImageOrInitials('userButton');
    loadContacts();
}

/**
 * Executes various functions after loading summary.html.
 */
async function initPrivacyPolicy() {
    await includeHTML();
    await loadJSONfromServer();
    btnDisabled('privacy-policy');
    await loadIndexFrom();
    writeDate(currentDate);
    await displayUserImageOrInitials('userButton');
}

/**
 * Executes various functions after loading summary.html.
 */
async function initLegalNotice() {
    await includeHTML();
    await loadJSONfromServer();
    btnDisabled('legal-notice');
    await loadIndexFrom();
    writeDate(currentDate);
    await displayUserImageOrInitials('userButton');
}

/**
 * Disabled and colors the button of the current page.
 * @param {string} side 
 */
function btnDisabled(side) {
    const elements = ['summary', 'board', 'addTask', 'contacts', 'legal-notice', 'privacy-policy'];
    allEnabled();

    if (elements.includes(side)) {
        element(side).classList.add('disabled', 'bg-darkblue');
    }
}

/**
 * Reset btnDisabled Function
 */
function allEnabled() {
    element('summary').classList.remove('disabled', 'bg-darkblue');
    element('board').classList.remove('disabled', 'bg-darkblue');
    element('addTask').classList.remove('disabled', 'bg-darkblue');
    element('contacts').classList.remove('disabled', 'bg-darkblue');
}