import './style.css'

const canvas = document.querySelector<HTMLCanvasElement>('#canvas')!;
const ctx = canvas.getContext('2d')!;

// 배경, 비행기 이미지 로딩 여부
let bool_bg = false;
let bool_fighter = false;

const lastUpdateTime = 0;
let acDelta = 0;
const msPerFrame = 1000;

// 배경 이미지
const bgImage = new Image();
let bgX = 0;
bgImage.src = '/src/images/space.png';

bgImage.onload = () => {
    bool_bg = true;
}

// 배경 이동
const moveBackground = () => {
    ctx.drawImage(bgImage, bgX--, 0);

    if (bgX <= -canvas.width) {
        bgX = 0;
    }
}

// 비행기 이미지
// const fighter = {};
let fighterX = 50;
let fighterY = canvas.height / 2;
const fighterSpeed = 5;

const fighterImage = new Image();
fighterImage.src = '/src/images/fighter.png';

fighterImage.onload = () => {
    bool_fighter = true;
}

// 비행기 이동
let keysDown: { [key: string]: boolean } = {};

// 총알
let bool_laser = false;
let lasers: [number, number][] = [];
const laserTotal = 10;

// 총알 이미지
const laserImage = new Image();
laserImage.src = '/src/images/laser.png';

laserImage.onload = () => {
    bool_laser = true;
}

// 총알 그리기
const drawLaser = () => {
    if (lasers.length) {
        for (let i = 0; i < lasers.length; i++) {
            ctx.drawImage(laserImage, lasers[i][0], lasers[i][1]);
        }
    }
}

// 총알 이동
const moveLaser = () => {
    for (let i = 0; i < lasers.length; i++) {
        if (lasers[i][0] > 0) {
            lasers[i][0] += 20;
        }
        if (lasers[i][0] > canvas.width) {
            lasers.splice(i, 1);
        }
    }
}

// 운석
// const asteroid = {};
let bool_asteroid = false;

const asteroidImage = new Image();
asteroidImage.src = '/src/images/asteroid.png';

asteroidImage.onload = () => {
    bool_asteroid = true;
}

// 운석 이동
let asteroidSpeed = 0;
let randScale: number;
let ang = 0;
const arrScale = [0.4, 0.6, 0.8, 1];

let asteroidX = canvas.width;
let asteroidY = Math.floor(Math.random() * 350);

const shuffle = (arr: number[]) => {
    const rand = Math.floor(Math.random() * arr.length);

    return arr[rand];
}

const reset = () => {
    asteroidSpeed = Math.floor(Math.random() * 5) + 5;
    asteroidX = canvas.width;
    asteroidY = Math.floor(Math.random() * 350);

    if (asteroidY < 40) {
        asteroidY = 40;
    }

    if (asteroidY > 360) {
        asteroidY = 360;
    }

    randScale = shuffle(arrScale);
}

// 운석 그리기
const moveAsteroid = () => {
    const w = asteroidImage.width * randScale;
    const h = asteroidImage.height * randScale;
    const coordX = (asteroidImage.width / 2) * randScale;
    const coordY = (asteroidImage.height / 2) * randScale;

    ctx.save();
    ctx.translate(asteroidX + coordX, asteroidY + coordY);
    ctx.rotate(Math.PI / 180 * (ang += 5));
    ctx.translate(-asteroidX - coordX, -asteroidY - coordY);
    ctx.drawImage(asteroidImage, asteroidX -= asteroidSpeed, asteroidY, w, h);
    ctx.restore();

    if (asteroidX <= -100) {
        reset();
    }
}

// 충돌 처리
const detectCollision = () => {
    const aw = asteroidImage.width * randScale;
    const ah = asteroidImage.height * randScale;
    const fw = fighterImage.width;
    const fh = fighterImage.height;

    // ctx.strokeStyle = 'white';
    // ctx.lineWidth = 2;
    // ctx.strokeRect(fighterX, fighterY, fw, fh);
    // ctx.strokeRect(asteroidX, asteroidY, aw, ah);

    // 비행기 충돌
    if ((fighterX > asteroidX && fighterX < asteroidX + aw && fighterY > asteroidY && fighterY < asteroidY + ah) ||
        (fighterX + fw > asteroidX && fighterX + fw < asteroidX + aw && fighterY > asteroidY && fighterY < asteroidY + ah) ||
        (fighterX > asteroidX && fighterX < asteroidX + aw && fighterY + fh > asteroidY && fighterY + fh < asteroidY + ah) ||
        (fighterX + fw > asteroidX && fighterX + fw < asteroidX + aw && fighterY + fh > asteroidY && fighterY + fh < asteroidY + ah)) {
        bool_fighter_explosion = true;
        bool_explode = true;
        bool_hitexplosion = true;
        hitexplosionX = asteroidX;
        hitexplosionY = asteroidY;
        reset();
        resetFighter();
        explodeSound.load();
        explodeSound.play();

        // 목숨 표시
        if (lives <= 0) {
            lives = 0;
            gameOver();
        } else {
            --lives;
        }
    }

    // 총알 충돌
    if (lasers.length) {
        for (let i = 0; i < lasers.length; i++) {
            if (lasers[i][0] > asteroidX && lasers[i][0] < asteroidX + aw && lasers[i][1] > asteroidY && lasers[i][1] < asteroidY + ah) {
                hitexplosionX = lasers[i][0];
                hitexplosionY = lasers[i][1];
                bool_hitexplosion = true;
                lasers.splice(i, 1);
                reset();
                hitexplodeSound.load();
                hitexplodeSound.play();
                score += 100;
            }
        }
    }
}

const resetFighter = () => {
    fighterX = 0;
    fighterY = canvas.height / 2;
}

// 운석 폭발 효과
let bool_explode = false;
let hitexplosionX = 0;
let hitexplosionY = 0;
let bool_hitexplosion = false;
let spriteCount = 1;

const explodeImage = new Image();
explodeImage.src = '/src/images/explode.png';

explodeImage.onload = () => {
    bool_explode = true;
}

// 폭발 이미지 그리기
const drawExplode = () => {
    ctx.drawImage(explodeImage, spriteCount * 39, 0, 39, 40, hitexplosionX, hitexplosionY, 39 * (1 + randScale), 40 * (1 + randScale));
    spriteCount++;

    if (spriteCount > 13) {
        spriteCount = 1;
        bool_hitexplosion = false;
    }
}

// 비행기와 운석 충돌
let bool_fighter_explosion = false;

// 효과음, 배경 음악 처리하기
const laserSound = new Audio('/src/sounds/laser.wav');

const soundPlay = () => {
    laserSound.volume = 0.12;
    laserSound.load();
    laserSound.play();
}

const explodeSound = new Audio('/src/sounds/explosion.wav');
const hitexplodeSound = new Audio('/src/sounds/explosion-02.wav');
hitexplodeSound.volume = 0.5;

let score = 0;
let lives = 2;

let isGameOver = false;

const gameOverSound = new Audio('/src/sounds/game_over.wav');
gameOverSound.loop = true;
gameOverSound.volume = 1;
gameOverSound.load();

const gameOver = () => {
    isGameOver = true;
    bool_explode = false;
    audio.pause();
    audio.currentTime = 0;
    bool_bg = false;
    bool_fighter = false;
    bool_asteroid = false;

    const isSoundOn = document.querySelector('.sound-on');
    if (isSoundOn) {
        gameOverSound.currentTime = 0;
        gameOverSound.play();
    }

    document.getElementById('game-over')!.style.display = 'flex';
}

const restart = () => {
    isGameOver = false;
    bool_explode = true;
    bool_bg = true;
    bool_fighter = true;
    bool_asteroid = true;

    if (document.querySelector('.sound-on')) {
        audio.play();
    } else {
        audio.pause();
    }

    gameOverSound.currentTime = 0;
    gameOverSound.pause();

    document.getElementById('game-over')!.style.display = 'none';

    lives = 2;
    score = 0;

    update();
}

const update = () => {
    // 비행기 이동
    if ('w' in keysDown) {
        fighterY -= fighterSpeed;
    }
    if ('s' in keysDown) {
        fighterY += fighterSpeed;
    }
    if ('a' in keysDown) {
        fighterX -= fighterSpeed;
    }
    if ('d' in keysDown) {
        fighterX += fighterSpeed;
    }

    // 비행기 이동 바운더리 설정
    if (fighterX <= 0) {
        fighterX = 0;
    }
    if (fighterX >= canvas.width - 60) {
        fighterX = canvas.width - 60;
    }
    if (fighterY <= 0) {
        fighterY = 0;
    }
    if (fighterY >= canvas.height - 30) {
        fighterY = canvas.height - 30;
    }

    detectCollision();
    document.querySelector('#lives')!.textContent = `${lives}`;
    document.querySelector('#score')!.textContent = `${score}`;

    if (!isGameOver) {
        render();
    }
}

const render = () => {
    const delta = Date.now() - lastUpdateTime;

    if (acDelta > msPerFrame) {
        acDelta = 0;

        if (bool_bg) {
            moveBackground();
        }
        if (bool_fighter) {
            if (bool_fighter_explosion) {
                ctx.drawImage(fighterImage, fighterX += 1, fighterY);

                if (fighterX >= 50) {
                    bool_fighter_explosion = false;
                }
            } else {
                ctx.drawImage(fighterImage, fighterX, fighterY);
            }
        }
        if (bool_laser) {
            drawLaser();
            moveLaser();
        }
        if (bool_asteroid) {
            moveAsteroid();
        }
        if (bool_explode && bool_hitexplosion) {
            drawExplode();
        }
    } else {
        acDelta += delta;
    }
}

document.getElementById('canvas')!.addEventListener('keydown', (e: KeyboardEvent) => {
    keysDown[e.key] = true;

    if (e.key === ' ' && lasers.length <= laserTotal) {
        lasers.push([fighterX + 50, fighterY + 10]);
        soundPlay();
    }
});

document.getElementById('canvas')!.addEventListener('keyup', (e: KeyboardEvent) => {
    delete keysDown[e.key];
});

const audio = document.getElementById('audio') as HTMLAudioElement;
audio.volume = 0.5;

document.querySelector('.sound')!.addEventListener('click', () => {
    const isSoundOn = document.querySelector('.sound-on');

    if (isSoundOn) {
        document.querySelector('.sound-on')!.classList.add('sound-off');
        document.querySelector('.sound-on')!.classList.remove('sound-on');
        audio.pause();
        return;
    } else {
        document.querySelector('.sound-off')!.classList.add('sound-on');
        document.querySelector('.sound-off')!.classList.remove('sound-off');
        audio.play();
        return;
    }
});

document.querySelector('#restart')!.addEventListener('click', () => {
    restart();
});

const main = () => {
    update();
    render();
    requestAnimationFrame(main);
};

reset();
main();
