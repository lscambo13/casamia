import { BACKEND_URL } from './constants';
import { addEventListenerOnID, getSearchTerm } from './utils';
import { genericAlert } from './utils/alertDialog';
import { Notify } from './utils/notifyDialog';
import { isUrlValid } from './validators';

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
				<div>
					<a href="${url}" class="downloadButton button">
						<span>Auto</span>
						<span class="fa-solid fa-play hidden"></span>
					</a>
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

	document.querySelector('#searchBarFocusMode').click();
	container.classList.remove('hidden');
	loading.classList.remove('hidden');

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
