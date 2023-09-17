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
