import {getCtx} from "../../common.ts";

// 3.5 > 이미지 원래 크기대로 그리기
export const execute3_5_1 = () => {
    const ctx = getCtx('#chapter3_5_1');

    const image = new Image();
    image.src = "image1.jpeg";
    image.onload = function () {
        ctx.drawImage(image, 10, 10, 380, 280);
    }
}