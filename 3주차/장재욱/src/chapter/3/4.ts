import {initCanvasContext, makeCanvasContainer} from "../../utils.ts";

// LinearGradient
const execute3_4_1 = (containerId: string) => {
    const ctx = initCanvasContext(containerId, 1);

    const grad = ctx.createLinearGradient(50, 50, 250, 50);
    grad.addColorStop(0, "red");
    grad.addColorStop(1 / 6, "orange");
    grad.addColorStop(2 / 6, "yellow");
    grad.addColorStop(3 / 6, "green");
    grad.addColorStop(4 / 6, "aqua");
    grad.addColorStop(5 / 6, "blue");
    grad.addColorStop(1, "purple");
    ctx.lineWidth = 5;
    ctx.fillStyle = grad;
    ctx.fillRect(50, 50, 200, 200);
    ctx.strokeRect(50, 50, 200, 200);
}

// RadialGradient
const execute3_4_2 = (containerId: string) => {
    const ctx = initCanvasContext(containerId, 2);

    const grad = ctx.createRadialGradient(0, 0, 0, 100, 100, 300);
    grad.addColorStop(0, "red");
    grad.addColorStop(0.5, "yellow");
    grad.addColorStop(1, "black");
    ctx.lineWidth = 5;
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 300, 300);
    ctx.strokeRect(0, 0, 300, 300);
}

// 패턴으로 사각형 내부 채우기
const execute3_4_3 = (containerId: string) => {
    const ctx = initCanvasContext(containerId, 3);

    const image = new Image();
    image.src = "image2.png";
    image.onload = function () {
        ctx.fillStyle = ctx.createPattern(image, "repeat")!;
        ctx.fillRect(0, 0, 400, 300);
    }
}

const execute3_4 = () => {
    const id = 'chapter3_4'

    makeCanvasContainer(id, '3.4. 내부 채우기', () => {
        execute3_4_1(id);
        execute3_4_2(id);
        execute3_4_3(id);
    });
}

export default execute3_4;