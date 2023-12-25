export function blurLevel(int) {
	document.documentElement.style
		.setProperty('--blur-one-em', `blur(${int}em)`);
	document.documentElement.style
		.setProperty('--blur-one-px', `blur(${int}px)`);
}