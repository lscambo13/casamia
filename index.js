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
	getSearchTerm,
} from './js_modules/utils.js';
import { displayLoading, hideLoading } from './js_modules/loading_spinner.js';
import { changeGlow } from './js_modules/colors.js';
import {
	addBookmarkToHTML,
	loadBookmarks,
	saveBookmarks,
	toggleRemoveButtons,
} from './js_modules/custom_bookmarks.js';
import {
	fetchWallpapersList,
	getWallpaperDetails,
	highlightSetWallpaper,
	setWallpaper,
} from './js_modules/wallpapers.js';
import {
	applyPreferences,
	askCustomDomain,
	askCustomText,
	loadDropdownPositions,
	loadSelectedWidgetStyle,
	scrollToBottom,
} from './js_modules/load_preferences.js';
import {
	downloadWallpaper,
	exportBackup,
	exportBookmarks,
	importBackup,
	importBookmarks,
	resetAll,
	resetBookmarks,
	showNestedOptions,
	toggleFavicons,
} from './js_modules/preferences.js';
import { isUrlValid } from './js_modules/validators.js';
import { askUserName, preOnboarding } from './js_modules/onboarding.js';
import { saveDropdownPositions } from './js_modules/save_preferences.js';
// eslint-disable-next-line max-len
import { getLastUpdated } from './js_modules/utils/getLastUpdated.js';
import { blurLevel } from './js_modules/utils/blurLevel.js';
import { isItChristmas } from './js_modules/utils/letItSnow.js';
import { InputDialog } from './js_modules/utils/inputDialog.js';
import { isTouchDevice } from './js_modules/utils/isTouchDevice.js';
import { enableSubmitButton } from './js_modules/utils/enableSubmitButton.js';
import { genericAlert } from './js_modules/utils/alertDialog.js';
import { parseDl } from './js_modules/dl.js';
import { setCopyrightDate } from './js_modules/utils/setCopyrightDate.js';

const bottomFilmRollContainer = document.getElementById('wallpapers');
const wrap = document.getElementById('wrap');
const advancedSettingsButton = document.getElementById('toggle-labs-btn');
const modal = document.getElementById('advanced-settings-modal');
const modalBackground =
	document.getElementById('advanced-settings-modal-background-overlay');

let areAdvancedSettingsOpen = false;
let areWallpapersOpen = false;

let timeout;
const wallpapersPanel = (str) => {
	hideLoading();
	switch (str) {
		case 'close': {
			document.title = document.title
				.replace('Backgrounds', 'Search');
			history.pushState({ loc: 'home' }, '', '?home');
			bottomFilmRollContainer.classList.remove('animation_slide_up');
			setTimeout(() => advancedSettingsButton.classList
				.remove('advanced-settings-button-right'), 350);
			bottomFilmRollContainer.classList.add('animation_slide_down');
			wrap.classList.remove('animation2_slide_up');
			wrap.classList.add('animation2_slide_down');
			clearTimeout(timeout);

			toggleRemoveButtons('hide');
			toggleArrows('hide');
			changeGlow(null, 0);
			setTimeout(() => blurLevel(1), 400);
			areWallpapersOpen = false;
			break;
		};
		case 'open': {
			bottomFilmRollContainer.style.display = 'flex';
			blurLevel(0);
			bottomFilmRollContainer.classList.remove('animation_slide_down');
			bottomFilmRollContainer.classList.add('animation_slide_up');
			wrap.classList.remove('animation2_slide_down', 'startup_slide_down');
			wrap.classList.add('animation2_slide_up');
			setTimeout(() => {
				advancedSettingsButton.classList
					.add('advanced-settings-button-right');
				scrollHighlightedWallpaperIntoView();
			}, 350);
			changeGlow(null, 1);
			timeout = setTimeout(() => toggleRemoveButtons('show'), 450);
			toggleArrows('show');
			document.title = document.title
				.replace('Search', 'Backgrounds');
			history.pushState({ loc: 'backgrounds' }, '', '?backgrounds');
			areWallpapersOpen = true;
			break;
		}
	}
};

window.createNewBookmark = () => {
	const inputDialogTitle = 'Add new bookmark';
	const inputDialogDescription = `
	You may only use upto four letters as the bookmark name.`;
	const bookmarkLabel = 'Bookmark name';
	const bookmarkAddress = 'Link to website';

	InputDialog.show(
		inputDialogTitle,
		inputDialogDescription,
		[bookmarkLabel, bookmarkAddress],
		'Save',
		undefined,
		null,
		[() => enableSubmitButton(null, true), null],
		() => {
			const label = InputDialog.getInputFields()[0];
			// label.setAttribute('maxlength', 4);
			label.setAttribute('placeholder', 'e.g. YT');

			const address = InputDialog.getInputFields()[1];
			address.setAttribute('placeholder', 'e.g. youtube.com');
			address.value = 'https://';

			navigator.clipboard.readText().then((res) => {
				if (isUrlValid(res)) {
					address.value = res.replaceAll(' ', '');
				};
			}).catch((err) => {
				console.log(err);
			});
		},
	).then((res) => {
		const id = Date.now();
		const name = res.inputValues[0];
		let link = res.inputValues[1].replaceAll(' ', '');
		if (!link.startsWith('http')) link = `https://${link}`;
		// console.log(res.inputValues);
		addBookmarkToHTML(link, name, id);
		saveBookmarks(link, name, id);
	}).catch((e) => console.log(e));
};

window.changeWallpaper = (event) => {
	event.stopPropagation();
	let selection = event.target.title;
	if (!selection) selection = event.target.childNodes[1].title;
	const wall = getWallpaperDetails(selection);
	setWallpaper(wall[0], wall[1]);
	highlightSetWallpaper();
};

addEventListenerOnID('export-bookmarks-btn', 'click', exportBookmarks);
addEventListenerOnID('import-bookmarks-btn', 'change', importBookmarks);
addEventListenerOnID('export-backup-btn', 'click', exportBackup);
addEventListenerOnID('import-backup-btn', 'change', importBackup);
addEventListenerOnID('download-wallpaper-btn', 'click', downloadWallpaper);
addEventListenerOnID('toggle-favicons-btn', 'click', toggleFavicons);
addEventListenerOnID('update-username-btn', 'click', askUserName);
addEventListenerOnID('update-customtext-btn', 'click', askCustomText);
addEventListenerOnID('deep-search-btn', 'click', (event) => {
	showNestedOptions('deep-search-nested');
	const arrow = document.getElementById('deep-search-btn-arrow');
	arrow.classList.toggle('fa-angle-down');
	arrow.classList.toggle('fa-angle-up');
});
addEventListenerOnID('update-customdomain-btn', 'click', askCustomDomain);
addEventListenerOnID('fetch-bookmarks-btn', 'click', fetchBookmarks);
addEventListenerOnID('reset-bookmarks-btn', 'click', resetBookmarks);
addEventListenerOnID('reset-all-btn', 'click', resetAll);

function openAdvancedSettings() {
	wallpapersPanel('close');
	history.pushState({ loc: 'settings' }, '', '?settings');
	setTimeout(() => blurLevel(0), 420);
	document.title = document.title.replace('Search', 'Settings');
	document.body.classList.add('justifySpaceBetween');
	// wrap.style.opacity = 0;
	wrap.style.display = 'none';
	modal.style.display = 'block';
	modalBackground.style.display = 'block';
	areAdvancedSettingsOpen = true;
};

function closeAdvancedSettings() {
	document.title = document.title.replace('Settings', 'Search');
	history.pushState({ loc: 'home' }, '', '?home');
	document.body.classList.remove('justifySpaceBetween');
	wrap.style.display = 'block';
	// wrap.style.opacity = 1;
	modal.style.display = 'none';
	modalBackground.style.display = 'none';
	setTimeout(() => blurLevel(1), 100);
	areAdvancedSettingsOpen = false;
};

addEventListenerOnID('modal-close-btn', 'click', closeAdvancedSettings);
addEventListenerOnID('toggle-labs-btn', 'click', openAdvancedSettings);

addEventListenerOnID('search-btn', 'click', Search.webSearch);
addEventListenerOnID('movies-search', 'click', Search.movies);
addEventListenerOnID('tv-search', 'click', Search.tv);
addEventListenerOnID('games-search', 'click', Search.games);
addEventListenerOnID('ebooks-search', 'click', Search.ebooks);
addEventListenerOnID('downloader-button', 'click', parseDl);
addEventListenerOnID('searchTerm', 'input', Search.processSearchboxInput);
addEventListenerOnID('searchTerm', 'click', () => {
	const x = new InputEvent('input');
	getSearchTerm().dispatchEvent(x);
});
addEventListenerOnID('searchBarFocusMode', 'click', Search.collapseAutofill);
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

window.addEventListener('blur', () => {
	hideLoading();
});

window.addEventListener('appinstalled', (event) => {
	console.log('installed');
});

onload = (event) => {
	const slider = document.getElementById('main-heading-slider');
	slider.classList.remove('nowrap');
};

addEventListenerOnID('settings_button', 'click', (event) => {
	if (areWallpapersOpen) wallpapersPanel('close', event);
	else if (!areWallpapersOpen) wallpapersPanel('open', event);
});

const pressAndHold = () => {
	const target = document.body;
	let timerId;
	let timer = 250;
	const clearTimer = () => {
		clearInterval(timerId);
		timerId = null;
	};

	const clickEvent = (event) => {
		const x = event.target.id;
		const validElements = ['gradient_overlay',
			'wrap',
			'bookmarks',
			'autofillContainer',
			'flex-main-container-vertical',
			'subtitle',
			'footer',
		];
		if (
			validElements.includes(x)
		) {
			if (areWallpapersOpen) timer = 1;
			else timer = 250;

			timerId = setInterval(() => {
				if (areWallpapersOpen) wallpapersPanel('close');
				else if (!areWallpapersOpen) wallpapersPanel('open');
				clearTimer();
			}, timer);
		}
	};

	target.addEventListener('mousedown', clickEvent);
	target.addEventListener('mouseup', clearTimer);
	target.addEventListener('mouseout', clearTimer);

	target.addEventListener('touchstart', clickEvent);
	target.addEventListener('touchend', clearTimer);
	target.addEventListener('touchcancel', clearTimer);

	return () => {
		target.removeEventListener('mousedown', clickEvent);
		target.removeEventListener('mouseup', clearTimer);
		target.removeEventListener('mouseout', clearTimer);
		target.removeEventListener('touchstart', clickEvent);
		target.removeEventListener('touchend', clearTimer);
		target.removeEventListener('touchcancel', clearTimer);
		console.log('un-focus', timerId);
	};
};

const switchPage = () => {
	window.addEventListener('popstate', (e) => {
		if (areWallpapersOpen) {
			wallpapersPanel('close');
		} else if (areAdvancedSettingsOpen) {
			closeAdvancedSettings();
		} else if (!areWallpapersOpen && !areAdvancedSettingsOpen) {
			history.go(-1);
			console.log('cant go back anymore', -history.length - 1);
		}
	});

	let page = window.location.href;
	page = page.split('/?')[1];
	if (!page) history.pushState({ loc: 'home' }, '', '?home');
	else if (page == 'settings') openAdvancedSettings();
	else if (page == 'backgrounds') wallpapersPanel('open');
};

const postOnboarding = () => {
	const btnInstall = document.getElementById('btn-install');
	let deferredPrompt;
	applyPreferences();
	loadBookmarks();
	loadDropdownPositions();
	wrap.style.opacity = 1;

	fetchWallpapersList();
	highlightSetWallpaper();

	pressAndHold();
	addEventListenerOnClass('clickable', 'keypress', clickToEnter);

	addEventListenerOnClass('bookmark-container', 'click', (e) => {
		const target = e.target.closest('.bookmark-container').querySelector('a');
		if (target.href) {
			const loadingTarget = target.querySelector('.loading');
			displayLoading(loadingTarget);
			window.open(target.href, '_self');
		}
	});

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
	if (sessionStorage.getItem('focus') == 'on') {
		document.getElementById('searchTerm').focus();
		document.getElementById('searchTerm').click();
	}
	getLastUpdated('version-preview');
	isItChristmas();
	loadSelectedWidgetStyle();
	switchPage();
};

// Start ----------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
	// preOnboarding();
	setCopyrightDate();
	if (localStorage.getItem('onBoarding') == '1') {
		postOnboarding();
		console.log('Already onboard.');
	} else {
		console.log('Onboarding...');
		preOnboarding().then(() => {
			if (isTouchDevice()) {
				setTimeout(() => {
					genericAlert('Information',
						'Press and hold on empty area to open settings.');
				}, 5000);
			}
			postOnboarding();
			console.log('Onboarding complete.');
		});
	}
}, { once: true });

// ---------------------------------------------------------- End

