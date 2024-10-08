import {initCanvasContext, makeCanvasContainer} from "../../utils.ts";

// 이미지 원래 크기대로 그리기
const execute3_5_1 = (containerId: string) => {
    const ctx = initCanvasContext(containerId, 1);

    const image = new Image();
    image.src = "image1.jpeg";
    image.onload = function () {
        ctx.drawImage(image, 10, 10);
    }
}

// 이미지의 크기를 변형하여 그리기
const execute3_5_2 = (containerId: string) => {
    const ctx = initCanvasContext(containerId, 2);

    const image = new Image();
    image.src = "image1.jpeg";
    image.onload = function () {
        ctx.drawImage(image, 10, 10, 150, 100);
    }
}

// 이미지를 잘라 일부만 그리기
const execute3_5_3 = (containerId: string) => {
    const ctx = initCanvasContext(containerId, 3);

    const image = new Image();
    image.src = "image1.jpeg";
    image.onload = function () {
        ctx.drawImage(image, 20, 20, 200, 200,10, 10, 300, 200);
    }
}

const execute3_5 = () => {
    const id = 'chapter3_5'

    makeCanvasContainer(id, '3.5. 이미지 그리기', () => {
        execute3_5_1(id);
        execute3_5_2(id);
        execute3_5_3(id);
    });
}

export default execute3_5;