//백그라운드 이미지 애니메이션 만들기
import {CanvasExample} from "../@model/CanvasExample.ts";

export default new CanvasExample((_, ctx) => {
    const bgImg = new Image();
    bgImg.src = '/space_bg.png';
    let x = 0;
    const animate = () => {
        ctx.drawImage(bgImg, x--, 0, 400, 300); //이미지 그리기
        if(x <= -400) { //이미지가 화면을 벗어나면
            x = 0; //이미지를 다시 0으로 초기화
        }
    };
    setInterval(animate, 30);
});