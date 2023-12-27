export const createModal = (
	title = 'Modal Title',
	inputFields = ['Input A', 'Input B'],
) => {
	document.body
		.insertAdjacentHTML('afterbegin', `
		<div id="modalContainer" class="modalContainer">
			<form action="" class="modal">
				<h3 id="modalTitle" class="modalTitle">${title}</h3>
				<div id="modalButtonsBar" class="modalButtonsBar">
					<button
					 id="modalSubmitButton"
					 class="mainButton"
					 onclick=""
					 type="button">Submit</button>
					<button
					 id="modalCancelButton"
					 class=""
					 onclick=""
					 type="button">Cancel</button>
				</div>
				<form>
		</div>
	`);
	inputFields.forEach((e) => {
		const id = e.replaceAll(' ', '-');
		document.getElementById('modalButtonsBar')
			.insertAdjacentHTML('beforebegin', `
					<label
					 class="label"
					 for="${id}">${e}</label>
					<input
					 class="inputField"
					 autocomplete="off"
					 type="text"
					 id="${id}">
		`);
	});

	const promise = new Promise((resolve, reject) => {
		const modalContainer = document.getElementById('modalContainer');
		const modalSubmitButton = document.getElementById('modalSubmitButton');
		const modalCancelButton = document.getElementById('modalCancelButton');
		const inputFields = document.getElementsByClassName('inputField');
		inputFields[0].focus();

		const rejectModal = () => {
			modalCancelButton.removeEventListener('click', rejectModal);
			modalContainer.remove();
			reject(Error(null));
		};

		const resolveModal = () => {
			modalSubmitButton.removeEventListener('click', resolveModal)
			const result = [];
			for (const e of inputFields) {
				result.push(e.value);
			}
			modalContainer.remove();
			resolve(result);
		};
		modalCancelButton.addEventListener('click', rejectModal);
		modalSubmitButton.addEventListener('click', resolveModal);
	});

	return promise;
};
