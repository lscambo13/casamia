import {
    BING_SEARCH_DOMAIN, DUCKDUCKGO_SEARCH_DOMAIN, GOOGLE_SEARCH_DOMAIN,
} from './constants.js';
import { resetAll, resetBookmarks } from './preferences.js';
import { cliUnexpectedCmdText } from './strings.js';
import { fetchBookmarks } from './utils.js';
import { genericAlert } from './utils/alertDialog.js';
import { downloadFile } from './utils/downloadFile.js';


export function cliCheck(input) {
    // var input = getSearchTerm().value;
    if (input.startsWith('--')) {
        return true;
    }
    return false;
}

function parseDL(url) {
    fetch(`https://casamia.cambo.in/api/?url=${url}`).then((results) => {
        return results.json();
    }).then((res) => {
        const download = confirm('Download video?');
        if (download) downloadFile(res.url, 'CasaMia_Downloader.mp4');
        console.log(res.url);
    });
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
    const forBatchSearch = input.toLowerCase();
    input = input.split('--').join('');
    input = input.split(' ');
    switch (input[0].toLowerCase()) {
        case 'help':
            window.open(`/pages/help/index.html`, '_self');
            // alert(cliHelpText);
            break;
        case 'reset':
            if (input[1] == 'bookmarks') resetBookmarks();
            else if (input[1] == 'all') resetAll();
            else genericAlert('Error', cliUnexpectedCmdText);
            break;
        case 'fetch default':
            fetchBookmarks();
            break;
        case 'dl':
            if (input[1]) parseDL(input[1]);
            else genericAlert('Error', cliUnexpectedCmdText);
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

