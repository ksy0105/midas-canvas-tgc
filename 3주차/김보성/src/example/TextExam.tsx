import {useEffect, useRef} from 'react';

const TextExam = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;

        if(!canvas) return;

        canvas.width = 500;
        canvas.height = 500;

        const ctx = canvas.getContext('2d');

        if(!ctx) return;

        // 폰트 스타일 적용
        ctx.fillStyle = 'red';
        ctx.font = "italic bold 38px Arial, sans-serif"

        // 폰트 좌우 정렬
        ctx.textAlign = 'start';
        ctx.fillText('hi canvas!!', 200 , 100);

        ctx.textAlign = 'center';
        ctx.fillText('hi canvas!!', 200 , 150);
        ctx.strokeText('hi canvas!!', 200, 150);

        ctx.textAlign = 'right';
        ctx.fillText('hi canvas!!', 200 , 200);

        // 폰트 상하 정렬
        ctx.textBaseline = 'top';
        ctx.textAlign = 'start';
        ctx.fillText('hi canvas!!', 200 , 300);

        ctx.lineWidth = 2;

        // 기준선
        ctx.strokeStyle = 'red';
        ctx.moveTo(200, 20);
        ctx.lineTo(200, 370);
        ctx.stroke();

        ctx.strokeStyle = 'red';
        ctx.moveTo(0, 300);
        ctx.lineTo(500, 300);
        ctx.stroke();
    },[]);

    return (
        <canvas ref={canvasRef}/>
    )
}

export default TextExam;
