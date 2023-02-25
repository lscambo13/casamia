export function askUserName(update) {
    let userName = localStorage.getItem('userName');
    if (update == 1) userName = prompt('Welcome! What is your name?');
    while (!userName || userName.startsWith(' ')) {
        userName = prompt('Welcome! What is your name?');
        localStorage.setItem('userName', userName);
    };
};
