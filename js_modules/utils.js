import { BOOKMARKS_SAMPLE_URL } from './constants.js';
import { importBookmarks } from './preferences.js';
import { headingStyles } from './styles.js';

export function getSearchTerm() {
    return document.getElementsByClassName('searchTerm')[0];
}

export function addEventListenerOnID(id, event, func) {
    if (event == null) return;
    return document.getElementById(id).addEventListener(event, func);
}

export function addEventListenerOnClass(className, event, func) {
    const classList = document.getElementsByClassName(className);
    // console.log('on class length ' + classList.length);
    for (let i = 0; i < classList.length; i++) {
        classList[i].addEventListener(event, func);
    };
}

export function clickToEnter(event) {
    if (event.key === 'Enter') event.target.click();
};

export function fetchBookmarks() {
    fetch(BOOKMARKS_SAMPLE_URL)
        .then((res) => importBookmarks(null, res.text()));
}

export function toggleBackdropBlur(id, int) {
    document.getElementById(id).style.backdropFilter = `blur(${int / 1.1}em)`;
    setTimeout(() => {
        document.getElementById(id).style.backdropFilter = `blur(${int}em)`;
    }, 1);
};

export function scrollHighlightedWallpaperIntoView() {
    const wallpaper = document.getElementsByClassName('highlighted')[0];
    setTimeout(() => {
        wallpaper.scrollIntoView({ inline: 'center' });
    }, 50);
};

export async function stylizeText(id, int = 0) {
    document.getElementById(id).className = headingStyles[int];
};

let i = 0;
export function changeHeadingStyles(event = null, int) {
    if (event) event.stopPropagation();

    // console.log('in ' + int);
    i += int;
    if (i < 0) {
        i = headingStyles.length - 1;
    };
    if (i >= headingStyles.length) i = 0;
    // console.log(i);
    stylizeText('main-heading', i);
};

export function toggleArrows(str) {
    const arrows = document.getElementsByClassName('arrows');
    switch (str) {
        case 'show': {
            for (let i = 0; i < arrows.length; i++) {
                arrows[i].style.height = '1em';
                // arrows[i].style.display = 'block !important';
            }
            break;
        }
        case 'hide': {
            for (let i = 0; i < arrows.length; i++) {
                arrows[i].style.height = '0em';
            }
            break;
        }
    }
};

export function changeTextAccentColor(color) {
    const i = document.getElementById('main-heading');
    i.style.textShadow =
        `4px 4px 0 var(--${color}-color), 6px 6px 0px black`;
};
