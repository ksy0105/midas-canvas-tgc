import {useEffect, useRef} from 'react';

const Shadow = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;

        if(!canvas) return;

        canvas.width = 500;
        canvas.height = 500;

        const ctx = canvas.getContext('2d');

        if(!ctx) return;

        ctx.shadowColor = 'rgba(0,0,0,0.3)';
        ctx.shadowOffsetX = 15;
        ctx.shadowOffsetY = 15;
        ctx.shadowBlur = 3;
        ctx.fillStyle = 'red';
        ctx.fillRect(50,50, 100, 100);

        ctx.fillStyle = 'green';
        ctx.fillRect(200, 200, 100, 100);
        // 위치 이동
        ctx.translate(200, 200);
        // 크기 변형
        ctx.scale(0.5, 0.5);
        ctx.fillRect(200, 200, 100, 100);

        // 회전
        ctx.fillStyle = 'blue';
        ctx.rotate(10 * Math.PI / 180);
        ctx.fillRect(300, 300, 100, 100);
        ctx.rotate(10 * Math.PI / 180);
        ctx.fillRect(300, 300, 100, 100);

        // 사각형 형태 변형 시키기
        ctx.fillStyle = 'black';
        ctx.setTransform(0.6, 0, 0, 0.6, 0, 0);
        ctx.fillRect(300, 300, 100, 100);

        ctx.transform(0.6, 0.2, 0.2, 0.6, 200, 200);
        ctx.fillRect(300, 300, 100, 100);
    },[]);

    return (
        <canvas ref={canvasRef}/>
    )
}

export default Shadow;
