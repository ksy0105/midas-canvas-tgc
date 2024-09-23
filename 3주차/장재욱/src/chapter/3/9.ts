import {getCtx} from "../../common.ts";

// 3.9 > 지정한 부분의 색상을 흑백으로 바꿔 출력하기
export const execute3_9_1 = () => {
    const ctx = getCtx('#chapter3_9_1');

    ctx.fillStyle = "red";
    ctx.fillRect(20, 30, 100, 100);
    ctx.fillStyle = "green";
    ctx.fillRect(50, 50, 100, 100);

    const src = ctx.getImageData(0, 0, 100, 100);
    const pixels = src.data;
    const numPixels = pixels.length;

    for (let i = 0; i < numPixels; i ++) {
        const avg = (pixels[i*4] + pixels[i*4 + 1] + pixels[i*4 + 2]) / 3;
        pixels[i*4] = avg;
        pixels[i*4 + 1] = avg;
        pixels[i*4 + 2] = avg;
    }

    ctx.putImageData(src, 200, 50);
    ctx.strokeRect(0, 0, 100, 100);
    ctx.strokeRect(200, 50, 100, 100);
}

// 3.9 > 이미지에서 영역을 선택하여 그 부분의 색상 반전시키기
export const execute3_9_2 = () => {
    const ctx = getCtx('#chapter3_9_2');

    const draw = (img: HTMLImageElement) => {
        ctx.drawImage(img, 10, 10, 380, 280);
        const src = ctx.getImageData(0, 0, 100, 100);
        const datas = src.data;
        const numPixels = datas.length;

        for (let i = 0; i < numPixels; i += 4) {
            datas[i] = 255 - datas[i];
            datas[i + 1] = 255 - datas[i + 1];
            datas[i + 2] = 255 - datas[i + 2];
        }

        ctx.putImageData(src, 200, 50);
        ctx.strokeRect(0, 0, 100, 100);
        ctx.strokeRect(200, 50, 100, 100);
    }

    const image = new Image();
    image.src = "image1.jpeg";
    image.onload = function () {
        draw(image)
    }
}