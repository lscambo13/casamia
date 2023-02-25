import {
    getSearchTerm,
} from './utils.js';
import {
    EXT_SEARCH_DOMAIN,
    GOOGLE_SEARCH_DOMAIN,
    SEARCH_BUTTON_DOM,
} from './constants.js';
import {
    cliCheck,
    cliParse,
} from './cli.js';

export function google() {
    let input = getSearchTerm().value;
    if (input != '') {
        if (!cliCheck(input)) {
            input = encodeURIComponent(input);
            // input = input.split(" ").join("+");
            const url = GOOGLE_SEARCH_DOMAIN + input;
            window.open(url);
        } else cliParse(input);
    } else {
        alert('You need to enter a search query.');
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
        alert('You need to enter a search query.');
    }
}

export function tv() {
    let input = getSearchTerm().value;
    if (input != '') {
        input = encodeURIComponent(input);
        const url = EXT_SEARCH_DOMAIN + input + '/TV/size/desc/1/';
        window.open(url);
    } else {
        alert('You need to enter a search query.');
    }
}

export function games() {
    let input = getSearchTerm().value;
    if (input != '') {
        input = encodeURIComponent(input);
        const url = EXT_SEARCH_DOMAIN + input + '/Games/time/desc/1/';
        window.open(url);
    } else {
        alert('You need to enter a search query.');
    }
}
export function ebooks() {
    let input = getSearchTerm().value;
    if (input != '') {
        input = encodeURIComponent(input);
        const url = EXT_SEARCH_DOMAIN + input + '/Other/seeders/desc/1/';
        window.open(url);
    } else {
        alert('You need to enter a search query.');
    }
};

export function switchToCLI(event) {
    if (cliCheck(event.target.value)) {
        SEARCH_BUTTON_DOM.classList.remove('fa-google');
        SEARCH_BUTTON_DOM.classList.add('fa-terminal');
    } else {
        SEARCH_BUTTON_DOM.classList.add('fa-google');
        SEARCH_BUTTON_DOM.classList.remove('fa-terminal');
    }
};

export function enterToSearch(event) {
    if (event.key == 'Enter') {
        google();
    }
};
