let canvas;
let ball;
let balls = [];

// run 1 time on start
function setup() {
	// console.log('[setup]')
	canvas = createCanvas(400, 400);
	canvas.parent("sketchDiv");
	ball = new Ball();
	balls.push(ball);
}

// loop
function draw() {
	// console.log('[loop]')

	background(250, 100);
	balls.forEach((x) => x.update());
	balls.forEach((x) => x.draw());

	while (balls.length > 300) {
		balls.shift();
	}
}

class Ball {
	constructor(x = 50, y = 50, r = 10, col = "rgba(255, 150, 200, 0.8)") {
		this.r = r;
		this.color = color(col);
		this.pos = { x: x, y: y };
		this.vel = { x: 5, y: 0 };
		this.acc = { x: 0, y: 1 };
	}

	update() {
		this.vel.x += this.acc.x;
		this.vel.y += this.acc.y;
		this.pos.x += this.vel.x;
		this.pos.y += this.vel.y;

		// check ground
		if (this.pos.y > height - this.r) {
			this.pos.y = height - this.r;
			this.vel.y *= -0.99;
			this.vel.x += (Math.random() - 0.5) * 1;
		}
		if (this.pos.x > width - this.r) {
			this.pos.x = width - this.r;
			this.vel.x *= -0.99;
		} else if (this.pos.x < this.r) {
			this.pos.x = this.r;
			this.vel.x *= -0.99;
		}
	}

	draw() {
		noStroke();
		fill(this.color);
		ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
	}
}

function mousePressed() {
	console.log(mouseX, mouseY);
	ball = new Ball(
		mouseX,
		mouseY,
		Math.random() * 10 + 5,
		`rgba(${Math.floor(Math.random() * 255)}, 150, 200, 0.8)`
	);
	balls.push(ball);
}
