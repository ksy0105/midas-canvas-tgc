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
        // 사각형 그리기
        ctx.strokeRect(20,20, 100,100);
        ctx.strokeRect(150,150, 50,50);

        // 내부 채워진 사각형 그리기
        ctx.fillStyle = 'green';
        ctx.fillRect(250, 250, 50, 50);


        // 색, 선 스타일된 사각형 그리기
        ctx.lineWidth = 10;
        ctx.strokeStyle = 'red';
        ctx.fillStyle = 'blue';
        ctx.fillRect(10, 250, 200, 200);
        ctx.strokeRect(10, 250, 200, 200);

        // 영역 지우기
        ctx.clearRect(30, 300, 50, 50);
    },[]);

    return (
        <canvas ref={canvasRef}/>
    )
}

export default Square
