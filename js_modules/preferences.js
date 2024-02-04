import { DOWNLOAD_WALLPAPERS_URL } from './constants.js';
import {
	customBookmarks,
	downloadBookmarks,
	saveBookmarks,
} from './custom_bookmarks.js';
import { updateAmPmStyle } from './load_preferences.js';
import {
	resetAllWarningText,
	resetBookmarksWarningText,
} from './strings.js';
import { addZero } from './utils/addZero.js';
import { genericAlert } from './utils/alertDialog.js';
import { changeExtension } from './utils/changeExtension.js';
import { wait } from './utils/wait.js';
import { selectedWallpaper } from './wallpapers.js';

export function exportBookmarks(event) {
	event.stopPropagation();
	const bookmarksString = localStorage.saved_bookmarks;
	const d = new Date();
	downloadBookmarks(
		`casamia-bookmarks-only-${d.getFullYear()}-${d.getMonth() + 1
		}-${d.getDate()}.json`,
		bookmarksString,
	);
};

export function exportBackup(event) {
	event.stopPropagation();
	const data = { ...localStorage };
	const backupString = JSON.stringify(data);
	const d = new Date();
	downloadBookmarks(
		`casamia-full-backup-${d.getFullYear()}-${d.getMonth() + 1
		}-${d.getDate()}.json`,
		backupString,
	);
};

export function downloadWallpaper() {
	const element = document.createElement('a');
	const hiResWall = changeExtension(selectedWallpaper, 'png');
	element
		.setAttribute('href', DOWNLOAD_WALLPAPERS_URL + hiResWall);
	element.setAttribute('download', hiResWall);
	element.style.display = 'none';
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
};

export function toggleFavicons(event) {
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

let clockLoop = null;
export function displayClock(value) {
	const target = 'widget-slide';
	switch (value) {
		case 'off': {
			clearInterval(clockLoop);
			clockLoop = null;
			break;
		};
		case 'on': {
			if (clockLoop) clearInterval(clockLoop);
			clockLoop = setInterval(() => refreshClock(target), 1000);
			break;
		};
	}
};

function refreshClock(targetClass) {
	const target = document.getElementsByClassName(targetClass);
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

	const minutes = addZero(date.getMinutes().toString());
	const seconds = addZero(date.getSeconds().toString());
	amPm = amPm(hours);
	let separator = ':';

	for (let i = 0; i < target.length; i++) {
		if (seconds % 2 === 0) {
			separator = `<span class="separator separator-visible">:</span>`;
		} else {
			separator = `<span class="separator">:</span>`;
		}
		target[i].innerHTML =
			`${hours}${separator}${minutes} ${updateAmPmStyle(amPm.toString())}`;
	}

	// subtitle.style.display = 'block';
	// console.log(`${hours}:${minutes}:${seconds} ${amPm}`);
}

export function refreshGreeting() {
	const subtitle = document.getElementById('subtitle');
	const user = localStorage.getItem('userName');
	const date = new Date();
	const hours = date.getHours();
	let greeting = (int) => {
		if (int < 12) {
			return `Good Morning, ${user}`;
		} else if (int >= 12 && int <= 18) {
			return `Good Afternoon, ${user}`;
		} else if (int >= 18) {
			return `Good Evening, ${user}`;
		}
	};
	greeting = greeting(hours);
	subtitle.innerText = greeting;
}
// let greetingLoop = null;
// export function toggleGreeting() {
//     switch (value) {
//         case 'off': {
//             subtitle.classList.toggle('collapsed');
//             clearInterval(greetingLoop);
//             break;
//         };
//         case 'on': {
//             subtitle.classList.toggle('collapsed');
//             greetingLoop = setInterval(refreshGreeting, 1000);
//             break;
//         };
//     }
// }

export function toggleGlow() {
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

export function importBookmarks(event, text = '') {
	let file;
	if (event) {
		event.stopPropagation();
		file = event.target.files[0].text();
	} else file = text;

	function result(file) {
		const importedBookmarks = JSON.parse(file);
		if (!importedBookmarks[0]?.id) {
			console.log(importedBookmarks);
			genericAlert('Failed', 'The backup does not seem to be valid.');
			event.target.value = null;
			return;
		}
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
			saveBookmarks(i.link, i.name, i.id);
		}
		window.location.reload();
	}

	file.then(result);
};

export function importBackup(event, text = '') {
	let file;
	if (event) {
		event.stopPropagation();
		file = event.target.files[0].text();
	} else file = text;

	function result(file) {
		const importedBackup = JSON.parse(file);
		if (importedBackup.onBoarding) {
			const keys = Object.keys(importedBackup);
			keys.forEach((e, i) => {
				localStorage.setItem(e, importedBackup[keys[i]]);
			});
			window.location.reload();
		} else {
			console.log(importedBackup);
			genericAlert('Failed', 'The backup does not seem to be valid.');
			event.target.value = null;
		};
	}

	file.then(result);
};

export function resetBookmarks(event) {
	if (
		confirm(resetBookmarksWarningText)
	) {
		localStorage.removeItem('saved_bookmarks');
		window.location.reload();
	}
};

export function resetAll(event) {
	if (
		confirm(resetAllWarningText)
	) {
		localStorage.clear();
		window.location.reload();
	}
};

export function showNestedOptions(id) {
	const element = document.getElementById(id);
	element.classList.toggle('nested-close');
}

// export function toggleDim(event) {
//     event.stopPropagation();
//     const checkboxWall = document.getElementById('dim-setting');
//     const overlay = document.getElementById('overlay');
//     if (checkboxWall.checked == false) {
//         overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.375)';
//         localStorage.setItem('dim_wallpaper', 'rgba(0, 0, 0, 0.375)');
//     } else {
//         overlay.style.backgroundColor = 'rgb(0, 0, 0, 0.25)';
//         localStorage.setItem('dim_wallpaper', 'rgb(0, 0, 0, 0.25)');
//     }
// };

// export function toggleBlur() {
//     // event.stopPropagation();
//     const checkboxBlur = document.getElementById('toggle-blur-cb');
//     // const overlay = document.getElementById('overlay');
//     if (checkboxBlur.checked == true) {
//         toggleBackdropBlur('overlay', 1);
//         localStorage.setItem('blur_wallpaper', 'blur(1em)');
//     } else {
//         toggleBackdropBlur('overlay', 0);
//         localStorage.setItem('blur_wallpaper', 'blur(0em)');
//     }
// };

// export function toggleWallpaper(event) {
//     event.stopPropagation();
//     const checkboxWall = document.getElementById('toggle-wallpaper-cb');
//     const overlay = document.getElementById('overlay');
//     if (checkboxWall.checked == false) {
//         overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.375)';
//         localStorage.setItem('disable_wallpaper', 'rgba(0, 0, 0, 0.375)');
//     } else {
//         overlay.style.backgroundColor = 'rgb(0, 0, 0)';
//         localStorage.setItem('disable_wallpaper', 'rgb(0, 0, 0)');
//     }
// };

// export function toggleLabs(event) {
//     // event.stopPropagation();
//     console.log('called labs');
//     const checkboxLabs = document.getElementById('toggle-labs-cb');
//     const labsDiv = document.getElementById('labs');

//     if (checkboxLabs.checked == true) {
//         labsDiv.style.display = 'block';
//         localStorage.setItem('labs', 'block');
//     } else {
//         labsDiv.style.display = 'none';
//         localStorage.setItem('labs', 'none');
//     }
// };

