var draw = document.getElementById("canvas");
var ctx = draw.getContext("2d");
var error = document.getElementById("err");

let invincible = false;
let invincibilityDuration = 5000; 

let walls = [
    {
        x: 80,
        y: 0,
        width: 5,
        height: 80
    },
    {
        x: 0,
        y: 150,
        width: 180,
        height: 5
    },
    {
        x: 90,
        y: 260,
        width: 5,
        height: 240
    },
    {
        x: 280,
        y: 0,
        width: 5,
        height: 260
    },
    {
        x: 90,
        y: 340,
        width: 250,
        height: 5
    },
    {
        x: 190,
        y: 420,
        width: 250,
        height: 5
    },
    {
        x: 440,
        y: 200,
        width: 5,
        height: 225
    },
    {
        x: 280,
        y: 200,
        width: 160,
        height: 5
    },
    {
        x: 380,
        y: 100,
        width: 180,
        height: 5
    },
    {
        x: 560,
        y: 100,
        width: 5,
        height: 400
    }
]

walls.forEach((wall) => {
    ctx.fillStyle = "blue";
    ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
});

function isColliding(image, wall){
    return(
        !invincible &&
        image.x < wall.x + wall.width &&
        image.x + 50 > wall.x &&
        image.y < wall.y + wall.height &&
        image.y + 50 > wall.y
    );
}

function pickedCherry(image, cherry) {
    if (
        image.x < cherry.x + 50 &&
        image.x + 50 > cherry.x &&
        image.y < cherry.y + 50 &&
        image.y + 50 > cherry.y
    ) {
        cherry.isPickedUp = true;
        invincible = true;
        setTimeout(() => {
            invincible = false;
            if(walls.some((wall) => isColliding(image, wall))){
                invincible = true;
            }
        }, invincibilityDuration);
    }
}

class Cherry {
    constructor(){
        this.x = 20;
        this.y = 430;
        this.isPickedUp = false;
        var img = document.createElement('img');
        img.onload = () => {
            this.img = img;
            this.draw();
        };
        img.src = 'cherry.png';
    }
    draw(){
        if (!this.isPickedUp) {
            ctx.drawImage(this.img, this.x, this.y, 50, 50);
        }
    }
}

let cherry = new Cherry;

class Ghost {
    constructor(){
        this.x = 15;
        this.y = 15;
        var img = document.createElement('img');
        img.onload = () => {
            this.img = img;
            this.draw();
        };
        img.src = 'ghost.png'
    }
    moveUp(){
        if(this.y > 5){
            this.y -= 10;
            if(walls.some((wall) => isColliding(this, wall))){
                this.y += 10;
            }
        }
    }
    moveDown(){
        if(this.y < draw.height - 55){
            this.y += 10;
            if(walls.some((wall) => isColliding(this, wall))){
                this.y -= 10;
            }
        }
    }
    moveLeft(){
        if(this.x > 5) {
            this.x -= 10;
            if(walls.some((wall) => isColliding(this, wall))){
                this.x += 10;
            }
        }
    }
    moveRight(){
        if(this.x < draw.width - 55){
            this.x += 10;
            if(walls.some((wall) => isColliding(this, wall))){
                this.x -= 10;
            }
        }
    }
    draw(){
        ctx.drawImage(this.img, this.x, this.y, 50, 50);
        if(!cherry.isPickedUp){
            pickedCherry(ghost, cherry);
        }
    }
}

var ghost = new Ghost();

document.onkeydown = function(e){
    switch(e.keyCode){
        case 37: ghost.moveLeft(); break;
        case 38: ghost.moveUp(); break;
        case 39: ghost.moveRight(); break;
        case 40: ghost.moveDown(cherry); break;
    }

    // error.innerText = invincible;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cherry.draw();
    ghost.draw();
    walls.forEach((wall) => {
        ctx.fillStyle = "blue";
        ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
    });
    requestAnimationFrame(animate);
}