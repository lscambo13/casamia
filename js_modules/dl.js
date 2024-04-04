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

const getResolutionTitle = (e) => {
	if (e < 720) return 'SD';
	else if (e < 1080) return 'HD';
	else if (e < 1440) return 'FHD';
	else if (e < 2160) return 'QHD';
	else if (e < 4320) return 'UHD';
	else if (e >= 4320) return 'UHD+';
};

function getResolutionHeight(text) {
	if (text == 'SD') return '480';
	else if (text == 'HD') return '720';
	else if (text == 'FHD') return '1080';
	else if (text == 'QHD') return '1440';
	else if (text == 'UHD') return '2160';
	else if (text == 'UHD+') return '4320';
	else return text;
}

const addEntry = (height, source, title, free) => {
	const title2 = encodeURIComponent(title);
	let isDisabled = 'disabled';
	const h = getResolutionHeight(height);
	if (getResolutionTitle(free) === height) isDisabled = '';
	return `
	<div>
		<a href="${BACKEND_URL}/getDL/?url=${source}&height=${h}&title=${title2}" 
			class="premiumDownloadButton ${isDisabled}">
			<span class="videoResolution">${height}</span>
		</a>
	</div>
	`;
};

const addProResolutionEntries = (res, source, title, free) => {
	const set = new Set();
	res[0].forEach((e) => {
		if (e < 720) set.add('SD');
		else if (e < 1080) set.add('HD');
		else if (e < 1440) set.add('FHD');
		else if (e < 2160) set.add('QHD');
		else if (e < 4320) set.add('UHD');
		else if (e >= 4320) set.add('UHD+');
	});

	let elements = '';
	set.forEach((e) => {
		elements = addEntry(e, source, title, free) + elements;
	});

	return elements;
};

// const addFreeResolutionEntries = (streams, source, title) => {
// 	let elements = '';
// 	Object.keys(streams).forEach((k) => {
// 		if (!streams[k].stream.length) return;
// 		elements = elements +
// 			addEntry(streams[k].info, source, title);
// 	});
// 	return elements;
// };


const createDownloadCard = (title, streams, thumb, resolutions, source) => {
	// const free = addFreeResolutionEntries(streams, source, title);
	const free = streams['bestVideoWithAudio'].info;
	const pro = addProResolutionEntries(resolutions, source, title, free);
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
			<div class="proDownloadContainer" >
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
				createDownloadCard(i.title,
					i.streams,
					i.thumbnail,
					i.resolutions,
					i.source);
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
