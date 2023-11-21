// Render Add-Task

/**
 * Renders AddTask.
 * @param {string} ID Indicates in which container "AddTask" is rendered.
 */
function renderAddTask(ID) {
    element(ID).innerHTML = /*html */ `
        <h1 id="add-task-title" class="add-task-title">Add Task</h1>
        <div id="add-task-formvalidation" class="add-task-formvalidation d-flex-center-start">
            <div class="formvalidation-left d-flex-start-column">
                <div class="input-fields d-flex-start-column">
                    <span class="font-inter">Title</span>
                    <div class="input-fields-contain d-flex-center">
                        <input type="text" id="title-input" oninput="clearRequest('title-input', 'title-request')" class="input-fields-input font-inter" placeholder="Enter a title">
                    </div>
                    <span id="title-request" class="request-area"></span>
                </div>
                <div class="input-fields d-flex-start-column">
                    <span class="font-inter">Description</span>
                    <div class="input-fields-contain d-flex-center">
                        <textarea type="text" id="description-input" oninput="clearRequest('description-input', 'description-request')" class="input-fields-input description-input font-inter" placeholder="Enter a Description"></textarea>
                    </div>
                    <span id="description-request" class="request-area"></span>
                </div>
                <div class="input-fields d-flex-start-column">
                    <span class="font-inter">Category</span>
                    <div class="input-fields-contain d-flex-center-column category">
                        <div class="selector-input-contain d-flex-center">
                            <input type="text" id="selector-category-input"
                                class="input-fields-input font-inter selector-input" placeholder="Add new category">
                            <div id="selector-category-selected"
                                class="selector-selected d-flex-start-center"></div>
                            <div id="selector-category-select-contain"
                                class="selector-select-contain d-flex-start-center">
                                <select id="select-category-color" class="select-color font-inter">
                                    <option value="" disabled selected hidden>Color</option>
                                    <option value="img/icon/circle-blue.png"
                                        style="background-color: var(--category-blue);"></option>
                                    <option value="img/icon/circle-green.png"
                                        style="background-color: var(--category-green);"></option>
                                    <option value="img/icon/circle-pink.png"
                                        style="background-color: var(--category-pink);"></option>
                                    <option value="img/icon/circle-red.png"
                                        style="background-color: var(--category-red);"></option>
                                    <option value="img/icon/circle-turquoise.png"
                                        style="background-color: var(--category-turquoise);"></option>
                                    <option value="img/icon/circle-yellow.png"
                                        style="background-color: var(--category-yellow);"></option>
                                </select>
                                <div class="selector-btn d-flex-center" onclick="addNewCategory()">
                                    <img src="img/icon/plus.png" class="add-task-btn-img">
                                </div>
                            </div>
                            <div class="selector-btn d-flex-center" onclick="openDropDownCategory()">
                                <img src="img/icon/dropdown-arrow.png" class="add-task-btn-img">
                            </div>
                        </div>
                        <div id="drop-down-menu-category" class="drop-down-menu d-flex-start-center-column">
                        </div>
                    </div>
                    <span id="category-request" class="request-area"></span>
                </div>
                <div class="input-fields d-flex-start-column">
                    <span class="font-inter">Assigned to</span>
                    <div class="input-fields-contain d-flex-center-column">
                        <div class="selector-assign-to-input-contain d-flex-center">
                            <div class="selector-assign-to-selected d-flex-start-center">
                                <span id="selector-assign-to-selected" class="assign-to-selected-text d-flex-start-center font-inter">Select contacts to assign</span>
                            </div>
                            <div class="selector-btn d-flex-center" onclick="openDropDownAssignTo()">
                                <img src="img/icon/dropdown-arrow.png" class="add-task-btn-img">
                            </div>
                        </div>
                        <div id="drop-down-menu-assign-to" class="drop-down-menu d-flex-start-center-column">
                        </div>
                    </div>
                    <span id="assign-to-request" class="request-area"></span>
                </div>
            </div>
            <div class="formvalidation-right d-flex-start-column">
                <div class="formvalidation-right-contain d-flex-start-column">
                    <div class="input-fields d-flex-start-column">
                        <span class="font-inter">Due date</span>
                        <div class="input-fields-contain d-flex-center-column due-date-contain">
                            <input type="date" id="due-date-input" onchange="clearRequest('due-date-input', 'due-date-request')" class="input-fields-input font-inter">
                        </div>
                        <span id="due-date-request" class="request-area"></span>
                    </div>
                    <div class="input-fields d-flex-start-column">
                        <span class="font-inter">Prio</span>
                        <div class="prio-btn-contain d-flex-center">
                            <button id="prio-btn-urgent" class="prio-btn d-flex-center font-inter"
                                onclick="setPrioTo('urgent')">Urgent <img src="img/icon/prio-urgent.png"
                                    class="prio-btn-img"></button>
                            <button id="prio-btn-medium" class="prio-btn d-flex-center font-inter"
                                onclick="setPrioTo('medium')">Medium <img src="img/icon/prio-medium.png"
                                    class="prio-btn-img"></button>
                            <button id="prio-btn-low" class="prio-btn d-flex-center font-inter"
                                onclick="setPrioTo('low')">Low <img src="img/icon/prio-low.png"
                                    class="prio-btn-img"></button>
                        </div>
                        <span id="prio-request" class="request-area"></span>
                    </div>
                    <div class="input-fields d-flex-start-column">
                        <span class="font-inter">Add to Task</span>
                        <div class="input-fields-contain d-flex-center-column selector-add-to-task">
                            <div class="selector-input-contain d-flex-center">
                                <input type="text" id="selector-add-to-task-input" class="input-fields-input font-inter selector-add-to-task-input" placeholder="Add new Task">
                                <div id="selector-add-to-task-selected" class="selector-selected d-flex-start-center">
                                </div>
                                <div class="add-to-task-btn d-flex-start-center">
                                    <div id="selector-add-to-task-select-contain" class="selector-btn d-flex-center" onclick="addNewTask()">
                                        <img src="img/icon/plus.png" class="selector-btn-img">
                                    </div>
                                    <div class="selector-btn d-flex-center" onclick="openDropDownAddTaskTo()">
                                        <img src="img/icon/dropdown-arrow.png" class="selector-btn-img">
                                    </div>  
                                </div>
                            </div>
                            <div id="drop-down-menu-add-to-task" class="drop-down-menu d-flex-start-center-column">
                            </div>
                        </div>
                        <span id="add-to-task-request" class="request-area"></span>
                    </div>
                    <div class="input-fields d-flex-start-column">
                        <span class="font-inter">Subtasks</span>
                        <div class="input-fields-contain d-flex-center-column subtask-contain">
                            <div class="selector-input-contain d-flex-center">
                                <input type="text" id="subtasks-input" class="input-fields-input font-inter subtask-input" placeholder="Add new subtask">
                                <div class="add-to-task-btn d-flex-start-center">
                                    <div id="selector-add-to-task-select-contain" class="selector-btn d-flex-center" onclick="addSubtask()">
                                        <img src="img/icon/plus.png" class="selector-btn-img">
                                    </div>
                                    <div class="selector-btn d-flex-center" onclick="subtaskCheck()">
                                        <img src="img/icon/dropdown-arrow.png" class="selector-btn-img">
                                    </div>  
                                </div>
                            </div>
                            <div id="your-subtasks" class="drop-down-menu d-flex-start-column"></div>
                        </div>
                        <div class="subtask-check-contain d-flex-start-center">
                            <span id="subtask-request" class="request-area"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="addTask-finish-btn-contain1 d-flex-center">
            <div id="finish-btn" class="addTask-finish-btn-contain2 d-flex-start">
            </div>
            <div id="addTask-message-area" class="addTask-finish-message-area d-flex-center">
                <div id="addTask-finish-message-contain" class="addTask-finish-message-contain d-flex-center">
                    <span id="addTask-message" class="addTask-finish-message font-inter"></span>
                </div>
            </div>
        </div>
    `;

    element('add-task-title').classList.add('no-margin-left');
    element('add-task-formvalidation').classList.add('no-margin-left');
    renderFinishBTN("createNewTask('Task has been created.')", 'Create Task ');

    const scriptElement = document.createElement("script");
    scriptElement.src = "js-files/addTask.js";

    document.body.appendChild(scriptElement);
}

/**
 * Determines the buttons and their function for "EditTask" or "AddTask".
 * @param {function} onclickID Determines which function is called by clicking on the button.
 * @param {string} btnName Specifies the button name.
 */
function renderFinishBTN(onclickID, btnName) {
    element('finish-btn').innerHTML = /*html */ `        
        <button class="addTask-clear-btn d-flex-center font-inter" onclick="clearAddTask()">Clear <img src="img/icon/clear-mark.png" class="addTask-btn-img">
            <img src="img/icon/clear-mark-blue.png" class="addTask-btn-img-blue">
        </button>
        <button class="addTask-create-btn d-flex-center font-inter" onclick="${onclickID}">${btnName}<img src="img/icon/check-mark3-white.png">
        </button>
    `;
}

/**
 * Renders the "Close" button for AddTask or EditTask.
 * @param {function} onclickID Determines which function is called by clicking on the button.
 */
function renderCloseBTN(onclickID) {
    element('render-container').innerHTML += /*html */ `
        <div class="close-add-task d-flex-center" onclick="${onclickID}"><img src="img/icon/arrow-left.png" class="close-add-task-icon"></div>
    `;
}