import insertCanvas from "../insertCanvas.ts";

const {ctx, canvas} = insertCanvas()

// 사각형을 x축으로 왼쪽에서 오른쪽으로 움직이기
const ctxW = canvas.width
const ctxH = canvas.height
let x = 0
const animate = () => {
    ctx.clearRect(0, 0, ctxW, ctxH)
    ctx.fillStyle = 'red'
    ctx.fillRect(x, 10, 50, 50)
    x++
}
setInterval(animate, 30)