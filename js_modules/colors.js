export function changeGlow(color, opacity) {
	const glowOverlay = document.getElementById('gradient_overlay');
	const wallpapersRollOverlay = document.getElementById('wallpapers');
	const glowSetting = localStorage.getItem('glow');
	if (opacity != null) {
		if (glowSetting != '1') glowOverlay.style.opacity = opacity;
	}
	if (color != null) {
		wallpapersRollOverlay.style.background =
			`linear-gradient(to top, rgb(${color}), 50%, #fbd3e900)`;
		glowOverlay.style.background =
			`linear-gradient(to top, rgb(${color}), 50%, #fbd3e900)`;
	}
}

export function changeTextAccentColor(color) {
	const i = document.getElementsByClassName('has-shadow');
	for (let n = 0; n < i.length; n++) {
		i[n].style.textShadow =
			`4px 4px 0 rgba(${color},.85), 6px 6px 0px black`;
	}
}

export function changeSelectionColor(color) {
	document.documentElement.style
		.setProperty('--selection-color', `rgba(${color}, .5)`);
}
