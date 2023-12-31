import { isUrlValid } from '../validators.js';

export const enableSubmitButton = () => {
	const modalSubmitButton = document.getElementById('modalSubmitButton');
	const inputFields = document.getElementsByClassName('inputField');
	for (const e of inputFields) {
		if (e.value.length) modalSubmitButton.disabled = false;
		else {
			modalSubmitButton.disabled = true;
			return;
		}
	}
	if (isUrlValid(inputFields[1].value)) {
		modalSubmitButton.disabled = false;
	} else modalSubmitButton.disabled = true;
};
