import { useEffect, useRef } from "react";

const animtaion = (ctx: CanvasRenderingContext2D, width: number, height: number, x: number, y: number) => {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "red";
    ctx.fillRect(x, 10, 50, 50);
    ctx.fillStyle = "blue";
    ctx.fillRect(10, y, 50, 50)
}

const AnimationTwoRect = () => {
    const xPos = useRef(0);
    const yPos = useRef(0);
    
    useEffect(() => {
        const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                const animateInterval = setInterval(() => {
                    animtaion(ctx, 400, 300, xPos.current, yPos.current);
                    xPos.current++;
                    yPos.current++;

                    if (xPos.current > 400) {
                        xPos.current = 0;
                    }

                    if (yPos.current > 300) {
                        yPos.current = 0;
                    }
                }, 30);
                ctx.canvas.addEventListener("click", () => {
                    clearInterval(animateInterval);
                });
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

export default AnimationTwoRect;