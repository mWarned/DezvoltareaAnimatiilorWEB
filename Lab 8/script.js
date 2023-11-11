let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

window.onload = function(){
    setInterval(drawEverything,5)
}

class Ball {
    constructor(x, y, color, speedX, speedY) {
      this.x = x;
      this.y = y;
      this.radius = 9;
      this.color = color;
      this.speedX = speedX;
      this.speedY = speedY;
    }

    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    move() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
        this.speedX = -this.speedX;
      }

      if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
        this.speedY = -this.speedY;
      }
    }
  }

  const balls = [
    new Ball(50, 50, 'green', -1, -1),
    new Ball(50, 50, 'rgba(0, 255, 0, 0.8)', -0.9, -0.9),
    new Ball(50, 50, 'rgba(0, 255, 0, 0.6)', -0.8, -0.8),
    new Ball(50, 50, 'rgba(0, 255, 0, 0.4)', -0.7, -0.7),
    new Ball(50, 50, 'rgba(0, 255, 0, 0.2)', -0.6, -0.6),

    new Ball(100, 100, 'yellow', 2, -3),
    new Ball(100, 100, 'rgba(255, 255, 0, 0.8)', 1.9, -2.9),
    new Ball(100, 100, 'rgba(255, 255, 0, 0.6)', 1.8, -2.8),
    new Ball(100, 100, 'rgba(255, 255, 0, 0.4)', 1.7, -2.7),
    new Ball(100, 100, 'rgba(255, 255, 0, 0.2)', 1.6, -2.6),

    new Ball(150, 150, 'orange', 4, 6),
    new Ball(150, 150, 'rgba(255, 165, 0, 0.8)', 3.8, 5.8),
    new Ball(150, 150, 'rgba(255, 165, 0, 0.6)', 3.6, 5.6),
    new Ball(150, 150, 'rgba(255, 165, 0, 0.4)', 3.4, 5.4),
    new Ball(150, 150, 'rgba(255, 165, 0, 0.2)', 3.2, 5.2),

    new Ball(200, 200, 'red', -8, 7),
    new Ball(200, 200, 'rgba(255, 0, 0, 0.8)', -7.8, 6.8),
    new Ball(200, 200, 'rgba(255, 0, 0, 0.6)', -7.6, 6.6),
    new Ball(200, 200, 'rgba(255, 0, 0, 0.4)', -7.4, 6.4),
    new Ball(200, 200, 'rgba(255, 0, 0, 0.2)', -7.2, 6.2),
];

function drawEverything(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    for(const ball of balls){
        ball.draw();
        ball.move();
    }
}
