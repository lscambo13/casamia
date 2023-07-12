import { DEF_PREF, DEF_WALLPAPER } from './constants.js';
import { updateUserNamePreview } from './load_preferences.js';
import {
    askUserNameText,
    retryUserNameText,
    updateUserNameText,
} from './strings.js';

export function askUserName() {
    let userName = localStorage.getItem('userName');
    if (userName) {
        userName = prompt(updateUserNameText, userName);
        if (userName && !userName.startsWith(' ') && userName.length < 15) {
            localStorage.setItem('userName', userName);
            updateUserNamePreview();
        };
        return;
    };

    // for onboarding
    let msg = askUserNameText;
    while (!userName || userName.startsWith(' ') || userName.length > 14) {
        userName = prompt(msg);
        localStorage.setItem('userName', userName);
        msg = retryUserNameText;
    };
};

export function setDefaultPreferences() {
    if (localStorage.getItem('onBoarding') == '1') return;
    askUserName();
    localStorage.setItem('advDropdownValues', JSON.stringify(DEF_PREF));
    localStorage.setItem('wallpaper', DEF_WALLPAPER);
    localStorage.setItem('selected-widget-style', 'widget-1');
    localStorage.setItem('onBoarding', '1');
}

