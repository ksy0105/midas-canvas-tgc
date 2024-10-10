import getCanvas from "../get-canvas.js";

const { canvas, ctx } = getCanvas('03-14-2');

const bgImage = new Image();
bgImage.src = 'dog.jpg';
const playerImage = new Image();
playerImage.src = 'fire.webp';
let x = 0;

function Background() {
  this.x = 0, this.y = 0, this.w = bgImage.width, this.h = bgImage.height;
  this.render = function() {
    ctx.drawImage(bgImage, x--, -250);
    if (x <= -400) x = 0;
  };
}

function Player() {
  this.x = 0, this.y = 0, this.w = playerImage.width, this.h = playerImage.height;
  this.render = function() {
    ctx.drawImage(playerImage, this.x, this.y);
  };
}

const background = new Background();
const player = new Player();
player.x = 30;
player.y = 0;

function animate() {
  background.render();
  player.render();
  update();
}

const animateInterval = setInterval(animate, 15);

const speed = 5;
let keyCodeValue;

function update() {
  if (keyCodeValue === "W") {
    player.y -= speed;
  } else if (keyCodeValue === "S") {
    player.y += speed;
  } else if (keyCodeValue === "A") {
    player.x -= speed;
  } else if (keyCodeValue === "D") {
    player.x += speed;
  }
}

document.addEventListener('keydown', (e) => {
  keyCodeValue = String.fromCharCode(e.keyCode);
});

document.addEventListener('keyup', (e) => {
  keyCodeValue = '';
});
