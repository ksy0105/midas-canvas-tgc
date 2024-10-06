import { useEffect, useRef, useState } from "react";

const ImageAnimationWithPlaneMove = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [playerPosition, setPlayerPosition] = useState({ x: 30, y: 150 });
    const speed = 5;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let bgImage = new Image();
        let fighterImage = new Image();
        bgImage.src = "/space.png";
        fighterImage.src = "/fighter.png";

        let backgroundX = 0;

        function animate() {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(bgImage, backgroundX--, 0);
            if (backgroundX <= -600) {
                backgroundX = 0;
            }
            ctx.drawImage(fighterImage, playerPosition.x, playerPosition.y);

            requestAnimationFrame(animate);
        }

        bgImage.onload = () => {
            fighterImage.onload = () => {
                animate();
            };
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "ArrowUp" || event.key === "w" || event.key === "W") {
                setPlayerPosition((prev) => ({ ...prev, y: prev.y - speed }));
            } else if (event.key === "ArrowDown" || event.key === "s" || event.key === "S") {
                setPlayerPosition((prev) => ({ ...prev, y: prev.y + speed }));
            } else if (event.key === "ArrowLeft" || event.key === "a" || event.key === "A") {
                setPlayerPosition((prev) => ({ ...prev, x: prev.x - speed }));
            } else if (event.key === "ArrowRight" || event.key === "d" || event.key === "D") {
                setPlayerPosition((prev) => ({ ...prev, x: prev.x + speed }));
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [playerPosition]);

    return (
        <>
            <canvas ref={canvasRef} width={400} height={300}>
                Your browser does not support the HTML5 canvas tag.
            </canvas>
        </>
    );
}

export default ImageAnimationWithPlaneMove;