export function isTouchDevice() {
	// return (('ontouchstart' in window) ||
	// 	(navigator.maxTouchPoints > 0) ||
	// 	(navigator.msMaxTouchPoints > 0));
	if (window.matchMedia('(hover: none)').matches) {
		return true;
	} else return false;
};
