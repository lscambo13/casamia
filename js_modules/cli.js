import { parseURL, resetAll, resetBookmarks } from './preferences.js';
import { cliHelpText, cliUnexpectedCmdText } from './strings.js';
import { fetchBookmarks } from './utils.js';

export function cliCheck(input) {
    // var input = getSearchTerm().value;
    if (input.startsWith('--')) {
        return true;
    }
    return false;
}

export function cliParse(input) {
    input = input.split('--').join('');
    input = input.split(' ');
    // console.log(input);
    switch (input[0].toLowerCase()) {
        case 'help':
            alert(cliHelpText);
            break;
        // case 'reset bookmarks':
        //     resetBookmarks();
        //     break;
        case 'reset':
            if (input[1] == 'bookmarks') resetBookmarks();
            else if (input[1] == 'all') resetAll();
            else alert(cliUnexpectedCmdText);
            break;
        case 'fetch default':
            fetchBookmarks();
            break;
        // case 'labs':
        //     toggleLabs(null);
        //     break;
        case 'dl':
            if (input[1]) parseURL(input[1]);
            // else if (input[1] == 'all') resetAll();
            else alert(cliUnexpectedCmdText);
            break;
        default:
            alert(cliUnexpectedCmdText);
    }
}
