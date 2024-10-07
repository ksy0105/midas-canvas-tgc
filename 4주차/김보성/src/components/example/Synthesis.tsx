import CanvasComponent from '../CanvasComponent';

const Synthesis = () => {
    const draw = (ctx: CanvasRenderingContext2D) => {
        // 알파값 적용하기
        ctx.fillStyle = 'rgba(63, 169, 245, 1)';
        ctx.fillRect(20,20,100,100);
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = 'blue';
        ctx.fillRect(50,50,100,100);

        // 두개의 이미지 합성하여 그리기
        ctx.globalAlpha = 1;
        ctx.fillStyle = 'red';
        ctx.fillRect(150,150, 100, 100);
        // ctx.globalCompositeOperation = 'source-over';
        // ctx.globalCompositeOperation = 'source-atop';
        // ctx.globalCompositeOperation = 'source-in'; //맨 마지막 이미지 기준으로 겹치는 부분만 그려짐
        // ctx.globalCompositeOperation = 'source-out'; //맨 마지막 이미지 기준으로 겹치는 부분 포함해서 그림
        // ctx.globalCompositeOperation = 'lighten';
        ctx.globalCompositeOperation = 'xor';
        ctx.fillStyle = 'blue';
        ctx.fillRect(200, 200, 100, 100);
    }

    return (
        <CanvasComponent draw={draw} />
    );
}

export default Synthesis;