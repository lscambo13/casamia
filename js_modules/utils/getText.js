export const getText = async (url, tag) => {
	const response = await fetch(url);
	const html = await response.text();
	const doc = new DOMParser().parseFromString(html, 'text/html');
	const title = doc.querySelector(tag).innerText;
	return title;
};
