import insertCanvas from "../insertCanvas.ts";

const {ctx} = insertCanvas('canvas3-5-2')

// 이미지의 크기를 변형하여 그리기
const iu = new Image()
iu.src = "image02.png"
iu.onload = () => {
    ctx.drawImage(iu, 10, 10, 150, 100)
}