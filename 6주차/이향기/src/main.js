import laserWav from './sounds/Laser.wav';
import explosionWav from './sounds/explosion.wav';
import explosion02Wav from './sounds/explosion-02.wav';
import gameOverWav from './sounds/game_over.wav';
import './style.css'

const canvas = document.querySelector('#myCanvas');
const ctx = canvas.getContext('2d');

const keysDown = {};
const fighter = {};
fighter.x = 50;
fighter.y = canvas.height / 2;
fighter.speed = 5;

let lastUpdateTime = 0;
let acDelta = 0;
const msPerFrame = 1000;

let bool_bg = false;
let bool_fighter = false;

let bool_laser = false;
const lasers = [];
const laserTotal = 10;

const asteroid = {};
asteroid.x = canvas.width;
asteroid.y = Math.floor(Math.random() * 350);
let bool_asteroid = false;

let speed = 0;
let randScale;
let ang = 0;
const arrScale = [0.4, 0.6, 0.8, 1];

let bool_explode = false;
const hitexplosion = {};
let bool_hitexplosion = false;
let spriteCount = 1;

let bool_fighterexplosion = false;

const explodeSound = new Audio(explosionWav);
const hitexplodeSound = new Audio(explosion02Wav);
hitexplodeSound.volume = 0.5

let score = 0;
let lives = 2;

let isGameOver = false;

const gameOverSound = new Audio(gameOverWav);
gameOverSound.loop = true;
gameOverSound.volume = 0.25;
gameOverSound.load();

const bgImage = new Image();
bgImage.src = 'images/space.png';

const fighterImage = new Image();
fighterImage.src = 'images/fighter.png';

const laserImage = new Image();
laserImage.src = 'images/laser.png';

const asteroidImage = new Image();
asteroidImage.src = 'images/asteroid.png';

const explodeImage = new Image();
explodeImage.src = 'images/explode.png';

bgImage.onload = () => {
    bool_bg = true;
};

fighterImage.onload = () => {
    bool_fighter = true;
};

laserImage.onload = () => {
    bool_laser = true;
}

asteroidImage.onload = () => {
    bool_asteroid = true;
}

explodeImage.onload = () => {
    bool_explode = true;
}

const drawExplode = () => {
    ctx.drawImage(explodeImage,
        spriteCount * 39, 0,
        39, 40,
        hitexplosion.x, hitexplosion.y,
        39 * (1 + randScale), 40 * (1 + randScale));
    spriteCount++;
    if (spriteCount > 13) {
        spriteCount = 1;
        bool_hitexplosion = false;
    }
}


const drawLaser = () => {
    for (const laser of lasers) {
        ctx.drawImage(laserImage, laser[0], laser[1]);
    }
};

const moveLaser = () => {
    for (const [i, laser] of lasers.entries()) {
        if (laser[0] > 0) {
            laser[0] += 20;
        }

        if (laser[0] > 600) {
            lasers.splice(i, 1);
        }
    }
}

class Background {
    constructor() {
        this.x = 0;
        this.y = 0;
    }

    render() {
        ctx.drawImage(bgImage, this.x--, 0);

        if (this.x <= -600) {
            this.x = 0;
        }
    }
}

const shuffle = (arr) => {
    const rand = Math.floor((Math.random() * arr.length));
    return arr[rand];
}

const reset = () => {
    speed = Math.floor(Math.random() * 5) + 5;
    asteroid.x = canvas.width;
    asteroid.y = Math.floor(Math.random() * 350);

    if (asteroid.y < 40) asteroid.y = 40;

    if (asteroid.y > 360) asteroid.y = 360;

    randScale = shuffle(arrScale);
};

const moveAsteroid = () => {
    const w = asteroidImage.width * randScale;
    const h = asteroidImage.height * randScale;
    const coordX = (asteroidImage.width / 2) * randScale;
    const coordY = (asteroidImage.height / 2) * randScale;

    ctx.save();
    ctx.translate(asteroid.x + coordX, asteroid.y + coordY);
    ctx.rotate(Math.PI / 180 * (ang += 5));
    ctx.translate(-asteroid.x - coordX, -asteroid.y - coordY);
    ctx.drawImage(asteroidImage, asteroid.x -= speed, asteroid.y, w, h);
    ctx.restore();

    if (asteroid.x <= -100) reset();
}

const detectCollision = () => {
    const aw = asteroidImage.width * randScale;
    const ah = asteroidImage.height * randScale;
    const fw = fighterImage.width;
    const fh = fighterImage.height;

    // ctx.strokeStyle = "white";
    // ctx.lineWidth = 2;
    // ctx.strokeRect(fighter.x, fighter.y, fighterImage.width, fighterImage.height);
    // ctx.strokeRect(asteroid.x, asteroid.y, aw, ah);

    if ((fighter.x > asteroid.x && fighter.x < asteroid.x + aw
            && fighter.y > asteroid.y && fighter.y < asteroid.y + ah)
        || (fighter.x + fw > asteroid.x && fighter.x + fw < asteroid.x + aw
            && fighter.y > asteroid.y && fighter.y < asteroid.y + ah)
        || (fighter.x > asteroid.x && fighter.x < asteroid.x + aw
            && fighter.y + fh > asteroid.y && fighter.y + fh < asteroid.y + ah)
        || (fighter.x + fw > asteroid.x && fighter.x + fw < asteroid.x + aw
            && fighter.y + fh > asteroid.y && fighter.y + fh < asteroid.y + ah)) {
        bool_fighterexplosion = true;
        bool_explode = true;
        bool_hitexplosion = true;
        hitexplosion.x = asteroid.x;
        hitexplosion.y = asteroid.y;
        reset();
        resetFigher();
        explodeSound.load();
        explodeSound.play();

        if (lives <= 0) {
            lives = 0;
            gameOver();
        } else {
            --lives;
        }
        document.querySelector('#lives').textContent = lives;
    }

    if (lasers.length) {
        for (const [i, laser] of lasers.entries()) {
            if (laser[0] > asteroid.x && laser[0] < asteroid.x + aw
                && laser[1] > asteroid.y && laser[1] < asteroid.y + ah) {
                hitexplosion.x = laser[0];
                hitexplosion.y = laser[1];
                bool_hitexplosion = true;
                lasers.splice(i, 1);
                reset();
                hitexplodeSound.load();
                hitexplodeSound.play();
                document.querySelector('#score').textContent = Number(document.querySelector('#score').textContent) + 100;
            }
        }
    }
};

const resetFigher = () => {
    fighter.x = 0;
    fighter.y = canvas.height / 2;
}

const render = () => {
    const delta = Date.now() - lastUpdateTime;
    if (acDelta > msPerFrame) {
        acDelta = 0;

        if (bool_bg) {
            background.render();
        }

        if (bool_fighter) {
            ctx.drawImage(fighterImage, fighter.x, fighter.y);
        }

        if (bool_laser) {
            drawLaser();
            moveLaser();
        }

        if (bool_fighter) {
            if (bool_fighterexplosion) {
                ctx.drawImage(fighterImage, fighter.x += 1, fighter.y);
                if (fighter.x >= 50) {
                    bool_fighterexplosion = false;
                }
            } else {
                ctx.drawImage(fighterImage, fighter.x, fighter.y);
            }
        }

        if (bool_asteroid) {
            moveAsteroid();
        }

        if (bool_explode && bool_hitexplosion) {
            drawExplode();
        }
    } else {
        acDelta += delta
    }
};

const update = () => {
    if (87 in keysDown) {
        fighter.y -= fighter.speed;
    }

    if (83 in keysDown) {
        fighter.y += fighter.speed;
    }

    if (65 in keysDown) {
        fighter.x -= fighter.speed;
    }

    if (68 in keysDown) {
        fighter.x += fighter.speed;
    }

    // boundary limit
    if (fighter.x <= 0) {
        fighter.x = 0;
    }

    if (fighter.x >= canvas.width - 60) {
        fighter.x = canvas.width - 60;
    }

    if (fighter.y <= 0) {
        fighter.y = 0;
    }

    if (fighter.y >= canvas.height - 30) {
        fighter.y = canvas.height - 30;
    }

    detectCollision();
};

const laserSound = new Audio(laserWav);

const soundPlay = () => {
    laserSound.volume = 0.12;
    laserSound.load();
    laserSound.play();
}

addEventListener('keydown', (e) => {
    keysDown[e.keyCode] = true;

    if (e.keyCode === 32 && lasers.length <= laserTotal) {
        lasers.push([fighter.x + 50, fighter.y + 10]);
        soundPlay();
    }
});

addEventListener('keyup', (e) => {
    delete keysDown[e.keyCode];
});

document.querySelector('.sound').addEventListener('click', (e) => {
    const $this = e.target;

    if ($this.classList.contains('sound-on')) {
        $this.classList.remove('sound-on');
        $this.classList.add('sound-off');
        document.querySelector('.myAudio').pause();
    } else {
        $this.classList.remove('sound-off');
        $this.classList.add('sound-on');
        document.querySelector('.myAudio').play();
    }
});

document.querySelector('.myAudio').volume = 0.5;

const main = () => {
    update();
    render();
    requestAnimationFrame(main);
};

document.querySelector('#lives').textContent = lives;
const background = new Background();
reset();
main();
