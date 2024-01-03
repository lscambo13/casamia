import { DEF_PREF, DEF_WALLPAPER } from './constants.js';
import { updateUserNamePreview } from './load_preferences.js';
import { refreshGreeting } from './preferences.js';
import { updateUserNameText } from './strings.js';
import { Dialog } from './utils/dialog.js';
import { enableSubmitButton } from './utils/enableSubmitButton.js';

export function askUserName() {
    let userName = localStorage.getItem('userName');

    // const enableSubmitButton = () => {
    //     const button = document.getElementById('modalSubmitButton');
    //     const input = document.getElementsByClassName('inputField');
    //     for (const e of input) {
    //         if (e.value.length > 0) {
    //             button.disabled = false;
    //         } else {
    //             button.disabled = true;
    //             return;
    //         }
    //     }
    // };

    if (userName) {
        Dialog.show(
            'Update your name',
            updateUserNameText,
            ['Change name to'],
            'Update',
            'Cancel',
            null,
            [enableSubmitButton, null],
            () => {
                Dialog.getInputFields()[0].setAttribute('maxlength', 17);
                Dialog.getInputFields()[0].value = userName;
            },
        ).then((res) => {
            userName = res.inputValues[0];
            localStorage.setItem('userName', userName);
            updateUserNamePreview();
            refreshGreeting();
            return;
        }).catch((e) => {
            console.error(e);
            return;
        });
        return;
    };

    if (!userName) {
        const onBoardingInProgress = Dialog.show(
            'Welcome to Casa Mia',
            `Hi! We are so excited to see you here.
            Please fill out the following details before moving forward. `,
            [`Your name`],
            'Proceed',
            null,
            null,
            [enableSubmitButton, null],
            () => {
                Dialog.getInputFields()[0].setAttribute('maxlength', 17);
            },
        );
        onBoardingInProgress.then((res) => {
            userName = res.inputValues[0];
            localStorage.setItem('userName', userName);
            localStorage.setItem('onBoarding', '1');
            return;
        }).catch((e) => {
            console.error(e);
            return;
        });
        return onBoardingInProgress;
    };
};

export function preOnboarding() {
    const onBoardingInProgress = askUserName();
    localStorage.setItem('onBoarding', '0');
    localStorage.setItem('advDropdownValues', JSON.stringify(DEF_PREF));
    localStorage.setItem('wallpaper', DEF_WALLPAPER);
    localStorage.setItem('selected-widget-style', 'widget-1');
    return onBoardingInProgress;
}

