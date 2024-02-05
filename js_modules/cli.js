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
    populateDownloadList,
} from './utils/downloadDialog.js';


export function cliCheck(input) {
    // var input = getSearchTerm().value;
    if (input.startsWith('--')) {
        return true;
    }
    return false;
}

function parseDL(url) {
    const container = document.getElementById('downloadContainer');
    const p = document.getElementById('progress-bar');
    container.classList.remove('hidden');
    p.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    const cleanDownloadContainer = () => {
        const items = document.querySelectorAll('.downloadItemContainer');
        for (const i of items) {
            i.remove();
        }
    };

    const closeContainer = () => {
        p.classList.remove('hidden');
        container.classList.add('hidden');
        container.removeEventListener('click', closeContainer);
        document.body.style.overflow = 'auto';

        cleanDownloadContainer();
    };
    addEventListenerOnID(
        'downloadContainer-close-btn',
        'click',
        closeContainer);

    fetch(`${BACKEND_URL}/dl/?url=${url}`).then((result) => {
        if (result.status !== 200) {
            result.json().then((res) => {
                if (res[0]?.err) {
                    genericAlert(
                        `Error ${result.status} (${result.statusText})`,
                        res[0].err);
                } else {
                    genericAlert(
                        `Unknown Error ${result.status} (${result.statusText})`,
                        res.stderr);
                }
                closeContainer();
            });
            return;
        }
        result.json().then((res) => {
            console.log(res);
            res.forEach((i) => {
                populateDownloadList(i.title, i.url, i.thumb, i.res);
                document.body.style.overflow = 'auto';
                p.classList.add('hidden');
            });

            // downloadFile(res[0].url, `${res[0].title}.mp4`);
            // const download = confirm('Download video?');
            // if (download) downloadFile(res[0].url, `${res[0].title}.mp4`);
            // console.log(res.url);
        });
    }).catch((e) => {
        genericAlert(
            `Fatal Error`,
            e);
        closeContainer();
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
            if (cmd[1]) parseDL(cmdAlt[1]);
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

