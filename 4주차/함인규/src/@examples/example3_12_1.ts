import {CanvasExample} from "../@model/CanvasExample.ts";

//마우스로 클릭한 곳의 좌표 얻기 (브라우저 기준)
export default new CanvasExample(($canvas, _) => {
    $canvas.onclick = (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        console.log(`x: ${mouseX}, y: ${mouseY}`);
    };
});
