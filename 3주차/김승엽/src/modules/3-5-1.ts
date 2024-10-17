import insertCanvas from "../insertCanvas.ts";

const {ctx} = insertCanvas('canvas3-5-1')

// 이미지를 원래 크기대로 그리기
const iu = new Image()
iu.src = "image01.png"
iu.onload = () => {
    ctx.drawImage(iu, 10, 10)
}