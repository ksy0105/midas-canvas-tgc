import {useEffect, useRef} from 'react';

const Fill = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;

        if(!canvas) return;

        canvas.width = 500;
        canvas.height = 500;

        const ctx = canvas.getContext('2d');

        if(!ctx) return;

        // 1. 색 채우기 예제
        // 일반 선 모양 채우기
        // const grad = ctx.createLinearGradient(50,50,250, 50);
        // 원 모양 그라데이션 채우기
        const grad = ctx.createRadialGradient(50,50, 0, 100, 100, 200);
        grad.addColorStop(0, 'red');
        grad.addColorStop(1/ 6, 'orange');
        grad.addColorStop(2/ 6, 'yellow');
        grad.addColorStop(3/ 6, 'green');
        grad.addColorStop(4/ 6, 'aqua');
        grad.addColorStop(5/ 6, 'blue');
        grad.addColorStop(1, 'purple');

        ctx.lineWidth = 5;
        ctx.fillStyle = grad;

        // 색 채우는 영역
        ctx.fillRect(50,50, 200, 200);

        // 사각형 영역
        ctx.strokeRect(50,50, 200, 200);

        // 2. 이미지로 채우기 예제
        const icon = new Image();
        icon.src = 'iconChat.png';
        icon.onload = () => {
            ctx.fillStyle = ctx.createPattern(icon, 'repeat-x') as CanvasPattern;
            ctx.fillRect(0,0, canvas.width, canvas.height);
        }
    },[]);

    return (
        <canvas ref={canvasRef}/>
    )
}

export default Fill
