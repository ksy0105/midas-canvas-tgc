import CanvasComponent from '../CanvasComponent';
import {useEffect, useRef, useState} from "react";

let animateInterval: number | null = null;

let x = 0;
let y = 0;

const Animation = () => {
    const [ctxObj, setCtxObj] = useState<CanvasRenderingContext2D | null>(null);
    const ref = useRef<HTMLCanvasElement>(null);


    const animate = () => {
        if(!ref.current || !ctxObj) return;

        const ctxw = ref.current?.width ?? 0;
        const ctxh = ref.current?.height ?? 0;

        ctxObj.globalCompositeOperation = 'xor';

        ctxObj.clearRect(0,0, ctxw, ctxh);
        ctxObj.fillStyle = 'red';
        ctxObj.fillRect(x, 10, 50, 50);

        ctxObj.fillStyle = 'blue';
        ctxObj.fillRect(10, y, 50, 50);

        x++;
        y++;

        if(ctxw < x){
            x = 0;
        }

        if(ctxh < y){
            y = 0;
        }
    }

    const draw = (ctx: CanvasRenderingContext2D) => {
        setCtxObj(ctx);
    }

    useEffect(() => {
        if(ctxObj) {
            animateInterval = setInterval(animate, 5);
        }
    }, [ctxObj]);

    useEffect(() => {
        return () => {
            if(animateInterval) {
                clearInterval(animateInterval);
            }
        }
    }, []);

    const onClickComp = () => {
        if(animateInterval) {
            clearInterval(animateInterval);
            animateInterval = null;
        } else {
            animateInterval = setInterval(animate, 5);
        }
    }

    return (
        <div onClick={onClickComp}>
            <CanvasComponent draw={draw} ref={ref}/>
        </div>
    );
}

export default Animation;