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

const bgImage = new Image();
bgImage.src = 'images/space.png';

const fighterImage = new Image();
fighterImage.src = 'images/fighter.png';

const laserImage = new Image();
laserImage.src = 'images/laser.png';

bgImage.onload = () => {
    bool_bg = true;
};

fighterImage.onload = () => {
    bool_fighter = true;
};

laserImage.onload = () => {
    bool_laser = true;
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

const render = () => {
    const delta = Date.now() - lastUpdateTime;
    if (acDelta > msPerFrame) {
        acDelta = 0;

        if (bool_bg) {
            ctx.drawImage(bgImage, 0, 0);
        }

        if (bool_fighter) {
            ctx.drawImage(fighterImage, fighter.x, fighter.y);
        }

        if (bool_laser) {
            drawLaser();
            moveLaser();
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
};

addEventListener('keydown', (e) => {
    keysDown[e.keyCode] = true;

    if (e.keyCode === 32 && lasers.length <= laserTotal) {
        lasers.push([fighter.x + 50, fighter.y + 10]);
    }
});

addEventListener('keyup', (e) => {
    delete keysDown[e.keyCode];
});

const main = () => {
    update();
    render();
    requestAnimationFrame(main);
};

main();
