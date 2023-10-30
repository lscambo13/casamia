export function blurLevel(int) {
	document.documentElement.style
		.setProperty('--blur-one-em', `blur(${int}em)`);
}