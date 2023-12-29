export const showInputDialog = (
	title = null,
	description = null,
	inputFields = ['Input A', 'Input B'],
	submitButtonName = 'Submit',
	cancelButtonName = 'Cancel',
	tickBox = null,
	onInput = null,
	onInit = null,
) => {
	const modalContainer = document.getElementById('modalContainer');
	if (modalContainer) modalContainer.remove();

	if (title) {
		title = `<h3 id="modalTitle" class="modalTitle">${title}</h3>`;
	} else (title = '');
	if (description) {
		description = `
		<h4 id="modalDescription" class="modalDescription">${description}</h4>
	`;
	} else (description = '');

	document.body
		.insertAdjacentHTML('afterbegin', `
		<div id="modalContainer" class="modalContainer">
			<form autocomplete="off" action="#" class="modal">
				${title}
				${description}
				<div id="modalButtonsBar" class="modalButtonsBar">
					<button
					 id="modalSubmitButton"
					 class="mainButton button"
					 disabled = "true"
					 onclick=""
					 type="submit">${submitButtonName}</button>
					<button
					 id="modalCancelButton"
					 class="button"
					 onclick=""
					 type="button">${cancelButtonName}</button>
				</div>
				<form>
		</div>
	`);
	inputFields.forEach((e) => {
		const id = e.replaceAll(' ', '-').toLowerCase();
		document.getElementById('modalButtonsBar')
			.insertAdjacentHTML('beforebegin', `
					<label
					 class="label"
					 for="${id}">${e}</label>
					<input
					 class="inputField"
					 type="text"
					 id="${id}">
		`);
	});
	if (tickBox) {
		document.getElementById('modalButtonsBar')
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
	};

	const promise = new Promise((resolve, reject) => {
		const modalContainer = document.getElementById('modalContainer');
		const modalSubmitButton = document.getElementById('modalSubmitButton');
		const modalCancelButton = document.getElementById('modalCancelButton');
		const inputFields = document.getElementsByClassName('inputField');
		let tickBoxField = document.getElementById('tickBoxField');
		if (tickBoxField) tickBoxField = tickBoxField.ariaChecked;
		inputFields[0].focus();
		modalContainer.style.paddingBlockStart = '4em';
		if (!cancelButtonName) modalCancelButton.style.display = 'none';

		const rejectModal = () => {
			modalCancelButton.removeEventListener('click', rejectModal);
			modalContainer.remove();
			reject(Error(null));
		};

		const resolveModal = () => {
			modalSubmitButton.removeEventListener('click', resolveModal);
			const inputValues = [];
			for (const e of inputFields) {
				inputValues.push(e.value);
				if (onInput) e.removeEventListener('input', onInput);
			}
			const result = {
				'inputValues': inputValues, 'checkBoxChecked': tickBoxField,
			};
			modalContainer.remove();
			console.log(result);
			resolve(result);
		};

		modalCancelButton.addEventListener('click', rejectModal);
		modalSubmitButton.addEventListener('click', resolveModal);
		if (onInput) {
			for (const e of inputFields) e.addEventListener('input', onInput);
		}
	});

	if (onInit) onInit();
	return promise;
};

export const getDialogElementByID = (id) => {
	let element = id.replaceAll(' ', '-').toLowerCase();
	element = document.getElementById(element);
	return element;
};

