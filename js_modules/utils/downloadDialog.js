import { BACKEND_URL } from "../constants";
import { downloadFile, downloadMe } from "./downloadFile";

const container = document.getElementById('downloadContainer');

export const displayDownloadError = (err) => {
	container.insertAdjacentHTML('beforeend', `
	<div class="downloadItemContainer">
		<span>${err}</span>
	</div>
	`);
};

export const populateDownloadList = (title, url, thumb, res) => {
	const quality = res.match(/\((.*)\)/).pop();
	container.insertAdjacentHTML('beforeend', `
		<div class="downloadItemContainer">
			<img src="${thumb}" alt="Thumbnail" class="downloadItemThumbnail">
			<div class="downloadInfoContainer">
				<span class="downloadItemTitle">${title}</span>
				<div>
					<span class="downloadItemResolution hidden">${res}</span>
					<a href="${url}" 
					class="downloadButton button">
					<span title="${res}">${quality}</span>
					<span class="fa-solid fa-download"></span>
					</a>
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
		console.log('clicked');
		// downloadFile(url, `${title}.mp4`);
	});
	const thumbnail = document.getElementsByClassName('downloadItemThumbnail');
	thumbnail[thumbnail.length - 1].addEventListener('click', () => {
		downloadMe(url);
		return;
		fetch(`${BACKEND_URL}/stream/?url=${url}`).then((response) => {
			console.log(response.body)
		}).catch((e) => console.log(e))
	});
};
