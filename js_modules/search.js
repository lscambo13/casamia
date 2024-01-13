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

function loadSearchDomain(input) {
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
            if (!input.startsWith('http')) input = `http://${input}`;
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
    showAutofillBox(input);
    const autofillItems = document.querySelectorAll('.autofillItem');
    if (autofillItems.length) {
        const calc = 2.8 * autofillItems.length + 1;
        searchBG.style.display = 'block';
        setTimeout(() => {
            // container.style.opacity = '1';
            container.style.height = `${calc}em`;
            container.style.paddingBlock = '0.5em';
            searchBG.style.opacity = '1';
        }, 1);
    } else hideSearchBG();
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

export const hideSearchBG = () => {
    // getSearchTerm().blur();
    searchBG.style.opacity = '0';
    // container.style.opacity = '0';
    container.style.paddingBlock = '0em';
    container.style.height = '0em';
    setTimeout(() => {
        searchBG.style.display = 'none';
    }, 200);
};

const showAutofillBox = (input) => {
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
        let sortOrder = sessionStorage.getItem('searchbar-position-drop');
        if (sortOrder == 'bottom') sortOrder = 'afterbegin';
        else sortOrder = 'beforeend';
        let i = 0;
        for (const e of filteredArray) {
            if (i == 5) return;
            container.insertAdjacentHTML(sortOrder, `
				<span 
                    class="autofillItem disable-select searchbox-style-${theme}"
                    tabindex="1">${e}</span>
            `);
            i++;
        }
    };

    const clearSuggestions = () => {
        container.innerHTML = '';
    };

    generateSuggestions(filteredArray);
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
