import {useEffect, useRef} from 'react';

const Square = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;

        if(!canvas) return;

        canvas.width = 500;
        canvas.height = 500;

        const ctx = canvas.getContext('2d');

        if(!ctx) return;

        // 원 그리기
        ctx.arc(100, 100, 100, 0, Math.PI * 2);

        ctx.stroke();

        // 선과 호 연결하여 라운드 코너 그리기
        ctx.beginPath();
        ctx.moveTo(50, 50);
        ctx.lineTo(300, 50);
        // ctx.arcTo(350, 50, 350,100, 50);
        // ctx.quadraticCurveTo(250,150,350,100);
        ctx.bezierCurveTo(250,70,100,150,350,100);
        ctx.lineTo(350, 200);

        ctx.stroke();

    },[]);

    return (
        <canvas ref={canvasRef}/>
    )
}

export default Square
