import { downloadFile } from "./downloadFile";

const container = document.getElementById('downloadContainer');

export const displayLoadingPlaceholder = () => {
	// container.insertAdjacentHTML('afterbegin', `
	// 	<div class="downloadItemContainer loadingPlaceholder" aria-busy="true" aria-describedby="progress-bar">
	// 		<p id="downloadContainer-close-btn" class="modal-close-btn fa fa-chevron-left"></p>
	// 		<progress id="progress-bar" aria-label="Content loading…"></progress>
	// 	</div>
	// `)
	container.classList.remove('hidden');
};

export const displayDownloadError = (err) => {
	document.getElementById('progress-bar').classList.add('hidden');
	document.getElementById('downloadContainerTitle').classList.remove('hidden');

	container.insertAdjacentHTML('beforeend', `
	<div class="downloadItemContainer">
		<span>${err}</span>
	</div>
	`);
}

export const populateDownloadList = (title, url, thumb, res) => {
	document.getElementById('progress-bar').classList.add('hidden');
	document.getElementById('downloadContainerTitle').classList.remove('hidden');

	container.insertAdjacentHTML('beforeend', `
		<div class="downloadItemContainer">
			<img src="${thumb}" alt="Thumbnail" class="downloadItemThumbnail">
			<div class="downloadInfoContainer">
				<span class="downloadItemTitle">${title}</span>
				<div>
					<span class="downloadItemResolution">${res}</span>
					<a href="${url}" class="downloadButton button">Download</a>
				</div>
			</div>
		</div>
	`);
	const button = document.getElementsByClassName('downloadButton');
	button[button.length - 1].addEventListener('click', () => {
		const e = document.createElement('a');
		e.setAttribute('href', url);
		e.setAttribute('download', title);
		e.style.display = 'none';
		document.body.appendChild(e);
		e.click();
		document.body.removeChild(e);
		console.log('clicked')
		// downloadFile(url, `${title}.mp4`);
	});
};
