import insertCanvas from "../insertCanvas.ts";

const {ctx, canvas} = insertCanvas()

// 두 개의 사각형을 만들고 애니메이션을 멈추게 하기
const ctxW = canvas.width
const ctxH = canvas.height
let x = 0
let y = 0
const animate = () => {
    ctx.clearRect(0, 0, ctxW, ctxH)
    ctx.fillStyle = 'red'
    ctx.fillRect(x, 10, 50, 50)
    ctx.fillStyle = 'blue'
    ctx.fillRect(10, y, 50, 50)
    y++
    x++

    if(x > ctxW) {
        x = 0
    }

    if (y > ctxH) {
        y = 0
    }
}

const animateInterval = setInterval(animate, 30)

canvas.addEventListener('click', () => clearInterval(animateInterval))