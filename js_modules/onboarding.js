import { DEF_PREF, DEF_WALLPAPER } from './constants.js';

export function askUserName(update) {
    let userName = localStorage.getItem('userName');
    if (update == 1) userName = prompt('Welcome! What is your name?');
    while (!userName || userName.startsWith(' ')) {
        userName = prompt('Welcome! What is your name?');
        localStorage.setItem('userName', userName);
    };
};

export function setDefaultPreferences() {
    if (localStorage.getItem('onBoarding') == '1') return;
    askUserName();
    localStorage.setItem('advDropdownValues', JSON.stringify(DEF_PREF));
    localStorage.setItem('wallpaper', DEF_WALLPAPER);
    localStorage.setItem('onBoarding', '1');
}

