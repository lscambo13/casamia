import * as Search from './js_modules/search.js';
import {
	addEventListenerOnID,
	addEventListenerOnClass,
	clickToEnter,
	fetchBookmarks,
	scrollHighlightedWallpaperIntoView,
	stylizeText,
	toggleArrows,
} from './js_modules/utils.js';
import { displayLoading, hideLoading } from './js_modules/loading_spinner.js';
import { changeGlow } from './js_modules/colors.js';
import {
	addBookmarkToHTML,
	loadBookmarks,
	removeBookmark,
	saveBookmarks,
	toggleRemoveButtons,
} from './js_modules/custom_bookmarks.js';
import {
	color,
	fetchWallpapersList,
	getWallpaperDetails,
	highlightSetWallpaper,
	selectedWallpaper,
	setWallpaper,
} from './js_modules/wallpapers.js';
import { loadSettings } from './js_modules/load_preferences.js';
import { dragElement } from './js_modules/utils/dragElement.js';
import {
	downloadWallpaper,
	exportBookmarks,
	importBookmarks,
	resetAll,
	resetBookmarks,
	toggleBlur,
	toggleClock,
	toggleFavicons,
	toggleGlow,
	toggleLabs,
	toggleWallpaper,
} from './js_modules/preferences.js';
import { isUrlValid } from './js_modules/validators.js';
import {
	animateCarouselDirection,
} from './js_modules/utils/displayCarouselAnimation.js';
import { askUserName } from './js_modules/onboarding.js';


const bottomFilmRollContainer = document.getElementById('wallpapers');
const wrap = document.getElementById('wrap');


window.hideWallpapers = (str, event) => {
	if (event) {
		event.stopPropagation();
	}
	hideLoading();
	switch (str) {
		case 'body': {
			if (
				bottomFilmRollContainer.classList.length == 2 &&
				bottomFilmRollContainer.classList[1] == 'animation_slide_up'
			) {
				bottomFilmRollContainer.classList.remove('animation_slide_up');
				bottomFilmRollContainer.classList.add('animation_slide_down');
				wrap.classList.remove('animation2_slide_up');
				wrap.classList.add('animation2_slide_down');
				toggleRemoveButtons('hide');
				toggleArrows('hide');
				changeGlow(null, 0);
			}
			break;
		};
		case 'button': {
			bottomFilmRollContainer.style.display = 'flex';
			if (
				bottomFilmRollContainer.classList.length < 2 ||
				bottomFilmRollContainer.classList[1] == 'animation_slide_down'
			) {
				bottomFilmRollContainer.classList.remove('animation_slide_down');
				bottomFilmRollContainer.classList.add('animation_slide_up');
				wrap.classList.remove('animation2_slide_down', 'startup_slide_down');
				wrap.classList.add('animation2_slide_up');
				changeGlow(null, 1);
				toggleRemoveButtons('show');
				toggleArrows('show');
				scrollHighlightedWallpaperIntoView();
			} else {
				bottomFilmRollContainer.classList.remove('animation_slide_up');
				bottomFilmRollContainer.classList.add('animation_slide_down');
				wrap.classList.remove('animation2_slide_up');
				wrap.classList.add('animation2_slide_down');
				changeGlow(null, 0);
				toggleRemoveButtons('hide');
				toggleArrows('hide');
			}
			break;
		}
	}
};


window.createNewBookmark = () => {
	let link = prompt('Type link');
	if (link == null) return;
	while (!isUrlValid(link)) {
		alert('Please type a website link');
		link = prompt('Type link');
	}

	let name = prompt('Type name');
	if (name == null) return;
	if (name == '') {
		name = link.replace('www.', '');
		if (name.includes('//')) {
			name = name.split('//')[1];
		}
	}
	name = name.substring(0, 3).toUpperCase();

	if (!link.includes('http')) {
		link = 'https://' + link;
	}
	const id = Date.now();

	addBookmarkToHTML(link, name, id);
	saveBookmarks(link, name, id);
};


window.changeWallpaper = (event) => {
	event.stopPropagation();
	let selection = event.target.title;
	if (!selection) selection = event.target.childNodes[1].title;
	// console.log("clicks " + selection + event.target.childNodes[1].title);
	const wall = getWallpaperDetails(selection);
	setWallpaper(wall[0], wall[1]);
	highlightSetWallpaper();
};

addEventListenerOnID('export-bookmarks-btn', 'click', exportBookmarks);
addEventListenerOnID('import-bookmarks-btn', 'change', importBookmarks);
addEventListenerOnID('download-wallpaper-btn', 'click', downloadWallpaper);
addEventListenerOnID('toggle-favicons-btn', 'click', toggleFavicons);
addEventListenerOnID('toggle-clock-btn', 'click', toggleClock);
addEventListenerOnID('toggle-glow-btn', 'click', toggleGlow);
addEventListenerOnID('update-username-btn', 'click', () => askUserName(1));
addEventListenerOnID('fetch-bookmarks-btn', 'click', fetchBookmarks);
addEventListenerOnID('reset-bookmarks-btn', 'click', resetBookmarks);
addEventListenerOnID('reset-all-btn', 'click', resetAll);

addEventListenerOnID('toggle-blur-cb', 'click', toggleBlur);
addEventListenerOnID('toggle-wallpaper-cb', 'click', toggleWallpaper);
addEventListenerOnID('toggle-labs-cb', 'click', toggleLabs);


// addEventListenerOnID('', 'click',);

addEventListenerOnID('google-search', 'click', Search.google);
addEventListenerOnID('movies-search', 'click', Search.movies);
addEventListenerOnID('tv-search', 'click', Search.tv);
addEventListenerOnID('games-search', 'click', Search.games);
addEventListenerOnID('ebooks-search', 'click', Search.ebooks);

addEventListenerOnID('searchTerm', 'input', Search.switchToCLI);
addEventListenerOnID('searchTerm', 'keypress', Search.enterToSearch);

addEventListenerOnID('fetch-bookmarks-btn', 'click', fetchBookmarks);

addEventListenerOnID('left-arrow', 'click', (event) => {
	event.stopPropagation();
	animateCarouselDirection(event, 'main-heading', 175, 'left');
});

addEventListenerOnID('right-arrow', 'click', (event) => {
	event.stopPropagation();
	animateCarouselDirection(event, 'main-heading', 175, 'right');
});

window.addEventListener('resize', () => {
	toggleBlur();
});


// ----------------------------------------------------------

document.addEventListener('DOMContentLoaded', async () => {
	// const wallpapersList = [];
	console.log('DOM load');
	loadBookmarks();
	toggleClock();
	stylizeText('main-heading', 0);

	await fetchWallpapersList();

	loadSettings();
	setWallpaper(selectedWallpaper, color);
	highlightSetWallpaper();

	// Make the DIV element draggable:
	dragElement(document.getElementById('labs'));

	askUserName();

	addEventListenerOnClass('clickable', 'keypress', clickToEnter);
	addEventListenerOnClass('custom_bookmark', 'click', displayLoading);
	addEventListenerOnClass('cross', 'click', removeBookmark);
});

window.addEventListener('hashchange', () => {
	const url = document.URL;

	if (!url.includes('#wallpapers')) {
		console.log('url found');
		hide_wallpapers_alt();
	}
	console.log('go back');
});

window.addEventListener('wheel', (e) => {
	const item = document.getElementById('wallpapers');
	if (e.deltaY > 0) {
		if (item.classList[1] == 'animation_slide_up') item.scrollLeft += 100;
	} else {
		if (item.classList[1] == 'animation_slide_up') item.scrollLeft -= 100;
	}
});

window.addEventListener('blur', () => {
	hideLoading();
	// console.log("no focus");
});
