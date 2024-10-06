import { useEffect } from "react";

const ImageAnimation = () => {
    useEffect(() => {
        const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                const bgImage = new Image();
                bgImage.src = "public/space.png";

                let x = 0;

                const animate = () => {
                    ctx.drawImage(bgImage, x--, 0);

                    if (x <= -600) {
                        x = 0;
                    }
                }

                const animateInterval = setInterval(animate, 30);
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

export default ImageAnimation;