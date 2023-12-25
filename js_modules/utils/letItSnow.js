let pause = false
export function pauseSnaowfall(boolean) {
	pause = boolean
	isItChristmas()
}
export function isItChristmas() {
	let date = new Date()
	if (date.getMonth() == 11 && date.getDate() > 17 && date.getDate() < 32) {
		// console.log(date.getMonth() == 11, date.getDate() > 17, date.getDate() < 32)
		letItSnow()
	}
}
function letItSnow() {
	pause = true
	//canvas init
	var canvas = document.getElementById("canvasFar");
	var ctx = canvas.getContext("2d");

	//canvas dimensions
	var W = window.innerWidth;
	var H = window.innerHeight;
	canvas.width = W;
	canvas.height = H;

	//snowflake particles
	var mp = 50; //max particles
	var particles = [];
	for (var i = 0; i < mp; i++) {
		particles.push({
			x: Math.random() * W, //x-coordinate
			y: Math.random() * H, //y-coordinate
			r: Math.random() * 4 + 1, //radius
			d: Math.random() * mp //density
		})
	}

	//Lets draw the flakes
	ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
	function draw() {
		// let tStart = Date.now()
		ctx.clearRect(0, 0, W, H);
		ctx.beginPath();
		for (var i = 0; i < mp; i++) {
			var p = particles[i];
			ctx.moveTo(p.x, p.y);
			ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
		}
		ctx.fill();
		update();
		if (!pause) window.requestAnimationFrame(draw);
		// console.log(Date.now() - tStart)
		// console.log('draw')
	}

	//Function to move the snowflakes
	//angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
	// var angle = 0;
	function update() {
		// console.log('update main')
		// angle += 0.01;
		for (var i = 0; i < mp; i++) {
			// console.log('update loop')
			var p = particles[i];
			//Updating X and Y coordinates
			//We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
			//Every particle has its own density which can be used to make the downward movement different for each flake
			//Lets make it more random by adding in the radius
			p.y += Math.cos(p.d) + 1 + p.r / 10;
			// p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
			// p.x += Math.sin(angle) * 2;

			//Sending flakes back from the top when it exits
			//Lets make it a bit more organic and let flakes enter from the left and right also.
			if (p.x > W + 5 || p.x < -5 || p.y > H) {
				if (i % 3 > 0) //66.67% of the flakes
				{
					particles[i] = { x: Math.random() * W, y: -10, r: p.r, d: p.d };
				}
				// else {
				// 	//If the flake is exitting from the right
				// 	if (Math.sin(angle) > 0) {
				// 		//Enter from the left
				// 		particles[i] = { x: -5, y: Math.random() * H, r: p.r, d: p.d };
				// 	}
				// 	else {
				// 		//Enter from the right
				// 		particles[i] = { x: W + 5, y: Math.random() * H, r: p.r, d: p.d };
				// 	}
				// }
			}
		}
	}
	canvas.style.display = 'block'
	pause = false
	window.requestAnimationFrame(draw);
	//animation loop
	// setInterval(draw, 60);
}
