import {CanvasExample} from "../@model/CanvasExample.ts";

//사각형을 x축으로 왼쪽에서 오른쪽으로 움직이기
export default new CanvasExample(($canvas, ctx) => {
    const ctxW = $canvas.width;
    const ctxH = $canvas.height;
    let x = 0;
    const animate = () => {
        ctx.clearRect(0, 0, ctxW, ctxH); //이전 그림 지우기
        ctx.fillStyle = "red"; //빨간색 표현
        ctx.fillRect(x++, 10, 50, 50); //사각형 그리기
    };
    setInterval(animate, 30);
});