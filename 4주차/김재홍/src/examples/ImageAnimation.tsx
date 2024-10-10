import { useEffect, useRef } from "react";

const ImageAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playerRef = useRef({
    x: 30,
    y: 130,
    w: 0,
    h: 0,
  });

  const bgImageRef = useRef<HTMLImageElement | null>(null);
  const fighterImageRef = useRef<HTMLImageElement | null>(null);
  const isBgLoadedRef = useRef(false);
  const isFighterLoadedRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const bgImage = new Image();
    const fighterImage = new Image();
    const SPEED = 5;

    let bgX = 0;

    canvas.width = 400;
    canvas.height = 300;

    bgImage.src = "space_repeat.jpg";
    bgImageRef.current = bgImage;
    isBgLoadedRef.current = true;

    fighterImage.src = "fighter.png";
    fighterImageRef.current = fighterImage;
    isFighterLoadedRef.current = true;
    playerRef.current.w = fighterImage.width / 2;
    playerRef.current.h = fighterImage.height / 2;

    const update = (key: string) => {
      if (key === "w" || key === "W") {
        playerRef.current.y -= SPEED;
      } else if (key === "s" || key === "S") {
        playerRef.current.y += SPEED;
      } else if (key === "a" || key === "A") {
        playerRef.current.x -= SPEED;
      } else if (key === "d" || key === "D") {
        playerRef.current.x += SPEED;
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!isBgLoadedRef.current || !bgImageRef.current) return;
      ctx.drawImage(bgImageRef.current, bgX--, 0);

      if (bgX <= -bgImageRef.current.width / 2) {
        bgX = 0;
      }

      if (!isFighterLoadedRef.current || !fighterImageRef.current) return;

      ctx.drawImage(
        fighterImageRef.current,
        playerRef.current.x,
        playerRef.current.y,
        playerRef.current.w,
        playerRef.current.h
      );
      requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener("keydown", (e) => {
      update(e.key);
    });
    return () => {
      window.removeEventListener("keydown", (e) => {
        update(e.key);
      });
    };
  });

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
