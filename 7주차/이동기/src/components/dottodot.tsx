import React, { useRef, useState, useEffect, useCallback } from 'react';

const DotToDotCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [coordinates, setCoordinates] = useState<string[]>([]);
    const totalPoints = 31;
    const finishImage = useRef(new Image()).current;
    finishImage.src = "/dottodot_airplane_finish.png";

    useEffect(() => {
        initializeCanvas();
    }, []);

    const initializeCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        const img = document.getElementById("img") as HTMLImageElement;
        if (ctx && img) ctx.drawImage(img, 0, 0);
    }, []);

    const drawLine = (ctx: CanvasRenderingContext2D, startX: number, startY: number, endX: number, endY: number) => {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
    };

    const drawCircle = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number = 8) => {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = "yellow";
        ctx.fill();
        ctx.stroke();
    };

    const drawText = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number) => {
        ctx.font = "bold 8px Arial, sans-serif";
        ctx.fillStyle = "#000000";
        ctx.fillText(text, x, y);
    };

    const renderFinishImage = useCallback((ctx: CanvasRenderingContext2D) => {
        ctx.drawImage(finishImage, 0, 0);
    }, [finishImage]);

    const handleCanvasClick = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas || coordinates.length >= totalPoints) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const mouseX = event.clientX - canvas.offsetLeft;
        const mouseY = event.clientY - canvas.offsetTop;

        if (coordinates.length === 0) {
            ctx.moveTo(mouseX - 5, mouseY);
        } else {
            const [prevX, prevY] = coordinates[coordinates.length - 1].split(',').map(Number);
            drawLine(ctx, prevX, prevY, mouseX - 5, mouseY);
        }

        drawCircle(ctx, mouseX, mouseY);
        drawText(ctx, (coordinates.length + 1).toString(), mouseX - 3, mouseY + 4);

        setCoordinates(prevCoords => [...prevCoords, `${mouseX},${mouseY}`]);

        if (coordinates.length + 1 === totalPoints) {
            alert("잘 하셨습니다.");
            renderFinishImage(ctx);
        }
    }, [coordinates, totalPoints, renderFinishImage]);

    return (
        <div>
            <canvas
                ref={canvasRef}
                id="myCanvas"
                width={600}
                height={400}
                onClick={handleCanvasClick}
                style={{ border: '1px solid black' }}
            />
            <img id="img" src="/dottodot_airplane.png" alt="initial" style={{ display: 'none' }} />
        </div>
    );
};

export default DotToDotCanvas;