import {initCanvasContext, makeCanvasContainer} from "../../utils.ts";

// 사각형을 x축으로 왼쪽에서 오른쪽으로 움직이기
const execute3_11_1 = (containerId: string) => {
    const ctx = initCanvasContext(containerId, 1);

    const ctxW = ctx.canvas.width;
    const ctxH = ctx.canvas.height;
    let x = 0;

    setInterval(() => {
        ctx.clearRect(0, 0, ctxW, ctxH);
        ctx.fillStyle = "red";
        ctx.fillRect(x, 10, 50, 50);
        x += 2;

        if (x > ctxW) x = -50;
    }, 30);
}

// 두 개의 사각형을 만들고 애니메이션 멈추게 하기
const execute3_11_2 = (containerId: string) => {
    const ctx = initCanvasContext(containerId, 2);

    const ctxW = ctx.canvas.width;
    const ctxH = ctx.canvas.height;

    let x = 0;
    let y = 0;

    const animateInterval = setInterval(() => {
        ctx.clearRect(0, 0, ctxW, ctxH);
        ctx.fillStyle = "red";
        ctx.fillRect(x, 10, 50, 50);
        ctx.fillStyle = "blue";
        ctx.fillRect(10, y, 50, 50);

        x += 2;
        y += 2;

        if (x > ctxW) x = -50;
        if (y > ctxH) y = -50;
    }, 30);

    ctx.canvas.addEventListener('click', function() {
        clearInterval(animateInterval);
    })
}

const execute3_11 = () => {
    const id = 'chapter3_11'

    makeCanvasContainer(id, '3.11. 애니메이션 만들기', () => {
        execute3_11_1(id);
        execute3_11_2(id);
    });
}

export default execute3_11;