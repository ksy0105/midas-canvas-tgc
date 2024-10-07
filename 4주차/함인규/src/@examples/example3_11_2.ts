import {CanvasExample} from "../@model/CanvasExample.ts";

//두 개의 사각형을 만들고 애니메이션을 멈추게 하기
export default new CanvasExample(($canvas, ctx) => {
    const ctxW = $canvas.width;
    const ctxH = $canvas.height;
    let x = 0;
    let y = 0;
    const animate = () => {
        ctx.clearRect(0, 0, ctxW, ctxH); //이전 그림 지우기
        ctx.fillStyle = "red"; //빨간색 표현
        ctx.fillRect(x++, 10, 50, 50); //사각형 그리기
        ctx.fillStyle = "blue"; //파란색 표현
        ctx.fillRect(10, y++, 50, 50); //사각형 그리기

        if(x > ctxW) { //x축으로 이동한 사각형이 화면을 벗어나면
            x = 0; //x축으로 이동한 사각형을 다시 0으로 초기화
        }

        if (y > ctxH) { //y축으로 이동한 사각형이 화면을 벗어나면
            y = 0; //y축으로 이동한 사각형을 다시 0으로 초기화
        }
    };
    const interval = setInterval(animate, 30);
    $canvas.onclick = () => clearInterval(interval); //클릭하면 애니메이션 멈추기
});