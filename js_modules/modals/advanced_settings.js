const modal = document.getElementById('advanced-settings-modal');
const modalBackground =
	document.getElementById('advanced-settings-modal-background-overlay');

export function openAdvancedSettings() {
	document.title = document.title.replace('Backgrounds', 'Settings');
	modal.style.display = 'block';
	modalBackground.style.display = 'block';
};

export function closeAdvancedSettings() {
	document.title = document.title.replace('Settings', 'Search');
	modal.style.display = 'none';
	modalBackground.style.display = 'none';
};
