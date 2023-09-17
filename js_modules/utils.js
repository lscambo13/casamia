import { BOOKMARKS_SAMPLE_URL } from './constants.js';
import { importBookmarks } from './preferences.js';
import { headingStyles } from './styles.js';


// export function getAdvancedSetting(key) {
//     let settings = localStorage.getItem('advDropdownValues');
//     settings = JSON.parse(settings);
//     return settings[key];
// }

export function getSearchTerm() {
	return document.getElementsByClassName('searchTerm')[0];
}

export function addEventListenerOnID(id, event, func) {
	if (event == null) return;
	return document.getElementById(id).
		addEventListener(event, func, { passive: true });
}

export function addEventListenerOnClass(className, event, func) {
	const classList = document.getElementsByClassName(className);
	// console.log('on class length ' + classList.length);
	for (let i = 0; i < classList.length; i++) {
		classList[i].addEventListener(event, func);
	};
}

export function addEventListenerOnTag(tagName, event, func) {
	const tagList = document.getElementsByTagName(tagName);
	// console.log('on class length ' + classList.length);
	for (let i = 0; i < tagList.length; i++) {
		tagList[i].addEventListener(event, func);
	};
}

export function clickToEnter(event) {
	if (event.key === 'Enter') event.target.click();
};

export function fetchBookmarks() {
	fetch(BOOKMARKS_SAMPLE_URL)
		.then((res) => importBookmarks(null, res.text()));
}

export function fixBackgroundBlurOnResize(id) {
	document.getElementById(id).style.backdropFilter = `blur(0.9em)`;
	setTimeout(() => {
		document.getElementById(id).style.backdropFilter = `blur(1em)`;
	}, 1);
};

export function scrollHighlightedWallpaperIntoView() {
	const wallpaper = document.getElementsByClassName('highlighted')[0];
	setTimeout(() => {
		if (wallpaper) wallpaper.scrollIntoView({ inline: 'center' });
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
				arrows[i].style.scale = '1';
			}
			break;
		}
		case 'hide': {
			for (let i = 0; i < arrows.length; i++) {
				arrows[i].style.scale = '0';
			}
			break;
		}
	}
};

export function changeTextAccentColor(color) {
	const i = document.getElementsByClassName('has-shadow');
	for (let n = 0; n < i.length; n++) {
		i[n].style.textShadow =
			`4px 4px 0 rgba(${color},.85), 6px 6px 0px black`;
	}
};

let prevSlide = 0;
export function changeSlide(element, int) {
	const el = document.getElementsByClassName(element);
	const totalSlides = el.length;
	const currentSlide = prevSlide - int;
	if (currentSlide < 0 || currentSlide >= totalSlides) {
		// prevSlide = currentSlide;
		return;
	} else {
		el[currentSlide].scrollIntoView();
		prevSlide = currentSlide;
	}
};

export function changeWidgetStyle() {

};
