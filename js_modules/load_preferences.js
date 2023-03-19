import { toggleClock } from './preferences.js';

const PREF_MAP = {
    'bg-img-drop': backgroundImage,
    'bg-blur-drop': backgroundBlur,
    'bg-glow-drop': backgroundGlow,
    'weather-display-drop': displayWeather,
    'footer-display-drop': displayfooter,
    'def-widget-drop': defaultWidget,
    'widget-style-drop': widgetStyle,
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
            console.log(value);
            break;
        };
        case 'on': {
            overlay.style.backdropFilter = 'blur(1em)';
            console.log(value);
            break;
        };
    }
};
function backgroundGlow() { };

function displayWeather() { };

function displayfooter() { };

function defaultWidget(value) {
    const widgetSlides = document.getElementsByClassName('widget-slide');

    function apply(input) {
        for (const i of widgetSlides) {
            i.textContent = input;
        }
    }

    switch (value) {
        case 'casamia': {
            apply('Casa Mia');
            break;
        };
        case 'search': {
            apply('Search');
            break;
        };
        case 'clock': {
            toggleClock();
            break;
        };
        case 'custom..': {
            apply('Custom');
            break;
        };
    }
};

function widgetStyle() { };

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
}

export function loadDropdownPositions() {
    const loadedFromStorage =
        Object.entries(JSON.parse(localStorage.getItem('advDropdownValues')));
    // if (!loadButtonPreviews) return;
    for (const i of loadedFromStorage) {
        document.getElementById(i[0]).value = i[1];
    }
};


