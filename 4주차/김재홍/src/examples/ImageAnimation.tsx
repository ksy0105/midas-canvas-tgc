import { useEffect, useRef } from "react";

const ImageAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playerRef = useRef({
    x: 30,
    y: 130,
    w: 0,
    h: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = 400;
    canvas.height = 300;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bgImage = new Image();
    bgImage.src = "space_repeat.jpg";
    let bgX = 0;

    const fighterImage = new Image();
    fighterImage.src = "fighter.png";

    fighterImage.onload = () => {
      playerRef.current.w = fighterImage.width / 2;
      playerRef.current.h = fighterImage.height / 2;

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(bgImage, bgX--, 0);
        if (bgX <= -bgImage.width / 2) {
          bgX = 0;
        }

        ctx.drawImage(
          fighterImage,
          playerRef.current.x,
          playerRef.current.y,
          playerRef.current.w,
          playerRef.current.h
        );
        requestAnimationFrame(animate);
      };
      animate();
    };
  }, []);

  return (
    <>
      <h2>
        3_13_1. 이미지 애니메이션 만들기
        <br />
        3_14_1. 앞서 만든 배경에 이어서 비행기 만들어보기
      </h2>
      <canvas ref={canvasRef} />
    </>
  );
};

export default ImageAnimation;
