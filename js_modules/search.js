import {
    utils,
} from './Utils.js';

export class Search {
    constructor() { }
    static ext_domain = 'https://x1337x.ws/sort-category-search/';
    static default_domain = 'https://www.google.com/search?q=';
    static x1337x = 'https://x1337x.ws/home/';

    static default() {
        let input = utils.getSearchTerm().value;
        if (input != '') {
            if (!this.cli_check(input)) {
                input = encodeURIComponent(input);
                // input = input.split(" ").join("+");
                const url = Search.default_domain + input;
                window.open(url);
            } else this.cli_parse(input);
        } else {
            alert('You need to enter a search query.');
        }
    }

    static movies() {
        let input = utils.getSearchTerm().value;
        if (input != '') {
            input = encodeURIComponent(input);
            // input = input.split(" ").join("%20");
            const url = Search.ext_domain + input + '/Movies/time/desc/1/';
            window.open(url);
        } else {
            alert('You need to enter a search query.');
        }
    }

    static tv() {
        let input = utils.getSearchTerm().value;
        if (input != '') {
            input = encodeURIComponent(input);
            const url = Search.ext_domain + input + '/TV/size/desc/1/';
            window.open(url);
        } else {
            alert('You need to enter a search query.');
        }
    }

    static games() {
        let input = utils.getSearchTerm().value;
        if (input != '') {
            input = encodeURIComponent(input);
            const url = Search.ext_domain + input + '/Games/time/desc/1/';
            window.open(url);
        } else {
            alert('You need to enter a search query.');
        }
    }
    static ebooks() {
        let input = utils.getSearchTerm().value;
        if (input != '') {
            input = encodeURIComponent(input);
            const url = Search.ext_domain + input + '/Other/seeders/desc/1/';
            window.open(url);
        } else {
            alert('You need to enter a search query.');
        }
    }

    static cli_check(input) {
        // var input = utils.getSearchTerm().value;
        if (input.startsWith('--')) {
            return true;
        }
        return false;
    }

    static cli_parse(input) {
        input = input.split('--').join('').toLowerCase();
        // console.log(input);
        switch (input) {
            case 'help':
                alert(
                    // eslint-disable-next-line max-len
                    'Documentation:\n\n--help : This page\n--fetch default : Import a predefined set of custom bookmarks.\n--reset bookmarks : Reset the bookmarks while keeping other settings intact.\n--reset all : Reset everything, including the bookmarks and wallpaper preferences.\n',
                );
                break;
            case 'reset bookmarks':
                reset_bookmarks();
                break;
            case 'reset all':
                reset_all();
                break;
            case 'fetch default':
                fetch_bookmarks();
                break;
            case 'labs':
                toggle_labs(null);
                break;
            default:
                alert(
                    // eslint-disable-next-line max-len
                    'The command you have passed is invalid.\nType --help to read the documentation.\n',
                );
        }
    }
}