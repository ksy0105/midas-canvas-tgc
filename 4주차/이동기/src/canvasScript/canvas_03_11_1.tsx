import { useEffect, useRef } from "react";

const animationHorizontal = (ctx: CanvasRenderingContext2D, width: number, height: number, x: number) => {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "red";
    ctx.fillRect(x, 10, 50, 50);
}

const AnimationHorizontal = () => {
    const xPos = useRef(0);
    
    useEffect(() => {
        const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                const animateInterval = setInterval(() => {
                    animationHorizontal(ctx, 400, 300, xPos.current);
                    xPos.current++;
                }, 30);
                return () => clearInterval(animateInterval);
            }
        }
    }, []);

    return (
        <>
            <canvas id="myCanvas" width={400} height={300}>
                Your browser does not support the HTML5 canvas tag.
            </canvas>
        </>
    );
}

export default AnimationHorizontal;