// Globals
let newUserName;
let newUserMail;
let newUserPW;

let signNameRequest;
let signMailRequest;
let signPWRequest;

let mailExiste;

// Sign up

/**
 * Takes you to the place where you can register for Join.
 */
function signUp() {
  element('login-area').classList.add('d-none');
  element('sign-up-bar').classList.add('d-none');
  element('sign-up-area').classList.add('d-show');
}

/**
 * Creates a new user profile, but first checks the entry and whether the e-mail already exists.
 */
async function addNewUserProfil() {
    const nameInput = element("sign-name-input").value;
    const mailInput = element("sign-mail-input").value.trim();
    const pwInput = element("sign-pw-input").value;
    signNameRequest = element("sign-name-request");
    signMailRequest = element("sign-mail-request");
    signPWRequest = element("sign-pw-request");

    if (nameInput === "") { 
        signNameRequest.innerText = "Please enter your full Name.";
    } else if (nameInput.length < 5) {
        signNameRequest.innerText = "Your full name should be at least 5 characters long.";
        newUserName = "";
    } else { newUserName = nameInput; }
    
    if (mailInput === "") { // Name field is empty, show error message.
        signMailRequest.innerText = "Please enter your E-Mail.";
    } else if (!isValidEmail(mailInput)) { // Input is not an email.
        signMailRequest.innerText = "Please enter a valid E-Mail.";
        newUserMail = "";
    } else { // E-Mail has been entered, verifying existence.
        signMailRequest.innerText = "";
        newUserMail = mailInput;
        findUserByMail(mailInput);
    }

    if (pwInput === "") { // PW field is empty, show error message.
        signPWRequest.innerText = "Please enter a Password.";
    } else if (!checkPasswordValidity(pwInput)) { // Password does not meet the criteria, show error message.
        signPWRequest.innerText = "Please look at the criteria list.";
        newUserPW = "";
    } else { // Password meets the criteria, save it.
        signPWRequest.innerText = "";
        newUserPW = pwInput;
    }

    if (newUserName === "" || newUserMail === "" || newUserPW === "") {

    } else if (mailExiste === null) {
        pushToArray();
        thankYou();
    } else { // E-Mail existe, show error message.
        signMailRequest.innerText = "This E-Mail already exists.";
    }
}

/**
 * Checks whether the input is an email address.
 * @param {string} email 
 * @returns Returns true or false.
 */
function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

/**
 * Checks whether the password entered corresponds to the default.
 * @param {string} password 
 * @returns Returns true or false.
 */
function checkPasswordValidity(password) {
    let isValidPW = true;

      if (password.length < 8) {
        isValidPW = false;
    } if (!/[A-Z]/.test(password)) {
        isValidPW = false;
    } if (!/\d/.test(password)) {
        isValidPW = false;
    }

    return isValidPW;
}

/**
 * Stores the specified data in the "joinUsers" array and immediately creates the associated JSON.
 */
async function pushToArray() {
    joinUsers.push({
        userName: newUserName,
        userMail: newUserMail,
        userPW: newUserPW,
        userImage: '',
        userColor: 'var(--join-background)',
        userPhone: '',
        userAddress: '',
        userTasks: {
            todo: [],
            inprogress: [],
            awaitingfeedback: [],
            done: []
        },
        alternativeTaskNames: {
            todo: 'To-do',
            inprogress: 'In Progress',
            awaitingfeedback: 'Awaiting Feedback',
            done: 'Done'
        },
        category: {
            categoryName: ['Sales', 'Frontoffice', 'Backoffice'],
            categoryColor: ['img/icon/circle-pink.png', 'img/icon/circle-blue.png', 'img/icon/circle-turquoise.png']
        },
        userContacts: {
                contactMail: []
            }
    });

    await updateTaskData();
}

/**
 * Creates a message with a thank you and bring you back to the Login side.
 */
function thankYou() {
    const messages = element('messages');
    const messagesContain = element('messages-contain');
    const signUpArea = element('sign-up-area');
    dNoneCriteria();

    signUpArea.classList.remove('d-show');
    messages.classList.add('d-show');
    messagesContain.innerHTML = thxTemp();
    
    setTimeout(function() {
        goTo('index-login.html');
    }, 3000);
}

/**
 * Render info Message.
 * @returns Returns the HTML construct.
 */
function thxTemp() {
    return /*html */ `
        <span class="message-sign-up">Thank you for registering with Join.</span>
        <span class="message-sign-up">We hope you enjoy our system.</span>
        <div onclick="back()" class="back-contain">
            <img src="img/icon/arrow-left.png" alt="arrow left" class="back-icon">
        </div>
    `;
}