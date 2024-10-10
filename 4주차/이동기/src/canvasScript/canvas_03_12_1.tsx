import { useEffect, useState } from "react";

const ClieckPosition = () => {    
    const [mouseX, setMouseX] = useState(0);
    const [mouseY, setMouseY] = useState(0);

    useEffect(() => {
        const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.canvas.addEventListener("click", (event: MouseEvent) => {
                    setMouseX(event.clientX);
                    setMouseY(event.clientY);
                    console.log(mouseX, mouseY);
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

export default ClieckPosition;