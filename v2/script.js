/* eslint-disable max-len */
// will be later resolved on dom content loaded
import {
	customBookmarks,
	setCustomBookmarks,
	wallpapersList,
	setWallpapersList,
} from './../js_modules/database.js';
export let selectedWallpaper = null;
export let color = null;

export const WALLPAPERS_URL = './../wallpapers/';
// "https://github.com/lscambo13/casamia/raw/main/wallpapers/";

// BOOKMARKs -- start


export function loadBookmarks() {
	setCustomBookmarks(JSON.parse(localStorage.getItem('saved_bookmarks')));

	if (customBookmarks == null) {
		setCustomBookmarks([]);
		return;
	}
	for (const n of customBookmarks) {
		addBookmarkToHTML(n.link, n.name, n.id);
	}
}

export function addBookmarkToHTML(link, name, id) {
	const bookmarkContainer = document.getElementsByClassName(
		'flex-sub-container-horizontal',
	)[0];

	const newBookmark = document.createElement('a');
	const i = document.createElement('span');
	const d = document.createElement('div');
	newBookmark.setAttribute('onclick', 'display_loading(event)');
	newBookmark.setAttribute('onkeypress', 'click_to_enter(event)');
	newBookmark.className = 'custom_bookmark';
	newBookmark.setAttribute('href', link);
	newBookmark.setAttribute('id', id);
	newBookmark.setAttribute('tabindex', '1');
	// newBookmark.setAttribute("onmouseenter", "remove_bookmark(event)");
	// newBookmark.setAttribute("onmouseleave", "remove_timeout(event)");
	i.textContent = name;
	i.className = 'custom_link_name';
	d.innerHTML = '&#215;';
	d.classList.add('cross');
	d.setAttribute('onclick', 'remove_bookmark(event)');
	d.setAttribute('onkeypress', 'click_to_enter(event)');

	d.setAttribute('tabindex', '5');
	newBookmark.appendChild(i);
	newBookmark.appendChild(d);
	bookmarkContainer.appendChild(newBookmark);
}

export function saveBookmarks(link, name, id) {
	customBookmarks.push({
		link: link,
		name: name,
		id: id,
	});
	localStorage.setItem('saved_bookmarks', JSON.stringify(customBookmarks));
}

export function removeBookmarkFromLocalStorage(id) {
	customBookmarks = customBookmarks.filter((elem) => {
		return id != elem.id;
	});
	localStorage.setItem('saved_bookmarks', JSON.stringify(customBookmarks));
}

// BOOKMARKs -- end

export function setWallpaper(fileName, color) {
	selectedWallpaper = fileName;
	const overlay = document.getElementById('overlay');
	console.log('test ' + overlay.style.backdropFilter);
	overlay.style.backdropFilter = 'blur(1em)';
	const temp = new Image();
	temp.src = WALLPAPERS_URL + fileName;
	temp.onload = (e) => {
		applyWallpaper(selectedWallpaper);
		localStorage.setItem('wallpaper', selectedWallpaper);
		loadBlur();
	};

	changeGlow(color);
	const inputThumb = fileName.split('.').join('-thumb.');
	applyWallpaper(inputThumb);
}

export function applyWallpaper(input) {
	document.body.style.backgroundImage = 'url(' + WALLPAPERS_URL + input + ')';
	document.body.style.backgroundRepeat = 'no-repeat';
	document.body.style.backgroundSize = 'cover';
	document.body.style.backgroundAttachment = 'fixed';
	document.body.style.backgroundPosition = 'center';
}

export function changeGlow(color, opacity) {
	const glowOverlay = document.getElementById('gradient_overlay');
	const wallpapersRollOverlay = document.getElementById('wallpapers');
	const glowSetting = localStorage.getItem('glow');
	if (opacity != null) {
		if (glowSetting != '1') glowOverlay.style.opacity = opacity;
	}
	if (color != null) {
		wallpapersRollOverlay.style.background = `var(--${color}-gradient)`;
		glowOverlay.style.background = `var(--${color}-gradient)`;
	}
}

export function highlightSetWallpaper() {
	const availableWallpapers = document.getElementsByClassName('thumb-group');
	for (const n of availableWallpapers) {
		const thumbnail = n.getElementsByClassName('thumbnail')[0];
		const title = n.getElementsByClassName('thumb-title')[0];
		n.classList.add('animate');

		if (thumbnail.src.replace('-thumb', '').includes(selectedWallpaper)) {
			title.style.opacity = '1';
			n.classList.remove('animate');
		} else {
			title.style.opacity = '0';
			n.classList.add('animate');
		}
	}
}

export function loadLabs() {
	// Labs
	const checkboxLabs = document.getElementById('labs-setting');
	const labsDiv = document.getElementById('labs');

	const labs = localStorage.getItem('labs');
	if (labs != null) {
		labsDiv.style.display = labs;
		if (labs == 'block') {
			checkboxLabs.checked = true;
		} else {
			checkboxLabs.checked = false;
		}
	} else {
		checkboxLabs.checked = false;
	}
}

export function loadLights() {
	// Lights out
	const checkboxWall = document.getElementById('wallpaper-setting');
	const overlay = document.getElementById('overlay');

	const wall = localStorage.getItem('disable_wallpaper');
	if (wall != null) {
		overlay.style.backgroundColor = wall;
		if (wall != 'rgba(0, 0, 0, 0.375)') {
			checkboxWall.checked = true;
		} else {
			checkboxWall.checked = false;
		}
	} else {
		checkboxWall.checked = false;
	}
}

export function loadBlur() {
	// Blur
	const checkboxBlur = document.getElementById('blur-setting');
	const overlay = document.getElementById('overlay');

	const blur = localStorage.getItem('blur_wallpaper');
	if (blur != null) {
		overlay.style.backdropFilter = blur;
		if (blur == 'blur(1em)') {
			checkboxBlur.checked = true;
		} else {
			checkboxBlur.checked = false;
		}
	} else {
		checkboxBlur.checked = false;
		overlay.style.backdropFilter = 'blur(0em)';
	}
}

export function loadSettings() {
	loadBlur();
	loadLights();
	loadLabs();
}

export function toggleRemoveButtons(visible) {
	const customBookmark = document.getElementsByClassName('custom_bookmark');
	const cross = document.getElementsByClassName('cross');
	const n = customBookmark.length;
	switch (visible) {
		case 'show': {
			for (let i = 0; i < n; i++) {
				customBookmark[i].classList.add('removable');
				cross[i].style.display = 'block';
			}
			break;
		}
		case 'hide': {
			for (let i = 0; i < n; i++) {
				customBookmark[i].classList.remove('removable');
				cross[i].style.display = 'none';
			}
			break;
		}
	}
}

export let previousClick = null;
export function hideLoading() {
	if (previousClick) {
		previousClick.classList.toggle('loader');
	}
	previousClick = null;
}
export function displayLoading(event) {
	// element.stopPropagation();
	// event.preventDefault();
	hideLoading();

	const click = event.target;
	previousClick = click;

	click.classList.toggle('loader');
}

export function isUrlValid(userInput) {
	const res = userInput.match(
		// eslint-disable-next-line max-len
		/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
	);
	if (res == null) return false;
	else return true;
}

export function downloadBookmarks(filename, text) {
	const element = document.createElement('a');
	element.setAttribute(
		'href',
		'data:text/plain;charset=utf-8,' + encodeURIComponent(text),
	);
	element.setAttribute('download', filename);

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
}

// User interactable click events ---

export function removeBookmark(event) {
	event.preventDefault();
	console.log('click ' + event.target.parentNode.id);
	event.stopPropagation();
	if (confirm('Remove this bookmark?')) {
		removeBookmarkFromLocalStorage(event.target.parentNode.id);
		event.target.parentNode.style.display = 'none';
		// event.target.style.display = "none";
	}
	return;
}

export function changeWallpaper(event) {
	event.stopPropagation();
	let selection = event.target.title;
	if (!selection) selection = event.target.childNodes[1].title;
	// console.log("clicks " + selection + event.target.childNodes[1].title);
	const wall = getWallpaperDetails(selection);
	setWallpapersetWallpaper(wall[0], wall[1]);
	highlightSetWallpaper();
}

export function getWallpaperDetails(title) {
	const wallpaper = wallpapersList.filter((item) => {
		return item.title == title;
	})[0].file;
	const color = wallpapersList.filter((item) => {
		return item.title == title;
	})[0].color;
	return [wallpaper, color];
}

export function enterHandler(event) {
	if (event.key == 'Enter') {
		search.default();
	}
}

export function wait(ms) {
	let now = Date.now();
	const end = now + ms;
	while (now < end) {
		now = Date.now();
	}
}

export function clickToEnter(event) {
	if (event.key === 'Enter') event.target.click();
}

// Event Listeners ---
export function cliIndicator(event) {
	const searchButton = document
		.getElementsByClassName('searchButton')
		.item(0).childNodes[1];

	if (search.cli_check(event.target.value)) {
		searchButton.classList.remove('fa-google');
		searchButton.classList.add('fa-terminal');
	} else {
		searchButton.classList.add('fa-google');
		searchButton.classList.remove('fa-terminal');
	}
	// console.log(event.target.value);
}

export function resolveWallpapers() {
	selectedWallpaper = localStorage.getItem('wallpaper');
	if (selectedWallpaper == null) {
		selectedWallpaper = wallpapersList[4].file;
		// var color = wallpapers_list[4].color;
		console.log(wallpapersList);
	}

	color = wallpapersList.filter((item) => {
		return item.file == selectedWallpaper;
	})[0].color;
}


// Classes ---





// Objects ---

export function dragElement(elmnt) {
	let pos1 = 0;
	let pos2 = 0;
	let pos3 = 0;
	let pos4 = 0;
	if (document.getElementById(elmnt.id + 'header')) {
		// if present, the header is where you move the DIV from:
		document.getElementById(elmnt.id + 'header').onmousedown =
			dragMouseDown;
	} else {
		// otherwise, move the DIV from anywhere inside the DIV:
		elmnt.onmousedown = dragMouseDown;
	}

	function dragMouseDown(e) {
		e = e || window.event;
		e.preventDefault();
		// get the mouse cursor position at startup:
		pos3 = e.clientX;
		pos4 = e.clientY;
		document.onmouseup = closeDragElement;
		// call a export function whenever the cursor moves:
		document.onmousemove = elementDrag;
	}

	function elementDrag(e) {
		e = e || window.event;
		e.preventDefault();
		// calculate the new cursor position:
		pos1 = pos3 - e.clientX;
		pos2 = pos4 - e.clientY;
		pos3 = e.clientX;
		pos4 = e.clientY;
		// set the element's new position:
		elmnt.style.top = elmnt.offsetTop - pos2 + 'px';
		elmnt.style.left = elmnt.offsetLeft - pos1 + 'px';
	}

	function closeDragElement() {
		// stop moving when mouse button is released:
		document.onmouseup = null;
		document.onmousemove = null;
	}
}
