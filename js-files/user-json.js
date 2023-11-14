// Registered user Array

let joinUsers;

/* let joinUsers = [
    {
        userName: 'André Kannenberg',
        userMail: 'andrek_89@gmx.de',
        userPW: 'André123',
        userImage: '',
        userColor: 'var(--category-green)',
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
            contactName: ['Robert Spier', 'Sebastian Rieder', 'Swen Breitung']
        }
    }, {
        userName: 'Robert Spier',
        userMail: 'zuckerhut2000@yahoo.de',
        userPW: 'Robert123',
        userImage: '',
        userColor: 'var(--category-red)',
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
            contactName: ['André Kannenberg', 'Sebastian Rieder', 'Swen Breitung']
        }
    }, {
        userName: 'Sebastian Rieder',
        userMail: 'sebastian.rieder@live.com',
        userPW: 'Sebastian123',
        userImage: 'img/founder/basti.jpg',
        userColor: 'var(--category-yellow)',
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
            contactName: ['André Kannenberg', 'Robert Spier', 'Swen Breitung']
        }
    }, {
        userName: 'Swen Breitung',
        userMail: 'Veroxa@web.de',
        userPW: 'Swen1234',
        userImage: '',
        userColor: 'var(--category-pink)',
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
            contactName: ['André Kannenberg', 'Robert Spier', 'Sebastian Rieder']
        }
    }
];
*/

// Guest Array (Loacal Storage)

let joinGuest = [
    {
        guestExiste: false,
        guestName: 'Guest',
        guestTasks: {
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
        guestContacts: {
            contactName: [],
            contactMail: []
        }
    }
];