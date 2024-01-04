const notifyModalContainer = document.getElementById('notifyContainer');
let modalCancelButton;
let notify;

const showNotifyDialog = (
	description,
	ms = '5000',
	onClick = null,
) => {
	const id = Date.now();
	notify = document.getElementById(`notifyModal-${id}`);
	if (notify) notify.parentNode.remove();

	notifyModalContainer.insertAdjacentHTML('afterbegin', `
		<div id="notifyModal-${id}" class="notifyModal">
			<div class="notifyDescriptionContainer">
				<h3 id="notifyDescription-${id}" class="notifyDescription">
					${description}
				</h3>
				<hr id="notifyLoader-${id}" class="notifyLoader">
			</div>	
			<button id="notifyDialogCancelButton-${id}" class="button tinyButton">
				x
			</button>
		</div>
	`);

	const notifyLoader = document.getElementById(`notifyLoader-${id}`);

	notify = document.getElementById(`notifyModal-${id}`);
	if (onClick) notify.addEventListner('click', onClick);

	const closeNotification = (event) => {
		if (onClick) notify.removeEventListner('click', onClick);
		modalCancelButton.removeEventListener('click', closeNotification);
		event.target.parentNode.remove();
	};

	modalCancelButton = document.getElementById(`notifyDialogCancelButton-${id}`);
	modalCancelButton.addEventListener('click', closeNotification);

	setTimeout(() => {
		const close = modalCancelButton;
		setTimeout(() => {
			close.click();
		}, ms);
		notifyLoader.style.transition = ms + 'ms';
		notify.style.opacity = '1';
		notify.style.marginTop = '2em';
		notifyLoader.style.width = '0%';
	}, 50);
};

export const Notify = {
	show: showNotifyDialog,
};
