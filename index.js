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
	loadSelectedWidgetStyle,
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
import { getLastUpdated } from './js_modules/utils/getLastUpdated.js';
import { blurLevel } from './js_modules/utils/blurLevel.js';
import { isItChristmas } from './js_modules/utils/letItSnow.js';
import {
	getDialogElementByID,
	showInputDialog,
} from './js_modules/utils/dialog.js';

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
					advancedSettingsButton.classList.add('animation_slide_right');
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
	const dialogTitle = 'Add new bookmark';
	const dialogDescription = `
	You may only use upto four letters as the bookmark name.`;
	const bookmarkLabel = 'Bookmark name';
	const bookmarkAddress = 'Link to website';

	const enableSubmitButton = () => {
		const modalSubmitButton = document.getElementById('modalSubmitButton');
		const inputFields = document.getElementsByClassName('inputField');
		for (const e of inputFields) {
			if (e.value.length) modalSubmitButton.disabled = false;
			else {
				modalSubmitButton.disabled = true;
				return;
			}
		}
		if (isUrlValid(inputFields[1].value)) {
			modalSubmitButton.disabled = false;
		} else modalSubmitButton.disabled = true;
	};

	const getDetailsForNewBookmark = () => {
		showInputDialog(
			dialogTitle,
			dialogDescription,
			[bookmarkLabel, bookmarkAddress],
			'Save',
			undefined,
			null,
			enableSubmitButton,
		).then((res) => {
			const id = Date.now();
			const name = res.inputValues[0];
			let link = res.inputValues[1];
			if (!link.startsWith('http')) link = `https://${link}`;
			// console.log(res.inputValues);
			addBookmarkToHTML(link, name, id);
			saveBookmarks(link, name, id);
		}).catch((e) => console.log(e));

		const label = getDialogElementByID(bookmarkLabel);
		label.setAttribute('maxlength', 4);
		label.setAttribute('placeholder', 'eg. YT');

		const address = getDialogElementByID(bookmarkAddress);
		address.setAttribute('placeholder', 'eg. youtube.com');
		address.value = 'https://';

		navigator.clipboard.readText().then((res) => {
			if (isUrlValid(res)) address.value = res;
		}).catch((err) => {
			console.log(err);
		});
	};
	getDetailsForNewBookmark();
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
	changeSlide('widget-slide', -1);
});

addEventListenerOnID('right-arrow', 'click', (event) => {
	event.stopPropagation();
	changeSlide('widget-slide', 1);
});

window.addEventListener('resize', () => {
	applyPreferences();
	isItChristmas();
});

// Start ----------------------------------------------------------

document.addEventListener('DOMContentLoaded', async () => {
	const btnInstall = document.getElementById('btn-install');
	let deferredPrompt;

	setDefaultPreferences();
	applyPreferences();
	loadBookmarks();
	loadDropdownPositions();
	wrap.style.opacity = 1;

	await fetchWallpapersList();
	setWallpaper(selectedWallpaper, color);
	highlightSetWallpaper();


	addEventListenerOnClass('clickable', 'keypress', clickToEnter);
	addEventListenerOnClass('custom_bookmark', 'click', displayLoading);
	addEventListenerOnClass('cross', 'click', removeBookmark);
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
	scrollToBottom();
	focusSearchBar('auto');
	getLastUpdated('version-preview');
	isItChristmas();
	loadSelectedWidgetStyle();
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
