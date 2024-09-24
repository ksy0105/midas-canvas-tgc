import insertCanvas from "../insertCanvas.ts";

const {ctx} = insertCanvas('canvas3-9-3')

// 이미지에서 영역을 선택하여 그 부분의 색상 반전시키기
const img = new Image()
img.src = "image02.png"
img.onload = function() {
    ctx.drawImage(this as CanvasImageSource, 0, 0)
    const src = ctx.getImageData(250, 100, 100, 100)
    const data = src.data;
    const numPixels = data.length;

    for (let i=0; i<numPixels; i+=4) {
        data[i] = 255 - data[i]       // red
        data[i+1] = 255 - data[i+1]   // green
        data[i+2] = 255 - data[i+2]   // blue
    }

    ctx.putImageData(src, 50, 50)
    ctx.strokeRect(250, 100, 100, 100)
    ctx.strokeRect(50, 50, 100, 100)
}