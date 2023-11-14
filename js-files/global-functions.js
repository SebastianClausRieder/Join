// Helpfull Functions

/**
 * @param {ID} inputID // translate the ID when entering element(ID).
 * @returns // return document.getElemetById(ID).
 */
function element(inputID) {
    return document.getElementById(inputID);
}

/**
 * Saves the change on the server.
 */
async function updateTaskData() {
    await loadJSONtoServer();
    await loadJSONfromServer();
}

let formattedDate;
let formattedTime;

/**
 * Stores date in variables.
 */
function writeDate(currentDate) {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();

    formattedDate = `${day}.${month}.${year}`;

    return JSformattetDate = `${year}-${month}-${day}`;
}

/**
 * Stores time in variables.
 */
function writeTime(currentDate) {
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

    formattedTime = hours + ":" + minutes + ":" + seconds;
}

/**
 * Formats the date from the input field into a date that is more understandable for Java Script.
 * @param {Date from Input field} inputDate 
 * @returns // Returns the correct date for Javascript.
 */
function parseInputDate(inputDate) {
    // Split the date after the separator "-"
    const [year, month, day] = inputDate.split("-");

    // Create a new Date object (months in JavaScript are 0-based, hence "month - 1")
    const formattedDate = new Date(year, month - 1, day);

    return formattedDate;
}

/**
 * Checks whether the Name is in JSON and outputs the index position if necessary.
 * @param {string} name ←- Name from Input.
 */
function findUserByName(name) {
    for (let i = 0; i < joinUsers.length; i++) {
        if (joinUsers[i]['userName'] === name) {
            return joinUsers[i];
        }
    }
    return false;
}

/**
 * Checks whether the E-Mail is in JSON and outputs the User Name.
 * @param {string} mail ←- E-Mail from Input.
 */
function findNewContactByMail(mail) {
    for (let i = 0; i < joinUsers.length; i++) {
        if (joinUsers[i]['userMail'] === mail) {
            return joinUsers[i]['userName'];
        }
    }
}

/**
 * Removes the password criteria.
 */
function dNoneCriteria() {    
    const criteriaList = element('criteria-list');
    criteriaList.classList.remove('d-show');

    element('criteria1').classList.remove('color-black');
    element('criteria2').classList.remove('color-black');
    element('criteria3').classList.remove('color-black');
}