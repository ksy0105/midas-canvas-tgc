import { useEffect } from "react";

const TwoImage = () => {
    useEffect(() => {
        const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.fillStyle = "red";
                ctx.fillRect(20, 20, 100, 100);
                ctx.globalCompositeOperation = "destination-atop";
                ctx.fillStyle = "blue";
                ctx.fillRect(50, 50, 100, 100);
            }
        }
    }, []);

    return (
        <>
        <canvas id= "myCanvas" width = { 400} height = { 300} >
            Your browser does not support the HTML5 canvas tag.
            </canvas>
                </>
    );
}

export default TwoImage;