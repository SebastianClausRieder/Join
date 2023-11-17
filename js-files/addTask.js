// Add Task Functions

// Add Task Globals

let addTaskTitle;
let addTaskDescription;
let addTaskCategory;
let addTaskCategoryColor;
let assignContacts = [];
let addTaskDueDate;
let addTaskPrio;
let addTaskTo;
let subtasksArray = [];
let subtasksReadyArray = [];
let subtasksCheckArray = [];
let addTaskCheck;
let dropDownMenuIsOpen = false;

// Add new Category

// Global

let showCategory = false;
let selectElement;

// Functions

/**
 * Opens the category drop down menu.
 */
function openDropDownCategory() {
    let dropDownCategory = element('drop-down-menu-category');

    if (!showCategory) {
        showCategory = true;
        dropDownCategory.classList.add('d-show');
        element('selector-category-input').classList.remove('d-none');
        element('selector-category-select-contain').classList.remove('d-none');
        element('selector-category-selected').classList.remove('d-show');

        dropDownCategory.innerHTML = ``;
        const fragment = document.createDocumentFragment();

        for (let c = 0; c < joinUsers[userI]['category']['categoryName'].length; c++) {
            const taskCategoryName = joinUsers[userI]['category']['categoryName'][c];
            const taskCategoryColor = joinUsers[userI]['category']['categoryColor'][c];

            const categoryContainer = document.createElement('div');
            categoryContainer.classList.add('category-contain', 'd-flex-center');

            const categoryNameSpan = document.createElement('span');
            categoryNameSpan.classList.add('category-name', 'd-flex-start-center', 'font-inter');
            categoryNameSpan.innerText = taskCategoryName;

            const categoryColorImg = document.createElement('img');
            categoryColorImg.classList.add('category-color');
            categoryColorImg.src = taskCategoryColor;

            categoryNameSpan.appendChild(categoryColorImg);

            const clearCategoryImg = document.createElement('img');
            clearCategoryImg.classList.add('clear-category');
            clearCategoryImg.src = 'img/icon/clear-mark.png';
            clearCategoryImg.onclick = () => clearCategory(c);

            categoryNameSpan.onclick = () => selectCategory(taskCategoryName, taskCategoryColor);

            categoryContainer.appendChild(categoryNameSpan);
            categoryContainer.appendChild(clearCategoryImg);

            fragment.appendChild(categoryContainer);
        }

        dropDownCategory.appendChild(fragment);

        setTimeout(function() {
            dropDownMenuIsOpen = true;
        }, 100);
    } else {
        dropDownCategory.classList.remove('d-show');
        showCategory = false;
    }
}

/**
 * Selected category and associated color.
 * @param {string} selectedCategory // Violence Category Name
 * @param {string} categoryColor // color of the category
 */
function selectCategory(selectedCategory, categoryColor) {
    element('drop-down-menu-category').classList.remove('d-show');
    element('selector-category-input').classList.add('d-none');
    element('selector-category-select-contain').classList.add('d-none');

    showCategory = false;

    const categorySelected = element('selector-category-selected');
    categorySelected.classList.add('d-show');
    categorySelected.innerHTML = `<span class="category-name d-flex-start-center font-inter">${selectedCategory} <img src="${categoryColor}" class="category-color"></span>`;

    addTaskCategory = selectedCategory;
    addTaskCategoryColor = categoryColor;

    element('category-request').innerText = "";
}

/**
 * Is responsible for the selectable color in the selector.
 */
function handleCategoryColorChange() {
    selectElement = element('select-category-color');
    let selectedOption = selectElement.options[selectElement.selectedIndex];
    let selectedColor = selectedOption.getAttribute('style');

    selectElement.style = selectedColor;
}

/**
 * Prepares everything for "handleCategoryColorChange()".
 */
function loadAddEventListener() {
    selectElement = element('select-category-color');
    selectElement.addEventListener('change', handleCategoryColorChange);
}

loadAddEventListener();

/**
 * Adds the category you just created to your categories array.
 */
async function addNewCategory() {
    let newCategoryName = element('selector-category-input').value;
    let newCategoryColor = element('select-category-color').value;
    let categoryRequest = element('category-request');

    if (newCategoryName === "") {
        categoryRequest.innerText = "Please name your new category.";
        return;
    }

    if (newCategoryColor === "") {
        categoryRequest.innerText = "Please choose a color for the category.";
        return;
    }

    if (getCategoryIndex(newCategoryName) !== false) {
        categoryRequest.innerText = "This category already exists!";
        return;
    }

    joinUsers[userI]['category']['categoryName'].push(newCategoryName);
    joinUsers[userI]['category']['categoryColor'].push(newCategoryColor);

    await updateTaskData();

    categoryRequest.innerText = ``;
    element('selector-category-input').value = "";
    element('select-category-color').value = "";
    element('select-category-color').style.backgroundColor = "var(--input-background)";

    renderCategories();
}

/**
 * Deletes the category from your categories array.
 * @param {Array Position} c 
 */
async function clearCategory(c) {
    joinUsers[userI]['category']['categoryName'].splice(c, 1);
    joinUsers[userI]['category']['categoryColor'].splice(c, 1);

    await updateTaskData();

    renderCategories();
}

/**
 * Fill in the "drop-down-menu-category" container.
 */
function renderCategories() {
    let dropDownCategory = element('drop-down-menu-category');
    dropDownCategory.innerHTML = ``;

    for (let c = 0; c < joinUsers[userI]['category']['categoryName'].length; c++) {
        const taskCategoryName = joinUsers[userI]['category']['categoryName'][c];
        const taskCategoryColor = joinUsers[userI]['category']['categoryColor'][c];
        dropDownCategory.innerHTML += /*html */ `                    
            <div class="category-contain d-flex-center">
                <span class="category-name font-inter" onclick="selectCategory('${taskCategoryName}', '${taskCategoryColor}')">
                    ${taskCategoryName} <img src="${taskCategoryColor}" class="category-color">
                </span>
                <img src="img/icon/clear-mark.png" class="clear-category" onclick="clearCategory(${c})">
            </div>
        `;
    }
}

/**
 * Checks if the created category already exists in your categories array.
 * @param {string} categoryName // Name of created category.
 * @returns // Returns the result of the verification.
 */
function getCategoryIndex(categoryName) {
    return joinUsers[userI].category.categoryName.includes(categoryName);
}

// Add Contacts

// Global

let showContacts = false;

// Functions

/**
 * Opens the assign drop down menu.
 */
function openDropDownAssignTo() {
    const dropDownContacts = element('drop-down-menu-assign-to');
    const contactNames = joinUsers[userI]['userContacts']['contactName'];

    if (!showContacts) {
        showContacts = true;
        dropDownContacts.classList.add('d-show');
        addMe(dropDownContacts);

        for (let co = 0; co < contactNames.length; co++) {
            const contactName = contactNames[co];
            const isChecked = getContactIndex(contactName) === -1 ? '' : 'img/icon/check-mark.png';

            dropDownContacts.innerHTML += /*html */ `                    
                <div class="assign-to-contain d-flex-center">
                    <span class="assign-to-name font-inter" onclick="selectContact('${contactName}', ${co})">${contactName}</span>
                    <img src="${isChecked}" id="assign-to-checked${co}" class="assign-to-checked">
                </div>
            `;
        }

        setTimeout(function() {
            dropDownMenuIsOpen = true;
        }, 100);
    } else {
        dropDownContacts.classList.remove('d-show');
        showContacts = false;
    }
}

/**
 * Adds you to the drop down menu.
 * @param {Frame} dropDownContacts // Field with your contacts. 
 */
function addMe(dropDownContacts) {
    const ME = joinUsers[userI]['userName'];
    const isChecked = getContactIndex(ME) === -1 ? '' : 'img/icon/check-mark.png';

    dropDownContacts.innerHTML = /*html */`
        <span class="assign-to-name font-inter" onclick="openAddNewContact()">Add New contact</span>
        <div class="assign-to-contain d-flex-center">
            <span class="assign-to-name font-inter" onclick="selectContact('${ME}', 'ME')">${ME} - (me)</span>
            <img src="${isChecked}" id="assign-to-checkedME" class="assign-to-checked">
        </div>
    `;
}

/**
 * Opens a window to add a new contact.
 */
async function openAddNewContact() {
    element('open-add-contact').classList.add('d-show');

    await new Promise(resolve => setTimeout(resolve, 1));

    addNewContact('open-add-contact');
}

/**
 * Adds the selected contact to the assignContacts array.
 * @param {Contact Name} name 
 * @param {Position} co // Position in your contact array. 
 */
function selectContact(name, co) {
    let assignContact = name;

    const contactIndex = getContactIndex(assignContact);
    const isChecked = contactIndex === -1;

    element(`assign-to-checked${co}`).src = isChecked ? 'img/icon/check-mark.png' : '';

    if (isChecked) {
        assignContacts.push(assignContact);
    } else {
        assignContacts.splice(contactIndex, 1);
    }

    showAssign();
}

/**
 * Displays the selected contacts.
 */
function showAssign() {
    let selectedContact = element('selector-assign-to-selected');
    selectedContact.innerText = assignContacts.length > 0 ? assignContacts.map(assign => ` ${assign} -`).join('') : 'Select contacts to assign';
    selectedContact.classList.toggle('color-black', assignContacts.length > 0);
}


/**
 * Checks if the selected contact is not already added to your assignContacts array.
 * @param {string} contactName 
 * @returns // Returns the result of the verification.
 */
function getContactIndex(contactName) {
    return assignContacts.indexOf(contactName);
}

// Add Task Prio Button

/**
 * Adds the selected priority and highlights the button in color.
 * @param {Chosen Priority.} prio 
 */
function setPrioTo(prio) {
    const prioOptions = {
        'urgent': 'img/icon/prio-urgent.png',
        'medium': 'img/icon/prio-medium.png',
        'low': 'img/icon/prio-low.png'
    };

    addTaskPrio = prioOptions[prio];

    ['urgent', 'medium', 'low'].forEach(option => {
        const btn = element(`prio-btn-${option}`);
        if (prio === option) {
            btn.classList.add('bg-light-blue');
        } else {
            btn.classList.remove('bg-light-blue');
        }
    });
}

// Add Task To

// Global

let showAddTaskTo = false;

// Functions

/**
 * Opens the Add Task drop down menu.
 */
function openDropDownAddTaskTo() {
    let dropDownAddTaskTo = element('drop-down-menu-add-to-task');

    if (!showAddTaskTo) {
        showAddTaskTo = true;
        dropDownAddTaskTo.classList.add('d-show');
        element('selector-add-to-task-input').classList.remove('d-none');
        element('selector-add-to-task-select-contain').classList.remove('d-none');
        element('selector-add-to-task-selected').classList.remove('d-show');
        dropDownAddTaskTo.innerHTML = ``;
        renderAddTaskTo();

        setTimeout(function() {
            dropDownMenuIsOpen = true;
        }, 100);
    } else {
        dropDownAddTaskTo.classList.remove('d-show');
        showAddTaskTo = false;
    }
}

/**
 * Fill in the "drop-down-menu-add-to-task" container.
 */
function renderAddTaskTo() {
    let dropDownAddTaskTo = element('drop-down-menu-add-to-task');

    Object.keys(joinUsers[userI].userTasks).forEach(taskKey => {
        const showedName = joinUsers[userI].alternativeTaskNames[taskKey];
        dropDownAddTaskTo.innerHTML += /*html */ `                    
            <div class="add-to-task-contain d-flex-center" onclick="selectTask('${showedName}', '${taskKey}')">
                <span class="add-to-task-name d-flex-start-center font-inter">${showedName}</span>
            </div>
        `;
    });
}

/**
 * Determines the task category in which your new task will be created.
 * @param {Task Name} selectedTask 
 * @param {key Name} keyName // Task key name
 */
function selectTask(selectedTask, keyName) {
    element('drop-down-menu-add-to-task').classList.remove('d-show');
    element('selector-add-to-task-input').classList.add('d-none');
    element('selector-add-to-task-select-contain').classList.add('d-none');

    showAddTaskTo = false;

    let taskSelected = element('selector-add-to-task-selected');
    taskSelected.classList.add('d-show');
    taskSelected.innerHTML = `<span class="add-to-task-name font-inter">${selectedTask}</span>`;

    addTaskTo = keyName;

    element('add-to-task-request').innerText = '';
}

/**
 * Creates a new task category.
 */
async function addNewTask() {
    let newTaskName = element('selector-add-to-task-input').value;
    let addToTaskRequest = element('add-to-task-request');
    let taskNameKey = makeSmallAndNoSpaces(newTaskName);

    if (newTaskName === "") {
        addToTaskRequest.innerText = "Please name your new task.";
        return;
    }

    if (getTaskIndex(taskNameKey) !== false) {
        addToTaskRequest.innerText = "This task already exists!";
        return;
    }

    joinUsers[userI].userTasks[taskNameKey] = [];
    joinUsers[userI].alternativeTaskNames[taskNameKey] = newTaskName;

    await updateTaskData();

    element('selector-add-to-task-input').value = ``;
    renderAddTaskTo();
}

/**
 * Creates a key name of the created task category.
 * @param {string} taskNameValue // new Task Category name. 
 * @returns // Returns the key name of the created task category.
 */
function makeSmallAndNoSpaces(taskNameValue) {
    let taskNameResult = taskNameValue.toLowerCase();
    return taskNameResult.replace(/\s/g, '');
}

/**
 * Checks whether the task category to be created does not already exist.
 * @param {string} taskNameKey
 * @returns // Returns the result of the verification.
 */
function getTaskIndex(taskNameKey) {
    return joinUsers[userI].userTasks.hasOwnProperty(taskNameKey);
}

// Add Sub Task

// Global

let showSubtasks = false;

// Functions

/**
 * Creates a new subtask.
 */
function addSubtask() {
    let subtask = element('subtasks-input');
    let subtaskRequest = element('subtask-request');

    if (subtask.value != '') {
        let subtaskIndex = getSubtaskIndex(subtask.value);
        if (subtaskIndex === -1) {
            subtasksArray.push(subtask.value);
            subtasksReadyArray.push(false);
            subtasksCheckArray.push('not checked');
            subtask.value = '';
            showSubtasks = false;
            renderSubtask();
        } else {
            subtaskRequest.innerText = "You have already created this subtask.";
        }
    } else {
        subtaskRequest.innerText = "Please write a subtask in the input field.";
    }
}

/**
 * Opens the subtask window where your subtasks are listed.
 */
function subtaskCheck() {
    let subtasksContain = element('your-subtasks');
    let subtaskCheckmark = element('subtask-checkmark');

    if (!showSubtasks) {
        showSubtasks = true;
        subtaskCheckmark.src = `img/icon/check-mark.png`;
        subtasksContain.classList.add('d-show');
        renderSubtask();
    } else {
        showSubtasks = false;
        subtasksContain.classList.remove('d-show');
        subtaskCheckmark.src = ``;
    }
}

/**
 * Fill in the "your-subtasks" container.
 */
function renderSubtask() {
    let subtasksContain = element('your-subtasks');
    subtasksContain.innerHTML = ``;

    subtasksContain.innerHTML = subtasksArray.map(subtask => /*html */ `
        <div class="your-subtask d-flex-start-center">  <span class="font-inter">${subtask}</span>  </div>
    `).join('');
}

/**
 * Checks whether the subtask to be created does not already exist.
 * @param {string} subtask
 * @returns // Returns the result of the verification.
 */
function getSubtaskIndex(subtask) {
    return subtasksArray.indexOf(subtask);
}

// Formvalidation Add Task

/**
 * Creates a new task on your board and redirects you to your board.
 */
async function createNewTask(finishText) {
    addTaskTitle = element('title-input').value;
    addTaskDescription = element('description-input').value;
    addTaskCheck = [];

    addDueDate();
    validationNewTask();

    if (addTaskCheck.filter(item => item === 'ok').length === 9) {
        joinUsers[userI]['userTasks'][addTaskTo].push({
            "title": addTaskTitle,
            "description": addTaskDescription,
            "category": addTaskCategory,
            "category-color": addTaskCategoryColor,
            "assigned-user": assignContacts,
            "due-date": addTaskDueDate,
            "priority": addTaskPrio,
            "subtask-list": subtasksArray,
            "subtask-done": [],
            "subtask-checkd": subtasksCheckArray,
            "ready-subtask": subtasksReadyArray
        });
        await updateTaskData();
        clearAddTask();
        finishMessage(finishText);
    } else {
        pleaseCheckFormular();
    }
}

// Add Task Due Date

/**
 * Creates the date when the task should be completed.
 */
function addDueDate() {
    let addTaskDueDateInput = element('due-date-input').value;

    if (addTaskDueDateInput != '') {
        addTaskDueDate = parseInputDate(addTaskDueDateInput);
        let formattedDate = new Date();

        if (addTaskDueDate > formattedDate) {
            addTaskCheck[5] = 'ok';
            writeDate(addTaskDueDate);
            element('due-date-request').innerText = "";
        } else {
            element('due-date-request').innerText = "Please enter a future date.";
        }
    } else {
        element('due-date-request').innerText = "Please enter a due date.";
    }
}

/**
 * Creates the date in the desired format.
 * @param {Date} inputDate 
 * @returns Formatted date.
 */
function formatDate(inputDate) {
    const parts = inputDate.split('-');
    const day = parts[2];
    const month = parts[1];
    const year = parts[0];

    return `${day}.${month}.${year}`;
}

/**
 * Checks if all fields are filled out correctly and stores an "OK" in the addTaskCheck array.
 */
function validationNewTask() {
    const addTaskRequest = (condition, index, requestID, requestText) => {
        if (condition) {
            addTaskCheck[index] = 'ok';
        } else {
            element(requestID).innerText = "Please " + requestText + ".";
        }
    };

    addTaskRequest(addTaskTitle !== '', 0, 'title-request', 'enter title.');
    addTaskRequest(addTaskDescription !== '', 1, 'description-request', 'enter description.');
    addTaskRequest(addTaskCategory !== undefined, 2, 'category-request', 'enter category.');
    addTaskRequest(addTaskCategoryColor !== undefined, 3, 'category-request', 'enter category color.');
    addTaskRequest(assignContacts.length > 0, 4, 'assign-to-request', 'add an assign.');
    addTaskRequest(addTaskPrio !== undefined, 6, 'prio-request', 'set a priority.');
    addTaskRequest(addTaskTo !== undefined, 7, 'add-to-task-request', 'select a task.');
    addTaskRequest(subtasksArray.length > 0, 8, 'subtask-request', 'create at least one subtask.');
}

/**
 * Clears the input fields and variables.
 */
function clearAddTask() {
    const elementIds = [
        'title-input',
        'description-input',
        'assign-to-input',
        'due-date-input',
        'subtasks-input',
        'selector-category-input',
        'select-category-color',
        // Weitere Elemente hier hinzufügen, falls benötigt.
    ];

    const clearElementValue = (elementId) => {
        const inputElement = element(elementId);
        if (inputElement && inputElement.value !== null) {
            inputElement.value = '';
        }
    };

    elementIds.forEach(clearElementValue);

    addTaskCategory = '';
    addTaskCategoryColor = '';
    element('select-category-color').style = 'background-color: var(--input-background)';
    element('selector-category-input').classList.remove('d-none');
    element('selector-category-select-contain').classList.remove('d-none');
    element('selector-category-selected').classList.remove('d-show');
    assignContacts = [];
    showAssign();
    addTaskPrio = '';
    element('prio-btn-urgent').classList.remove('bg-light-blue');
    element('prio-btn-medium').classList.remove('bg-light-blue');
    element('prio-btn-low').classList.remove('bg-light-blue');
    clearAddToTask();
    subtasksArray = [];
    renderSubtask();

    deleteRequestMessage();
}

/**
 * Clears all request fields.
 */
function deleteRequestMessage() {
    element('title-request').innerText = '';
    element('description-request').innerText = '';
    element('category-request').innerText = '';
    element('assign-to-request').innerText = '';
    element('due-date-request').innerText = '';
    element('prio-request').innerText = '';
    element('add-to-task-request').innerText = '';
    element('subtask-request').innerText = '';
}

/**
 * Clears the "AddToTask" field.
 */
function clearAddToTask() {
    element('selector-add-to-task-input').classList.remove('d-none');
    element('selector-add-to-task-select-contain').classList.remove('d-none');

    showAddTaskTo = false;

    let taskSelected = element('selector-add-to-task-selected');
    taskSelected.classList.remove('d-show');
    taskSelected.innerHTML = ``;
}

// Info Message

/**
 * If the addTaskCheck array is not complete, a message appears advising you to check the entries again.
 */
function pleaseCheckFormular() {
    let messageContain = element('addTask-message-area');
    let messageText = element('addTask-message');

    messageText.innerText = 'Please check your entries.';
    messageContain.classList.add('scale');

    setTimeout(() => {
        messageContain.classList.remove('scale');
        messageText.innerText = '';
    }, 5000);
}

/**
 * Tells you that you have successfully created a new task.
 */
function finishMessage(finishText) {
    let messageContain = element('addTask-message-area');
    let messageText = element('addTask-message');

    messageText.innerText = finishText;
    messageContain.classList.add('scale');
    setTimeout(() => {
        messageContain.classList.remove('scale');
        messageText.innerText = '';
        goTo('board.html');
        element('board-add-task').classList.remove('scale');
    }, 5000);
}

/**
 * Closes the dropdown menus when clicked outside the dropdown menu.
 */
document.addEventListener('click', function(event) {
    if (dropDownMenuIsOpen) {
        dropDownMenuIsOpen = false;
        showCategory = false;
        showContacts = false;
        showAddTaskTo = false;
        const dropdowns = document.querySelectorAll('.drop-down-menu');

        dropdowns.forEach(function(dropdown) {
            const target = event.target;
    
            if (!dropdown.contains(target)) {
                dropdown.classList.remove('d-show');
            }
        });
    }
});