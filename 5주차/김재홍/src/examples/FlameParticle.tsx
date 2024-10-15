import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
}

const FlameParticle = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const ctxW = canvas.width;
    const ctxH = canvas.height;
    // let x = ctxW / 2;
    // let y = ctxH / 2;

    // 초속도
    // let vx = 10;
    // let vy = -10;

    const particles: Particle[] = [];
    const TOTAL_COUNT = 30;
    const GRAVITY = 1;

    // 파티클 배열 생성
    const addParticle = () => {
      if (particles.length >= TOTAL_COUNT) return;

      let x = ctxW / 2;
      let y = ctxH / 4;
      let size = 5;

      // 초속도
      let vx = Math.random() * 20 - 10;
      let vy = Math.random() * 20 - 15;

      // 파티클 생성해서 배열에 인입
      particles.push({ x: x, y: y, size: size, vx: vx, vy: vy });
    };

    // 파티클 그리기
    const drawParticle = () => {
      addParticle();

      particles.forEach((particle, idx) => {
        ctx.beginPath();

        const grad = ctx.createLinearGradient(100, 0, 300, 0);

        grad.addColorStop(0, "white");
        grad.addColorStop(0.25, "yellow");
        grad.addColorStop(0.5, "red");
        grad.addColorStop(0.75, "purple");
        grad.addColorStop(1, "blue");

        // ctx.fillStyle = "white";
        ctx.fillStyle = grad;

        let x = (particle.x += particle.vx);
        let y = (particle.y += particle.vy);

        particle.vy += GRAVITY;

        ctx.arc(x, y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        if (particle.y > ctxH) {
          particles.splice(idx, 1);
        }
      });
    };

    const animate = () => {
      ctx.fillStyle = "black";
      ctx.clearRect(0, 0, ctxW, ctxH);
      ctx.fillRect(0, 0, ctxW, ctxH);
      drawParticle();
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <>
      <h2>3_19. 불꽃 파티클 만들기</h2>
      <canvas ref={canvasRef} width={400} height={300} />
    </>
  );
};
export default FlameParticle;
