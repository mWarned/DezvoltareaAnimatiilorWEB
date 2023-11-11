const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const input1 = document.getElementById("colorInput");
const input2 = document.getElementById("randomColor");
const input3 = document.getElementById("shapeInput");
const err = document.getElementById("error");
const particle = [];
let color;
let selectedColor;
let selectedShape = "circle";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let holding;

input1.addEventListener("input", function() {
    selectedColor = input1.value;
})

input2.addEventListener("click", function() {
    selectedColor = null;
})

input3.addEventListener("change", function(e) {
    selectedShape = input3.value;
    console.log(selectedShape);
})

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const mouse = {
    x: undefined,
    y: undefined,
}

canvas.addEventListener('click', function(mouseclick){
    mouse.x = mouseclick.x;
    mouse.y = mouseclick.y;
    selectedShape = "triangle";
    for (let j = 0; j<6; j++){
        particle.push(new Particle(selectedShape));
    }
    input3.selectedIndex = (input3.selectedIndex + 1) % 3;
    selectedShape = input3.value;
})

canvas.addEventListener('mousemove', function(mouseclick){
    document.body.onmousedown = function(){
        holding = true;
    }
    document.body.onmouseup = function(){
        holding = false;
    }

    mouse.x = mouseclick.x;
    mouse.y = mouseclick.y;

    if(holding === true){
        selectedShape = "square";
        for (let j = 0; j<2; j++){
            particle.push(new Particle(selectedShape));
        }
    } else {
        for (let j = 0; j<2; j++){
            particle.push(new Particle(selectedShape));
        }
    }
    
    selectedShape = input3.value;
})

class Particle{
    constructor(shape){
        this.x=mouse.x;
        this.y=mouse.y;
        this.shape = shape;
        this.size=Math.random()*40;
        this.speedX=Math.random()*2.5;
        this.speedY=Math.random()*2.5;
        this.color = setColor();
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.size>0.2) this.size -= 0.1;
        this.checkCollision();
    }
    checkCollision() {
        for (let i = 0; i < particle.length; i++) {
            const checkParticle = particle[i];

            if (this === checkParticle) continue;

            const dx = this.x - checkParticle.x;
            const dy = this.y - checkParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            console.log(distance);

            if (distance < this.size + checkParticle.size) {
                const angle = Math.atan2(dy, dx);
                const totalSpeed = this.speed + checkParticle.speed;

                this.x += Math.cos(angle) * (this.size + checkParticle.size - distance) / 2;
                this.y += Math.sin(angle) * (this.size + checkParticle.size - distance) / 2;

                this.speedX = Math.cos(angle) * totalSpeed;
                this.speedY = Math.sin(angle) * totalSpeed;
            }
        }

        if (this.x + this.size >= canvas.width || this.x - this.size <= 0) {
            this.speedX = -this.speedX;
        }
    
        if (this.y + this.size >= canvas.height || this.y - this.size <= 0) {
            this.speedY = -this.speedY;
        }
    }
    draw(){
        if (this.shape === "circle") {
            ctx.beginPath();
            ctx.strokeStyle = this.color;
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.stroke();
        } else if (this.shape === "square") {
            ctx.strokeStyle = this.color;
            ctx.strokeRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
        } else if (this.shape === "triangle") {
            ctx.beginPath();
            ctx.strokeStyle = this.color;
            ctx.moveTo(this.x, this.y - this.size);
            ctx.lineTo(this.x - this.size, this.y + this.size);
            ctx.lineTo(this.x + this.size, this.y + this.size);
            ctx.closePath();
            ctx.stroke();
        }
    }
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

function setColor(){
    if(selectedColor == null){
        return getRandomColor();
    }
    else {
        return selectedColor;
    }
}

function init(){
    for (let i = 0; i<100; i++){
        particle.push(new Particle());
    }
}
init();

function drawParticle(){
    for (let i = 0; i < particle.length; i++){
        particle[i].update();
        particle[i].draw();
        if(particle[i].size<=0.2){
            particle.splice(i,1);
            i--;
        }
    }
}
function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawParticle();
    requestAnimationFrame(animate);
}

animate();