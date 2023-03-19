import { applyPreferences } from './load_preferences.js';

export function saveDropdownPositions() {
    const select = document.getElementsByTagName('select');
    const dropdownPositions = {};
    for (const i of select) {
        dropdownPositions[i.id] = i.value;
    };
    localStorage
        .setItem('advDropdownValues', JSON.stringify(dropdownPositions));
    applyPreferences();
};

// export function saveButtonValues() {
//     const previews = document.getElementsByClassName('custom-button');
//     const buttonPreviews = {};
//     for (const i of previews) {
//         buttonPreviews[i.id] = i.value;
//     };
//     localStorage
//         .setItem('advButtonPreviews', JSON.stringify(buttonPreviews));
//     loadButtonPreviews();
// };

// export function loadButtonPreviews() {
//     let loadedFromStorage = localStorage.getItem('advButtonPreviews');
//     if (!loadedFromStorage) return;
//     loadedFromStorage =
//         Object.entries(JSON.parse(loadedFromStorage));
//     for (const i of loadedFromStorage) {
//         document.getElementById(i[0] + '-preview').textContent = i[1];
//     }
// };
