
const STORAGE_TOKEN = 'WRO5TYY2UX69K7XJ6ZOXAHSRIQ40N3QOW56R20R5'; // Token für Gruppenprojekt Join
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

/**
 * Stores the array on the backend server.
 * @param {string} key Identifies our array.
 * @param {Array} value Our array.
 * @returns Returns the fetch.
 */
async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) })
        .then(res => res.json());
}

/**
 * Loads the array from the backend server.
 * @param {string} key Identifies our array.
 * @returns Returns the fetch.
 */
async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        if (res.data) {
            return res.data.value;
        } throw `Could not find data with key "${key}".`;
    });
}

/**
 * Passes our "key" and array to the setItem function.
 */
async function loadJSONtoServer() {
    await setItem('userJSON', JSON.stringify(joinUsers));
}

async function loadTaskJSONtoServer() {
    await setItem('taskJSON', JSON.stringify(taskJSON))
}

/**
 * Passes our "key" to the getItem function.
 */
async function loadJSONfromServer() {
    joinUsers = JSON.parse(await getItem('userJSON'));
}

async function loadTaskJSONfromServer() {
    taskJSON = JSON.parse(await getItem('taskJSON'));
}

// Saves Array Index from User

// Global

let enteredMailIndex;
let userI;

/**
 * Saves enteredMailIndex to local storage.
 */
function saveIndexTo() {
  const indexToText = JSON.stringify(enteredMailIndex);
  localStorage.setItem('index', indexToText);
  
  const indexPosiToText = JSON.stringify(userI);
  localStorage.setItem('indexPosi', indexPosiToText);
}

/**
 * Delete enteredMailIndex and userI from local storage.
 */
function deletIndex() {
  enteredMailIndex;
  userI;
  saveIndexTo();
}

/**
 * Load enteredMailIndex and userI from local storage.
 */
async function loadIndexFrom() {
  const indexToText = localStorage.getItem('index');
  const indexPosiToText = localStorage.getItem('indexPosi');
  if (indexToText != null && indexPosiToText != null) {
    enteredMailIndex = JSON.parse(indexToText);
    userI = JSON.parse(indexPosiToText);
  }
}

// Admin Functions

/**
 * Admin function. Can only be run in Console. Deletes an account by entering the email.
 * @param {string} mail 
 */
async function deletUserACC(mail) {
    for (let i = 0; i < joinUsers.length; i++) {
        if (joinUsers[i]['user-mail'] === mail) {
            joinUsers.splice(i, 1);
            await updateTaskData();
        }
    }
}

/**
 * Admin function. Can only be run in Console. Deletes an account by entering the array Position.
 * @param {zahl} m Array Position.
 */
async function deletUserACCmanuel(m) {
    joinUsers.splice(m, 1);
    await updateTaskData();
}

/**
 * Admin function. Can only be run in Console. Deletes an Task by entering the User Index and Task Index.
 * @param {indexUser} iU 
 * @param {indexTask} iT 
 */
async function deleteTaskbyIndex(iU, iT) {
    joinUsers[iU]['user-tasks'][0]['to-do'].splice(iT, 1);
    await updateTaskData();
}