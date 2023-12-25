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
	focusSearchBar,
	loadDropdownPositions,
	loadSelectedWidgetstyle,
	scrollToBottom,
} from './js_modules/load_preferences.js';
import {
	downloadWallpaper,
	exportBookmarks,
	importBookmarks,
	resetAll,
	resetBookmarks,
	showNestedOptions,
	toggleFavicons,
} from './js_modules/preferences.js';
import { isUrlValid } from './js_modules/validators.js';
import { askUserName, setDefaultPreferences } from './js_modules/onboarding.js';
import {
	closeAdvancedSettings,
	openAdvancedSettings,
} from './js_modules/modals/advanced_settings.js';
import { saveDropdownPositions } from './js_modules/save_preferences.js';
// eslint-disable-next-line max-len
import { intersectionObserver } from './js_modules/utils/intersectionObserver.js';
import { getLastUpdated } from './js_modules/utils/getLastUpdated.js';
import { displayFlex } from './js_modules/utils/displayStyles.js';
import { blurLevel } from './js_modules/utils/blurLevel.js';
import { isItChristmas } from './js_modules/utils/letItSnow.js';

const bottomFilmRollContainer = document.getElementById('wallpapers');
const wrap = document.getElementById('wrap');
const advancedSettingsButton = document.getElementById('toggle-labs-btn');


let timeout;
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
				document.title = document.title
					.replace('Backgrounds', 'Search');
				bottomFilmRollContainer.classList.remove('animation_slide_up');
				setTimeout(() => advancedSettingsButton.classList
					.remove('animation_slide_right'), 350);
				bottomFilmRollContainer.classList.add('animation_slide_down');
				wrap.classList.remove('animation2_slide_up');
				wrap.classList.add('animation2_slide_down');
				clearTimeout(timeout);

				toggleRemoveButtons('hide');
				toggleArrows('hide');
				changeGlow(null, 0);
				setTimeout(() => blurLevel(1), 400);
			}
			break;
		};
		case 'button': {
			bottomFilmRollContainer.style.display = 'flex';
			if (
				bottomFilmRollContainer.classList.length < 2 ||
				bottomFilmRollContainer.classList[1] == 'animation_slide_down'
			) {
				blurLevel(0);
				bottomFilmRollContainer.classList.remove('animation_slide_down');
				bottomFilmRollContainer.classList.add('animation_slide_up');
				wrap.classList.remove('animation2_slide_down', 'startup_slide_down');
				wrap.classList.add('animation2_slide_up');
				setTimeout(() => {
					advancedSettingsButton.classList.add('animation_slide_right')
					scrollHighlightedWallpaperIntoView();
				}, 350);
				changeGlow(null, 1);
				timeout = setTimeout(() => toggleRemoveButtons('show'), 450);
				toggleArrows('show');
				document.title = document.title
					.replace('Search', 'Backgrounds');
			} else {
				document.title = document.title
					.replace('Backgrounds', 'Search');
				bottomFilmRollContainer.classList.remove('animation_slide_up');
				setTimeout(() => advancedSettingsButton.classList
					.remove('animation_slide_right'), 350);
				bottomFilmRollContainer.classList.add('animation_slide_down');
				wrap.classList.remove('animation2_slide_up');
				wrap.classList.add('animation2_slide_down');
				changeGlow(null, 0);
				clearTimeout(timeout);
				toggleRemoveButtons('hide');
				toggleArrows('hide');
				setTimeout(() => blurLevel(1), 400);
			}
			break;
		}
	}
};

window.createNewBookmark = () => {
	let clipboardText = 'https://www.'
	navigator.clipboard.readText().then((res) => {
		if (isUrlValid(res)) clipboardText = res
		getDetailsForNewBookmark()
	}).catch(err => {
		console.log(err)
		getDetailsForNewBookmark()
	});

	const getDetailsForNewBookmark = () => {
		let link = prompt('Please type or paste a website address', clipboardText);
		if (link == null) return;
		while (!isUrlValid(link)) {
			alert('The entered address does not seem to be valid');
			link = prompt('Please type or paste a website address', clipboardText);
		}
		let name = prompt('Type the bookmark name\n(Maximum four letters are allowed)');
		if (name == null) return;
		while (name == '') {
			alert('The entered name does not seem to be valid');
			name = prompt('Please type the bookmark name\n(Maximum four letters are allowed)');
		}
		// if (name == '') {
		// 	name = link.replace('www.', '');
		// 	if (name.includes('//')) {
		// 		name = name.split('//')[1];
		// 	}
		// }
		name = name.substring(0, 4);
		if (!link.includes('http')) {
			link = 'https://' + link;
		}
		const id = Date.now();

		addBookmarkToHTML(link, name, id);
		saveBookmarks(link, name, id);
	}
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
addEventListenerOnID('deep-search-btn', 'click', (event) => {
	showNestedOptions('deep-search-nested');
	const arrow = document.getElementById('deep-search-btn');
	arrow.childNodes[3].classList.toggle('fa-angle-down');
	arrow.childNodes[3].classList.toggle('fa-angle-up');
});
addEventListenerOnID('update-customdomain-btn', 'click', askCustomDomain);
addEventListenerOnID('fetch-bookmarks-btn', 'click', fetchBookmarks);
addEventListenerOnID('reset-bookmarks-btn', 'click', resetBookmarks);
addEventListenerOnID('reset-all-btn', 'click', resetAll);

// addEventListenerOnID('toggle-blur-cb', 'click', toggleBlur);
// addEventListenerOnID('toggle-wallpaper-cb', 'click', toggleWallpaper);
addEventListenerOnClass('modal-close-btn', 'click', closeAdvancedSettings);
addEventListenerOnID('toggle-labs-btn', 'click', openAdvancedSettings);

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

window.addEventListener('resize', () => {
	applyPreferences();
	isItChristmas()
});

// addEventListenerOnID('wallpapers', 'wheel', (e) => {
// 	// e.stopPropagation();
// 	const item = document.getElementById('wallpapers');
// 	if (e.deltaY > 0) {
// 		if (item.classList[1] == 'animation_slide_up') item.scrollLeft += 500;
// 	} else {
// 		if (item.classList[1] == 'animation_slide_up') item.scrollLeft -= 500;
// 	}
// 	// console.log(item.scroll());
// });

// addEventListenerOnID('main-heading-slider', 'wheel', (e) => {
// 	// e.stopPropagation();
// 	const item = document.getElementById('wallpapers');
// 	const homeWidget = document.getElementById('main-heading-slider');
// 	if (e.deltaY > 0) {
// 		if (item.classList[1] == 'animation_slide_up') homeWidget.scrollLeft += 700;
// 	} else {
// 		if (item.classList[1] == 'animation_slide_up') homeWidget.scrollLeft -= 700;
// 	}
// 	// console.log(homeWidget.scroll());
// });

// Start ----------------------------------------------------------

document.addEventListener('DOMContentLoaded', async () => {
	const btnInstall = document.getElementById('btn-install');

	setDefaultPreferences();
	applyPreferences();
	loadBookmarks();
	let deferredPrompt;

	displayFlex('bookmarks');
	loadSelectedWidgetstyle();
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

	addEventListenerOnID('btn-install', 'click', (e) => {
		deferredPrompt.prompt();
		deferredPrompt.userChoice.then((choiceResult) => {
			if (choiceResult.outcome === 'accepted') {
				console.log('user accepted prompt');
			}
			deferredPrompt = null;
		});
	});

	window.addEventListener('beforeinstallprompt', (event) => {
		event.preventDefault();
		deferredPrompt = event;
		btnInstall.style.display = 'block';
	});
	intersectionObserver('main-heading-slider', 'widget-slide');
	scrollToBottom();
	focusSearchBar('auto');
	getLastUpdated('version-preview');
	isItChristmas();
});

// ---------------------------------------------------------- End

window.addEventListener('hashchange', () => {
	const url = document.URL;

	if (!url.includes('#wallpapers')) {
		// console.log('url found');
		hideWallpapers('body');
		closeAdvancedSettings();
	}
	// console.log('go back');
});

window.addEventListener('blur', () => {
	hideLoading();
	// console.log("no focus");
});

window.addEventListener('appinstalled', (event) => {
	console.log('installed');
});

onload = (event) => {
	document.getElementById('main-heading-slider')
		.classList.remove('nowrap');
};
