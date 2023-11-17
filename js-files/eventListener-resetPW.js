/**
 * Shows the criteria for a password.
 */
document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = element('new-pw-input');
    passwordInput.addEventListener('input', checkPassword);
  
    function checkPassword() {
      const password = passwordInput.value;
      const newPWRequest = element('new-pw-request');
      const criteriaList = element('criteria-list');
      criteriaList.classList.add('d-show');
  
      if (password.length >= 8) {
        element('criteria1').classList.add('color-black');
        newPWRequest.innerText = '';
      } else {
        newPWRequest.innerText = 'Please look at the criteria list.';
      }
  
      if (/[A-Z]/.test(password)) {
        element('criteria2').classList.add('color-black');
        newPWRequest.innerText = '';
      } else {
        newPWRequest.innerText = 'Please look at the criteria list.';
      }
  
      if (/\d/.test(password)) {
        element('criteria3').classList.add('color-black');
        newPWRequest.innerText = '';
      } else {
        newPWRequest.innerText = 'Please look at the criteria list.';
      }
    }
  });