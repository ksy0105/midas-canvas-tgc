import { useEffect, useRef } from "react";

const ImageAnimationWithPlane = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let bgImage = new Image();
        let fighterImage = new Image();
        bgImage.src = "public/space.png";
        fighterImage.src = "public/fighter.png";

        let backgroundX = 0;
        let playerX = 30;
        let playerY = 150;

        function animate() {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(bgImage, backgroundX--, 0);
            if (backgroundX <= -600) {
                backgroundX = 0;
            }
            ctx.drawImage(fighterImage, playerX, playerY);

            requestAnimationFrame(animate);
        }

        bgImage.onload = () => {
            fighterImage.onload = () => {
                animate();
            };
        };
    }, []);

    return (
        <>
            <canvas ref={canvasRef} width={400} height={300}>
                Your browser does not support the HTML5 canvas tag.
            </canvas>
        </>
    );
}

export default ImageAnimationWithPlane;