import insertCanvas from "../insertCanvas.ts";

const {ctx} = insertCanvas()
const ctxW = ctx.canvas.width + 100
const ctxH = ctx.canvas.height + 100

// 간단한 불꽃 파티클 만들기
const bgImage = new Image()
bgImage.src = "image01.png"

const snowFlakes: {
    x: number
    y: number
    size: number
}[] = []

function addSnowflake() {
    const x = Math.floor(Math.random() * ctxW) - 100
    let y = 0
    const size = Math.floor(Math.random() * 3) + 1

    snowFlakes.push({x, y, size})
}

function snow() {
    addSnowflake()

    ctx.fillStyle = 'rgba(255, 255, 255, 0.75)'
    snowFlakes.forEach((snowFlake, i) => {
        ctx.beginPath()
        const ty = snowFlake.y += snowFlake.size * 0.5
        ctx.arc(snowFlake.x, ty, snowFlake.size * 0.5, 0, Math.PI * 2)
        ctx.fill()

        if(snowFlake.y > ctxH) {
            snowFlakes.splice(i, 1)
        }
    })
}

function displayCount() {
    ctx.fillStyle = 'white'
    ctx.font = 'bold 14px Arial, sans-serif'
    ctx.fillText(snowFlakes.length.toString(), 10, 20)
}

function animate() {
    ctx.save()
    ctx.clearRect(0, 0, ctxW, ctxH)
    ctx.drawImage(bgImage, 0, 0)
    displayCount()
    ctx.rotate(-0.2)
    snow()
    ctx.restore()
}

setInterval(animate, 30)