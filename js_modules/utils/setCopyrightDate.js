export const setCopyrightDate = () => {
	const year = new Date().getFullYear();
	const e = document.getElementById('copyright-text');
	e.title = `\u00A9 ${year} lscambo13`;
	e.innerText = `\u00A9 ${year} lscambo13`;
};
