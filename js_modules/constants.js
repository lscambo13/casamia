export const EXT_SEARCH_DOMAIN = 'https://x1337x.ws/sort-category-search/';
export const GOOGLE_SEARCH_DOMAIN = 'https://www.google.com/search?q=';
export const BING_SEARCH_DOMAIN = 'https://www.bing.com/search?q=';
export const DUCKDUCKGO_SEARCH_DOMAIN = 'https://duckduckgo.com/?q=';
// export const SEARCH_BUTTON_DOM =
//     document.getElementsByClassName('searchButton').item(0).childNodes[1];
export const BOOKMARKS_SAMPLE_URL = './assets/samples/bookmarks.json';
// 'https://raw.githubusercontent.com/lscambo13/casamia/main/custom_bookmarks_sample/home-page-bookmarks-2023-1-23.json';
// eslint-disable-next-line max-len
export const SAMPLE_AUTOFILL = '["--help","--dl","--clock","--countdown"]';
export const WALLPAPERS_URL = './assets/wallpapers/';
export const DOWNLOAD_WALLPAPERS_URL = './assets/wallpapers-hi-res/';
export const DEF_WALLPAPER = '085.webp';
export const DEF_CUSTOM_TEXT = 'Custom Text';
export const DEF_PREF =
{
	'bg-img-drop': 'shown',
	'bg-blur-drop': 'off',
	// 'bg-glow-drop': 'auto',
	// 'weather-display-drop': 'off',
	'footer-display-drop': 'on',
	'def-widget-drop': 'casamia',
	// 'widget-style-drop': 'minimal',
	'greeting-display-drop': 'on',
	'def-widget-display-drop': 'on',
	// 'show-seconds-drop': 'off',
	// 'clock-style-drop': '12hrs',
	// 'am-pm-style-drop': 'uppercase',
	'def-search-engine-drop': 'google',
	'searchbar-position-drop': 'middle',
	'searchbar-color-theme-drop': 'glass',
	'focus-search-drop': 'off',
	'search-display-drop': 'on',
	// 'show-titles-drop': 'off',
	'movies-search-display-drop': 'shown',
	'tv-search-display-drop': 'shown',
	'games-search-display-drop': 'shown',
	'ebooks-search-display-drop': 'shown',
	'downloader-button-display-drop': 'shown',
	'add-bookmark-display-drop': 'shown',
	'bookmark-labels-display-drop': 'shown',
};
export let BACKEND_URL;
if (process.env.NODE_ENV === 'development') {
	BACKEND_URL = 'http://localhost:8081';
	// console.log(process.env.NODE_ENV, BACKEND_URL);
	// BACKEND_URL = 'http://192.168.29.31:8081';
	// BACKEND_URL = 'http://192.168.29.110:8081';
} else {
	BACKEND_URL = 'https://casamia.cambo.in/api';
}
console.log(process.env.NODE_ENV, BACKEND_URL);

// 'https://github.com/lscambo13/casamia/raw/main/wallpapers/'
// 'https://raw.githubusercontent.com/lscambo13/casamia/main/wallpapers/'
// const X1337X_DOMAIN = 'https://x1337x.ws/home/';
