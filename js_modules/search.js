import {
    clickToEnter,
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
let myScript = '';

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

let returnedSuggestions = [];
window.googleSuggestions = (data) => {
    returnedSuggestions = [];
    const inputQuery = getSearchTerm().value;
    returnedSuggestions = data[1];
    if (inputQuery) {
        showAutofillBox(inputQuery, returnedSuggestions);
        expandAutofill(inputQuery);
        // console.log(returnedSuggestions);
    }
};

export function processSearchboxInput(event) {
    const oldInput = sessionStorage.getItem('input');
    const input = event.target.value;
    sessionStorage.setItem('input', input);
    // switchToCLI(input);
    switchSearchIcon(input);
    if (!input) {
        clearSuggestions();
        setTimeout(() => {
            collapseAutofill();
        }, 1);
        return;
    }
    expandAutofill(input);
    if (input != oldInput) googleAutocomplete(input);
};

const googleAutocomplete = (input) => {
    if (myScript !== '') {
        document.body.removeChild(myScript);
    }
    const provider = 'https://suggestqueries.google.com/complete/search?client=firefox&callback=googleSuggestions&q=';
    myScript = document.createElement('script');
    myScript.src = `${provider}${input}`;
    document.body.appendChild(myScript);
};

// const switchToCLI = (input) => {
//     const btnIcon = document.getElementById('search-btn-icon');
//     const currentIcon = localStorage.getItem('default-search-icon');
//     if (cliCheck(input)) {
//         console.log('cfs')
//         btnIcon.className = 'fa-solid fa-terminal';
//         return;
//     } else {
//         btnIcon.className = currentIcon;
//     };
// };

const switchSearchIcon = (input) => {
    const btnIcon = document.getElementById('search-btn-icon');
    const currentIcon = localStorage.getItem('default-search-icon');
    if (isUrlValid(input)) {
        btnIcon.className = 'fa fa-globe';
        return;
    } else if (cliCheck(input)) {
        btnIcon.className = 'fa fa-terminal';
        return;
    } else {
        btnIcon.className = currentIcon;
        return;
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
    const items = document.querySelectorAll('.autofillItem');
    const searchbar = document.getElementById('searchbar');
    if (input.length) {
        searchBG.style.display = 'block';
        setTimeout(() => {
            if (items.length) {
                const d = items[0].getBoundingClientRect();
                const calc = (d.height * items.length) + (d.height * 1.5);
                container.style.height = `${calc}px`;
                container.style.paddingBlockStart = '0em';
                searchbar.scrollIntoView();
            }
            searchBG.style.opacity = '1';
            const dlContainer = document.getElementById('downloadContainer');
            if (!dlContainer.classList.contains('hidden')) collapseAutofill();
        }, 1);
    }
};

const clearSuggestions = () => {
    const items = document.querySelectorAll('.autofillItem');
    items.forEach((e) => {
        e.remove();
    });
};

const showAutofillBox = (input, cloudInput) => {
    const db = JSON.parse(localStorage.getItem('autocompleteDatabase'));
    if (!db) localStorage.setItem('autocompleteDatabase', SAMPLE_AUTOFILL);

    const filteredArray = db.filter((e) => {
        if (e.toLowerCase() == input.toLowerCase()) return;
        else return e.toLowerCase().includes(input.toLowerCase());
    });

    function autofill(event) {
        getSearchTerm().value = event.target.innerText;
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
            if (i == 6) break;
            container.insertAdjacentHTML('beforeend', `
				<span 
                    class="autofillItem disable-select searchbox-style-${theme}"
                    tabindex="1">
                        <span class="autofillItemText"></span>
                        <span class="autofillItemRem fa-solid fa-xmark"></span>
                    </span>
            `);
            const x = document.getElementsByClassName('autofillItemText')
            x[x.length - 1].innerText = e;
            x[x.length - 1].title = e;
            i++;
        }
        for (const e of cloudInput) {
            if (i == 10) break;
            container.insertAdjacentHTML('beforeend', `
        		<span 
                    class="autofillItem disable-select searchbox-style-${theme}"
                    tabindex="1" title="${e}">
                    <span class="autofillItemText">${e}</span>
                    </span>
            `);
            i++;
        }
    };

    generateSuggestions(filteredArray);
    const items = document.querySelectorAll('.autofillItem');
    items.forEach((e) => {
        e.addEventListener('click', autofill);
        // e.addEventListener('focus', autofill);
        e.addEventListener('keydown', clickToEnter);
    });
    const deleteButtons = document.querySelectorAll('.autofillItemRem');
    deleteButtons.forEach((e) => {
        e.addEventListener('click', deleteFromAutocompleteDatabase);
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
    set.add(entry);
    const update = Array.from(set);
    localStorage.setItem('autocompleteDatabase', JSON.stringify(update));
};

const deleteFromAutocompleteDatabase = (event) => {
    const entry = event.target.parentNode.children[0].innerText;
    // console.log(entry);
    const db = JSON.parse(localStorage.getItem('autocompleteDatabase'));
    const set = new Set(db);
    console.log(set.delete(entry));
    const update = Array.from(set);
    localStorage.setItem('autocompleteDatabase', JSON.stringify(update));
};
