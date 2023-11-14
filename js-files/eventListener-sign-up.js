document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = element('sign-pw-input');
    passwordInput.addEventListener('input', checkPassword);

    function checkPassword() {
        const password = passwordInput.value;
        const criteriaList = element('criteria-list');
        criteriaList.classList.add('d-show');

        if (password.length >= 8) {
            element('criteria1').classList.add('color-black');
        }
        if (/[A-Z]/.test(password)) {
            element('criteria2').classList.add('color-black');
        }
        if (/\d/.test(password)) {
            element('criteria3').classList.add('color-black');
        }
    }
});