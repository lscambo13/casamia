import {
    getSearchTerm,
} from './utils.js';
import {
    EXT_SEARCH_DOMAIN,
    GOOGLE_SEARCH_DOMAIN,
} from './constants.js';
import {
    cliCheck,
    cliParse,
} from './cli.js';
import { isUrlValid } from './validators.js';
import { genericAlert } from './utils/alertDialog.js';
import { Notify } from './utils/notifyDialog.js';

const MSG = 'You must enter a search query to continue.';

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

export function switchToCLI(event) {
    const btnIcon = document.getElementById('search-btn-icon');
    const currentIcon = localStorage.getItem('default-search-icon');
    if (cliCheck(event.target.value)) {
        btnIcon.className = 'fa fa-terminal';
    } else {
        btnIcon.className = currentIcon;
    }
    console.log(event.target.value);
};

export function enterToSearch(event) {
    if (event.key == 'Enter') {
        webSearch();
    }
};
