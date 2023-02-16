// will be later resolved on dom content loaded
let wallpapers_list = null;
let selected_wallpaper = null;
let color = null;

const wallpapers_url = './wallpapers/';
// "https://github.com/lscambo13/casamia/raw/main/wallpapers/";

// BOOKMARKs -- start

export let customBookmarks = [
	{
		link: '',
		name: '',
		id: 0,
	},
];

export function load_bookmarks() {
	customBookmarks = JSON.parse(localStorage.getItem('saved_bookmarks'));
	if (customBookmarks == null) {
		customBookmarks = [];
		return;
	}
	for (const n of customBookmarks) {
		add_bookmark_to_html(n.link, n.name, n.id);
	}
}

export function add_bookmark_to_html(link, name, id) {
	const bookmark_container = document.getElementsByClassName(
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
	bookmark_container.appendChild(newBookmark);
}

export function save_bookmarks(link, name, id) {
	customBookmarks.push({
		link: link,
		name: name,
		id: id,
	});
	localStorage.setItem('saved_bookmarks', JSON.stringify(customBookmarks));
}

export function remove_bookmark_from_localstorage(id) {
	customBookmarks = customBookmarks.filter((elem) => {
		return id != elem.id;
	});
	localStorage.setItem('saved_bookmarks', JSON.stringify(customBookmarks));
}

// BOOKMARKs -- end

export function set_wallpaper(fileName, color) {
	selected_wallpaper = fileName;
	const glow_color = color;
	const overlay = document.getElementById('overlay');
	console.log('test ' + overlay.style.backdropFilter);
	overlay.style.backdropFilter = 'blur(1em)';
	const temp = new Image();
	temp.src = wallpapers_url + fileName;
	temp.onload = (e) => {
		apply_wallpaper(selected_wallpaper);
		localStorage.setItem('wallpaper', selected_wallpaper);
		loadBlur();
	};

	changeGlow(glow_color);
	const input_thumb = fileName.split('.').join('-thumb.');
	apply_wallpaper(input_thumb);
}

export function apply_wallpaper(input) {
	document.body.style.backgroundImage = 'url(' + wallpapers_url + input + ')';
	document.body.style.backgroundRepeat = 'no-repeat';
	document.body.style.backgroundSize = 'cover';
	document.body.style.backgroundAttachment = 'fixed';
	document.body.style.backgroundPosition = 'center';
}

export function changeGlow(color, opacity) {
	const glow_overlay = document.getElementById('gradient_overlay');
	const wallpapers_roll_overlay = document.getElementById('wallpapers');
	const glow_setting = localStorage.getItem('glow');
	if (opacity != null) {
		if (glow_setting != '1') glow_overlay.style.opacity = opacity;
	}
	if (color != null) {
		wallpapers_roll_overlay.style.background = `var(--${color}-gradient)`;
		glow_overlay.style.background = `var(--${color}-gradient)`;
	}
}

export function highlight_set_wallpaper() {
	const available_wallpapers = document.getElementsByClassName('thumb-group');
	for (const n of available_wallpapers) {
		const thumbnail = n.getElementsByClassName('thumbnail')[0];
		const title = n.getElementsByClassName('thumb-title')[0];
		n.classList.add('animate');

		if (thumbnail.src.replace('-thumb', '').includes(selected_wallpaper)) {
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
	const checkbox_labs = document.getElementById('labs-setting');
	const labs_div = document.getElementById('labs');

	const labs = localStorage.getItem('labs');
	if (labs != null) {
		labs_div.style.display = labs;
		if (labs == 'block') {
			checkbox_labs.checked = true;
		} else {
			checkbox_labs.checked = false;
		}
	} else {
		checkbox_labs.checked = false;
	}
}

export function loadLights() {
	// Lights out
	const checkbox_wall = document.getElementById('wallpaper-setting');
	const overlay = document.getElementById('overlay');

	const wall = localStorage.getItem('disable_wallpaper');
	if (wall != null) {
		overlay.style.backgroundColor = wall;
		if (wall != 'rgba(0, 0, 0, 0.375)') {
			checkbox_wall.checked = true;
		} else {
			checkbox_wall.checked = false;
		}
	} else {
		checkbox_wall.checked = false;
	}
}

export function loadBlur() {
	// Blur
	const checkbox_blur = document.getElementById('blur-setting');
	const overlay = document.getElementById('overlay');

	const blur = localStorage.getItem('blur_wallpaper');
	if (blur != null) {
		overlay.style.backdropFilter = blur;
		if (blur == 'blur(1em)') {
			checkbox_blur.checked = true;
		} else {
			checkbox_blur.checked = false;
		}
	} else {
		checkbox_blur.checked = false;
		overlay.style.backdropFilter = 'blur(0em)';
	}
}

export function load_settings() {
	loadBlur();
	loadLights();
	loadLabs();
}

export function toggleRemoveButtons(visible) {
	const custom_bookmark = document.getElementsByClassName('custom_bookmark');
	const cross = document.getElementsByClassName('cross');
	const n = custom_bookmark.length;
	switch (visible) {
		case 'show': {
			for (let i = 0; i < n; i++) {
				custom_bookmark[i].classList.add('removable');
				cross[i].style.display = 'block';
			}
			break;
		}
		case 'hide': {
			for (let i = 0; i < n; i++) {
				custom_bookmark[i].classList.remove('removable');
				cross[i].style.display = 'none';
			}
			break;
		}
	}
}

export let previous_click = null;
export function hideLoading() {
	if (previous_click) {
		previous_click.classList.toggle('loader');
	}
	previous_click = null;
}
export function display_loading(event) {
	// element.stopPropagation();
	// event.preventDefault();
	hideLoading();

	const click = event.target;
	previous_click = click;

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



export function remove_bookmark(event) {
	event.preventDefault();
	console.log('click ' + event.target.parentNode.id);
	event.stopPropagation();
	if (confirm('Remove this bookmark?')) {
		remove_bookmark_from_localstorage(event.target.parentNode.id);
		event.target.parentNode.style.display = 'none';
		// event.target.style.display = "none";
	}
	return;
}

export function change_wallpaper(event) {
	event.stopPropagation();
	let selection = event.target.title;
	if (!selection) selection = event.target.childNodes[1].title;
	// console.log("clicks " + selection + event.target.childNodes[1].title);
	const wall = get_wallpaper_details(selection);
	set_wallpaper(wall[0], wall[1]);
	highlight_set_wallpaper();
}

export function get_wallpaper_details(title) {
	const wallpaper = wallpapers_list.filter((item) => {
		return item.title == title;
	})[0].file;
	const color = wallpapers_list.filter((item) => {
		return item.title == title;
	})[0].color;
	return [wallpaper, color];
}





export function enter_handler(event) {
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














export function click_to_enter(event) {
	if (event.key === 'Enter') event.target.click();
}

// Event Listeners ---
export function cli_indicator(event) {
	const search_button = document
		.getElementsByClassName('searchButton')
		.item(0).childNodes[1];

	if (search.cli_check(event.target.value)) {
		search_button.classList.remove('fa-google');
		search_button.classList.add('fa-terminal');
	} else {
		search_button.classList.add('fa-google');
		search_button.classList.remove('fa-terminal');
	}
	// console.log(event.target.value);
}

export function resolve_wallpapers() {
	selected_wallpaper = localStorage.getItem('wallpaper');
	if (selected_wallpaper == null) {
		selected_wallpaper = wallpapers_list[4].file;
		// var color = wallpapers_list[4].color;
	}
	color = wallpapers_list.filter((item) => {
		return item.file == selected_wallpaper;
	})[0].color;
}

document.addEventListener('DOMContentLoaded', async () => {
	load_bookmarks();

	// Add wallpapers to HTML
	const response = await fetch(
		'https://raw.githubusercontent.com/lscambo13/casamia/main/wallpapers/wallpapers_list.json',
	);
	const text = await response.text();
	wallpapers_list = JSON.parse(text);
	resolve_wallpapers();

	const bar = document.getElementById('wallpapers');

	for (const n of wallpapers_list) {
		let input = n.file;
		input = input.split('.').join('-thumb.');

		const thumb = document.createElement('div');
		thumb.className = 'thumb-group';
		thumb.setAttribute('onclick', 'change_wallpaper(event)');
		thumb.setAttribute('onkeypress', 'click_to_enter(event)');

		thumb.setAttribute('tabindex', '3');

		const div = document.createElement('div');
		div.innerHTML = n.title;
		div.className = 'thumb-title';
		thumb.appendChild(div);

		const img = document.createElement('img');
		img.src = wallpapers_url + input;
		img.className = 'thumbnail';
		img.title = n.title;
		thumb.appendChild(img);

		bar.appendChild(thumb);
	}
	load_settings();
	set_wallpaper(selected_wallpaper, color);
	highlight_set_wallpaper();

	// Make the DIV element draggable:
	dragElement(document.getElementById('labs'));
});

window.addEventListener('hashchange', () => {
	const url = document.URL;

	if (!url.includes('#wallpapers')) {
		console.log('url found');
		hide_wallpapers_alt();
	}
	console.log('go back');
});

window.addEventListener('wheel', function (e) {
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

// Classes ---

class utils {
	static getSearchTerm() {
		return document.getElementsByClassName('searchTerm')[0];
	}
}

class search {
	constructor() { }
	static ext_domain = 'https://x1337x.ws/sort-category-search/';
	static default_domain = 'https://www.google.com/search?q=';
	static x1337x = 'https://x1337x.ws/home/';

	static default() {
		let input = utils.getSearchTerm().value;
		if (input != '') {
			if (!this.cli_check(input)) {
				input = encodeURIComponent(input);
				// input = input.split(" ").join("+");
				const url = search.default_domain + input;
				window.open(url);
			} else this.cli_parse(input);
		} else {
			alert('You need to enter a search query.');
		}
	}

	static movies() {
		let input = utils.getSearchTerm().value;
		if (input != '') {
			input = encodeURIComponent(input);
			// input = input.split(" ").join("%20");
			const url = search.ext_domain + input + '/Movies/time/desc/1/';
			window.open(url);
		} else {
			alert('You need to enter a search query.');
		}
	}

	static tv() {
		let input = utils.getSearchTerm().value;
		if (input != '') {
			input = encodeURIComponent(input);
			const url = search.ext_domain + input + '/TV/size/desc/1/';
			window.open(url);
		} else {
			alert('You need to enter a search query.');
		}
	}

	static games() {
		let input = utils.getSearchTerm().value;
		if (input != '') {
			input = encodeURIComponent(input);
			const url = search.ext_domain + input + '/Games/time/desc/1/';
			window.open(url);
		} else {
			alert('You need to enter a search query.');
		}
	}
	static ebooks() {
		let input = utils.getSearchTerm().value;
		if (input != '') {
			input = encodeURIComponent(input);
			const url = search.ext_domain + input + '/Other/seeders/desc/1/';
			window.open(url);
		} else {
			alert('You need to enter a search query.');
		}
	}

	static cli_check(input) {
		// var input = utils.getSearchTerm().value;
		if (input.startsWith('--')) {
			return true;
		}
		return false;
	}

	static cli_parse(input) {
		input = input.split('--').join('').toLowerCase();
		// console.log(input);
		switch (input) {
			case 'help':
				alert(
					'Documentation:\n\n--help : This page\n--fetch default : Import a predefined set of custom bookmarks.\n--reset bookmarks : Reset the bookmarks while keeping other settings intact.\n--reset all : Reset everything, including the bookmarks and wallpaper preferences.\n',
				);
				break;
			case 'reset bookmarks':
				reset_bookmarks();
				break;
			case 'reset all':
				reset_all();
				break;
			case 'fetch default':
				fetch_bookmarks();
				break;
			case 'labs':
				toggle_labs(null);
				break;
			default:
				alert(
					'The command you have passed is invalid.\nType --help to read the documentation.\n',
				);
		}
	}
}

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
