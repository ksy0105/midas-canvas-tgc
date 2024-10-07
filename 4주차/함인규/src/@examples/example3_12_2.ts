import {CanvasExample} from "../@model/CanvasExample.ts";

//마우스로 클릭한 곳에 사각형 그리기
export default new CanvasExample(($canvas, ctx) => {
    $canvas.onclick = (e) => {
        const mouseX = e.offsetX; //마우스 클릭한 x좌표 (canvas 기준)
        const mouseY = e.offsetY; //마우스 클릭한 y좌표 (canvas 기준)
        ctx.fillStyle = "red"; //빨간색 표현
        ctx.fillRect(mouseX - 10, mouseY - 10, 20, 20); //마우스 클릭한 곳에 사각형 그리기
    };
});