import { displayClock, refreshGreeting } from './preferences.js';
import { fixBackgroundBlurOnResize } from './utils.js';

const PREF_MAP = {
    'bg-img-drop': backgroundImage,
    'bg-blur-drop': backgroundBlur,
    'bg-glow-drop': backgroundGlow,
    'weather-display-drop': displayWeather,
    'footer-display-drop': displayfooter,
    'def-widget-drop': defaultWidget,
    'widget-style-drop': widgetStyle,
    'greeting-display-drop': displayGreeting,
    'show-seconds-drop': showSeconds,
    'clock-style-drop': clockStyle,
    'am-pm-style-drop': amPmStyle,
    'def-search-engine-drop': defaultSearchEngine,
    'show-titles-drop': showTitles,
};

function backgroundImage(value) {
    const overlay = document.getElementById('overlay');
    switch (value) {
        case 'hidden': {
            overlay.style.backgroundColor = 'rgba(0, 0, 0, 1)';
            console.log(value);
            break;
        };
        case 'shown': {
            overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.375)';
            console.log(value);
            break;
        };
    }
};

function backgroundBlur(value) {
    const overlay = document.getElementById('overlay');

    switch (value) {
        case 'off': {
            overlay.style.backdropFilter = 'blur(0em)';
            break;
        };
        case 'on': {
            overlay.style.backdropFilter = 'blur(1em)';
            fixBackgroundBlurOnResize('overlay');
            break;
        };
    }
};
function backgroundGlow() { };

function displayWeather() { };

function displayfooter(value) {
    const footer = document.getElementById('footer');

    switch (value) {
        case 'off': {
            footer.classList.add('hidden');
            break;
        };
        case 'on': {
            footer.classList.remove('hidden');
            break;
        };
    }
};

function defaultWidget(value) {
    const widgetSlides = document.getElementsByClassName('widget-slide');

    function apply(input) {
        for (const i of widgetSlides) {
            i.textContent = input;
        }
    }

    switch (value) {
        case 'casamia': {
            displayClock('off');
            apply('Casa Mia');
            break;
        };
        case 'search': {
            displayClock('off');
            apply('Search');
            break;
        };
        case 'clock': {
            displayClock('on');
            break;
        };
        case 'custom': {
            displayClock('off');
            apply('Custom');
            break;
        };
    }
};

function widgetStyle() { };

let greetingLoop = null;
function displayGreeting(value) {
    const subtitle = document.getElementById('subtitle');
    switch (value) {
        case 'off': {
            subtitle.classList.add('collapsed');
            clearInterval(greetingLoop);
            break;
        };
        case 'on': {
            subtitle.classList.remove('collapsed');
            greetingLoop = setInterval(refreshGreeting, 1000);
            break;
        };
    }
};

function showSeconds() { };

function clockStyle() { };

function amPmStyle() { };

function defaultSearchEngine() { };

function showTitles() { };

export function applyPreferences() {
    const preferencesObj =
        JSON.parse(localStorage.getItem('advDropdownValues'));

    const preferencesArray = Object.entries(preferencesObj);
    for (const i of preferencesArray) {
        PREF_MAP[i[0]](i[1]);
    }

    // apply previews
    updateUserNamePreview();
}

export function loadDropdownPositions() {
    const loadedFromStorage =
        Object.entries(JSON.parse(localStorage.getItem('advDropdownValues')));
    // if (!loadButtonPreviews) return;
    for (const i of loadedFromStorage) {
        document.getElementById(i[0]).value = i[1];
    }
};

export function updateUserNamePreview() {
    document.getElementById('update-username-btn-preview').
        textContent = localStorage.getItem('userName');
}

