import {
	hideLoading,
	changeGlow,
	toggleRemoveButtons,
	downloadBookmarks,
	customBookmarks,
} from './script.js';

const bottomFilmRollContainer = document.getElementById('wallpapers');
const wrap = document.getElementById('wrap');

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
				// window.open("#", "_self");
				bottomFilmRollContainer.classList.remove('animation_slide_up');
				bottomFilmRollContainer.classList.add('animation_slide_down');
				wrap.classList.remove('animation2_slide_up');
				wrap.classList.add('animation2_slide_down');
				toggleRemoveButtons('hide');
				changeGlow(null, 0);
			}
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
				changeGlow(null, 1);
				toggleRemoveButtons('show');
			} else {
				bottomFilmRollContainer.classList.remove('animation_slide_up');
				bottomFilmRollContainer.classList.add('animation_slide_down');
				wrap.classList.remove('animation2_slide_up');
				wrap.classList.add('animation2_slide_down');
				changeGlow(null, 0);
				toggleRemoveButtons('hide');
			}
		}
	}
};

window.exportBookmarks = (event) => {
	event.stopPropagation();
	const bookmarksString = localStorage.saved_bookmarks;
	const d = new Date();
	downloadBookmarks(
		`home-page-bookmarks-${d.getFullYear()}-${d.getMonth() + 1
		}-${d.getDate()}.json`,
		bookmarksString,
	);
};

window.downloadWallpaper = () => {
	console.log(wallpapers_url + selected_wallpaper);
	const element = document.createElement('a');
	element.setAttribute('href', wallpapers_url + selected_wallpaper);
	element.setAttribute('download', selected_wallpaper);
	element.style.display = 'none';
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
	/* alert(
	"If the download doesn't start, disable the pop-up blocker extensions."
  ); */
};

window.toggleFavicons = (event) => {
	// http://www.google.com/s2/favicons?domain=google.com
	const customBookmarks = document.getElementsByClassName('custom_bookmark');
	const spans = document.getElementsByClassName('custom_link_name');

	for (let i = 0; i < customBookmarks.length; i++) {
		spans[i].style.display = 'none';

		const newFavicon = document.createElement('img');
		newFavicon.className = 'ext_favicon';
		const domain = customBookmarks[i].href;
		newFavicon.src =
			'http://www.google.com/s2/favicons?sz=32&domain=' + domain;
		customBookmarks[i].appendChild(newFavicon);
	}
};

window.toggleClock = () => {
	const mainHeading = document.getElementById('main-heading');
	const subtitle = document.getElementById('subtitle');

	// console.log(`${hours}:${minutes}:${seconds} ${am_pm(hours)}`);
	function addZero(char) {
		if (char.length == 1) char = '0' + char;
		return char;
	}

	function clock() {
		const date = new Date();
		let hours = date.getHours();
		let amPm = (int) => {
			if (int == 0) {
				hours.toString();
				hours = '12';
				return 'AM';
			} else if (int > 0 && int < 12) {
				hours = addZero(hours.toString());
				return 'AM';
			} else if (int == 12) {
				hours = '12';
				return 'PM';
			} else if (int > 12) {
				hours = hours - 12;
				hours.toString();
				hours = addZero(hours);
				return 'PM';
			}
		};
		const user = 'Amritpal';
		let greeting = (int) => {
			if (int < 12) {
				return `Good Morning, ${user}`;
			} else if (int >= 12 && int <= 18) {
				return `Good Afternoon, ${user}`;
			} else if (int >= 18) {
				return `Good Evening, ${user}`;
			}
		};

		const minutes = addZero(date.getMinutes().toString());
		const seconds = addZero(date.getSeconds().toString());
		greeting = greeting(hours);
		amPm = amPm(hours);

		mainHeading.innerText = `${hours}:${minutes} ${amPm}`;
		subtitle.innerText = greeting;
		subtitle.style.display = 'block';

		console.log(`${hours}:${minutes}:${seconds} ${amPm}`);
	}

	setInterval(clock, 1000);
};

window.toggleGlow = () => {
	const gradientOverlay = document.getElementById('gradient_overlay');
	let glow = localStorage.getItem('glow');
	if (glow == null || glow == '0') {
		glow = '1';
		gradientOverlay.style.opacity = 1;
		localStorage.setItem('glow', '1');
	} else if (glow == '1') {
		glow = '0';
		gradientOverlay.style.opacity = 0;
		localStorage.setItem('glow', '0');
	}
};

window.fetchBookmarks = (event) => {
	const sourceLink =
		'https://raw.githubusercontent.com/lscambo13/casamia/main/custom_bookmarks_sample/home-page-bookmarks-2023-1-23.json';
	fetch(sourceLink).then((res) => importBookmarks(null, res.text()));
};

window.importBookmarks = (event, text = '') => {
	let file;
	if (event) {
		event.stopPropagation();
		file = event.target.files[0].text();
	} else {
		file = text;
	};

	function result(file) {
		const importedBookmarks = JSON.parse(file);
		const ids = [];

		for (const bookmark of customBookmarks) {
			ids.push(bookmark.id);
		}

		for (const i of importedBookmarks) {
			if (ids.includes(i.id)) {
				wait(1);
				i.id = Date.now();
			}
			ids.push(i.id);
			save_bookmarks(i.link, i.name, i.id);
		}

		window.location.reload();
	};
	file.then(result);
};

window.resetBookmarks = (event) => {
	if (
		confirm(
			// eslint-disable-next-line max-len
			'This will reset bookmarks.\nMake sure you have a backup to import later on.\n\nAre you sure ? ',
		)
	) {
		localStorage.removeItem('saved_bookmarks');
		window.location.reload();
	}
};

window.resetAll = (event) => {
	if (
		confirm(
			'This will reset everything.\nThere is no going back.\n\nAre you sure?',
		)
	) {
		localStorage.clear();
		window.location.reload();
	}
};

window.toggleDim = (event) => {
	event.stopPropagation();
	const checkboxWall = document.getElementById('dim-setting');
	const overlay = document.getElementById('overlay');
	if (checkboxWall.checked == false) {
		overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.375)';
		localStorage.setItem('dim_wallpaper', 'rgba(0, 0, 0, 0.375)');
	} else {
		overlay.style.backgroundColor = 'rgb(0, 0, 0, 0.25)';
		localStorage.setItem('dim_wallpaper', 'rgb(0, 0, 0, 0.25)');
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

	add_bookmark_to_html(link, name, id);
	save_bookmarks(link, name, id);
};

window.toggleBlur = (event) => {
	// event.stopPropagation();
	const checkbox_blur = document.getElementById('blur-setting');
	const overlay = document.getElementById('overlay');
	if (checkbox_blur.checked == true) {
		overlay.style.backdropFilter = 'blur(1em)';
		localStorage.setItem('blur_wallpaper', 'blur(1em)');
	} else {
		overlay.style.backdropFilter = 'blur(0em)';
		localStorage.setItem('blur_wallpaper', 'blur(0em)');
	}
};

window.toggleWallpaper = (event) => {
	event.stopPropagation();
	const checkboxWall = document.getElementById('wallpaper-setting');
	const overlay = document.getElementById('overlay');
	if (checkboxWall.checked == false) {
		overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.375)';
		localStorage.setItem('disable_wallpaper', 'rgba(0, 0, 0, 0.375)');
	} else {
		overlay.style.backgroundColor = 'rgb(0, 0, 0)';
		localStorage.setItem('disable_wallpaper', 'rgb(0, 0, 0)');
	}
};

window.toggleLabs = (event) => {
	// event.stopPropagation();
	console.log('called labs');
	const checkboxLabs = document.getElementById('labs-setting');
	const labsDiv = document.getElementById('labs');

	if (checkboxLabs.checked == true) {
		labsDiv.style.display = 'block';
		localStorage.setItem('labs', 'block');
	} else {
		labsDiv.style.display = 'none';
		localStorage.setItem('labs', 'none');
	}
};


