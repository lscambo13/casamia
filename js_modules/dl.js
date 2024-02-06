import { BACKEND_URL } from './constants';
import { addEventListenerOnID } from './utils';
import { genericAlert } from './utils/alertDialog';

const container = document.getElementById('downloadContainer');
const loading = document.getElementById('progress-bar');

// const dlButtonHandler = (url) => {
// 	fetch(url).then((res) => res.blob()).then((file) => {
// 		const tempUrl = URL.createObjectURL(file);
// 		const aTag = document.createElement("a");
// 		aTag.href = tempUrl;
// 		aTag.download = url.replace(/^.*[\\\/]/, '');
// 		document.body.appendChild(aTag);
// 		aTag.click();
// 		// URL.revokeObjectURL(tempUrl);
// 		// aTag.remove();
// 		// res();
// 	})
// 	return
// 	const stream = new MediaStream(url);
// 	const e = document.createElement('video');
// 	stream.srcObject = url;
// 	stream.download = `${title}_${quality}`;
// 	document.body.append(stream);
// 	stream.click();
// 	stream.remove();
// 	return;
// 	fetch(url, { mode: 'no-cors' }).then((res) => {
// 		const reader = res.arrayBuffer()
// 		console.log(reader)
// 		return
// 		getReader();
// 		reader.read().then(({ done, value }) => {
// 			if (done) console.log('done');
// 			console.log(value);
// 		});
// 		// console.log(res.data);
// 		// res.blob().then((b) => {
// 		// 	console.log(b);
// 		// 	const tempUrl = URL.createObjectURL(b);
// 		// 	const e = document.createElement('a');
// 		// 	e.href = tempUrl;
// 		// 	e.download = `${title}_${quality}`;
// 		// 	document.body.append(e);
// 		// 	e.click();
// 		// 	e.remove();
// 		// 	// console.log(file);
// 		// });
// 	});
// 	console.log('dh')
// 	// e.setAttribute('download', title);
// 	// e.style.display = 'none';
// 	// document.body.appendChild(e);
// 	// console.log('clicked');
// 	// // downloadFile(url, `${title}.mp4`);
// };

const createDownloadCard = (title, url, thumb, res) => {
	const tempRes = res;
	let quality = tempRes.match(/\((.*)\)/)?.pop();
	if (!quality) quality = 'View';
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
				<span class="downloadItemResolution hidden">${res}</span>
				<div>
					<a href="${url}" class="downloadButton button">
						<span title="${res}">${quality}</span>
						<span class="fa-solid fa-download hidden"></span>
					</a>
				</div>
			</div>
		</div>
	`);
	// const link = url;
	// const button = document.getElementsByClassName('downloadButton');
	// button[button.length - 1].addEventListener('click', () => {
	// 	dlButtonHandler(url, title, quality);
	// });
	// const thumbnail = document.getElementsByClassName('downloadItemThumbnail');
	// thumbnail[thumbnail.length - 1].addEventListener('click', () => {
	// 	downloadMe(url);
	// 	return;
	// 	fetch(`${BACKEND_URL}/stream/?url=${url}`).then((response) => {
	// 		console.log(response.body)
	// 	}).catch((e) => console.log(e))
	// });
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

export const parseDl = (url) => {
	document.querySelector('#searchBarFocusMode').click();
	container.classList.remove('hidden');
	loading.classList.remove('hidden');

	addEventListenerOnID('downloadContainer-close-btn', 'click', closeContainer);
	fetch(`${BACKEND_URL}/dl/?url=${url}`).then((result) => {
		if (result.status !== 200) {
			result.json().then((res) => {
				if (res[0]?.err) {
					genericAlert(
						`Error ${result.status} (${result.statusText})`,
						res[0].err);
				} else {
					genericAlert(
						`Unknown Error ${result.status} (${result.statusText})`,
						res.stderr);
				}
				closeContainer();
			});
			return;
		}
		result.json().then((res) => {
			console.log(res);
			res.forEach((i) => {
				createDownloadCard(i.title, i.url, i.thumb, i.res);
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
