import { isUrlValid } from '../validators.js';
import { InputDialog } from './inputDialog.js';

export const enableSubmitButton = (event, alt = false) => {
	const modalSubmitButton = InputDialog.getSubmitButton();
	const inputFields = InputDialog.getInputFields();
	for (const e of inputFields) {
		if (e.value.length) modalSubmitButton.disabled = false;
		else {
			modalSubmitButton.disabled = true;
			return;
		}
	}
	if (!alt) return;
	else {
		if (isUrlValid(inputFields[1].value)) {
			modalSubmitButton.disabled = false;
		} else modalSubmitButton.disabled = true;
	}
};
