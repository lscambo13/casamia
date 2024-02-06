import {
    BING_SEARCH_DOMAIN,
    DUCKDUCKGO_SEARCH_DOMAIN,
    GOOGLE_SEARCH_DOMAIN,
} from './constants.js';
import { parseDl } from './dl.js';
import { resetAll, resetBookmarks, resetHistory } from './preferences.js';
import { cliUnexpectedCmdText } from './strings.js';
import { fetchBookmarks } from './utils.js';
import { genericAlert } from './utils/alertDialog.js';


export function cliCheck(input) {
    // var input = getSearchTerm().value;
    if (input.startsWith('--')) {
        return true;
    }
    return false;
}

function searchViaCli(url, searchTerm) {
    let searchQuery = searchTerm.substr(4);
    searchQuery = searchQuery.split(',');
    searchQuery.forEach((value) => {
        // value = encodeURIComponent(value);
        const o = window.open(`${url}${value}`, '_blank');
        if (o == null) {
            genericAlert('Information',
                'Allow pop-ups for this feature to work properly.');
            return;
        };
    });
}

export function cliParse(input) {
    const forBatchSearch = input;
    let cmd = input.toLowerCase();
    cmd = cmd.split('--').join('');
    cmd = cmd.split(' ');

    const cmdAlt = input.split('--').join('').split(' ');
    switch (cmd[0]) {
        case 'help':
            window.open(`/pages/help/index.html`, '_self');
            // alert(cliHelpText);
            break;
        case 'reset':
            if (cmd[1] == 'bookmarks') resetBookmarks();
            else if (cmd[1] == 'history') resetHistory();
            else if (cmd[1] == 'all') resetAll();
            else genericAlert('Error', cliUnexpectedCmdText);
            break;
        case 'fetch':
            if (cmd[1] == 'default') fetchBookmarks();
            // else if (cmd[1] == 'all') resetAll();
            else genericAlert('Error', cliUnexpectedCmdText);
            break;
        case 'dl':
            if (cmd[1]) parseDl(cmdAlt[1]);
            else genericAlert('Failed', `Enter a valid YT address`);
            break;
        case 'clock':
            window.open(`./pages/clock`, '_self');
            break;
        case 'count':
            window.open(`./pages/countdown`, '_self');
            break;
        case 'g':
            searchViaCli(GOOGLE_SEARCH_DOMAIN, forBatchSearch);
            break;
        case 'b':
            searchViaCli(BING_SEARCH_DOMAIN, forBatchSearch);
            break;
        case 'd':
            searchViaCli(DUCKDUCKGO_SEARCH_DOMAIN, forBatchSearch);
            break;
        default:
            genericAlert('Error', cliUnexpectedCmdText);
    };
}

