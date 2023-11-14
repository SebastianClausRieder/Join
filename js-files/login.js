// Login Functions

// Go Back

/**
 * Sign up → Hide Sign up Area
 * Sign up "Thank you" → Hide the Thank You message
 * Forgot Area → Hide Forgot Area
 * Forgot PW → Hide Forgot PW Area
 */
function back() {
  element('login-area').classList.remove('d-none');

  // Sign up
  element('sign-up-area').classList.remove('d-show');
  element('sign-up-bar').classList.remove('d-none');

  // Sign up "Thank you"
  element('messages').classList.remove('d-show');

  // Forgot Area
  element('forgot-pw-area').classList.remove('d-show');
  element('sign-up-bar').classList.remove('d-none');
}

// Login Registered user

// Global
let mailRequest;
let pwRequest;

// Functions

/**
 * Formvalidation E-Mail and leads further to the next Function.
 */
function validateFormUser() {
  const mailInput = element("mail-input").value.trim();
  mailRequest = element("mail-request");

  if (mailInput === "") { // E-Mail field is empty, show error message.
    mailRequest.innerText = "Please enter your E-Mail.";
  } else { // E-Mail has been entered, verifying existence.
    findUserByMail(mailInput);
  }

  if (enteredMailIndex === null) { // E-Mail not found, show error message.
    mailRequest.innerText = "E-Mail does not exist.";
  } else { // E-Mail was found, verify that it matches the entered password.
    checkMailToPW(enteredMailIndex);
  }
}

/**
 * Checks whether the E-Mail is in JSON and outputs the index position if necessary.
 * @param {string} mail ←- E-Mail from Input.
 */
function findUserByMail(mail) {
  for (let i = 0; i < joinUsers.length; i++) {
    if (joinUsers[i]['userMail'] === mail) {
      enteredMailIndex = joinUsers[i];
      userI = [i];
      saveIndexTo();
      return joinUsers[i];
    }
  }
  enteredMailIndex = null;
  mailExiste = null;
}

/**
 * Compares the entered password with the password stored on the JSON index position.
 * @param {string} user ←- E-Mail from Join User.
 */
function checkMailToPW(user) {
  const pwInput = element("login-pw-input").value;
  pwRequest = element("pw-request");
  const userPW = user['userPW'];

  if (pwInput === "") { // Password field is empty, show error message.
    pwRequest.innerText = "Please enter your password.";
  } else if (pwInput != userPW) { // Password is wrong, show error message.
    pwRequest.innerText = "Wrong password.";
  } else {// E-Mail and password match. Forwarding to the account.
    goTo('summary.html');
  }
}

// Login Guest

// Function

/**
 * Formvalidation E-Mail and leads further to the next Function.
 */
function loginGuest() {
  element("mail-input").value = 'join-guest@join.tirol';
  element("login-pw-input").value = 'JoinGuest123';
  validateFormUser();
  
  /* creatGuestData();
  openSummary('Guest');
  loadguestDataFrom(); */
}

/**
 * Creates a guest array.
 */
function creatGuestData() {
  if (joinGuest[0]['guestExiste'] === false) {
    joinGuest[0]['guestExiste'] = true;
    saveGuestDataTo();
    loadguestDataFrom();
  }
}

/**
 * Saves the array to local storage.
 */
function saveGuestDataTo() {
  let guestDataToText = JSON.stringify(joinGuest);
  localStorage.setItem('guestData', guestDataToText);
}

/**
 * Delete login data in the array.
 */
function deletGuestData() {
  joinGuest.splice();
	saveGuestDataTo();
  loadguestDataFrom();
}

/**
 * Load the array from local storage.
 */
function loadguestDataFrom() {
  let guestDataToText = localStorage.getItem('guestData');
  if (guestDataToText != null) {
    joinGuest = JSON.parse(guestDataToText);
  }
}

// Remember Me

// Global
let checked = false;
let loginData = [{ "mail": [], "password": [], "image": [], "checked": [] }];

// Function

/**
 * Stores your login data in local storage.
 */
function rememberMe() {
  let checkBox = element('checkbox');
  let checkMark = element('checkmark');

  loginData = [{ "mail": [], "password": [], "image": [], "checked": [] }];

  if (!checked) {
    checked = true;
    checkMark.src = 'img/icon/check-mark.png';
    noticeLoginData();
  } else {
    checked = false;
    checkMark.src = '';
    deletLoginData();
  }
}

// Remember Me Save Array and Save Function

/**
 * Stores login data in the array.
 */
function noticeLoginData() {
  const noticeMail = element('mail-input').value;
  const noticePW = element('login-pw-input').value;
  const noticeImage = element('checkmark').src;
  const noticeChecked = true;

  mailRequest = element("mail-request");
  pwRequest = element("pw-request");

  if (!noticeMail) {
    mailRequest.innerText = "Please enter your E-Mail.";
  } else if (!noticePW) {
    pwRequest.innerText = "Please enter your password.";
  } else {
    loginData[0]['mail'].push(noticeMail);
    loginData[0]['password'].push(noticePW);
    loginData[0]['image'].push(noticeImage);
    loginData[0]['checked'].push(noticeChecked);
    saveLoginDataTo();
  }
}

/**
 * Saves the array to local storage.
 */
function saveLoginDataTo() {
  let loginDataToText = JSON.stringify(loginData);
  localStorage.setItem('loginData', loginDataToText);
}

/**
 * Delete login data in the array.
 */
function deletLoginData() {
  loginData.splice();
  saveLoginDataTo();
}

/**
 * Load the array from local storage.
 */
function loadLoginDataFrom() {
  let loginDataToText = localStorage.getItem('loginData');
  if (loginDataToText != null) {
    loginData = JSON.parse(loginDataToText);
    fillLogin();
  }
}

/**
 * Writes the login data in the respective input fields.
 */
function fillLogin() {
  const mailField = element('mail-input');
  const pwField = element('login-pw-input');
  const checkBox = element('checkmark');

  mailField.value = loginData[0]['mail'];
  pwField.value = loginData[0]['password'];
  checkBox.src = loginData[0]['image'];
  checked = loginData[0]['checked'];
}

// Show Password

// Global
let PWToText = false;

// Function

/**
 * Censored or uncensored the password fields.
 * @param {string} ID from PW Input Field. 
 */
function showPW(ID) {
  const showPW = element(ID);

  if (!PWToText) {
    PWToText = true;
    showPW.type = 'text';
  } else {
    PWToText = false;
    showPW.type = 'password';
  }
}