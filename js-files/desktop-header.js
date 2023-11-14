// Desktop and more.

// Desktop

/**
 * Redirects to clicked side from Join.
 * @param {string} side ←- Side from Join.
 */
function goTo(side) {
    window.location.href = `${side}`;
}

// Header

/**
 * Shows the user menu when clicking on his portrait.
 */
function showUserMenu() {
    const userMenu = element('user-menu');
    userMenu.classList.toggle('d-show');
}

/**
 * Displays either the user profile picture or their initials.
 * @param {ID} ID Tells the function into which DIV container Add contact should be loaded.
 */
async function displayUserImageOrInitials(ID) {
    const user = joinUsers[userI];
    if (!user) return;

    const userImage = user['userImage'];
    const userIcon = element(ID);
    const initials = extractedInitials(user['userName']);

    if (!userImage) {
        userIcon.innerHTML = `<span id="user-initials-${ID}" class="user-initials font-inter">${initials}</span>`;
    } else {
        userIcon.innerHTML = `<img src="${userImage}" class="header-user-image">`;
    }
}

/**
 * Creates the user's initials.
 * @param {string} userName Name of the join user.
 * @returns Ends the function if "userName" is in empti or not a string.
 */
function extractedInitials(userName) {
    if (!userName || typeof userName !== 'string') {
        return '';
    }

    const names = userName.split(" ");
    const initials = names.map(name => name[0].toUpperCase()).join('');

    return initials;
}

// Help Center

/**
 * Shows or hides the help center.
 */
function toggleHelpCenter() {
    const container = element('container');
    const helpCenter = element('help-center');
    const w3HelpCenter = element('w3-help-center');
    const contactsContain = element('contacts-contain');

    container.classList.toggle('d-none');
    helpCenter.classList.toggle('d-show');
    w3HelpCenter.classList.toggle('sice-w3');

    if (contactsContain) {
        contactsContain.classList.toggle('d-none');
    }
}

/**
 * Opens the Help Center and closes the user profile if necessary.
 */
function openHelpCenter() {
    if (element('w3-user-profile').classList.contains('sice-w3')) {
        closeUserProfile();
    }
    if (window.innerWidth <= 600) {
        showUserMenu();
    }
    toggleHelpCenter();
}

/**
 * Close the Help Center.
 */
function closeHelpCenter() {
    toggleHelpCenter();
}

// User Profile

// Globals

let userLocation = 'Not specified.';

// Functions


/**
 * Shows or hides the User Profile.
 */
function toggleUserProfile() {
    const userProfile = element('user-profile');
    const w3UserProfile = element('w3-user-profile');
    const contactsContain = element('contacts-contain');
    const container = element('container');
    
    userProfile.classList.toggle('d-show');
    w3UserProfile.classList.toggle('sice-w3');
    contactsContain?.classList.toggle('d-none');
    container.classList.toggle('d-none');

    if (contactsContain) {
        contactsContain.classList.toggle('d-none');
    }
}

/**
 * Opens the Help Center and closes the Help Center if necessary.
 */
function openUserProfile() {
    if (element('w3-help-center').classList.contains('sice-w3')) {
        toggleHelpCenter();
    }
    toggleUserProfile();
    showUserMenu();
    populateUserProfile();
}

/**
 * Close the User Profile.
 */
function closeUserProfile() {
    toggleUserProfile();
}

/**
 * Fills the user profile with the existing information.
 */
function populateUserProfile() {
    displayUserImageOrInitials('user-image-contain');
    setInitialSize();
    loadUserNameAndLocation();
    loadUserAddress();
    loadUserMail();
    loadUserPhone();
    loadUserColor();
}

/**
 * Gives the initials a new size.
 */
function setInitialSize() {
    if (element('user-initials-user-image-contain')) {
        element('user-initials-user-image-contain').style.fontSize = '75px';
    }
}

/**
 * Loads the user's name and location.
 */
function loadUserNameAndLocation() {
    const user = joinUsers[userI];
    const userName = user['userName'];
    const userAddress = user['userAddress'];
    
    const userNameElement = element('user-name');

    if (userAddress) {
        userLocation = extractLocation();
        userNameElement.innerHTML = /*html */ `
            <span class="user-profile-name font-inter">${userName}</span>
            <span class="user-profile-location font-inter d-flex-start-center"><img src="img/icon/location.png" class="location-icon"> ${userLocation}</span>
        `;
    } else {
        userNameElement.innerHTML = /*html */ `
            <span class="user-profile-name font-inter">${userName}</span>
        `;
    }
}

/**
 * Extracts the place name from the address.
 * @returns Returns the extracted place name.
 */
function extractLocation() {
    const address = joinUsers[userI]['userAddress'];
    const parts = address.split(' ');
    const desiredWord = parts[parts.length - 1].replace(/[^a-zA-Z-]/g, '');

    return desiredWord;
}

/**
 * Loads the specified address.
 */
function loadUserAddress() {
    const userAddress = joinUsers[userI]['userAddress'] || 'No address given';
    
    const userAddressHTML = /*html */ `
        <span class="user-title font-inter d-flex-center">Address: </span>
        <span class="user-info-text font-inter d-flex-center" style="margin-bottom: 10px;">${userAddress}</span>
    `;

    element('user-address').innerHTML = userAddressHTML;
}

/**
 * Loads the specified email address.
 */
function loadUserMail() {
    const userMail = joinUsers[userI]['userMail'];

    const userMailHTML = `
        <span class="user-title font-inter d-flex-center">Mail: </span>
        <span class="user-info-text font-inter d-flex-center" style="color: var(--highlighted-text);">${userMail}</span>
    `;

    element('user-mail').innerHTML = userMailHTML;
}

/**
 * Loads the specified phone number.
 */
function loadUserPhone() {
    const userPhone = joinUsers[userI]['userPhone'] || 'No phone number given';

    const phoneHTML = /*html */ `
        <span class="user-title font-inter d-flex-center">Phone: </span>
        <span class="user-info-text font-inter d-flex-center">${userPhone}</span>
    `;

    element('user-phone').innerHTML = phoneHTML;
}

/**
 * Loads the specified user Color.
 */
function loadUserColor() {
    const userColor = joinUsers[userI]['userColor'];

    const userColorHTML = /*html */ `
        <span class="user-title font-inter d-flex-center">Detection color: </span>
        <span class="user-info-text font-inter d-flex-center" style="background-color: ${userColor};"></span>
    `;

    element('user-color').innerHTML = userColorHTML;
}

// Edit Profile

/**
 * Opens the Profil Editor.
 */
async function openProfileEditor() {
    const profileEditor = element('edit-user-profile');
    profileEditor.classList.add('d-show');
    profileEditor.innerHTML = await profileEditorTemp();

    // Eine Liste der Felder, die bearbeitet werden sollen
    const fieldsToEdit = [
        { fieldName: 'Name', fieldKey: 'userName', loadFunction: loadNameToEdit },
        { fieldName: 'Address', fieldKey: 'userAddress', loadFunction: loadAddressToEdit },
        { fieldName: 'Mail', fieldKey: 'userMail', loadFunction: loadMailToEdit },
        { fieldName: 'Phone', fieldKey: 'userPhone', loadFunction: loadPhoneToEdit },
        { fieldName: 'Color', fieldKey: 'userColor', loadFunction: loadColorToEdit }
    ];

    // Rufen Sie die loadFieldToEdit-Funktion für jedes Feld in der Liste auf
    for (const field of fieldsToEdit) {
        loadFieldToEdit(field.fieldKey);
    }

    loadImageToEdit();

    const selectElementUser = element('select-user-color');
    selectElementUser.addEventListener('change', handleUserColorChange);

    function loadFieldToEdit(fieldKey) {
        const fieldInfo = fieldsToEdit.find(field => field.fieldKey === fieldKey);
        if (fieldInfo) {
            fieldInfo.loadFunction();
        }
    }
}

async function profileEditorTemp() {
    return /*html */ `
        <div class="editor-main-contain d-flex-start-column">
            <h1>User Profile Editor</h1>
            <div class="edit-contain d-flex-start">
                <span class="user-title font-inter d-flex-center">Name: </span>
                <div class="user-input-area d-flex-start-column">
                    <input id="user-input-first-name" type="text" class="user-input font-inter" placeholder="Edit your first name...">
                    <input id="user-input-last-name" type="text" class="user-input font-inter" placeholder="Edit your last name...">
                </div>
            </div>
            <div class="edit-contain d-flex-start">
                <span class="user-title font-inter d-flex-center">Address: </span>
                <div class="user-input-area d-flex-start-column">
                    <input id="user-input-street" type="text" class="user-input font-inter" placeholder="Write the street name...">
                    <input id="user-input-placePostalCode" type="number" class="user-input font-inter" placeholder="Write the place Postal code...">
                    <input id="user-input-place" type="text" class="user-input font-inter" placeholder="Write the place name...">
                </div>
            </div>
            <div class="edit-contain d-flex-start">
                <span class="user-title font-inter d-flex-center">Mail: </span>
                <div class="user-input-area d-flex-start-column">
                    <input id="user-input-mail" type="text" class="user-input font-inter" placeholder="Edit your E-Mail address...">
                </div>
            </div>
            <div class="edit-contain d-flex-start">
                <span class="user-title font-inter d-flex-center">Phone: </span>
                <div class="user-input-area d-flex-start-column">
                    <input id="user-input-phone" type="number" class="user-input font-inter" placeholder="Edit your Phone number...">
                </div>
            </div>
            <div class="edit-contain d-flex-start">
                <span class="user-title font-inter d-flex-center">Detect color: </span>
                <div class="user-input-area d-flex-start-column">
                    <select id="select-user-color" class="editor-select-color font-inter">
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
                </div>
            </div>
            <div class="edit-contain d-flex-start">
                <span class="user-title font-inter d-flex-center">Image: </span>
                <div class="user-input-area d-flex-start-column">
                    <input id="user-input-image" type="text" class="user-input font-inter" placeholder="Direct link to your picture...">
                </div>
            </div>
            <div class="edit-contain d-flex-start">
                <button class="add-contact-clear-btn d-flex-center font-inter" onclick="cancelEdit()" style="margin-right: 35px;">Cancel 
                    <img src="img/icon/clear-mark.png" class="add-contact-btn-img">
                    <img src="img/icon/clear-mark-blue.png" class="add-contact-btn-img-blue">
                </button>
                <button class="edit-profile-btn font-inter d-flex-center" onclick="editProfile()">Edit Profile <img src="img/icon/edit.png" class="profile-edit-icon"></button>
            </div>
        </div>
    `;
}

/**
 * Load User Name to Editorfield.
 */
function loadNameToEdit() {
    const userName = joinUsers[userI]['userName'];
    const firstNameInput = element('user-input-first-name');
    const lastNameInput = element('user-input-last-name');
    
    if (userName) {
        const names = userName.split(" ");
        firstNameInput.value = names[0];
        lastNameInput.value = names[1] || '';
    } else {
        firstNameInput.value = '';
        lastNameInput.value = '';
    }
}

/**
 * Load User Adress to Editorfield.
 */
function loadAddressToEdit() {
    const userAddress = joinUsers[userI]['userAddress'];
    const streetInput = element('user-input-street');
    const placePostalCodeInput = element('user-input-placePostalCode');
    const placeInput = element('user-input-place');

    if (userAddress) {
        const parts = userAddress.split('<br>');

        if (parts.length >= 2) {
            streetInput.value = parts[0];
            const postalCodeAndPlaceParts = parts[1].split(' ');
            if (postalCodeAndPlaceParts.length >= 2) {
                placePostalCodeInput.value = postalCodeAndPlaceParts[0];
                placeInput.value = postalCodeAndPlaceParts.slice(1).join(' ');
            }
        }
    } else {
        streetInput.value = '';
        placePostalCodeInput.value = '';
        placeInput.value = '';
    }
}

/**
 * Load User Mail to Editorfield.
 */
function loadMailToEdit() {
    const userMail = joinUsers[userI]['userMail'];
    const editorFieldMail = element('user-input-mail');

    editorFieldMail.value = userMail;
}

/**
 * Load User Phone Number to Editorfield.
 */
function loadPhoneToEdit() {
    const userPhone = joinUsers[userI]['userPhone'];
    const editorFieldPhone = element('user-input-phone');

    editorFieldPhone.value = userPhone || '';
}

/**
 * Load User Profile Color to Editorfield.
 */
function loadColorToEdit() {
    const userColor = joinUsers[userI]['userColor'];
    const selectElementUser = element('select-user-color');
    
    if (userColor) {
        selectElementUser.style.backgroundColor = userColor;
        determineColortoIMG(userColor);
    }
}

/**
 * Find the right color using the keyword.
 * @param {object} userColor Profile color of the user.
 */
function determineColortoIMG(userColor) {
    const colorMap = {
        'var(--category-blue)': 'img/icon/circle-blue.png',
        'var(--category-green)': 'img/icon/circle-green.png',
        'var(--category-pink)': 'img/icon/circle-pink.png',
        'var(--category-red)': 'img/icon/circle-red.png',
        'var(--category-turquoise)': 'img/icon/circle-turquoise.png',
        'var(--category-yellow)': 'img/icon/circle-yellow.png'
    };

    const extractedColor = element('select-user-color');
    extractedColor.value = colorMap[userColor] || ''; // Fallback to empty string if color is not in the map
}

/**
 * Extracts the color name from the image's link.
 * @param {image} userColorIMG Color circle that is saved as an image in the profile.
 * @returns Returns extracted color.
 */
function getuserColor(userColorIMG) {
    const link = userColorIMG;
    const start = link.lastIndexOf("/") + 1;
    const end = link.lastIndexOf(".");
    const extractedUserColor = link.substring(start, end);

    return determineColorfromIMG(extractedUserColor);
}

/**
 * Find the right color using the keyword.
 * @param {object} extractedUserColor Profile color of the user.
 * @returns Returns the color code for CSS.
 */
function determineColorfromIMG(extractedUserColor) {
    const colorMap = {
        'circle-blue': 'var(--category-blue)',
        'circle-green': 'var(--category-green)',
        'circle-pink': 'var(--category-pink)',
        'circle-red': 'var(--category-red)',
        'circle-turquoise': 'var(--category-turquoise)',
        'circle-yellow': 'var(--category-yellow)'
    };

    return colorMap[extractedUserColor] || 'default-color'; // default-color if no match was found.
}

/**
 * Is responsible for the selectable color in the selector.
 */
function handleUserColorChange() {
    const selectElementUser = element('select-user-color');
    const selectedOption = selectElementUser.options[selectElementUser.selectedIndex];
    const selectedColor = selectedOption.getAttribute('style');

    selectElementUser.style = selectedColor;
}

/**
 * Load User Image to Editorfield.
 */
function loadImageToEdit() {
    const userImage = joinUsers[userI]['userImage'];
    const editorFieldImage = element('user-input-image');

    editorFieldImage.value = userImage || '';
}

/**
 * Cancel Edit.
 */
function cancelEdit() {
    const userProfil = element('edit-user-profile');
    userProfil.classList.remove('d-show');
    populateUserProfile();
}

/**
 * Inserts the newly specified data into the user profile and calls it immediately.
 */
async function editProfile() {
    const userProfil = element('edit-user-profile');

    addNameToProfile();
    addAddressToProfile();
    joinUsers[userI]['userMail'] = element('user-input-mail').value;
    joinUsers[userI]['userPhone'] = element('user-input-phone').value;
    joinUsers[userI]['userColor'] = getuserColor(element('select-user-color').value);
    joinUsers[userI]['userImage'] = element('user-input-image').value;

    await updateTaskData();

    userProfil.classList.remove('d-show');

    populateUserProfile();
}

/**
 * Merges the name.
 */
function addNameToProfile() {
    const firstName = element('user-input-first-name').value;
    const lastName = element('user-input-last-name').value;

    
    joinUsers[userI]['userName'] = `${firstName} ${lastName}`;
}

/**
 * Creates the address.
 */
function addAddressToProfile() {
    const street = element('user-input-street').value;
    const placePostalCode = element('user-input-placePostalCode').value;
    const place = element('user-input-place').value;

    if (street === '' && placePostalCode === '' && place === '') {
        joinUsers[userI]['userAddress'] = /*html */ ``;
    } else {
        joinUsers[userI]['userAddress'] = /*html */ `${street}<br>${placePostalCode} ${place}`;
    }
}

// Leave Join, for now.

/**
 * Introduces the option to leave Join.
 */
function leaveJoin() {    
    const masterContainArea = element('master-container-area');
    masterContainArea.classList.add('d-show');
}

/**
 * Gives you another opportunity to decide.
 * @param {string} answer User's response.
 */
function youReallyWantLeaveUs(answer) {
    if (answer === 'no') {
        leaveJoinNOW(false);
    } else if (answer === 'yes') {
        leaveJoinNOW(true);    
    }
}

/**
 * Permanently deletes the join account or returns the user to the profile interface.
 * @param {boolean} LEAVE Depending on the user's answer, LEAVE is "true" or "false".
 */
async function leaveJoinNOW(LEAVE) {

    if (LEAVE) {
        joinUsers.splice(userI, 1);

        await updateTaskData();

        goTo('index-login.html');
    } else {
        element('master-container-area').classList.remove('d-show');        
    }
}