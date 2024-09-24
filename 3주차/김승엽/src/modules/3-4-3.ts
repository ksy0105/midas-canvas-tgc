import insertCanvas from "../insertCanvas.ts";

// 패턴으로 사각형 내부 채우기
const {ctx, canvas} = insertCanvas('canvas3-4-3')

const iu = new Image()
iu.src = "image01.png"
iu.onload = () => {
    const pattern = ctx.createPattern(iu, 'repeat')!
    ctx.fillStyle = pattern
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}