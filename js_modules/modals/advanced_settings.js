import { blurLevel } from "../utils/blurLevel.js";

const modal = document.getElementById('advanced-settings-modal');
const wrap = document.getElementById('wrap');
const modalBackground =
	document.getElementById('advanced-settings-modal-background-overlay');

export function openAdvancedSettings() {
	setTimeout(() => blurLevel(0), 420)
	document.title = document.title.replace('Backgrounds', 'Settings');
	document.body.classList.add('justifySpaceBetween')
	wrap.style.opacity = 0
	modal.style.display = 'block';
	modalBackground.style.display = 'block';
};

export function closeAdvancedSettings() {
	document.title = document.title.replace('Settings', 'Search');
	document.body.classList.remove('justifySpaceBetween')
	wrap.style.opacity = 1
	modal.style.display = 'none';
	modalBackground.style.display = 'none';
	setTimeout(() => blurLevel(1), 100)
};
