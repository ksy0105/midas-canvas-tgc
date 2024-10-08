import insertCanvas from "../insertCanvas.ts";

const {ctx} = insertCanvas()

// 백그라운드 이미지 애니메이션 만들기
// 이미지를 키보드로 움직이기
const bgImg = new Image()
bgImg.src = "image02.png"

const img = new Image()
img.src = "image01.png"

const speed = 5
let keyCodeValue: string = ''

function Background() {
    this.x = 0
    this.y = 0
    this.w = bgImg.width
    this.h = bgImg.height

    this.render = function() {
        ctx.drawImage(bgImg, this.x--, 0)
        if (this.x <= -258) this.x = 0;
    }
}

function Player() {
    this.x = 0
    this.y = 0
    this.w = img.width
    this.h = img.height

    this.render = function() {
        ctx.drawImage(img, this.x, this.y)
    }
}

const background = new Background()
const player = new Player()

player.x = 30
player.y = 150

const animate = () => {
    background.render()
    player.render()
    update()
}

setInterval(animate, 30)

const update = () => {
    if (keyCodeValue === 'W' || keyCodeValue === 'ㅈ') {
        player.y -= speed;
    } else if (keyCodeValue === 'S' || keyCodeValue === 'ㄴ') {
        player.y += speed;
    } else if (keyCodeValue === 'A' || keyCodeValue === 'ㅁ') {
        player.x -= speed;
    } else if (keyCodeValue === 'D' || keyCodeValue === 'ㅇ') {
        player.x += speed;
    }
}

document.addEventListener('keydown', (e) => {
    console.log('e.key', e.key)
    keyCodeValue = e.key.toUpperCase()
})

document.addEventListener('keyup', () => {
    keyCodeValue = ''
})