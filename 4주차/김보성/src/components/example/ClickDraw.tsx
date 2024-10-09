import CanvasComponent from '../CanvasComponent';
import {useRef} from "react";

const ClickDraw = () => {
    const ref = useRef<HTMLCanvasElement>(null);

    const draw = (ctx: CanvasRenderingContext2D) => {
        if(!ref.current) return;
        ctx.fillRect(100 - 25,100 - 25, 50, 50);

        ref.current.addEventListener('click', (e) => {
            const x = e.clientX - ctx.canvas.offsetLeft;
            const y = e.clientY - ctx.canvas.offsetTop;
            ctx.fillStyle = 'green';
            ctx.fillRect(x - 25,y - 25, 50, 50);
        })
    }

    return (
        <CanvasComponent draw={draw} ref={ref}/>
    );
}

export default ClickDraw;