// JS Contacts

// Globals

let myContatcsArray = [];

// Funktions

/**
 * Loads the user's contacts.
 */
function loadContacts() {
    const userContacts = joinUsers[userI]['userContacts']['contactName'];
    
    if (userContacts && userContacts.length > 0) {
        const sortedContacts = userContacts.sort();
        myContatcsArray = groupContactsByInitial(sortedContacts);

        if (element('my-contacts')) {
            writeContactList();
        }

        if (element('drop-down-menu-assign-to')) {
            openDropDownAssignTo();
        }
    }
}

/**
 * Function to group contacts by first letter.
 * @param {array} sortetContacts
 * @returns // Cataloged, Alphabetically Sorted Arrays.
 */
function groupContactsByInitial(sortetContacts) {
    let groupedContacts = {};

    for (let contact of sortetContacts) {
        let initial = contact[0].toUpperCase(); // First letter of the name in upper case.

        if (!(initial in groupedContacts)) {
            groupedContacts[initial] = [];
        }

        groupedContacts[initial].push(contact);
    }

    return groupedContacts;
}

/**
 * Creates the alphabetically sorted contact list.
 */
function writeContactList() {
    const contactContain = element('my-contacts');
    contactContain.innerHTML = '';

    Object.keys(myContatcsArray).forEach(file => {
        contactContain.innerHTML += /*html */ `
            <div id="file${file}" class="file d-flex-start-center">
                <span class="font-inter">${file}</span>
            </div>
        `;

        writeContacts(file, contactContain);
    });
}

/**
 * Write the corresponding contacts for each letter.
 * @param {object} file Contains the names of a letter from the alphabet.
 * @param {element} contactContain Div container in which the contact list is loaded.
 */
async function writeContacts(file, contactContain) {
    const fileContacts = myContatcsArray[file];
    const updatedFileContacts = [];

    for (const contact of fileContacts) {
        const contactInfos = findUserByName(contact);

        if (contactInfos) {
            const contactInitials = extractedInitials(contactInfos['userName']);
            const contactColor = contactInfos['userColor'];

            contactContain.innerHTML += /*html */ `
                <div class="contact d-flex-start-center" onclick="showclickedContact('${contact}')">
                    <div class="contact-initials d-flex-center font-inter" style="background-color: ${contactColor}">${contactInitials}</div>
                    <span class="font-inter">${contact}</span>
                </div>
            `;

            updatedFileContacts.push(contact);
        }
    }

    // Update the contacts array for the file
    myContatcsArray[file] = updatedFileContacts;

    // Remove the file element if there are no contacts left
    if (updatedFileContacts.length === 0) {
        deleteElementById(`file${file}`);
    }
}

/**
 * Deletes the selected contact.
 * @param {element} elementId Container in which the contact name is written.
 */
function deleteElementById(elementId) {
    const elementToDelete = element(elementId);

    if (elementToDelete) {
        elementToDelete.remove();
    } else {
        console.log(`Element with ID ${elementId} not found.`);
    }
}

// Render to right side.

// Global

let rightSideOpen = false;

// Functions

// Add contact rendering.

/**
 * Opens the Add contact interface.
 * @param {ID} ID Tells the function into which DIV container Add contact should be loaded.
 */
async function addNewContact(ID) {
    const contactContainer = element(ID);
    contactContainer.classList.remove('fade-in');

    if (rightSideOpen) {
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    contactContainer.innerHTML = await addContactTemp(ID);
    contactContainer.classList.add('fade-in');

    element('add-contact-main').classList.add('pointer-event');

    rightSideOpen = true;
}

async function addContactTemp(ID) {
    return /*html */ `
        <div id="add-contact-main" class="add-contact-main d-flex-center">
            <div class="add-contact-left d-flex-center-column">
                <div class="add-contact-left-join d-flex-start-center">
                    <img src="img/join-logo.png" class="add-contact-join-logo">
                </div>
                <div class="add-contact-left-join d-flex-start-center">
                    <span class="add-contact-left-text1 font-inter">Add contact</span>
                </div>
                <div class="add-contact-left-join d-flex-start-center">
                    <span class="add-contact-left-text2 font-inter">Do your tasks as a team.</span>
                </div>
                <div class="add-contact-left-join d-flex-start-center">
                    <div class="add-contact-left-line"></div>
                </div>
            </div>
            <div class="add-contact-right d-flex-center-column">
                <div class="add-contact-right-input-area d-flex-center">
                    <div class="add-contact-img-contain d-flex-center">
                        <img src="img/icon/person.png" class="add-contact-img">
                    </div>
                    <div class="add-contact-input-fields d-flex-center-start-column">
                        <div class="field-frame-2 d-flex-center">
                            <div class="field-frame-3 d-flex-center">
                                <input id="add-contact-name-input" type="text" class="input-field font-inter" onkeyup="searchIN('userName', 'name')"
                                    placeholder="Search by Name">
                                <div class="icon-box d-flex-center">
                                    <img src="img/icon/name-icon.png" alt="name icon" class="sign-name-icon">
                                </div>
                            </div>
                            <div id="add-contact-result-name" class="add-contact-search-result d-flex-start-column"></div>
                        </div>
                        <span id="add-contact-name-request" class="request-area"></span>
                        <div class="field-frame-2 d-flex-center">
                            <div class="field-frame-3 d-flex-center">
                                <input id="add-contact-mail-input" type="email" class="input-field font-inter" onkeyup="searchIN('userMail', 'mail')"
                                    placeholder="Search by E-Mail">
                                <img src="img/icon/mail-icon.png" alt="mail icon" class="mail-icon">
                            </div>
                            <div id="add-contact-result-mail" class="add-contact-search-result d-flex-start-column"></div>
                        </div>
                        <span id="add-contact-mail-request" class="request-area"></span>
                    </div>
                </div>
                <div class="add-contact-btn-area d-flex-center">
                    <button class="add-contact-clear-btn d-flex-center font-inter" onclick="cancelAddContact('${ID}')">Cancel 
                        <img src="img/icon/clear-mark.png" class="add-contact-btn-img">
                        <img src="img/icon/clear-mark-blue.png" class="add-contact-btn-img-blue">
                    </button>
                    <button class="add-contact-create-btn d-flex-center font-inter" onclick="addContact('${ID}')">Create contact 
                        <img src="img/icon/check-mark3-white.png" class="add-contact-btn-img">
                    </button>                    
                </div>
            </div>
        </div>
    `;
}

// Add Contact Globals

let searchResults = [];
let foundName;

// Add Contact Functions

/**
 * Searches the joinUser array for names or emails that match the search query.
 * @param {parameter} USER Name or email of the user.
 * @param {Part of ID} array Gives the ID “name” or “mail” as an addition.
 * @returns Terminates the function if the search query is empty.
 */
function searchIN(USER, array) {
    const query = element(`add-contact-${array}-input`).value.toLowerCase();
    const resultField = element(`add-contact-result-${array}`);

    if (query === '') {
        resultField.classList.remove('d-show');
        return;
    }

    searchResults = [];
    resultField.innerHTML = '';
    resultField.classList.remove('d-show');

    for (const contact of joinUsers) {
        if (contact[USER].toLowerCase().includes(query)) {
            searchResults.push({ [USER]: contact[USER] });
            resultField.classList.add('d-show');
            renderAddContactSearchResult(resultField, array);
        }        
    }
}

/**
 * Displays the search result.
 * @param {element} resultField Container in which the search result is displayed.
 * @param {Part of ID} array Gives the ID “name” or “mail” as an addition.
 */
function renderAddContactSearchResult(resultField, array) {
    resultField.innerHTML = ``;
    
    searchResults.forEach(result => {
        for (const key in result) {
            if (Object.hasOwnProperty.call(result, key)) {
                resultField.innerHTML += /*html */ `
                    <span class="result-text font-inter" onclick="addToField('${array}', '${result[key]}')">${result[key]}</span>
                `;
            }
        }      
    });
}

/**
 * Inserts the found user into the input field.
 * @param {Part of ID} array Gives the ID “name” or “mail” as an addition.
 * @param {result} user Found user.
 */
function addToField(array, user) {
    element(`add-contact-${array}-input`).value = `${user}`;
    element(`add-contact-result-${array}`).classList.remove('d-show');
}

/**
 * Beginning to adds the searched contact to your contact list.
 * @param {ID} ID Tells the function into which DIV container Add contact should be loaded.
 */
function addContact(ID) {
    const newContactName = element('add-contact-name-input').value;
    const newContactMail = element('add-contact-mail-input').value;

    if (newContactName !== '' && newContactMail !== '') {
        element('add-contact-name-request').innerText = 'You can only search for a name or an mail.';
    } else {
        if (newContactName !== '' || newContactMail !== '') {
            const checked = checkUserIsOnJoin(newContactName, newContactMail);

            if (!checked && newContactName !== '') {
                element('add-contact-name-request').innerText = 'The name entered is not on Join.';
                element('add-contact-mail-request').innerText = '';
            } else if (!checked && newContactMail !== '') {
                element('add-contact-mail-request').innerText = 'The email you entered does not exist in Join.';
                element('add-contact-name-request').innerText = '';
            } else {
                addToContacts(newContactName, newContactMail, ID);
            }
        } else {
            element('add-contact-name-request').innerText = 'Please write a name or mail in the field.';
        }}
}

/**
 * Checks whether the user you are looking for is logged in to Join.
 * @param {object} newContactName Name from User.
 * @param {object} newContactMail Mail from User.
 * @returns true or false
 */
function checkUserIsOnJoin(newContactName, newContactMail) {
    for (let i = 0; i < joinUsers.length; i++) {
        if (joinUsers[i]['userName'] === newContactName || joinUsers[i]['userMail'] === newContactMail) {
            return true;
        }
    }
    return false;
}

/**
 * Adds the searched contact to your contact list.
 * @param {object} newContactName Name from User.
 * @param {object} newContactMail Mail from User.
 * @param {ID} ID Tells the function into which DIV container Add contact should be loaded.
 */
async function addToContacts(newContactName, newContactMail, ID) {
    let foundName = newContactMail ? findNewContactByMail(newContactMail) : newContactName;
    
    if (!getMyContactIndex(foundName)) {
        joinUsers[userI]['userContacts']['contactName'].push(foundName);
        clearAddContact();
        successfullyAdded(ID);
        loadContacts();
        await updateTaskData();
    } else {
        element('add-contact-name-request').innerText = 'This Join user is already among your contacts.';
    }
}

/**
 * Checks if the Contact already exists in your Contacts array.
 * @param {string} foundName // Name from Contact.
 * @returns // Returns the result of the verification.
 */
function getMyContactIndex(foundName) {
    return joinUsers[userI].userContacts.contactName.includes(foundName);
}

/**
 * Resets “Add-Contact”.
 */
function clearAddContact() {
    element(`add-contact-result-name`).classList.remove('d-show');
    element(`add-contact-result-mail`).classList.remove('d-show');
    element(`add-contact-result-name`).value = '';
    element(`add-contact-result-mail`).value = '';
    element('add-contact-name-request').innerText = '';
    element('add-contact-mail-request').innerText = '';
    element("add-contact-main").classList.remove('pointer-event');
}

// Contact added successfully.

/**
 * Issues confirmation for the successful addition of a new contact.
 * @param {ID} ID Tells the function into which DIV container Add contact should be loaded.
 */
async function successfullyAdded(ID) {
    const contactContainer = element(ID);
    contactContainer.classList.remove('fade-in');

    if (rightSideOpen) {
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    rightSideOpen = true;
    contactContainer.innerHTML = await successfullyAddedTemp();

    contactContainer.classList.add('fade-in');

    await new Promise(resolve => setTimeout(() => {
        contactContainer.classList.remove('fade-in');
        rightSideOpen = false;
    }, 5000));
}

async function successfullyAddedTemp() {
    return /*html */ `        
        <div class="add-contact-main d-flex-center">
            <div class="add-contact-left d-flex-center-column">
                <div class="add-contact-left-join d-flex-start-center">
                    <img src="img/join-logo.png" class="add-contact-join-logo">
                </div>
                <div class="add-contact-left-join d-flex-start-center">
                    <span class="add-contact-left-text1 font-inter">Add contact</span>
                </div>
                <div class="add-contact-left-join d-flex-start-center">
                    <span class="add-contact-left-text2 font-inter">Do your tasks as a team.</span>
                </div>
                <div class="add-contact-left-join d-flex-start-center">
                    <div class="add-contact-left-line"></div>
                </div>
            </div>
            <div class="add-contact-right d-flex-center-column">
                <span class="successfully-added font-inter">You have successfully<br>added a new contact.</span>
            </div>
        </div>
    `;
}

/**
 * Cancels the contact addition process.
 * @param {ID} ID Tells the function into which DIV container Add contact should be loaded.
 */
async function cancelAddContact(ID) {
    clearAddContact();
    const contactContainer = element(ID);
    
    contactContainer.classList.remove('fade-in');
    rightSideOpen = false;
    
    if (element('open-add-contact')) {
        await new Promise(resolve => setTimeout(() => {
            element('open-add-contact').classList.remove('d-show');
        }, 1000));
    }
}

// Delete Contact

/**
 * Deletes the selected contact.
 * @param {opject} contact Name of the selected contact.
 */
async function deleteContact(contact) {
    const userContactsArray = joinUsers[userI]['userContacts']['contactName'];
    const index = userContactsArray.indexOf(contact);

    if (index !== -1) {
        userContactsArray.splice(index, 1);
    }

    loadContacts();
    await updateTaskData();
    
    const renderClickedContact = element('render-clicked-contact');
    renderClickedContact.classList.remove('fade-in');
    rightSideOpen = false;
    
    if (window.innerWidth <= 1000) {
        renderClickedContact.classList.remove('pointer-event');
    }
}

// Contact rendering.

/**
 * Shows the clicked contact.
 * @param {opject} contact Name of the selected contact.
 */
async function showclickedContact(contact) {
    const contactContainer = element('render-clicked-contact');
    contactContainer.classList.remove('fade-in');

    if (rightSideOpen) {
        await new Promise(resolve => setTimeout(resolve, 1000));
    } rightSideOpen = true;
    
    if (window.innerWidth <= 1000) {
        contactContainer.classList.add('pointer-event');
    }

    contactContainer.innerHTML = ``;
    contactContainer.innerHTML = await clickedContactTemp(contact);

    contactContainer.classList.add('fade-in');
    loadWatchContacts(contact);
}

async function clickedContactTemp(contact) {
    let contactInfos = findUserByName(contact);
    let contactInitials = extractedInitials(contactInfos['userName']);
    return /*html */ `
        <div class="contact-contain-right2 d-flex-start-column">
            <div class="contact-name-contain1 d-flex-start">
                <div class="contact-name-contain-left d-flex-start-column">
                    <div class="contact-name-contain2 d-flex-start-center">
                        <span class="contact-name font-inter">${contactInfos['userName']}</span>
                    </div>
                    <button class="delete-contact font-inter d-flex-start-center" onclick="deleteContact('${contactInfos['userName']}')"><img src="img/icon/delete.png" class="delete-contact-icon"><img src="img/icon/delete-blue.png" class="delete-contact-icon-blue"> Delete Contact</button>
                </div>
                <div class="contact-name-contain-right d-flex-center">
                    <div class="contact-initials-bg d-flex-center font-inter" style="background-color: ${contactInfos['userColor']};">${contactInitials}</div>
                </div>
            </div>
            <div class="contact-liner d-flex-start-center">
                <span class="font-inter">Contact Information</span>
            </div>
            <div class="contact-info-contain d-flex-start">
                <div class="contact-info-title d-flex-start-column">
                    <div class="contact-infos-left font-inter d-flex-center">E-Mail:</div>
                    <div class="contact-infos-left font-inter d-flex-center">Phone:</div>
                    <div class="contact-infos-left font-inter d-flex-center">Address:</div>
                </div>
                <div class="contact-filled-info d-flex-start-column">
                    <div class="contact-infos-right font-inter d-flex-start-center"><a class="mail-to" href="mailto:${contactInfos['userMail']}">${contactInfos['userMail']}</a></div>
                    <div class="contact-infos-right font-inter d-flex-start-center">${contactInfos['userPhone']}</div>
                    <span class="contact-infos-right font-inter d-flex-start">${contactInfos['userAddress']}</span>
                </div>
            </div>
            <div class="contact-liner d-flex-start-center">
                <span class="font-inter">Look if you can help</span>
            </div>
            <div class="contact-tasks-contain1 d-flex-start-center">
                <div class="contact-tasks-contain2 d-flex-start-center">
                    <div class="contact-board-tasks d-flex-center-column">
                        <span id="how-many-tasks-on-board" class="contact-how-many-tasks font-inter"></span>
                        <span class="contact-board-task-name font-inter">Tasks on<br>Board</span>
                    </div>
                    <div class="contact-summary-prio d-flex-center">
                        <div class="contact-prio-left d-flex-center">
                            <img src="img/icon/urgent.png" class="contact-prio-left-img">
                            <div class="contact-prio-left-contain d-flex-center-column">
                                <span id="how-many-urgent-tasks" class="contact-how-many-tasks font-inter"></span>
                                <span class="contact-board-task-name font-inter">Urgent</span>
                            </div>
                        </div>
                        <div class="contact-prio-right d-flex-center-start-column">
                            <span id="prio-date" class="contact-prio-date font-inter"></span>
                            <span class="contact-prio-date-text font-inter">Upcoming Deadline</span>
                        </div>
                    </div>
                    <div class="contact-summary-watch d-flex-center">
                        <img src="img/icon/toDo.png" class="contact-watch-img">
                        <div class="contact-watch-contain d-flex-center-column">
                            <span id="how-many-tasks-todo" class="contact-how-many-tasks font-inter"></span>
                            <span class="contact-board-task-name font-inter">To-do</span>
                        </div>
                    </div>
                    <div class="contact-summary-watch d-flex-center">
                        <img src="img/icon/done.png" class="contact-watch-img">
                        <div class="contact-watch-contain d-flex-center-column">
                            <span id="how-many-tasks-done" class="contact-how-many-tasks font-inter"></span>
                            <span class="contact-board-task-name font-inter">Done</span>
                        </div>
                    </div>
                </div>
            </div>
            <div onclick="backContacts()" class="contacts-back-contain d-flex-center">
                <img src="img/icon/arrow-left.png" alt="arrow left" class="contacts-back-icon">
            </div>
        </div>
    `;
}

/**
 * Close Clicked Contact in Responsive.
 */
function backContacts() {
    element("render-clicked-contact").classList.remove('pointer-event', 'fade-in');
    rightSideOpen = false;
}

// Contact watch

// Globals

let allTasks = [];
let urgentDeadlines = [];
let mostUrgentDeadline;

// Task Watch

/**
 * Calls up various functions to provide an overview of the clicked user's tasks.
 * @param {opject} contact Name of the selected contact.
 */
function loadWatchContacts(contact) {
    watchTasksOnBoardContact(contact, 'all', 'how-many-tasks-on-board');
    urgentDeadlines = [];
    watchTasksOnBoardContact(contact, 'urgent', 'how-many-urgent-tasks');
    watchTasksOnBoardContact(contact, 'todo', 'how-many-tasks-todo');
    watchTasksOnBoardContact(contact, 'done', 'how-many-tasks-done');
}

/**
 * Shows tasks of the clicked contact.
 * @param {opject} contact Name of the selected contact.
 * @param {object} category Category to be displayed.
 * @param {element} target Container into which the number of tasks is written.
 */
function watchTasksOnBoardContact(contact, category, target) {
    const contactInfos = findUserByName(contact);
    allTasks = [];
    mostUrgentDeadline = undefined;

    if (category === 'all' || category === 'urgent') {
        for (const mainFolder of Object.keys(contactInfos.userTasks)) {
            sumTasksByCategory(mainFolder, contactInfos, category, target);
        }
    } else {
        const mainFolder = category;
        sumTasksByCategory(mainFolder, contactInfos, category, target);
    }
}

/**
 * Sums up all tasks from the folder in question.
 * @param {folder} mainFolder Folder from which the tasks should be displayed.
 * @param {array} contactInfos All information about the clicked contact.
 * @param {object} category Category to be displayed.
 * @param {element} target Container into which the number of tasks is written.
 */
function sumTasksByCategory(mainFolder, contactInfos, category, target) {
    const folderTasks = contactInfos['userTasks'][mainFolder];

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

/**
 * Searches the current task for "urgent" tasks.
 * @param {object} task Current task.
 */
function lookForUrgentContacts(task) {
    if (task['priority'] === 'img/icon/prio-urgent.png') {
        allTasks.push(task);
        urgentDeadlines.push(task['due-date']);
        writeUrgentDateContacts();
    }
}

/**
 * Searches the array for the most urgent date.
 * @param {array} dates Array with all "urgent" dates.
 * @returns Ends the function if "dueDate" is in the past.
 */
function getMostUrgentDeadlineContacts(dates) {
    const today = new Date();
    let mostUrgentDate = dates[0];

    dates.forEach((date) => {
        const dueDate = new Date(date);
        if (dueDate < today) {
            return;
        }

        if (dueDate < new Date(mostUrgentDate)) {
            mostUrgentDate = new Date(date);
        }
    });

    return mostUrgentDate;
}

/**
 * Writes the date of the most urgent "urgent" tasks.
 */
function writeUrgentDateContacts() {
    mostUrgentDeadline = getMostUrgentDeadlineContacts(urgentDeadlines);
    writeDate(new Date(mostUrgentDeadline));

    element('prio-date').innerText = formattedDate;
}

/**
 * Writes the number of tasks.
 * @param {ID} ID Tells the function into which DIV container Add contact should be loaded.
 */
function writeInContacts(ID) {
    let sumOfAllTasks = allTasks.length;
    element(ID).innerText = sumOfAllTasks;
}