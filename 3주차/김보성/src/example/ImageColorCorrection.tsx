import {useEffect, useRef} from 'react';

const ImageColorCorrection = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;

        if(!canvas) return;

        canvas.width = 500;
        canvas.height = 500;

        const ctx = canvas.getContext('2d');

        if(!ctx) return;

        const img = new Image();
        img.src = 'iconChat.png';

        img.onload = () => {
            ctx.drawImage(img, 0, 0);
            const src = ctx.getImageData(0,0, 100, 100);
            let datas = src.data;
            const numPixels = datas.length;

            for(let i = 0; i < numPixels; i+=4) {
                datas[i] = 255  - datas[i];
                datas[i + 1] = 255  - datas[i + 1];
                datas[i + 2] = 255  - datas[i + 2];
            }

            ctx.putImageData(src, 200,50);

            ctx.strokeRect(0,0, 100, 100);
            ctx.strokeRect(200, 50, 100, 100);
        }


    },[]);
    
    return (
        <canvas ref={canvasRef}/>
    )
}

export default ImageColorCorrection;
