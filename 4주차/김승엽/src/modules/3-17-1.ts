import insertCanvas from "../insertCanvas.ts";

const {ctx, canvas} = insertCanvas()

// 슈팅 충돌 체크하기
const CANVAS_W = canvas.width
const CANVAS_H = canvas.height
const START_TIME = new Date().getTime()

interface Missile {
    x: number;
    y: number;
    w: number;
    h: number;
    bg: string;
}

interface Enemy {
    id: string,
    x: number,
    y: number,
    w: number,
    h: number
}

const keysDown: {[key: string]: boolean} = {}
const missiles: Missile[] = []
const enemies: Enemy[] = [
    {id: 'e1', x: 100, y: 10, w: 40, h: 40},
    {id: 'e2', x: 200, y: 10, w: 40, h: 40},
    {id: 'e3', x: 300, y: 10, w: 40, h: 40},
]

class EnemyRenderer {
    w = 40
    h = 40
    speed = 0.5
    img = new Image()

    constructor() {
        this.img.src = "image04.png"
    }

    render() {
        if(enemies.length <= 0) {
            this.gameOver()
            return;
        }

        enemies.forEach(e => {
            const enemyY = e.y += this.speed
            ctx.strokeStyle = 'red'
            ctx.strokeRect(e.x, enemyY, this.w, this.h)
            ctx.drawImage(this.img, e.x, enemyY)
        })
    }

    gameOver() {
        clearInterval(interval)

        ctx.font = 'bold 36px Arial, sans-serif'
        ctx.fillStyle = '#FC0'
        ctx.textAlign = 'center'
        ctx.fillText("YOU WIN!", CANVAS_W * 0.5, 150)

        ctx.font = '24px Arial, sans-serif'
        ctx.fillStyle = '#FC0'
        ctx.textAlign = 'center'

        const timeDiff = new Date(new Date().getTime() - START_TIME)
        const minutes = timeDiff.getMinutes().toString().padStart(2, '0')
        const seconds = timeDiff.getSeconds().toString().padStart(2, '0')
        ctx.fillText(`${minutes}:${seconds}`, CANVAS_W * 0.5, 190)
    }
}

class PlayerRenderer {
    y = 250
    x = CANVAS_W * 0.5 - 25
    width = 40
    height = 30
    speed = 5
    img = new Image()

    constructor() {
        this.img.src = "image01.png"
    }

    render() {
        ctx.strokeStyle = 'red'
        ctx.strokeRect(this.x, this.y, this.width, this.height)
        ctx.drawImage(this.img, this.x, this.y)

        missiles.forEach((m, i) => {
            ctx.fillStyle = m.bg
            ctx.fillRect(m.x, m.y -= 5, m.w, m.h)

            this.checkCollision(m, i)

            if (m.y <= 0) missiles.splice(i, 1)
        })
    }

    checkCollision (m: Missile, mi: number) {
        enemies.forEach((e, i) => {
            if (m.x >= e.x && m.x <= e.x + e.w && m.y >= e.y && m.y <= e.y + e.h) {
                missiles.splice(mi, 1)
                enemies.splice(i, 1)
            }
        })
    }
}

const player = new PlayerRenderer()
const enemy = new EnemyRenderer()

const interval = setInterval(() => {
    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

    (function update() {
        if ('ARROWLEFT' in keysDown) {
            player.x -= player.speed
        } else if ('ARROWRIGHT' in keysDown) {
            player.x += player.speed
        }

        if (player.x < 0) player.x = 0
        else if(player.x > (CANVAS_W - player.width)) player.x = CANVAS_W - player.width
    })()

    player.render()
    enemy.render()
}, 30)

document.addEventListener('keydown', (e) => {
    const key = e.key.toUpperCase()
    keysDown[key] = true

    if (key === ' ') {
        missiles.push({
            x: player.x + player.width * 0.5,
            y: player.y - 5,
            w: 3,
            h: 10,
            bg: 'red'
        })
    }
})

document.addEventListener('keyup', e => {
    const key = e.key.toUpperCase()
    delete keysDown[key]
})