import insertCanvas from "../insertCanvas.ts";

const {ctx} = insertCanvas('canvas3-5-3')

// 이미지를 잘라 일부만 그리기
const iu = new Image()
iu.src = "image02.png"
iu.onload = () => {
    ctx.drawImage(iu, 20, 20, 200, 200, 10, 10, 300, 200)
}