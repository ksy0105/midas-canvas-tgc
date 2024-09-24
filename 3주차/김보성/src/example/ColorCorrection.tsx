import {useEffect, useRef} from 'react';

const ColorCorrection = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;

        if(!canvas) return;

        canvas.width = 500;
        canvas.height = 500;

        const ctx = canvas.getContext('2d');

        if(!ctx) return;

        ctx.fillStyle = 'red';
        ctx.fillRect(20, 30, 100, 100);

        ctx.fillStyle = 'green';
        ctx.fillRect(50, 50, 100, 100);

        // 특정 영역 이미지로 가져오기
        const src = ctx.getImageData(0,0, 100, 100);

        // 흑백으로 보정하기
        let pixels = src.data;
        const numPixels = pixels.length;

        for(let i = 0; i < numPixels; i++) {
            let avg = (pixels[i*4] + pixels[i*4+1] + pixels[i*4+2]) / 3;
            pixels[i*4] = avg;
            pixels[i*4+1] = avg;
            pixels[i*4+2] = avg;
        }


        ctx.putImageData(src, 200,50);

        ctx.strokeRect(0,0, 100, 100);
        ctx.strokeRect(200, 50, 100, 100);
    },[]);

    return (
        <canvas ref={canvasRef}/>
    )
}

export default ColorCorrection;
