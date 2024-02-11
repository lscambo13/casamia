import { BACKEND_URL } from './constants';
import { addEventListenerOnID, getSearchTerm } from './utils';
import { genericAlert } from './utils/alertDialog';
import { Notify } from './utils/notifyDialog';
import { isUrlValid } from './validators';

const modalBackground =
	document.getElementById('advanced-settings-modal-background-overlay');
const wrap = document.getElementById('wrap');

const container = document.getElementById('downloadContainer');
const loading = document.getElementById('progress-bar');

const addEntry = (u, res) => {
	return `
	<div>
		<a href="${u}" class="premiumDownloadButton">
			<span class="videoResolution">${res}</span>
		</a>
	</div>
	`;
};

const addProResolutionEntries = (url, res) => {
	const set = new Set();
	res[0].forEach((e) => {
		if (e < 720) set.add('SD');
		else if (e < 1080) set.add('HD');
		else if (e < 1440) set.add('FHD');
		else if (e < 2160) set.add('QHD');
		else if (e < 4320) set.add('UHD');
		else if (e >= 4320) set.add('UHD+');
	});

	let elements = `
		<div>
			<a href="${url}" class="premiumDownloadButton">
				<span class="videoResolution">MP3</span>
			</a>
		</div>
	`;

	set.forEach((e) => {
		elements = addEntry(url, e) + elements;
	});

	return elements;
};

const addFreeResolutionEntries = (streams) => {
	let elements = '';
	Object.keys(streams).forEach((k) => {
		let title;
		if (!streams[k].stream.length) return;
		if (k === 'bestVideoOnly') {
			title = `${streams[k].info}P MUTED`;
		} else if (streams[k].info === 'NA') {
			title = 'AUDIO';
		} else {
			title = `${streams[k].info}P`;
		}
		if (title) {
			elements = elements + addEntry(streams[k].stream, title);
		}
	});
	return elements;
};


const createDownloadCard = (title, streams, thumb, resolutions) => {
	const free = addFreeResolutionEntries(streams);
	const pro = addProResolutionEntries('#', resolutions);
	container.insertAdjacentHTML('beforeend', `
		<div class="downloadItemContainer">
			<video 
				controls disablepictureinpicture
				controlslist="noplaybackrate" 
				src="${streams['bestVideoWithAudio'].stream}" alt="Thumbnail"
				poster="${thumb}"
				class="downloadItemThumbnail">
			</video>
			<div class="downloadInfoContainer">
				<span class="downloadItemTitle">${title}</span>
			</div>
			<div class="proDownloadContainer">
				<span class="proDownloadContainerLabel
					premiumDownloadButton">FREE</span>
				<div class="proDownloadOptions">
					${free}
				</div>
			</div>
			<div class="proDownloadContainer disabled" >
				<span class="proDownloadContainerLabel
					premiumDownloadButton">PRO</span>
				<div class="proDownloadOptions">
					${pro}
				</div>
			</div>
		</div>
	`);
};

const cleanDownloadContainer = () => {
	const items = document.querySelectorAll('.downloadItemContainer');
	for (const i of items) {
		i.remove();
	}
};

const closeContainer = () => {
	loading.classList.remove('hidden');
	container.classList.add('hidden');
	container.removeEventListener('click', closeContainer);
	cleanDownloadContainer();
	document.title = document.title.replace('Downloader', 'Search');
	history.pushState({ loc: 'home' }, '', '?home');
	document.body.classList.remove('justifySpaceBetween');
	wrap.style.display = 'block';
	// modal.style.display = 'none';
	modalBackground.style.display = 'none';
};


function openContainer() {
	history.pushState({ loc: 'downloader' }, '', '?downloader');
	document.title = document.title.replace('Search', 'Downloader');
	document.body.classList.add('justifySpaceBetween');
	wrap.style.display = 'none';
	// modal.style.display = 'block';
	loading.classList.remove('hidden');
	modalBackground.style.display = 'block';
	window.scrollTo(0, 0);
	document.querySelector('#searchBarFocusMode').click();
	container.classList.remove('hidden');
};

export const parseDl = (event, url = null) => {
	if (!url) {
		const input = getSearchTerm().value;
		if (isUrlValid(input)) {
			url = input;
		} else {
			Notify.show('You need to enter a website link first');
			return;
		}
	}
	openContainer();
	addEventListenerOnID('downloadContainer-close-btn', 'click', closeContainer);
	fetch(`${BACKEND_URL}/getInfo/?url=${url}`).then((result) => {
		if (result.status !== 200) {
			result.json().then((res) => {
				if (res[0]?.err) {
					genericAlert(
						`Error ${result.status} ${result.statusText}`,
						res[0].err);
				} else {
					genericAlert(
						`Unknown Error ${result.status} ${result.statusText}`,
						res.stderr);
				}
				closeContainer();
			});
			return;
		}
		result.json().then((res) => {
			console.log(res);
			res.forEach((i) => {
				loading.classList.add('hidden');
				if (!i.resolutions.length) {
					genericAlert(
						`Something went wrong`,
						i.err);
					closeContainer();
					return;
				}
				createDownloadCard(i.title, i.streams, i.thumbnail, i.resolutions);
				console.log(i.source, i.err);
			});
		});
	}).catch((e) => {
		genericAlert(
			`Fatal Error`,
			e);
		closeContainer();
	});
};
