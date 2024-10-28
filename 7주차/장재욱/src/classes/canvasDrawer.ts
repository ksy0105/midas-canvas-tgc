import { loadImage } from "../utils/image.ts";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    color: string;
}

class CanvasDrawer {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D | null;
    private startX: number = 0;
    private startY: number = 0;
    private order: number = 1;
    private readonly RADIUS = 8;
    private readonly TOTAL_COUNT = 32;
    private particles: Particle[] = [];
    private proceedImage: HTMLImageElement | null = null;
    private finishImage: HTMLImageElement | null = null;
    private onComplete: () => void;
    private onAnimationComplete: () => void;

    private readonly positionList = [
        { x: 251, y: 148 }, { x: 81, y: 69 }, { x: 30, y: 77 },
        { x: 149, y: 181 }, { x: 110, y: 210 }, { x: 62, y: 164 },
        { x: 93, y: 224 }, { x: 80, y: 243 }, { x: 109, y: 243 },
        { x: 152, y: 298 }, { x: 142, y: 255 }, { x: 190, y: 252 },
        { x: 220, y: 288 }, { x: 214, y: 313 }, { x: 265, y: 288 },
        { x: 234, y: 280 }, { x: 210, y: 242 }, { x: 224, y: 237 },
        { x: 500, y: 390 }, { x: 560, y: 349 }, { x: 329, y: 194 },
        { x: 446, y: 128 }, { x: 503, y: 158 }, { x: 531, y: 140 },
        { x: 467, y: 107 }, { x: 470, y: 21 }, { x: 444, y: 27 },
        { x: 420, y: 84 }, { x: 370, y: 65 }, { x: 343, y: 80 },
        { x: 392, y: 105 },
    ];

    constructor(canvas: HTMLCanvasElement, onComplete: () => void, onAnimationComplete: () => void) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.onComplete = onComplete;
        this.onAnimationComplete = onAnimationComplete;
        this.initializeCanvas();
    }

    // 초기화
    private async initializeCanvas() {
        const [proceedImage, finishImage] = await Promise.all([
            loadImage("./src/assets/dottodot_airplane.png"), loadImage("./src/assets/dottodot_airplane_finish.png")
        ])
        this.proceedImage = proceedImage;
        this.finishImage = finishImage;
        this.ctx?.drawImage(this.proceedImage, 0, 0);
    }

    // 점 클릭
    public handleClick(event: React.MouseEvent<HTMLCanvasElement>) {
        // 점을 다 찍었으면 바로 리턴
        if (!this.ctx || this.order >= this.TOTAL_COUNT) return;

        const { offsetX: mouseX, offsetY: mouseY } = event.nativeEvent;
        const currentPos = this.positionList[this.order - 1];

        // 점의 좌표가 다음 찍어야될 점의 좌표의 범위에 속하지 않으면 바로 리턴
        if (!this.isWithinRange(mouseX, mouseY, currentPos)) return;

        if (this.order === 1) {
            this.startLine(mouseX, mouseY);
        } else {
            this.drawLine(mouseX, mouseY);
        }

        this.drawCircle(mouseX, mouseY);
        this.drawText(mouseX, mouseY);
        this.order++;

        // 점을 다 찍으면 완료 처리
        if (this.order === this.TOTAL_COUNT) {
            this.completeDrawing();
        }
    }

    // 클릭한 점의 좌표가 찍어야되는 점의 좌표의 범위에 있는지 판단
    private isWithinRange(mouseX: number, mouseY: number, pos: { x: number; y: number }) {
        return (
            pos.x - 5 <= mouseX && mouseX <= pos.x + 5 &&
            pos.y - 5 <= mouseY && mouseY <= pos.y + 5
        );
    }

    // 맨 처음 점의 좌표 찍기
    private startLine(mouseX: number, mouseY: number) {
        this.startX = mouseX - 5;
        this.startY = mouseY;
        this.ctx?.beginPath();
        this.ctx?.moveTo(this.startX, this.startY);
    }

    // 찍은 좌표까지 선 그리기
    private drawLine(mouseX: number, mouseY: number) {
        this.ctx?.lineTo(mouseX - 5, mouseY);
        this.ctx?.stroke();
    }

    // 원 그리기
    private drawCircle(x: number, y: number) {
        this.ctx?.beginPath();
        this.ctx?.arc(x, y, this.RADIUS, 0, Math.PI * 2);
        this.ctx!.fillStyle = "yellow";
        this.ctx?.fill();
        this.ctx?.stroke();
    }

    // 순서 텍스트 원 안에 표시
    private drawText(x: number, y: number) {
        this.ctx!.font = "normal bold 8px Arial, sans-serif";
        this.ctx!.fillStyle = "#000";
        this.ctx!.fillText(`${this.order}`, x - 3, y + 4);
    }

    // 게임 종료
    private completeDrawing() {
        // 게임 종료하면 동작
        this.onComplete();
        // 완성된 이미지 그리기
        this.ctx?.drawImage(this.finishImage!, 0, 0);
        // 축하 애니메이션 그리기
        this.startCelebrationAnimation();
    }

    // 축하 애니메이션
    private startCelebrationAnimation() {
        for (let i = 0; i < 100; i++) {
            this.particles.push(this.createParticle());
        }
        requestAnimationFrame(this.animateParticles.bind(this));
    }

    // 랜덤 파티클 생성
    private createParticle(): Particle {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 + 2;
        return {
            x: this.canvas.width / 2,
            y: this.canvas.height / 2,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 100,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
        };
    }

    // 생성된 파티클로 애니메이션 그리기
    private animateParticles() {
        if (!this.ctx) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx?.drawImage(this.finishImage!, 0, 0);
        this.particles = this.particles.filter((p) => p.life > 0);

        for (const particle of this.particles) {
            this.ctx!.beginPath();
            this.ctx!.arc(particle.x, particle.y, 4, 0, Math.PI * 2);
            this.ctx!.fillStyle = particle.color;
            this.ctx!.fill();

            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life -= 1;
        }

        // 파티클이 있으면 계속 애니메이션 실행
        if (this.particles.length > 0) {
            requestAnimationFrame(this.animateParticles.bind(this));
        } else {
            // 애니메이션 종료
            this.doAfterCelebrationAnimation();
        }
    }

    // 애니메이션 종료후 실행
    private async doAfterCelebrationAnimation() {
        this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx?.drawImage(this.finishImage!, 0, 0);
        this.onAnimationComplete();
    }
}

export default CanvasDrawer;
