import {useEffect, useRef} from 'react';

const Line = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;

        if(!canvas) return;

        canvas.width = 500;
        canvas.height = 500;

        const context = canvas.getContext('2d');

        if(!context) return;

        context.beginPath();
        // 선 그리기
        context.moveTo(100, 50);
        context.lineTo(300, 50);
        context.lineTo(300, 200);
        context.lineTo(100, 200);
        context.lineTo(100, 50);

        // 선 안에 배경색 채우기
        context.fillStyle = 'red';
        context.fill();

        // 라인 스타일
        context.lineWidth = 10;
        context.strokeStyle = 'blue';
        // 선 끝 부분 처리
        // context.lineCap = 'round';
        // 선 꺽인 부분 처리
        context.lineJoin = 'round';

        // 점선 처리
        context.setLineDash([20, 10]);

        context.stroke();
    },[]);

    return (
        <canvas ref={canvasRef}/>
    )
}

export default Line
