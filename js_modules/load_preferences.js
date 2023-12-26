import {
	BING_SEARCH_DOMAIN,
	DEF_CUSTOM_TEXT,
	DUCKDUCKGO_SEARCH_DOMAIN,
	GOOGLE_SEARCH_DOMAIN,
} from './constants.js';
import { displayClock, refreshGreeting } from './preferences.js';
import { fixBackgroundBlurOnResize } from './utils.js';
import { intersectionObserver } from './utils/intersectionObserver.js';

const PREF_MAP = {
	'bg-img-drop': backgroundImage,
	'bg-blur-drop': backgroundBlur,
	// 'bg-glow-drop': backgroundGlow,
	// 'weather-display-drop': displayWeather,
	'footer-display-drop': displayFooter,
	'def-widget-drop': defaultWidget,
	// 'widget-style-drop': widgetStyle,
	'greeting-display-drop': displayGreeting,
	'def-widget-display-drop': displayWidget,
	// 'show-seconds-drop': showSeconds,
	// 'clock-style-drop': clockStyle,
	// 'am-pm-style-drop': amPmStyle,
	'def-search-engine-drop': defaultSearchEngine,
	'searchbar-position-drop': defaultSearchbarPosition,
	'searchbar-color-theme-drop': searchbarTheme,
	'focus-search-drop': focusSearchBar,
	// 'show-titles-drop': showTitles,
	'movies-search-display-drop': moviesSearch,
	'tv-search-display-drop': tvSearch,
	'games-search-display-drop': gamesSearch,
	'ebooks-search-display-drop': ebooksSearch,
	'add-bookmark-display-drop': displayAddBookmark,
};

function backgroundImage(value) {
	const overlay = document.getElementById('overlay');
	switch (value) {
		case 'hidden': {
			overlay.style.backgroundColor = 'rgba(0, 0, 0, 1)';
			// console.log(value);
			break;
		};
		case 'shown': {
			overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.375)';
			// console.log(value);
			break;
		};
	}
};

function backgroundBlur(value) {
	const overlay = document.getElementById('overlay');

	switch (value) {
		case 'off': {
			overlay.style.backdropFilter = 'blur(0em)';
			break;
		};
		case 'on': {
			overlay.style.backdropFilter = 'blur(1em)';
			fixBackgroundBlurOnResize('overlay');
			break;
		};
	}
};
// function backgroundGlow() { };

// function displayWeather() { };

function displayFooter(value) {
	const footer = document.getElementById('footer');

	switch (value) {
		case 'off': {
			footer.classList.add('hidden');
			break;
		};
		case 'on': {
			footer.classList.remove('hidden');
			break;
		};
	}
};

export function focusSearchBar(value) {
	const searchbar = document.getElementById('searchTerm');

	switch (value) {
		case 'off': {
			// searchbar.focus();
			sessionStorage.setItem('focus', 'off');
			break;
		};
		case 'on': {
			sessionStorage.setItem('focus', 'on');
			break;
		};
		case 'auto': {
			if (sessionStorage.getItem('focus') == 'on'); {
				searchbar.focus();
				searchbar.click();
			}
			// console.log(sessionStorage.getItem('focus'));
			break;
		}
	}
};

function displayWidget(value) {
	const widget = document.getElementById('main-heading-slider');

	function toggleDefaultWidgetButton(value) {
		switch (value) {
			case 'show': {
				document.getElementById('def-widget-drop-container')
					.classList.remove('nested-close');
				break;
			};
			case 'hide': {
				document.getElementById('def-widget-drop-container')
					.classList.add('nested-close');
				break;
			};
		}
	}
	switch (value) {
		case 'off': {
			widget.classList.add('hidden');
			toggleDefaultWidgetButton('hide')
			break;
		};
		case 'on': {
			widget.classList.remove('hidden');
			toggleDefaultWidgetButton('show')
			break;
		};
	}

};

const widgetSlides = document.getElementsByClassName('widget-slide');

function applyText(input) {
	for (const i of widgetSlides) {
		i.textContent = input;
	}
};

function defaultWidget(value) {
	function loadCustomText() {
		let customText = localStorage.getItem('customWidgetText');
		if (customText == null) {
			localStorage.setItem('customWidgetText', DEF_CUSTOM_TEXT);
			customText = localStorage.getItem('customWidgetText');
			customText = askCustomText();
		}
		applyText(customText);
		// return customText;
	}

	function toggleCustomTextButton(value) {
		switch (value) {
			case 'show': {
				document.getElementById('update-customtext-btn')
					.classList.remove('nested-close');
				break;
			};
			case 'hide': {
				document.getElementById('update-customtext-btn')
					.classList.add('nested-close');
				break;
			};
		}
	}

	switch (value) {
		case 'casamia': {
			toggleCustomTextButton('hide');
			displayClock('off');
			applyText('Casa Mia');
			break;
		};
		case 'search': {
			toggleCustomTextButton('hide');
			displayClock('off');
			applyText('Search');
			break;
		};
		case 'clock': {
			toggleCustomTextButton('hide');
			displayClock('on');
			break;
		};
		case 'custom': {
			displayClock('off');
			toggleCustomTextButton('show');
			loadCustomText();
			break;
		};
	}
};

export function askCustomText() {
	const savedText = localStorage.getItem('customWidgetText');
	const customText = prompt('Enter custom text...', savedText);
	if (customText == null) return;
	localStorage.setItem('customWidgetText', customText);
	applyText(customText);
	updateCustomTextPreview();
	return customText;
}

export function askCustomDomain() {
	const savedDomain = localStorage.getItem('customDomain');
	const customDomain = prompt('Enter custom domain...', savedDomain);
	if (customDomain == null) return;
	localStorage.setItem('customDomain', customDomain);
	applyDomain(customDomain);
	updateCustomDomainPreview();
	return customDomain;
}

// function widgetStyle() { };

let greetingLoop = null;
function displayGreeting(value) {
	const subtitle = document.getElementById('subtitle');
	clearInterval(greetingLoop);
	switch (value) {
		case 'off': {
			subtitle.classList.add('collapsed');
			break;
		};
		case 'on': {
			subtitle.classList.remove('collapsed');
			refreshGreeting()
			greetingLoop = setInterval(refreshGreeting, 20000);
			break;
		};
	}
};

// function showSeconds() { };

// function clockStyle() { };

// function amPmStyle() { };

function applyDomain(domain) {
	localStorage.setItem('default-search-url', domain);
}

export function defaultSearchEngine(value) {
	function loadCustomDomain() {
		let customDomain = localStorage.getItem('customDomain');
		if (customDomain == null) {
			localStorage.setItem('customDomain', GOOGLE_SEARCH_DOMAIN);
			customDomain = localStorage.getItem('customDomain');
			customDomain = askCustomDomain();
		}
		applyDomain(customDomain);
		// return customText;
	}

	function applyIcon(value) {
		document.getElementById('search-btn-icon').className = value;
		localStorage.setItem('default-search-icon', value);
	}

	function toggleCustomDomainButton(value) {
		switch (value) {
			case 'show': {
				document.getElementById('update-customdomain-btn')
					.classList.remove('nested-close');
				break;
			};
			case 'hide': {
				document.getElementById('update-customdomain-btn')
					.classList.add('nested-close');
				break;
			};
		}
	}

	switch (value) {
		case 'google': {
			toggleCustomDomainButton('hide');
			applyDomain(GOOGLE_SEARCH_DOMAIN);
			applyIcon('fa fa-google');
			break;
		};
		case 'bing': {
			toggleCustomDomainButton('hide');
			applyDomain(BING_SEARCH_DOMAIN);
			applyIcon('fa fa-search');
			break;
		};
		case 'duckduckgo': {
			toggleCustomDomainButton('hide');
			applyDomain(DUCKDUCKGO_SEARCH_DOMAIN);
			applyIcon('fa fa-search');
			break;
		};
		case 'custom': {
			toggleCustomDomainButton('show');
			loadCustomDomain();
			// applyDomain(GOOGLE_SEARCH_DOMAIN);
			applyIcon('fa fa-search');
			break;
		};
	}
};

function searchbarTheme(value) {
	const searchInput = document.getElementById('searchTerm');
	const searchButton = document.getElementById('search-btn');

	switch (value) {
		case 'glass': {
			searchInput.classList.add('searchbox-style-glass');
			searchInput.classList.remove('searchbox-style-light');
			searchButton.classList.add('searchbox-style-glass');
			searchButton.classList.remove('searchbox-style-light');
			break;
		};
		case 'light': {
			searchInput.classList.remove('searchbox-style-glass');
			searchInput.classList.add('searchbox-style-light');
			searchButton.classList.remove('searchbox-style-glass');
			searchButton.classList.add('searchbox-style-light');
			break;
		};
	}
};

function defaultSearchbarPosition(value) {
	const searchbar = document.getElementById('searchbar');
	const wrap = document.getElementById('wrap');

	switch (value) {
		case 'top': {
			searchbar.style.order = '0';
			document.body.style.justifyContent = 'space-between'
			// wrap.style.flex = '1';
			break;
		};
		case 'bottom': {
			searchbar.style.order = '1';
			document.body.style.justifyContent = 'flex-end'
			// wrap.style.flex = '0';
			break;
		};
	}
};

export function scrollToBottom() {
	if (document.getElementById('searchbar').style.order == '1') {
		window.scrollTo(0, document.body.scrollHeight);
	}
}

// function showTitles() { };

export function applyPreferences() {
	const preferencesObj =
		JSON.parse(localStorage.getItem('advDropdownValues'));

	const preferencesArray = Object.entries(preferencesObj);
	for (const i of preferencesArray) {
		const func = PREF_MAP[i[0]];
		if (func) func(i[1]);
	}

	// apply previews
	updateUserNamePreview();
	updateCustomTextPreview();
	updateCustomDomainPreview();
}

export function loadDropdownPositions() {
	const loadedFromStorage =
		Object.entries(JSON.parse(localStorage.getItem('advDropdownValues')));
	// if (!loadButtonPreviews) return;
	for (const i of loadedFromStorage) {
		const elem = document.getElementById(i[0]);
		if (elem) {
			elem.value = i[1];
		}
	}
};

export function updateUserNamePreview() {
	document.getElementById('update-username-btn-preview').
		textContent = localStorage.getItem('userName');
}

export function updateCustomTextPreview() {
	document.getElementById('update-customtext-btn-preview').
		textContent = localStorage.getItem('customWidgetText');
}

export function updateCustomDomainPreview() {
	document.getElementById('update-customdomain-btn-preview').
		textContent = localStorage.getItem('customDomain');
}

export function loadSelectedWidgetstyle() {
	document.getElementById(localStorage.getItem('selected-widget-style'))
		.scrollIntoView();

	setTimeout(() => {
		intersectionObserver('main-heading-slider', 'widget-slide');
	}, 500)
	// console.log('loading widget style');
}

export function updateAmPmStyle(amPm) {
	const style = localStorage.getItem('selected-widget-style');
	if (style == 'widget-2' || style == 'widget-7' || style == 'widget-5') {
		return amPm.toLowerCase();
	}
	return amPm;
}

function moviesSearch(value) {
	const button = document.getElementById('movies-search');
	switch (value) {
		case 'hidden': {
			button.style.display = 'none';
			break;
		};
		case 'shown': {
			button.style.display = 'flex';
			break;
		};
	}
}
function tvSearch(value) {
	const button = document.getElementById('tv-search');
	switch (value) {
		case 'hidden': {
			button.style.display = 'none';
			break;
		};
		case 'shown': {
			button.style.display = 'flex';
			break;
		};
	}
}
function gamesSearch(value) {
	const button = document.getElementById('games-search');
	switch (value) {
		case 'hidden': {
			button.style.display = 'none';
			break;
		};
		case 'shown': {
			button.style.display = 'flex';
			break;
		};
	}
}
function ebooksSearch(value) {
	const button = document.getElementById('ebooks-search');
	switch (value) {
		case 'hidden': {
			button.style.display = 'none';
			break;
		};
		case 'shown': {
			button.style.display = 'flex';
			break;
		};
	}
}
function displayAddBookmark(value) {
	const button = document.getElementById('add_bookmark_button');
	switch (value) {
		case 'hidden': {
			button.style.display = 'none';
			break;
		};
		case 'shown': {
			button.style.display = 'flex';
			break;
		};
	}
}
