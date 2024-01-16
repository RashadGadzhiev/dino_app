
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


let score = 0;
const cactus2_img = document.getElementById("cactus2");
const cactus3_img = document.getElementById("cactus3");
const desert_img = document.getElementById("desert");
const desertGO_img = document.getElementById("desertGO");
const dino1_img = document.getElementById("dino1");
const dino2_img = document.getElementById("dino2");
const dino3_img = document.getElementById("dino3");

function update(){
    ctx.drawImage(desert_img, 0, 0, canvas.width, canvas.height);
    dino.draw();
    cactus.draw();
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText(score, 550, 30);
    if(collision(dino, cactus)){
        ctx.drawImage(desertGO_img, 0, 0, canvas.width, canvas.height);
        return true;
    }
    window.requestAnimationFrame(update);
}


function Dino(){
    this.x = 0;
    this.y = 240;
    this.width = 84;
    this.height = 69;
    this.image = dino1_img;
    this.delay = 0;
    this.changeY = 0;
    this.jump = false;
    this.draw = function(){
        this.delay++;
        if(this.image == dino1_img && this.delay == 20){
            this.image = dino2_img;
        }
        else if(this.image == dino2_img && this.delay == 20){
            this.image = dino3_img;
        }
        else if(this.image == dino3_img && this.delay == 20){
            this.image = dino1_img;
        }
        if(this.delay == 20){
            this.delay = 0;
        }
        this.y += this.changeY;
        this.changeY += 0.1;
        if(this.y >= 240){
            this.y = 240;
            this.jump = false;
        }
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

function Cactus(){
    this.x = canvas.width;
    this.y = 247;
    this.width = 50;
    this.height = 62;
    this.image = cactus2_img;
    this.changeX = -1.5;
    this.delay = 0;
    this.draw = function(){
        this.x += this.changeX;
        this.delay++;
        if(this.image == cactus2_img && this.delay == 30){
            this.image = cactus3_img;
        }
        else if(this.image == cactus3_img && this.delay == 30){
            this.image = cactus2_img;
        }
        if(this.delay == 30){
            this.delay = 0;
        }
        ctx.drawImage(this.image, this.x, this.y,  this.width, this.height);
        if(this.x + this.width <= 0){
            this.x = canvas.width;
            score++;
        }
    }
}

function collision(dino, cactus){
    if(dino.x + dino.width > cactus.x && cactus.x + cactus.width > dino.x && dino.y + dino.height > cactus.y){
        return true;
    }
    return false;
}

let cactus = new Cactus();

let dino = new Dino();

update();

window.addEventListener("keydown", function(e){
    if(e.keyCode == 32 && dino.jump == false){
        dino.changeY = -7;
        dino.jump = true;
    }
    
});