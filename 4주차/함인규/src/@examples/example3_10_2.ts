import {CanvasExample} from "../@model/CanvasExample.ts";

//두 개의 이미지를 합성하여 그리기
export default new CanvasExample((_, ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "red"; //빨간색 표현
    ctx.fillRect(20, 20, 100, 100); //사각형 그리기
    ctx.globalCompositeOperation = "source-over"; //default : 위에 겹쳐 그리기
    ctx.fillStyle = "blue"; //파란색 표현
    ctx.fillRect(50, 50, 100, 100); //사각형 그리기
});