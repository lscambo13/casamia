import { BING_SEARCH_DOMAIN, DEF_CUSTOM_TEXT, DUCKDUCKGO_SEARCH_DOMAIN, GOOGLE_SEARCH_DOMAIN } from './constants.js';
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
    'searchbar-position-drop': defaultSearchbarPosition,
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

const widgetSlides = document.getElementsByClassName('widget-slide');

function applyText(input) {
    for (const i of widgetSlides) {
        i.textContent = input;
    }
};

function defaultWidget(value) {
    function loadCustomText() {
        let customText = localStorage.getItem('customWidgetText');
        if (customText == null) {
            localStorage.setItem('customWidgetText', DEF_CUSTOM_TEXT);
            customText = localStorage.getItem('customWidgetText');
            customText = askCustomText();
        }
        applyText(customText);
        // return customText;
    }

    function toggleCustomTextButton(value) {
        switch (value) {
            case 'show': {
                document.getElementById('update-customtext-btn')
                    .classList.remove('hidden');
                break;
            };
            case 'hide': {
                document.getElementById('update-customtext-btn')
                    .classList.add('hidden');
                break;
            };
        }
    }

    switch (value) {
        case 'casamia': {
            toggleCustomTextButton('hide');
            displayClock('off');
            applyText('Casa Mia');
            break;
        };
        case 'search': {
            toggleCustomTextButton('hide');
            displayClock('off');
            applyText('Search');
            break;
        };
        case 'clock': {
            toggleCustomTextButton('hide');
            displayClock('on');
            break;
        };
        case 'custom': {
            displayClock('off');
            toggleCustomTextButton('show');
            loadCustomText();
            break;
        };
    }
};

export function askCustomText() {
    const savedText = localStorage.getItem('customWidgetText');
    const customText = prompt('Enter custom text...', savedText);
    if (customText == null) return;
    localStorage.setItem('customWidgetText', customText);
    applyText(customText);
    updateCustomTextPreview();
    return customText;
}

export function askCustomDomain() {
    const savedDomain = localStorage.getItem('customDomain');
    const customDomain = prompt('Enter custom domain...', savedDomain);
    if (customDomain == null) return;
    localStorage.setItem('customDomain', customDomain);
    applyDomain(customDomain);
    updateCustomDomainPreview();
    return customDomain;
}

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

function applyDomain(domain) {
    localStorage.setItem('default-search-url', domain);
}

export function defaultSearchEngine(value) {
    function loadCustomDomain() {
        let customDomain = localStorage.getItem('customDomain');
        if (customDomain == null) {
            localStorage.setItem('customDomain', GOOGLE_SEARCH_DOMAIN);
            customDomain = localStorage.getItem('customDomain');
            customDomain = askCustomDomain();
        }
        applyDomain(customDomain);
        // return customText;
    }

    function applyIcon(value) {
        document.getElementById('search-btn-icon').className = value;
        localStorage.setItem('default-search-icon', value);
    }

    function toggleCustomDomainButton(value) {
        switch (value) {
            case 'show': {
                document.getElementById('update-customdomain-btn')
                    .classList.remove('hidden');
                break;
            };
            case 'hide': {
                document.getElementById('update-customdomain-btn')
                    .classList.add('hidden');
                break;
            };
        }
    }

    switch (value) {
        case 'google': {
            toggleCustomDomainButton('hide');
            applyDomain(GOOGLE_SEARCH_DOMAIN);
            applyIcon('fa fa-google');
            break;
        };
        case 'bing': {
            toggleCustomDomainButton('hide');
            applyDomain(BING_SEARCH_DOMAIN);
            applyIcon('fa fa-search');
            break;
        };
        case 'duckduckgo': {
            toggleCustomDomainButton('hide');
            applyDomain(DUCKDUCKGO_SEARCH_DOMAIN);
            applyIcon('fa fa-search');
            break;
        };
        case 'custom': {
            toggleCustomDomainButton('show');
            loadCustomDomain();
            // applyDomain(GOOGLE_SEARCH_DOMAIN);
            applyIcon('fa fa-search');
            break;
        };
    }
};

function defaultSearchbarPosition(value) {
    const searchbar = document.getElementById('searchbar');

    switch (value) {
        case 'top': {
            searchbar.style.order = 'initial';
            break;
        };
        case 'bottom': {
            searchbar.style.order = '5';
            window.scrollTo(0, document.body.scrollHeight);
            break;
        };
    }
};

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
    updateCustomTextPreview();
    updateCustomDomainPreview();
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

export function updateCustomTextPreview() {
    document.getElementById('update-customtext-btn-preview').
        textContent = localStorage.getItem('customWidgetText');
}

export function updateCustomDomainPreview() {
    document.getElementById('update-customdomain-btn-preview').
        textContent = localStorage.getItem('customDomain');
}


