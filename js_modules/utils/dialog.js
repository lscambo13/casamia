export const showInputDialog = (
	title = null,
	description = null,
	inputFields = ['Input A', 'Input B'],
	submitButtonName = 'Submit',
	cancelButtonName = 'Cancel',
	tickBox = null,
	onInput = null,
) => {
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

		const rejectModal = () => {
			modalCancelButton.removeEventListener('click', rejectModal);
			modalContainer.remove();
			reject(Error(null));
		};

		const resolveModal = () => {
			modalSubmitButton.removeEventListener('click', resolveModal);
			const result = [];
			for (const e of inputFields) {
				result.push(e.value);
				if (onInput) e.removeEventListener('input', onInput);
			}
			modalContainer.remove();
			resolve({
				'inputValues': result, 'checkBoxChecked': tickBoxField,
			});
		};

		modalCancelButton.addEventListener('click', rejectModal);
		modalSubmitButton.addEventListener('click', resolveModal);
		if (onInput) {
			for (const e of inputFields) e.addEventListener('input', onInput);
		}
	});

	return promise;
};

export const getDialogElementByID = (id) => {
	let element = id.replaceAll(' ', '-').toLowerCase();
	element = document.getElementById(element);
	return element;
};

