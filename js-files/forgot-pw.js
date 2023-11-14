// Forgot PW

/**
 * Show Forgot PW Area
 */
function forgotPW() {
  element('forgot-pw-area').classList.add('d-show');
  element('sign-up-bar').classList.add('d-none');
  element('login-area').classList.add('d-none');
}

// Reset PW bevor sending E-Mail

/**
 * Checks whether the e-mail was sent and outputs a message accordingly.
 * @param {event} event Event from Formvalidation
 * @returns Terminates function if email = 'join-guest@join.tirol'.
 */
async function resetPWMail(event) {
  event.preventDefault();
  const toResetMail = element('forgot-pw-mail-input').value;
  const isJoinGuestMail = toResetMail === 'join-guest@join.tirol';

  if (isJoinGuestMail) {
    const link = `https://sebastian-rieder.developerakademie.net/Join/reset-pw.html?email=${toResetMail}`;
    window.location.href = link;
    return;
  }

  const checked = checkMailExist(toResetMail);
  const forgotArea = element('forgot-pw-area');
  const messageArea = element('messages');
  const message = element('messages-contain');

  let messageContent;

  if (checked) {
    const formData = new FormData(event.target);
    const response = await action(formData);

    if (response.ok) {
      messageContent = mailSendTemp();
    } else {
      messageContent = mailNotSendTemp();
    }
  } else {
    messageContent = wrongMailTemp();
  }

  forgotArea.classList.remove('d-show');
  messageArea.classList.add('d-show');
  message.innerHTML = messageContent;
}

/**
 * Checks whether the e-mail is registered on Join.
 * @returns Returns "true" or "false".
 */
function checkMailExist(toResetMail) {
  findUserByMail(toResetMail);
  const request = element('forgot-pw-mail-request');
  const exists = enteredMailIndex !== null;

  if (!exists) {
    request.innerText = "E-Mail does not exist.";
  }

  return exists;
}

/**
 * Creates the form data for the PHP file.
 * @param {formData} formData Data for form validation.
 * @returns Returns the fetch with input and requestInit.
 */
function action(formData) {
  const input = 'https://sebastian-rieder.developerakademie.net/Join/reset-mail.php';
  const requestInit = {
    method: 'post',
    body: formData
  };

  return fetch(
    input,
    requestInit
  );
}

// Message Temps

function mailSendTemp() {
  return /*html */ `
    <div class="mail-check-contain d-flex-center">
        <img src="img/icon/send-icon.png" class="mail-check-icon">
        <span class="mail-check-text">An E-Mail has been sent to you</span>
    </div>
    <div onclick="back()" class="back-contain d-flex-center">
        <img src="img/icon/arrow-left.png" alt="arrow left" class="back-icon">
    </div>
`;
}

function mailNotSendTemp() {
  return /*html */ `
    <div class="mail-check-contain d-flex-center">
        <img src="img/icon/send-error.png" class="mail-check-icon">
        <span class="mail-check-text">Email was not sent.<br>Please try again later.</span>
    </div>
    <div onclick="back()" class="back-contain d-flex-center">
        <img src="img/icon/arrow-left.png" alt="arrow left" class="back-icon">
    </div>
`;
}

function wrongMailTemp() {
  return /*html */ `
    <div class="mail-check-contain d-flex-center">
        <img src="img/icon/send-error.png" class="mail-check-icon">
        <span class="mail-check-text">Email was not sent.<br>Please check your entry.</span>
    </div>
    <div onclick="back()" class="back-contain d-flex-center">
        <img src="img/icon/arrow-left.png" alt="arrow left" class="back-icon">
    </div>
`;
}

// Reset PW after sending E-Mail

// Global

let resetMail;
let resetUser;
/**
 * Performs a series of functions after the page loads.
 */
async function onPageLoad() {
  element('reset-pw').classList.remove('d-none');
  await loadJSONfromServer();
  resetMail = getEmailUrlParameter();
  resetUser = getUser();
}

/**
 * Filters the e-mail address from the url provided in the previously sent e-mail.
 * @returns Returns the filtered email.
 */
function getEmailUrlParameter() {
  const queryString = window.location.search;
  const urlParms = new URLSearchParams(queryString);
  const email = urlParms.get('email');
  return email;
}

/**
 * Finds the user based on the email.
 * @returns Returns the array index where the user is located.
 */
function getUser() {
  findUserByMail(resetMail);
  return enteredMailIndex;
}

/**
 * Checks that "new PW" and "confirm PW" match, saves the new password or issues an error message.
 */
async function resetPW() {
  const newPW = element('new-pw-input').value;
  const confirmPW = element('confirm-pw-input').value;
  const confirmRequest = element('confirm-pw-request');

  if (newPW === confirmPW) {
    resetUser['userPW'] = newPW;
    dNoneCriteria();
    await updateTaskData();
    youResetYourPW();
  } else {
    confirmRequest.innerText = 'The passwords do not match.';
  }
}

/**
 * Announces successful password reset.
 */
function youResetYourPW() {
  const resetArea = element('reset-pw');
  const messageArea = element('messages');
  const message = element('messages-contain');

  resetArea.classList.add('d-none');
  messageArea.classList.add('d-show');
  message.innerHTML = youResetYourPWTemp();
}

function youResetYourPWTemp() {
  return /*html */ `
  <div class="YRYPW-contain d-flex-center">
      <img src="img/icon/check-mark-white.png" class="YRYPW-icon">
      <span class="YRYPW-text">You have successfully reset your password.</span>
  </div>
  <div onclick="goTo('index-login.html')" class="back-contain">
      <img src="img/icon/arrow-left.png" alt="arrow left" class="back-icon">
  </div>
`;
}