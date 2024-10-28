export class Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    color: string;

    constructor(x: number, y: number) {
        // 무작위 각도
        const angle = Math.random() * Math.PI * 2;
        // 무작위 속도
        const speed = Math.random() * 3 + 2;
        this.x = x;
        this.y = y;
        // 각도와 속도를 이용한 x, y 방향으로의 속도
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        // 파티클 수명
        this.life = 100;
        // 무작위 색상
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    }

    // 파티클 업데이트
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= 1;
    }

    // 파티클 수명 확인
    isAlive() {
        return this.life > 0;
    }

    // 파티클 그리기
    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}
