//알파값 지정하기
import {CanvasExample} from "../@model/CanvasExample.ts";

export default new CanvasExample((_, ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = 'rgba(63, 169, 245, 1)'; //하늘색 표현
    ctx.fillRect(20, 20, 100, 100); //사각형 그리기
    ctx.globalAlpha = 0.5; //알파값 지정
    ctx.fillStyle = "blue"; //파란색 표현
    ctx.fillRect(50, 50, 100, 100); //알파값 지정된 파란색 사각형 그리기
})