let alertModalContainer;
let modalCancelButton;
let tickBoxField;
let submitButtons;

const showAlertDialog = (
	title = null,
	description = null,
	submitButtonNames = ['Submit A', 'Submit B'],
	cancelButtonName = 'Ok',
	tickBox = [null, null],
	listeners = [],
	onInit = null,
) => {
	alertModalContainer = document.getElementById('alertDialogContainer');
	if (alertModalContainer) alertModalContainer.remove();

	if (title) {
		title = `<h3 id="alertDialogTitle" class="modalTitle">${title}</h3>`;
	} else (title = '');
	if (description) {
		description = `
		<h4 id="alertDialogDescription" class="modalDescription">${description}</h4>
	`;
	} else (description = '');

	document.body
		.insertAdjacentHTML('afterbegin', `
		<div id="alertDialogContainer" class="modalContainer disable-select">
			<div class="modal">
				${title}
				${description}
				<div id="alertDialogButtonsBar" class="modalButtonsBar">
					<button
					 id="alertDialogCancelButton"
					 class="button"
					 onclick=""
					 type="button">${cancelButtonName}</button>
				</div>
			</div>
		</div>
	`);
	if (submitButtonNames) {
		submitButtonNames.forEach((e) => {
			let id = e.replaceAll(' ', '-').toLowerCase();
			id = `ALERT-BUTTON-${id}`;
			document.getElementById('alertDialogButtonsBar')
				.insertAdjacentHTML('afterbegin', `
			<button
			id="${id}"
			class="alertDialogSubmitButton button">
			${e}</button>
			`);
		});
	}
	if (tickBox[0]) {
		document.getElementById('alertDialogButtonsBar')
			.insertAdjacentHTML('beforebegin', `
					<label
					 class="label"
					 for="tickBoxField">
						<input
						class="tickBoxField"
						type="checkbox"
						id="tickBoxField">
						<span>${tickBox[0]}</span>
					 </label>
		`);
		tickBoxField = document.getElementById('tickBoxField');
	};

	alertModalContainer = document.getElementById('alertDialogContainer');
	modalCancelButton = document.getElementById('alertDialogCancelButton');
	submitButtons = document.getElementsByClassName('alertDialogSubmitButton');
	document.body.style.overflow = 'hidden';
	modalCancelButton.focus();

	const promise = new Promise((resolve, reject) => {
		alertModalContainer.style.alignItems = 'center';
		// alertModalContainer.style.paddingBlockStart = '0em';
		alertModalContainer.style.opacity = '1';

		// const rejectModal = () => {
		// 	// modalCancelButton.removeEventListener('click', rejectModal);
		// 	// alertModalContainer.remove();
		// 	// document.body.style.overflow = 'auto';
		// 	reject(Error(null));
		// };

		const resolveModal = () => {
			modalCancelButton.removeEventListener('click', resolveModal);
			if (tickBox[0]) {
				tickBoxField.removeEventListener('change', tickBox[1]);
				tickBoxField = tickBoxField.checked;
			}
			if (listeners) {
				listeners.forEach((element, index) => {
					submitButtons[index].removeEventListener('click', element);
				});
			}
			alertModalContainer.remove();
			document.body.style.overflow = 'auto';
			// console.log(result);
			resolve(tickBoxField);
		};

		modalCancelButton.addEventListener('click', resolveModal);
		if (listeners) {
			listeners.forEach((element, index) => {
				submitButtons[index].addEventListener('click', element);
			});
		}
		if (tickBox[0]) {
			tickBoxField.addEventListener('change', tickBox[1]);
		}
	});

	if (onInit) onInit();
	return promise;
};

export const AlertDialog = {
	show: showAlertDialog,
	getCancelButton: () => {
		return modalCancelButton;
	},
	getSubmitButtons: () => {
		return submitButtons;
	},
	getCheckboxField: () => {
		return tickBoxField;
	},
};

export const genericAlert = (title, msg) => {
	AlertDialog.show(
		title,
		msg,
		null,
		'Ok',
		[null, null],
		null,
		null,
	).then((res) => console.log(res))
		.catch((e) => console.error(e));
};
