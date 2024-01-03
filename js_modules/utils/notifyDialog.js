let modalContainer;
let modalSubmitButton;
let modalCancelButton;
let tickBoxField;
let inputFields;

const showInputDialog = (
	title = null,
	description = null,
	inputBoxes = ['Input A', 'Input B'],
	submitButtonName = 'Submit',
	cancelButtonName = 'Cancel',
	tickBox = null,
	listeners = [onInput = null, onChange = null],
	onInit = null,
) => {
	modalContainer = document.getElementById('inputDialogContainer');
	if (modalContainer) modalContainer.remove();

	document.activeElement.blur();

	if (title) {
		title = `<h3 id="inputDialogTitle" class="modalTitle">${title}</h3>`;
	} else (title = '');
	if (description) {
		description = `
		<h4 id="inputDialogDescription" class="modalDescription">${description}</h4>
	`;
	} else (description = '');

	document.body
		.insertAdjacentHTML('afterbegin', `
		<div id="inputDialogContainer" class="modalContainer disable-select">
			<form autocomplete="off" action="#" class="modal">
				${title}
				${description}
				<div id="inputDialogButtonsBar" class="modalButtonsBar">
					<button
					 id="inputDialogSubmitButton"
					 class="mainButton button"
					 disabled = "true"
					 onclick=""
					 type="submit">${submitButtonName}</button>
					<button
					 id="inputDialogCancelButton"
					 class="button"
					 onclick=""
					 type="button">${cancelButtonName}</button>
				</div>
				<form>
		</div>
	`);
	inputBoxes.forEach((e) => {
		let id = e.replaceAll(' ', '-').toLowerCase();
		id = `MODAL-INPUT-${id}`;
		document.getElementById('inputDialogButtonsBar')
			.insertAdjacentHTML('beforebegin', `
					<label
					 class="label"
					 for="${id}">${e}</label>
					<input
					 class="modalInputField"
					 type="text"
					 id="${id}">
		`);
	});
	if (tickBox) {
		document.getElementById('inputDialogButtonsBar')
			.insertAdjacentHTML('beforebegin', `
					<label
					 class="label"
					 for="tickBoxField">
						<input
						class="tickBoxField"
						type="checkbox"
						id="tickBoxField">
						<span>${tickBox}</span>
					 </label>
		`);
		tickBoxField = document.getElementById('tickBoxField');
	};

	modalContainer = document.getElementById('inputDialogContainer');
	modalSubmitButton = document.getElementById('inputDialogSubmitButton');
	modalCancelButton = document.getElementById('inputDialogCancelButton');
	inputFields = document.getElementsByClassName('modalInputField');
	document.body.style.overflow = 'hidden';

	inputFields[0].focus();
	if (!cancelButtonName) modalCancelButton.style.display = 'none';

	const promise = new Promise((resolve, reject) => {
		modalContainer.style.paddingBlockStart = '4em';
		modalContainer.style.opacity = '1';

		const rejectModal = () => {
			modalCancelButton.removeEventListener('click', rejectModal);
			modalContainer.remove();
			document.body.style.overflow = 'auto';
			reject(Error(null));
		};

		const resolveModal = () => {
			modalSubmitButton.removeEventListener('click', resolveModal);
			if (tickBox) {
				tickBoxField.removeEventListener('change', listeners[1]);
				tickBoxField = tickBoxField.checked;
			}
			const inputValues = [];
			for (const e of inputFields) {
				inputValues.push(e.value);
				if (listeners) e.removeEventListener('input', listeners);
			}
			const result = {
				'inputValues': inputValues, 'checkboxChecked': tickBoxField,
			};
			modalContainer.remove();
			document.body.style.overflow = 'auto';

			console.log(result);
			resolve(result);
		};

		modalCancelButton.addEventListener('click', rejectModal);
		modalSubmitButton.addEventListener('click', resolveModal);
		if (listeners[0]) {
			for (const e of inputFields) e.addEventListener('input', listeners[0]);
		}
		if (listeners[1] && tickBox) {
			tickBoxField.addEventListener('change', listeners[1]);
		}
	});

	if (onInit) onInit();
	return promise;
};

export const InputDialog = {
	show: showInputDialog,
	getSubmitButton: () => {
		return modalSubmitButton;
	},
	getCancelButton: () => {
		return modalCancelButton;
	},
	getInputFields: () => {
		return inputFields;
	},
	getCheckboxField: (n) => {
		return tickBoxField;
	},
};
