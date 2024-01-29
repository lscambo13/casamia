import {
    getSearchTerm,
} from './utils.js';
import {
    EXT_SEARCH_DOMAIN,
    GOOGLE_SEARCH_DOMAIN,
    SAMPLE_AUTOFILL,
} from './constants.js';
import {
    cliCheck,
    cliParse,
} from './cli.js';
import { isUrlValid } from './validators.js';
import { Notify } from './utils/notifyDialog.js';

const MSG = 'You must enter a search query to continue.';
const container = document.querySelector('.autofillContainer');
const searchBG = document.querySelector('#searchBarFocusMode');

function loadSearchDomain() {
    let domain = localStorage.getItem('default-search-url');
    if (domain == null) {
        localStorage.setItem('default-search-url', GOOGLE_SEARCH_DOMAIN);
        domain = localStorage.getItem('default-search-url');
    }
    return domain;
}

export function webSearch() {
    let input = getSearchTerm().value;
    if (input != '') {
        updateAutocompleteDatabase(input);
        if (isUrlValid(input) && !input.includes(' ')) {
            // if (!input.startsWith('http')) input = `http://${input}`;
            window.open(input, '_self');
            return;
        }
        if (!cliCheck(input)) {
            input = encodeURIComponent(input);
            // input = input.split(" ").join("+");
            const url = loadSearchDomain() + input;
            window.open(url, '_self');
        } else cliParse(input);
    } else {
        Notify.show(MSG);
    }
}

export function movies() {
    let input = getSearchTerm().value;
    if (input != '') {
        input = encodeURIComponent(input);
        // input = input.split(" ").join("%20");
        const url = EXT_SEARCH_DOMAIN + input + '/Movies/time/desc/1/';
        window.open(url);
    } else {
        Notify.show(MSG);
    }
}

export function tv() {
    let input = getSearchTerm().value;
    if (input != '') {
        input = encodeURIComponent(input);
        const url = EXT_SEARCH_DOMAIN + input + '/TV/size/desc/1/';
        window.open(url);
    } else {
        Notify.show(MSG);
    }
}

export function games() {
    let input = getSearchTerm().value;
    if (input != '') {
        input = encodeURIComponent(input);
        const url = EXT_SEARCH_DOMAIN + input + '/Games/time/desc/1/';
        window.open(url);
    } else {
        Notify.show(MSG);
    }
}
export function ebooks() {
    let input = getSearchTerm().value;
    if (input != '') {
        input = encodeURIComponent(input);
        const url = EXT_SEARCH_DOMAIN + input + '/Other/seeders/desc/1/';
        window.open(url);
    } else {
        Notify.show(MSG);
    }
};

export function processSearchboxInput(event) {
    const input = event.target.value;
    sessionStorage.setItem('input', input);
    switchToCLI(input);
    switchToURL(input);
    if (!input) {
        setTimeout(() => {
            collapseAutofill();
        }, 1);
        return;
    }
    showAutofillBox(input);
};

const switchToCLI = (input) => {
    const btnIcon = document.getElementById('search-btn-icon');
    const currentIcon = localStorage.getItem('default-search-icon');
    if (cliCheck(input)) {
        btnIcon.className = 'fa fa-terminal';
    } else {
        btnIcon.className = currentIcon;
    };
};
const switchToURL = (input) => {
    const btnIcon = document.getElementById('search-btn-icon');
    const currentIcon = localStorage.getItem('default-search-icon');
    if (isUrlValid(input)) {
        btnIcon.className = 'fa fa-globe';
    } else {
        btnIcon.className = currentIcon;
    };
};

export const collapseAutofill = () => {
    searchBG.style.opacity = '0';
    container.style.paddingBlock = '0em';
    container.style.height = '0px';
    setTimeout(() => {
        searchBG.style.display = 'none';
    }, 200);
};

const expandAutofill = (input) => {
    const autofillItems = document.querySelectorAll('.autofillItem');
    if (autofillItems.length || input.length) {
        searchBG.style.display = 'block';
        setTimeout(() => {
            if (autofillItems.length) {
                const d = autofillItems[0].getBoundingClientRect();
                const calc = (d.height * autofillItems.length) + (d.height * 1);
                container.style.height = `${calc}px`;
                container.style.paddingBlockStart = '0em';
            }
            searchBG.style.opacity = '1';
        }, 1);
    }
};

const showAutofillBox = (input) => {
    const clearSuggestions = () => {
        const items = document.querySelectorAll('.autofillItem');
        items.forEach((e) => {
            e.remove();
        });
    };

    input = input.toLowerCase();
    const db = JSON.parse(localStorage.getItem('autocompleteDatabase'));
    if (!db) localStorage.setItem('autocompleteDatabase', SAMPLE_AUTOFILL);

    const filteredArray = db.filter((e) => {
        if (e == input) return;
        else return e.toLowerCase().startsWith(input);
    });

    function autofill(event) {
        getSearchTerm().value = event.target.innerHTML;
        const e = new InputEvent('input');
        getSearchTerm().dispatchEvent(e);
        getSearchTerm().focus();
    };

    const generateSuggestions = (filteredArray) => {
        clearSuggestions();
        if (!input) return;
        const theme = sessionStorage.getItem('searchbar-color-theme-drop');
        const order = sessionStorage.getItem('searchbar-position-drop');
        if (order == 'bottom') container.style.flexDirection = 'column-reverse';
        else container.style.flexDirection = 'column';
        let i = 0;
        for (const e of filteredArray) {
            if (i == 5) return;
            container.insertAdjacentHTML('beforeend', `
				<span 
                    class="autofillItem disable-select searchbox-style-${theme}"
                    tabindex="1">${e}</span>
            `);
            i++;
        }
    };

    generateSuggestions(filteredArray);
    expandAutofill(input);
    const items = document.querySelectorAll('.autofillItem');
    items.forEach((e) => {
        e.addEventListener('click', autofill);
        e.addEventListener('focus', autofill);
    });
};

export function enterToSearch(event) {
    if (event.key == 'Enter') {
        document.querySelector('#search-btn').click();
    }
};

const updateAutocompleteDatabase = (entry) => {
    const db = JSON.parse(localStorage.getItem('autocompleteDatabase'));
    const set = new Set(db);
    set.add(entry.toLowerCase());
    const update = Array.from(set);
    localStorage.setItem('autocompleteDatabase', JSON.stringify(update));
};
