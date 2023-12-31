import { BOOKMARKS_SAMPLE_URL } from './constants.js';
import { importBookmarks } from './preferences.js';
import { headingStyles } from './styles.js';


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
	for (let i = 0; i < classList.length; i++) {
		classList[i].addEventListener(event, func);
	};
}

export function addEventListenerOnTag(tagName, event, func) {
	const tagList = document.getElementsByTagName(tagName);
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
	}, 10);
};

export async function stylizeText(id, int = 0) {
	document.getElementById(id).className = headingStyles[int];
};

let i = 0;
export function changeHeadingStyles(event = null, int) {
	if (event) event.stopPropagation();

	i += int;
	if (i < 0) {
		i = headingStyles.length - 1;
	};
	if (i >= headingStyles.length) i = 0;
	stylizeText('main-heading', i);
};

export function toggleArrows(str) {
	const arrows = document.getElementsByClassName('arrows');
	switch (str) {
		case 'show': {
			for (let i = 0; i < arrows.length; i++) {
				arrows[i].style.height = '2em';
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

export function changeSlide(element, int) {
	const w = document.getElementById('main-heading-slider');
	const width = w.scrollWidth;
	const el = document.getElementsByClassName(element);
	const currentPos = w.scrollLeft;
	let newPos;
	const step = w.scrollWidth / el.length;
	// console.log(width, w.clientWidth)
	if (int == 1) {
		newPos = currentPos + step;
		if (newPos > width) {
			newPos = width;
		};
		console.log(newPos);
		w.scrollLeft = newPos;
	} else if (int == -1) {
		newPos = currentPos - step;
		if (newPos < 0) {
			newPos = 0;
		};
		console.log(newPos);
		w.scrollLeft = newPos;
	}
};

export function changeWidgetStyle() {

};
