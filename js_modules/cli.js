import {
    BING_SEARCH_DOMAIN, DUCKDUCKGO_SEARCH_DOMAIN, GOOGLE_SEARCH_DOMAIN,
} from './constants.js';
import { resetAll, resetBookmarks } from './preferences.js';
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
    fetch(`https://casamia.cambo.in/api/dl/?url=${url}`).then((result) => {
        if (result.status !== 200) {
            Notify.show(`Error ${result.status} ${result.statusText}`);
            return;
        }
        if (result.status !== 200) {
            result.json()
                .then((res) => {
                    displayDownloadError(res);
                });
            return;
        }
        result.json()
            .then((res) => {
                console.log(res);
                res.forEach((i) => {
                    populateDownloadList(i.title, i.url, i.thumb, i.res);
                });
                const close = () => {
                    const c = document.getElementById('downloadContainer');
                    c.classList.add('hidden');
                    const items = document
                        .getElementsByClassName('downloadItemContainer');
                    // for (const i of items) {
                    //     i.remove();
                    // }

                    document.getElementById('downloadContainer-close-btn')
                        .removeEventListener('click', close);
                };
                addEventListenerOnID('downloadContainer-close-btn', 'click', close);
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
        case 'fetch':
            if (input[1] == 'default') fetchBookmarks();
            // else if (input[1] == 'all') resetAll();
            else genericAlert('Error', cliUnexpectedCmdText);
            break;
        case 'dl':
            if (input[1]) parseDL(input[1]);
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

