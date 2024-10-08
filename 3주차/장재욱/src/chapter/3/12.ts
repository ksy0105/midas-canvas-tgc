import {initCanvasContext, makeCanvasContainer} from "../../utils.ts";

// 마우스로 클릭한 곳의 좌표 얻기
const execute3_12_1 = (containerId: string) => {
    const ctx = initCanvasContext(containerId, 1);

    ctx.canvas.addEventListener('click', (event) => {
        const mouseX = event.offsetX;
        const mouseY = event.offsetY;
        ctx.fillStyle = "red";
        ctx.fillRect(mouseX - 10, mouseY - 10, 20, 20);
    })
}

const execute3_12 = () => {
    const id = 'chapter3_12'

    makeCanvasContainer(id, '3.12. 클릭한 곳에 사각형 그리기', () => {
        execute3_12_1(id);
    });
}

export default execute3_12;