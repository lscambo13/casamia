export const createModal = (title = 'Modal Title', inputFields = ['Input A', 'Input B']) => {
	document.body
		.insertAdjacentHTML("afterbegin", `
		<div id="modalContainer" class="modalContainer">
			<form action="" class="modal">
				<h3 id="modalTitle" class="modalTitle">${title}</h3>
				<div id="modalButtonsBar" class="modalButtonsBar">
					<button id="modalSubmitButton" class="mainButton" onclick="" type="button">Submit</button>
					<button id="modalCancelButton" class="" onclick="" type="button">Cancel</button>
				</div>
				<form>
		</div>
	`)
	inputFields.forEach((e) => {
		let id = e.replaceAll(' ', '-')
		document.getElementById('modalButtonsBar').insertAdjacentHTML("beforebegin", `
					<label class="label" for="${id}">${e}</label>
					<input class="inputField" autocomplete="off" type="text" id="${id}">
		`)
	})

	let promise = new Promise((resolve, reject) => {
		let modalContainer = document.getElementById('modalContainer')
		let modalSubmitButton = document.getElementById('modalSubmitButton')
		let modalCancelButton = document.getElementById('modalCancelButton')
		let inputFields = document.getElementsByClassName('inputField')
		inputFields[0].focus()

		const rejectModal = () => {
			modalCancelButton.removeEventListener('click', rejectModal)
			modalContainer.remove()
			reject('Dialog was closed by the user')
		}

		const resolveModal = () => {
			modalSubmitButton.removeEventListener('click', resolveModal)
			let result = []
			for (const e of inputFields) {
				result.push(e.value)
			}
			modalContainer.remove()
			resolve(result)
		}
		modalCancelButton.addEventListener('click', rejectModal)
		modalSubmitButton.addEventListener('click', resolveModal)
	})

	return promise
}
