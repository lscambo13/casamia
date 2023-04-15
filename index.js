import * as Search from './js_modules/search.js';
import {
	addEventListenerOnID,
	addEventListenerOnClass,
	clickToEnter,
	fetchBookmarks,
	scrollHighlightedWallpaperIntoView,
	toggleArrows,
	changeSlide,
	addEventListenerOnTag,
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
import {
	applyPreferences,
	askCustomDomain,
	askCustomText,
	loadDropdownPositions,
} from './js_modules/load_preferences.js';
import {
	downloadWallpaper,
	exportBookmarks,
	importBookmarks,
	resetAll,
	resetBookmarks,
	toggleFavicons,
} from './js_modules/preferences.js';
import { isUrlValid } from './js_modules/validators.js';
import { askUserName, setDefaultPreferences } from './js_modules/onboarding.js';
import {
	closeAdvancedSettings,
	openAdvancedSettings,
} from './js_modules/modals/advanced_settings.js';
import { saveDropdownPositions } from './js_modules/save_preferences.js';

const bottomFilmRollContainer = document.getElementById('wallpapers');
const wrap = document.getElementById('wrap');
const advancedSettingsButton = document.getElementById('toggle-labs-btn');

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
				advancedSettingsButton.classList.remove('animation_slide_right');
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
				advancedSettingsButton.classList.add('animation_slide_right');
				changeGlow(null, 1);
				toggleRemoveButtons('show');
				toggleArrows('show');
				scrollHighlightedWallpaperIntoView();
			} else {
				bottomFilmRollContainer.classList.remove('animation_slide_up');
				advancedSettingsButton.classList.remove('animation_slide_right');
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
// addEventListenerOnID('toggle-clock-btn', 'click', toggleClock);
// addEventListenerOnID('toggle-glow-btn', 'click', toggleGlow);
addEventListenerOnID('update-username-btn', 'click', askUserName);
addEventListenerOnID('update-customtext-btn', 'click', askCustomText);
addEventListenerOnID('update-customdomain-btn', 'click', askCustomDomain);
addEventListenerOnID('fetch-bookmarks-btn', 'click', fetchBookmarks);
addEventListenerOnID('reset-bookmarks-btn', 'click', resetBookmarks);
addEventListenerOnID('reset-all-btn', 'click', resetAll);

// addEventListenerOnID('toggle-blur-cb', 'click', toggleBlur);
// addEventListenerOnID('toggle-wallpaper-cb', 'click', toggleWallpaper);
addEventListenerOnClass('modal-close-btn', 'click', closeAdvancedSettings);
addEventListenerOnID('toggle-labs-btn', 'click', openAdvancedSettings);
addEventListenerOnID('terms-btn', 'click', openAdvancedSettings);

addEventListenerOnID('search-btn', 'click', Search.webSearch);
addEventListenerOnID('movies-search', 'click', Search.movies);
addEventListenerOnID('tv-search', 'click', Search.tv);
addEventListenerOnID('games-search', 'click', Search.games);
addEventListenerOnID('ebooks-search', 'click', Search.ebooks);
addEventListenerOnID('searchTerm', 'input', Search.switchToCLI);
addEventListenerOnID('searchTerm', 'keypress', Search.enterToSearch);
addEventListenerOnID('fetch-bookmarks-btn', 'click', fetchBookmarks);

addEventListenerOnID('left-arrow', 'click', (event) => {
	event.stopPropagation();
	changeSlide('widget-slide', 1);
});

addEventListenerOnID('right-arrow', 'click', (event) => {
	event.stopPropagation();
	changeSlide('widget-slide', -1);
});

window.addEventListener('resize', applyPreferences);

addEventListenerOnID('wallpapers', 'wheel', (e) => {
	// e.stopPropagation();
	const item = document.getElementById('wallpapers');
	if (e.deltaY > 0) {
		if (item.classList[1] == 'animation_slide_up') item.scrollLeft += 500;
	} else {
		if (item.classList[1] == 'animation_slide_up') item.scrollLeft -= 500;
	}
	// console.log(item.scroll());
});

addEventListenerOnID('main-heading-slider', 'wheel', (e) => {
	// e.stopPropagation();
	const item = document.getElementById('wallpapers');
	const homeWidget = document.getElementById('main-heading-slider');
	if (e.deltaY > 0) {
		if (item.classList[1] == 'animation_slide_up') homeWidget.scrollLeft += 700;
	} else {
		if (item.classList[1] == 'animation_slide_up') homeWidget.scrollLeft -= 700;
	}
	// console.log(homeWidget.scroll());
});

// ----------------------------------------------------------

document.addEventListener('DOMContentLoaded', async () => {
	setDefaultPreferences();
	applyPreferences();
	loadBookmarks();
	// toggleClock('widget-slide');
	// toggleGreeting('on');
	// stylizeText('main-heading', 0);

	await fetchWallpapersList();

	// loadSettings();
	setWallpaper(selectedWallpaper, color);
	highlightSetWallpaper();

	// // Make the DIV element draggable:
	// dragElement(document.getElementById('labs'));

	loadDropdownPositions();

	addEventListenerOnClass('clickable', 'keypress', clickToEnter);
	addEventListenerOnClass('custom_bookmark', 'click', displayLoading);
	addEventListenerOnClass('cross', 'click', removeBookmark);
	// addEventListenerOnClass('custom-button', 'click', saveButtonValues);
	addEventListenerOnTag('select', 'change', saveDropdownPositions);
});

window.addEventListener('hashchange', () => {
	const url = document.URL;

	if (!url.includes('#wallpapers')) {
		console.log('url found');
		// hide_wallpapers_alt();
	}
	console.log('go back');
});

window.addEventListener('blur', () => {
	hideLoading();
	// console.log("no focus");
});
