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

const createDownloadCard = (title, url, thumb) => {
	// const tempRes = res;
	// let quality = tempRes.match(/\((.*)\)/)?.pop();
	// if (!quality) quality = 'View';
	container.insertAdjacentHTML('beforeend', `
		<div class="downloadItemContainer">
			<video 
				controls disablepictureinpicture
				controlslist="noplaybackrate" 
				src="${url}" alt="Thumbnail"
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
					<div>
						<a href="${url}" class="premiumDownloadButton">
							<span class="videoResolution">AUTO</span>
						</a>
					</div>
				</div>
			</div>
			<div class="proDownloadContainer" >
				<span class="proDownloadContainerLabel
					premiumDownloadButton">PRO</span>
				<div class="proDownloadOptions">
					<div>
						<a href="${url}" class="premiumDownloadButton disabled">
							<span class="videoResolution">MP3</span>
						</a>
					</div>
					<div>
						<a href="${url}" class="premiumDownloadButton disabled">
							<span class="videoResolution">SD</span>
						</a>
					</div>
					<div>
						<a href="${url}" class="premiumDownloadButton disabled">
							<span class="videoResolution">HD</span>
						</a>
					</div>
					<div>
						<a href="${url}" class="premiumDownloadButton disabled">
							<span class="videoResolution">FHD</span>
						</a>
					</div>
					<div>
						<a href="${url}" class="premiumDownloadButton disabled">
							<span class="videoResolution">FHD+</span>
						</a>
					</div>
					<div>
						<a href="${url}" class="premiumDownloadButton disabled">
							<span class="videoResolution">UHD</span>
						</a>
					</div>
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
				createDownloadCard(i.title, i.stream, i.thumbnail);
				console.log(i.source, i.resolutions);
				loading.classList.add('hidden');
			});
		});
	}).catch((e) => {
		genericAlert(
			`Fatal Error`,
			e);
		closeContainer();
	});
};
