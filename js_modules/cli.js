import { resetAll, resetBookmarks, toggleLabs } from './preferences.js';
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
    input = input.split('--').join('').toLowerCase();
    // console.log(input);
    switch (input) {
        case 'help':
            alert(cliHelpText);
            break;
        case 'reset bookmarks':
            resetBookmarks();
            break;
        case 'reset all':
            resetAll();
            break;
        case 'fetch default':
            fetchBookmarks();
            break;
        case 'labs':
            toggleLabs(null);
            break;
        default:
            alert(cliUnexpectedCmdText);
    }
}
