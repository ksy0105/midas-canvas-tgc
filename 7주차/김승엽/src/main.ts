import './style.css'

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

const img = document.getElementById('img') as HTMLImageElement;
ctx.drawImage(img, 0, 0)

let startX = 0
let startY = 0
const arrCoords = []

const TOTAL_POINT = 31
const finishImage = new Image()
finishImage.src = "images/dottodot_airplane_finish.png"

ctx.canvas.addEventListener("click", (e) => {
    if (arrCoords.length >= TOTAL_POINT) return

    const mouseX = e.clientX - ctx.canvas.offsetLeft;
    const mouseY = e.clientY - ctx.canvas.offsetTop;
    const radius = 8

    if (arrCoords.length === 0) {
        startX = mouseX - 5
        startY = mouseY
        ctx.beginPath()
        ctx.moveTo(startX, startY)
    } else {
        ctx.moveTo(startX, startY)
        startX = mouseX - 5
        startY = mouseY
        ctx.lineTo(startX, startY)
    }
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(mouseX - 2, mouseY - 2, radius, 0, 2 * Math.PI)
    ctx.fillStyle = 'yellow'
    ctx.fill()
    ctx.stroke()

    const coordcnt = arrCoords.length + 1
    ctx.font = "normal bold 8px Arial, sans-serif"
    ctx.fillStyle = 'black'
    ctx.fillText(coordcnt.toString(), mouseX - 4, mouseY + 1)

    arrCoords.push(mouseX + "," + mouseY)

    if (arrCoords.length === TOTAL_POINT) {
        setTimeout(() => {
            alert("잘 하셨습니다.")
            ctx.drawImage(finishImage, 0, 0)
        }, 500)
    }
})