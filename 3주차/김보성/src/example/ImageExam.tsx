import {useEffect, useRef} from 'react';

const ImageExam = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;

        if(!canvas) return;

        canvas.width = 500;
        canvas.height = 500;

        const ctx = canvas.getContext('2d');

        if(!ctx) return;

        const icon = new Image();
        icon.src = 'iconChat.png';
        icon.onload = () => {
            ctx.drawImage(icon, 10, 10);
            ctx.drawImage(icon, 100, 100, 50, 50)
            ctx.drawImage(icon, 20, 20, 200,200, 200, 100, 150, 150)
        }
    },[]);

    return (
        <canvas ref={canvasRef}/>
    )
}

export default ImageExam;
