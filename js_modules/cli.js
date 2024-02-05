import {
    BING_SEARCH_DOMAIN,
    DUCKDUCKGO_SEARCH_DOMAIN,
    GOOGLE_SEARCH_DOMAIN,
    BACKEND_URL,
} from './constants.js';
import { resetAll, resetBookmarks, resetHistory } from './preferences.js';
import { cliUnexpectedCmdText } from './strings.js';
import { addEventListenerOnID, fetchBookmarks } from './utils.js';
import { genericAlert } from './utils/alertDialog.js';
import {
    displayDownloadError,
    displayLoadingPlaceholder,
    populateDownloadList,
} from './utils/downloadDialog.js';
import { downloadFile } from './utils/downloadFile.js';
import { Notify } from './utils/notifyDialog.js';


export function cliCheck(input) {
    // var input = getSearchTerm().value;
    if (input.startsWith('--')) {
        return true;
    }
    return false;
}

function parseDL(url) {
    displayLoadingPlaceholder();
    fetch(`${BACKEND_URL}/dl/?url=${url}`).then((result) => {
        if (result.status !== 200) {
            // Notify.show(`Error ${result.status} ${result.statusText}`);
            result.json().then((res) => {
                // console.log()
                genericAlert(`Error ${result.status}`, res[0].err);
                document.getElementById('downloadContainer-close-btn').click();
                // displayDownloadError(res);
            });
            return;
        }
        result.json().then((res) => {
            console.log(res);
            res.forEach((i) => {
                populateDownloadList(i.title, i.url, i.thumb, i.res);
            });

            // downloadFile(res[0].url, `${res[0].title}.mp4`);
            // const download = confirm('Download video?');
            // if (download) downloadFile(res[0].url, `${res[0].title}.mp4`);
            // console.log(res.url);
        });
    });
};

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
            if (cmd[1]) parseDL(cmd[1]);
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

