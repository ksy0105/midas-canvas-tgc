import {useRef, useEffect, forwardRef, MutableRefObject} from 'react';

interface Props {
    widthVal?: number;
    heightVal?: number;
    draw: (ctx: CanvasRenderingContext2D) => void;
}

const CanvasComponent = forwardRef<HTMLCanvasElement, Props>(({
    widthVal = 500,
    heightVal = 500,
    draw
}, ref) => {
    const canvasRef = ref? ref as MutableRefObject<HTMLCanvasElement> : useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;

        if(!canvas) return;

        canvas.width = widthVal;
        canvas.height = heightVal;

        const ctx = canvas.getContext('2d');

        if(!ctx) return;
        draw(ctx);
    },[]);

    return (
        <canvas ref={canvasRef} style={{border: '1px solid black'}}/>
    );
});

export default CanvasComponent;