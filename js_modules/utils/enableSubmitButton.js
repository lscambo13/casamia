import { isUrlValid } from '../validators.js';
import { Dialog } from './dialog.js';

export const enableSubmitButton = () => {
	const modalSubmitButton = Dialog.getSubmitButton();
	const inputFields = Dialog.getInputFields();
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
