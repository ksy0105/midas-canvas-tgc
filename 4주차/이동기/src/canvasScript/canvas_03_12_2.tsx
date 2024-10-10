import { useEffect, useState } from "react";

const ClieckPositionRect = () => {    
    const [mouseX, setMouseX] = useState(0);
    const [mouseY, setMouseY] = useState(0);

    useEffect(() => {
        const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.canvas.addEventListener("click", (event: MouseEvent) => {
                    const x = event.clientX - ctx.canvas.offsetLeft;
                    const y = event.clientY - ctx.canvas.offsetTop;

                    setMouseX(x);
                    setMouseY(y);

                    // useState 사용하지 않고 클릭한 위치에 바로 사각형 그리기
                    ctx.fillStyle = "red";
                    ctx.fillRect(x - 10, y - 10, 20, 20);
                });
            }
        }
    }, []);

    return (
        <>
            <div>
                {mouseX}, {mouseY}
            </div>
            <canvas id="myCanvas" width={400} height={300}>
                Your browser does not support the HTML5 canvas tag.
            </canvas>
        </>
    );
}

export default ClieckPositionRect;