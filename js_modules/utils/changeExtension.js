export function changeExtension(filename, ext) {
	const array = filename.split('.');
	array[array.length - 1] = ext;
	return array.join('.');
};
