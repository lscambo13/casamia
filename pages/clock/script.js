/* eslint-disable camelcase */

// console.log('Clock by lscambo13');
// const clock = document.getElementById('clock');
const clock_h = document.getElementById('clock_h');
const clock_m = document.getElementById('clock_m');
const clock_s = document.getElementById('clock_s');
const clock_h_shadow = document.getElementById('clock_h_shadow');
const clock_m_shadow = document.getElementById('clock_m_shadow');
const clock_s_shadow = document.getElementById('clock_s_shadow');
const clock_h_shadow_more = document.getElementById('clock_h_shadow_more');
const clock_m_shadow_more = document.getElementById('clock_m_shadow_more');
const clock_s_shadow_more = document.getElementById('clock_s_shadow_more');
// const clock_hands = document.getElementsByClassName('clock_hands');
// const clock_hands_shadow = ;
// document.getElementsByClassName('clock_hands_shadow');

// const clock_origin = clock.width / 2;

// for (const e of clock_hands) {
// 	// e.style.left = 0 + 'px'
// }

// for (const e of clock_hands_shadow) {
// 	// e.style.left = clock_origin + 'px'
// 	// e.style.left = 6 + 'px'
// 	// e.style.top = 12 + 'px'
// }

let turnS = 0;
const multiplyS = (int) => {
	if (int === 0) turnS++;
	const x = int + (360 * turnS);
	return x;
};
let turnH = 0;
const multiplyH = (int) => {
	if (int === 0) turnH++;
	const x = int + (360 * turnH);
	return x;
};
let turnM = 0;
const multiplyM = (int) => {
	if (int === 0) turnM++;
	const x = int + (360 * turnM);
	return x;
};

const clockRotation = () => {
	const sec = new Date().getSeconds();
	const min = new Date().getMinutes();
	const hr = new Date().getHours();

	const final_sec = multiplyS((sec * 6));
	clock_s.style.transform = `rotate(${final_sec}deg)`;
	clock_s_shadow.style.transform = `rotate(${final_sec}deg)`;
	clock_s_shadow_more.style.transform = `rotate(${final_sec}deg)`;

	const final_min = multiplyM((min * 6) + (sec / 10));
	clock_m.style.transform = `rotate(${final_min}deg)`;
	clock_m_shadow.style.transform = `rotate(${final_min}deg)`;
	clock_m_shadow_more.style.transform = `rotate(${final_min}deg)`;


	const final_hr = multiplyH((hr * 30) + (min / 2));
	clock_h.style.transform = `rotate(${final_hr}deg)`;
	clock_h_shadow.style.transform = `rotate(${final_hr}deg)`;
	clock_h_shadow_more.style.transform = `rotate(${final_hr}deg)`;
}

setInterval(clockRotation, 1000);

setTimeout(() => {
	document.body.style.opacity = '1';
}, 850);

// window.onfocus = () => { window.location.reload() };
