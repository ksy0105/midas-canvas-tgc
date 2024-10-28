import './style.css'
import {c} from "vite/dist/node/types.d-aGj9QkWt";

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

const msPerFrame = 1000
const lastUpdateTime = 0

let acDelta = 0
let bool_bg = false
let bool_fighter = false
let bool_laser = false
let bool_asteroid = false
let bool_explode = false
let hitexplosion = {}
let bool_hitexplosion = false
let spriteCount = 1
let bool_fighterexplosion = false

const lasers = []
const laserTotal = 10

const bgImage = new Image();
bgImage.src = '/images/space.png';

bgImage.onload = () => {
    bool_bg = true
}

const fighter: any = {}
fighter.x = 50
fighter.y = canvas.height / 2
fighter.speed = 5

const fighterImage = new Image()
fighterImage.src = "/images/fighter.png"

fighterImage.onload = function() {
    bool_fighter = true
}

const laserImage = new Image()
laserImage.src = "/images/laser.png"

laserImage.onload = function() {
    bool_laser = true
}

const drawLaser = function() {
    if (lasers.length) {
        for (let i = 0; i < lasers.length; i++) {
            ctx.drawImage(laserImage, lasers[i][0], lasers[i][1])
        }
    }
}

const moveLaser = function() {
    for (let i = 0; i < lasers.length; i++) {
        if(lasers[i][0] > 0) {
            lasers[i][0] += 20
        }
        if(lasers[i][0] > 600) {
            lasers.splice(i, 1)
        }
    }
}

const asteroid: any = {}
let randScale
let speed = 10
let ang = 0
let arrScale = [0.4, 0.6, 0.8, 1]

function shuffle(arr) {
    const rand = Math.floor(Math.random() * arr.length)
    return arr[rand]
}

const reset = function() {
    speed = Math.floor(Math.random() * 5) + 5
    asteroid.x = canvas.width
    asteroid.y = Math.floor(Math.random() * 350)

    if(asteroid.y < 40) {
        asteroid.y = 40
    }

    if(asteroid.y > 360) {
        asteroid.y = 360
    }

    randScale = shuffle(arrScale)
}

const moveAsteroid = function() {
    const w = asteroidImage.width * randScale
    const h = asteroidImage.height * randScale
    const coordX = (asteroidImage.width / 2) * randScale
    const coordY = (asteroidImage.height / 2) * randScale

    ctx.save()
    ctx.translate(asteroid.x + coordX, asteroid.y + coordY)
    ctx.rotate(Math.PI / 180 * (ang += 5))
    ctx.translate(-(asteroid.x + coordX), -(asteroid.y + coordY))
    ctx.drawImage(asteroidImage, asteroid.x -= speed, asteroid.y, w, h)
    ctx.restore()

    if(asteroid.x < -100) {
        reset()
    }
}

const asteroidImage = new Image()
asteroidImage.src = "/images/asteroid.png"

asteroidImage.onload = function() {
    bool_asteroid = true
}

const keysDown = {}

const explodeImage = new Image()
explodeImage.src = "/images/explode.png"

explodeImage.onload = function() {
    bool_explode = true
}

const drawExplosion = function() {
    ctx.drawImage(explodeImage, spriteCount * 39, 0, 39, 40, hitexplosion.x, hitexplosion.y, 39 * (1 + randScale), 40 * (1 + randScale))
    spriteCount++
    if(spriteCount > 13) {
        spriteCount = 1
        bool_hitexplosion = false
    }
}

const explodeSound = new Audio("/sounds/explosion.wav")
const hitexplodeSound = new Audio("/sounds/explosion-02.wav")
hitexplodeSound.volume = 0.5

let score = 0
let lives = 3
let isGameOver = false

const gameOverSound = new Audio("/sounds/game_over.wav")
gameOverSound.loop = true
gameOverSound.volume = .25
gameOverSound.load()

function gameOver() {
    isGameOver = true;
    bool_explode = false;

    var myAudioElements = document.querySelectorAll(".myAudio");
    myAudioElements.forEach(function(audio) {
        audio.classList.remove('sound-on');
        audio.classList.add('sound-off');
        audio.pause();
        audio.currentTime = 0;
    });

    var isSoundOn = document.querySelector(".sound").classList.contains('sound-on');
    if (isSoundOn) {
        gameOverSound.currentTime = 0;
        gameOverSound.play();
    }

    document.getElementById('game-over').style.display = "block";
}

function restart() {
    isGameOver = false;

    var isSoundOn = document.querySelector(".sound").classList.contains('sound-on');
    var myAudioElements = document.querySelectorAll(".myAudio");

    if (isSoundOn) {
        myAudioElements.forEach(function(audio) {
            audio.play();
        });
    } else {
        myAudioElements.forEach(function(audio) {
            audio.pause();
        });
    }

    gameOverSound.currentTime = 0;
    gameOverSound.pause();
    document.getElementById('game-over').style.display = "none";
    lives = 3;
    score = 0;
    document.getElementById("lives").textContent = lives;
    document.getElementById("score").textContent = score;
}

const detectCollision = function() {
    const aw = asteroidImage.width * randScale
    const ah = asteroidImage.height * randScale
    const fw = fighterImage.width
    const fh = fighterImage.height

    // fighter collision
    if ((fighter.x > asteroid.x && fighter.x < asteroid.x + aw  && fighter.y > asteroid.y && fighter.y < asteroid.y + ah)
        || (fighter.x + fw > asteroid.x && fighter.x + fw < asteroid.x + aw && fighter.y > asteroid.y && fighter.y < asteroid.y + ah)
        || (fighter.x > asteroid.x && fighter.x < asteroid.x + aw && fighter.y + fh > asteroid.y && fighter.y + fh < asteroid.y + ah)
        || (fighter.x + fw > asteroid.x && fighter.x + fw < asteroid.x + aw && fighter.y + fh > asteroid.y && fighter.y + fh < asteroid.y + ah)
    ) {
        bool_fighterexplosion = true
        bool_explode = true
        bool_hitexplosion = true
        hitexplosion.x = asteroid.x
        hitexplosion.y = asteroid.y
        reset()
        resetFighter()
        explodeSound.load()
        explodeSound.play()

        if (lives <= 1) {
            lives = 0
            gameOver()
        } else {
            --lives
        }
        document.getElementById("lives").textContent = lives;
    }

    if(lasers.length) {
        for (let i = 0; i < lasers.length; i++) {
            if (lasers[i][0] > asteroid.x && lasers[i][0] < asteroid.x + aw && lasers[i][1] > asteroid.y && lasers[i][1] < asteroid.y + ah) {
                bool_hitexplosion = true
                hitexplosion.x = lasers[i][0]
                hitexplosion.y = lasers[i][1]
                lasers.splice(i, 1)
                reset()
                hitexplodeSound.load()
                hitexplodeSound.play()
                document.getElementById("score").textContent = Number(document.getElementById("score").textContent) + 100;
            }
        }
    }
}

const resetFighter = function() {
    fighter.x = 0
    fighter.y = canvas.height / 2
}

const update = function() {
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
    if (fighter.x < 0) {
        fighter.x = 0
    }
    if (fighter.x > canvas.width - 60) {
        fighter.x = canvas.width - 60
    }
    if (fighter.y < 0) {
        fighter.y = 0
    }
    if (fighter.y > canvas.height - 30) {
        fighter.y = canvas.height - 30
    }

    detectCollision()
}

const laserSound = new Audio("/sounds/Laser.wav")

const soundPlay = function() {
    laserSound.volume = 0.12
    laserSound.load()
    laserSound.play()
}

addEventListener("keydown", function(e) {
    keysDown[e.keyCode] = true;
    if (32 in keysDown && lasers.length < laserTotal) {
        lasers.push([fighter.x + 50, fighter.y + 10])
        soundPlay()
    }
}, false)

addEventListener("keyup", function(e) {
    delete keysDown[e.keyCode];
}, false)

const Background = function() {
    this.x = 0, this.y = 0

    this.render = function() {
        ctx.drawImage(bgImage, this.x--, 0)

        if (this.x <= -600) {
            this.x = 0
        }
    }
}

const render = function() {
    const delta = Date.now() - lastUpdateTime
    if(acDelta > msPerFrame) {
        acDelta = 0

        if (bool_bg) {
            background.render()
        }

        if (bool_fighter) {
            if(bool_fighterexplosion) {
                ctx.drawImage(fighterImage, fighter.x += 1, fighter.y)
                if (fighter.x > 50) {
                    bool_fighterexplosion = false
                }
            }
            else {
                ctx.drawImage(fighterImage, fighter.x, fighter.y)
            }
        }

        if (bool_laser) {
            drawLaser()
            moveLaser()
        }

        if (bool_asteroid) {
            moveAsteroid()
        }

        if (bool_explode && bool_hitexplosion) {
            drawExplosion()
        }
    } else {
        acDelta += delta
    }
}

const main = function() {
    update()
    if (!isGameOver) render()
    requestAnimationFrame(main)
}

document.getElementById("lives").textContent = lives;
const background = new Background()
reset()
main()

document.getElementById("sound").addEventListener("click", function() {
    var element = this;
    var isSoundOn = element.classList.contains('sound-on');

    if (isSoundOn) {
        element.classList.remove('sound-on');
        element.classList.add('sound-off');
    } else {
        element.classList.remove('sound-off');
        element.classList.add('sound-on');
    }

    if (isGameOver) {
        if (isSoundOn) {
            gameOverSound.pause();
        } else {
            gameOverSound.play();
        }
    } else {
        var myAudioElements = document.querySelectorAll(".myAudio");
        if (isSoundOn) {
            myAudioElements.forEach(function(audio) {
                audio.pause();
            });
        } else {
            myAudioElements.forEach(function(audio) {
                audio.play();
            });
        }
    }
});

document.getElementById("restart").addEventListener('click', function() {
    restart();
});

document.getElementById("audio").volume = 0.5;