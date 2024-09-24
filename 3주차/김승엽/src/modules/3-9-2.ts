import insertCanvas from "../insertCanvas.ts";

const {ctx} = insertCanvas('canvas3-9-2')

// 지정한 부분의 색상을 흑백으로 바꾸어 출력하기
ctx.fillStyle = 'red'
ctx.fillRect(20, 30, 100, 100)
ctx.fillStyle = 'green'
ctx.fillRect(50, 50, 100, 100)
const src = ctx.getImageData(0, 0, 100, 100)
const pixels = src.data
const numPixels = pixels.length

for (let i=0; i<numPixels; i++) {
    const avg = (pixels[i * 4] + pixels[i * 4 + 1] + pixels[i * 4 + 2]) / 3
    pixels[i * 4] = avg     // red
    pixels[i * 4 + 1] = avg // green
    pixels[i * 4 + 2] = avg // blue
}

ctx.putImageData(src, 200, 50)
ctx.strokeRect(0, 0, 100, 100)
ctx.strokeRect(200, 50, 100, 100)