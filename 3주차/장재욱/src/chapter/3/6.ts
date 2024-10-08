import {initCanvasContext, makeCanvasContainer} from "../../utils.ts";

// 글씨 그리기
const execute3_6_1 = (containerId: string) => {
    const ctx = initCanvasContext(containerId, 1);

    ctx.fillText("The fillText() method draws filled text on the canvas.", 50, 100);
    ctx.fillText("The fillText() method draws filled text on the canvas.", 50, 120, 100);
    ctx.fillText("The fillText() method draws filled text on the canvas.", 50, 140, 200);
    ctx.fillText("The fillText() method draws filled text on the canvas.", 50, 160, 300);
}

// 글씨 크기를 크게 변경하기
const execute3_6_2 = (containerId: string) => {
    const ctx = initCanvasContext(containerId, 2);

    ctx.fillStyle = "#6595ED";
    ctx.font = "italic bold 28px Arial, sans-serif";
    ctx.fillText("Hello Canvas World!", 50, 100);
}

// 글씨의 외곽선 그리기
const execute3_6_3 = (containerId: string) => {
    const ctx = initCanvasContext(containerId, 3);

    ctx.fillStyle = "#6595ED";
    ctx.font = "italic bold 40px Arial, sans-serif";
    ctx.fillText("Hello Canvas World!", 10, 100);
    ctx.lineWidth = 2;
    ctx.strokeText("Hello Canvas World!", 10, 100);
}

// 글씨의 좌우정렬 알아보기
const execute3_6_4 = (containerId: string) => {
    const ctx = initCanvasContext(containerId, 4);

    ctx.fillStyle = "#6595ED";
    ctx.font = "italic bold 30px Arial, sans-serif";

    ctx.textAlign = "start";
    ctx.fillText("Hello World!", 200, 50);

    ctx.textAlign = "end";
    ctx.fillText("Hello World!", 200, 100);

    ctx.textAlign = "left";
    ctx.fillText("Hello World!", 200, 150);

    ctx.textAlign = "right";
    ctx.fillText("Hello World!", 200, 200);

    ctx.textAlign = "center";
    ctx.fillText("Hello World!", 200, 250);

    ctx.strokeStyle = "red";
    ctx.moveTo(200, 10);
    ctx.lineTo(200, 290);
    ctx.stroke();
}

// 글씨 그리기
const execute3_6_5 = (containerId: string) => {
    const ctx = initCanvasContext(containerId, 5);

    ctx.fillStyle = "#6595ED";
    ctx.font = "italic bold 20px Arial, sans-serif";

    ctx.textBaseline = "top";
    ctx.fillText("top!", 10, 150);

    ctx.textBaseline = "bottom";
    ctx.fillText("bottom!", 50, 150);

    ctx.textBaseline = "middle";
    ctx.fillText("middle!", 130, 150);

    ctx.textBaseline = "alphabetic";
    ctx.fillText("alphabetic!", 220, 150);

    ctx.textBaseline = "hanging";
    ctx.fillText("hanging!", 300, 150);

    ctx.strokeStyle = "red";
    ctx.moveTo(10, 150);
    ctx.lineTo(390, 150);
    ctx.stroke();
}

const execute3_6 = () => {
    const id = 'chapter3_6'

    makeCanvasContainer(id, '3.6. 글씨 쓰기', () => {
        execute3_6_1(id);
        execute3_6_2(id);
        execute3_6_3(id);
        execute3_6_4(id);
        execute3_6_5(id);
    });
}

export default execute3_6;