// import { customBookmarks, setCustomBookmarks } from './database.js';

import { removableBorder } from './utils/toggleBorder.js';
import { crossDisplay } from './utils/toggleDisplay.js';

export let customBookmarks =
    JSON.parse(localStorage.getItem('saved_bookmarks'));


export function loadBookmarks() {
    // setCustomBookmarks(JSON.parse(localStorage.getItem('saved_bookmarks')));

    if (customBookmarks == null) {
        customBookmarks = [];
        return;
    }
    for (const n of customBookmarks) {
        addBookmarkToHTML(n.link, n.name, n.id);
    }
}

export function addBookmarkToHTML(link, name, id) {
    const bookmarkContainer = document.getElementsByClassName(
        'flex-sub-container-horizontal',
    )[0];
    bookmarkContainer.appendChild(createBookmark(link, name, id));
}

function createBookmark(link, name, id) {
    const i = document.createElement('span');
    i.textContent = name;
    i.className = 'custom_link_name';

    const d = document.createElement('div');
    d.innerHTML = '&#215;';
    d.classList.add('cross');
    // d.setAttribute('onclick', 'remove_bookmark(event)');
    // d.setAttribute('onkeypress', 'click_to_enter(event)');
    d.setAttribute('tabindex', '5');

    const newBookmark = document.createElement('a');
    // newBookmark.setAttribute('onclick', 'displayLoading(event)');
    // newBookmark.setAttribute('onkeypress', 'click_to_enter(event)');
    newBookmark.className = 'custom_bookmark clickable';
    newBookmark.setAttribute('href', link);
    newBookmark.setAttribute('id', id);
    newBookmark.setAttribute('tabindex', '1');
    newBookmark.appendChild(i);
    newBookmark.appendChild(d);

    return newBookmark;
}

export function saveBookmarks(link, name, id) {
    customBookmarks.push({
        link: link,
        name: name,
        id: id,
    });
    localStorage.setItem('saved_bookmarks', JSON.stringify(customBookmarks));
}

export function removeBookmarkFromLocalStorage(id) {
    customBookmarks = customBookmarks.filter((elem) => {
        return id != elem.id;
    });
    localStorage.setItem('saved_bookmarks', JSON.stringify(customBookmarks));
}

export function toggleRemoveButtons(visible) {
    switch (visible) {
        case 'show': {
            removableBorder('.1em solid tomato');
            crossDisplay(`block`);
            break;
        }
        case 'hide': {
            removableBorder('1px solid #ffffff38');
            crossDisplay(`none`);
            break;
        }
    }
}

export function downloadBookmarks(filename, text) {
    const element = document.createElement('a');
    element.setAttribute(
        'href',
        'data:text/plain;charset=utf-8,' + encodeURIComponent(text),
    );
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

export function removeBookmark(event) {
    event.preventDefault();
    console.log('click ' + event.target.parentNode.id);
    event.stopPropagation();
    if (confirm('Remove this bookmark?')) {
        removeBookmarkFromLocalStorage(event.target.parentNode.id);
        event.target.parentNode.style.display = 'none';
        // event.target.style.display = "none";
    }
    return;
}

