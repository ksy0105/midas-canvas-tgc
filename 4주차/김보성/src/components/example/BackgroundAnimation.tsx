import CanvasComponent from '../CanvasComponent';
import {useEffect, useRef, useState} from "react";
import background from "../../assets/background.png";

let animateInterval: number | null = null;

let x = 0;

const BackgroundAnimation = () => {
    const ref = useRef<HTMLCanvasElement>(null);

    const [ctxObj, setCtxObj] = useState<CanvasRenderingContext2D | null>(null);

    const bgImg = new Image();
    bgImg.src = background;

    const canvasWidth = 1692 / 2;
    const canvasHeight = 840 / 2;

    const animation = () => {
        if(!ctxObj) return;
        const canvasWidth = ref.current?.width ?? 0;
        ctxObj.drawImage(bgImg, x--, 0, canvasWidth * 2, canvasHeight);

        if(x <= -canvasWidth) {
            x = 0;
        }
    }

    const draw = (ctx: CanvasRenderingContext2D) => {
        setCtxObj(ctx);
    }

    useEffect(() => {
        if(ctxObj){
            animateInterval = setInterval(animation, 5);
        }
    }, [ctxObj]);

    useEffect(() => {
        return () => {
            if(animateInterval) {
                clearInterval(animateInterval);
            }
        }
    }, []);

    return (
        <CanvasComponent draw={draw} ref={ref} widthVal={canvasWidth} heightVal={canvasHeight} />
    );
}

export default BackgroundAnimation;