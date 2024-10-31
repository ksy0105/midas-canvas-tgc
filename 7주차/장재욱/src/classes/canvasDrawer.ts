import { loadImage } from "../utils/image.ts";
import {Particle} from "./particle.ts";

export interface Position {
    x: number;
    y: number;
}

class CanvasDrawer {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D | null;
    private order: number = 1;
    private readonly RADIUS = 8;
    private totalCount: number;
    private particles: Particle[] = [];
    private proceedImage: HTMLImageElement | null = null;
    private finishImage: HTMLImageElement | null = null;
    private onComplete: () => void;
    private onCelebrationAnimationComplete: () => void;
    private positionList: Position[];

    constructor(
        canvas: HTMLCanvasElement,
        proceedImagePath: string,
        finishImagePath: string,
        totalCount: number,
        positionList: Position[],
        onComplete: () => void,
        onAnimationComplete: () => void
    ) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.onComplete = onComplete;
        this.onCelebrationAnimationComplete = onAnimationComplete;
        this.totalCount = totalCount;
        this.positionList = positionList;
        this.initializeCanvas(proceedImagePath, finishImagePath);
    }

    // 캔버스 초기화
    private async initializeCanvas(proceedImagePath: string, finishImagePath: string) {
        const [proceedImage, finishImage] = await Promise.all([
            loadImage(proceedImagePath), loadImage(finishImagePath)
        ])
        this.proceedImage = proceedImage;
        this.finishImage = finishImage;
        this.ctx?.drawImage(this.proceedImage, 0, 0);
    }

    // 점 클릭
    public handleClick(event: React.MouseEvent<HTMLCanvasElement>) {
        // 점을 다 찍었으면 바로 리턴
        if (!this.ctx || this.order >= this.totalCount) return;

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
        if (this.order === this.totalCount) {
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
        this.ctx?.beginPath();
        this.ctx?.moveTo(mouseX - 5, mouseY);
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
            this.particles.push(new Particle(this.canvas.width / 2, this.canvas.height / 2));
        }
        requestAnimationFrame(this.animateParticles.bind(this));
    }

    // 생성된 파티클로 애니메이션 그리기
    private animateParticles() {
        if (!this.ctx) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx?.drawImage(this.finishImage!, 0, 0);

        this.particles = this.particles.filter((p) => p.isAlive());
        this.particles.forEach((particle) => {
            particle.update();
            particle.draw(this.ctx!);
        });

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
        this.onCelebrationAnimationComplete();
    }
}

export default CanvasDrawer;
