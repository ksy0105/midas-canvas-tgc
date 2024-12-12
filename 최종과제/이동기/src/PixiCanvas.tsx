import React, { useRef, useEffect } from 'react';
import * as PIXI from 'pixi.js';
import * as planck from 'planck-js';

interface Target {
    body: planck.Body;
    graphics: PIXI.Graphics;
    isOutOfBound?: boolean;
}

interface Particle {
    sprite: PIXI.Graphics;
    vx: number;
    vy: number;
    life: number;
}

interface Projectile {
    body: planck.Body;
    graphics: PIXI.Graphics;
}

const PixiCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const app = new PIXI.Application({ width: 800, height: 600 });
        if (!canvasRef.current) return;

        const canvasElement = app.view as HTMLCanvasElement;
        canvasRef.current.appendChild(canvasElement);

        const SCALE = 30;
        const VELOCITY_MULTIPLIER = 0.5;
        const SHOT_LIMIT = 5; // 최대 발사 횟수
        const STABLE_VELOCITY_THRESHOLD = 0.05; // 안정 상태 판단 임계속도

        const world = planck.World(planck.Vec2(0, 10));

        let shotsLeft = SHOT_LIMIT;
        let gameEnded = false;
        let targets: Target[] = [];
        const particles: Particle[] = [];
        const projectiles: Projectile[] = [];

        // 바닥 생성
        const ground = world.createBody();
        ground.createFixture(
            planck.Edge(
                planck.Vec2(-app.screen.width / 2 / SCALE, app.screen.height / SCALE - 0.5),
                planck.Vec2(app.screen.width / 2 / SCALE, app.screen.height / SCALE - 0.5)
            )
        );

        // UI용 텍스트
        const style = new PIXI.TextStyle({ fill: '#ffffff', fontSize: 24 });
        const shotsText = new PIXI.Text(`Shots Left: ${shotsLeft}`, style);
        shotsText.x = 10;
        shotsText.y = 10;
        app.stage.addChild(shotsText);

        const statusText = new PIXI.Text('', { ...style, fontSize: 48 });
        statusText.anchor.set(0.5);
        statusText.x = app.screen.width / 2;
        statusText.y = app.screen.height / 2;
        app.stage.addChild(statusText);

        const createTarget = (x: number, y: number, width: number, height: number) => {
            const graphics = new PIXI.Graphics();
            graphics.beginFill(0x0000ff);
            graphics.drawRect(-width / 2, -height / 2, width, height);
            graphics.endFill();
            graphics.x = x;
            graphics.y = y;
            app.stage.addChild(graphics);

            const body = world.createDynamicBody({
                position: planck.Vec2(x / SCALE - app.screen.width / (2 * SCALE), y / SCALE),
                type: 'dynamic',
            });
            body.createFixture(planck.Box(width / 2 / SCALE, height / 2 / SCALE), {
                density: 1.0,
                friction: 0.3,
                restitution: 0.4,
            });

            targets.push({ body, graphics });
        };

        // 목표물 배치
        createTarget(600, 500, 40, 80);
        createTarget(650, 500, 40, 80);
        createTarget(625, 450, 40, 40);

        // 궤적 표시용 Graphics
        const trajectoryLine = new PIXI.Graphics();
        app.stage.addChild(trajectoryLine);

        // 새총 추가
        const fixedCircle = new PIXI.Graphics();
        const initialX = 200;
        const initialY = 300;
        fixedCircle.beginFill(0x00ff00);
        fixedCircle.drawCircle(0, 0, 20);
        fixedCircle.endFill();
        fixedCircle.x = initialX;
        fixedCircle.y = initialY;
        fixedCircle.eventMode = 'dynamic';
        (fixedCircle as any).buttonMode = true;
        app.stage.addChild(fixedCircle);

        const addProjectile = (x: number, y: number, velocityX: number, velocityY: number) => {
            const graphics = new PIXI.Graphics();
            graphics.beginFill(0xff0000);
            graphics.drawCircle(0, 0, 20);
            graphics.endFill();
            graphics.x = x;
            graphics.y = y;
            app.stage.addChild(graphics);

            const body = world.createDynamicBody({
                position: planck.Vec2(x / SCALE - app.screen.width / (2 * SCALE), y / SCALE),
            });
            body.createFixture(planck.Circle(0.7), {
                density: 1.0,
                friction: 0.1,
                restitution: 0.4,
            });
            body.setLinearVelocity(planck.Vec2(velocityX / SCALE, velocityY / SCALE));

            projectiles.push({ body, graphics });

            app.ticker.add(() => {
                if (gameEnded) return;
                const position = body.getPosition();
                graphics.x = (position.x + app.screen.width / (2 * SCALE)) * SCALE;
                graphics.y = position.y * SCALE;
            });
        };

        let dragging = false;

        const pointerDownHandler = (event: PIXI.FederatedPointerEvent) => {
            if (gameEnded) return;
            if (shotsLeft <= 0) return; // 더 이상 발사 불가 -> 드래그 시작 자체를 막는다.

            dragging = true;

            const pointerMove = (e: PointerEvent) => {
                if (dragging) {
                    const rect = canvasElement.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    fixedCircle.x = x;
                    fixedCircle.y = y;

                    const velocityX = (initialX - x) / VELOCITY_MULTIPLIER;
                    const velocityY = (initialY - y) / VELOCITY_MULTIPLIER;
                    drawTrajectory(initialX, initialY, velocityX, velocityY);
                }
            };

            const pointerUp = (e: PointerEvent) => {
                if (dragging) {
                    const rect = canvasElement.getBoundingClientRect();
                    const vx = (initialX - (e.clientX - rect.left)) / VELOCITY_MULTIPLIER;
                    const vy = (initialY - (e.clientY - rect.top)) / VELOCITY_MULTIPLIER;

                    addProjectile(initialX, initialY, vx, vy);

                    fixedCircle.x = initialX;
                    fixedCircle.y = initialY;
                    dragging = false;

                    trajectoryLine.clear();

                    shotsLeft--;
                    shotsText.text = `Shots Left: ${shotsLeft}`;

                    window.removeEventListener('pointermove', pointerMove);
                    window.removeEventListener('pointerup', pointerUp);
                }
            };

            window.addEventListener('pointermove', pointerMove);
            window.addEventListener('pointerup', pointerUp);
        };

        fixedCircle.on('pointerdown', pointerDownHandler);

        const drawTrajectory = (startX: number, startY: number, velocityX: number, velocityY: number) => {
            trajectoryLine.clear();
            trajectoryLine.lineStyle(2, 0x0000ff, 0.5);

            const tempWorld = new planck.World(planck.Vec2(0, 10));
            const tempBody = tempWorld.createDynamicBody({
                position: planck.Vec2(startX / SCALE - app.screen.width / (2 * SCALE), startY / SCALE),
            });
            tempBody.createFixture(planck.Circle(0.7), {
                density: 1.0,
                friction: 0.1,
                restitution: 0.4,
            });
            tempBody.setLinearVelocity(planck.Vec2(velocityX / SCALE, velocityY / SCALE));

            trajectoryLine.moveTo(startX, startY);
            for (let i = 0; i < 60; i++) {
                tempWorld.step(1 / 60);
                const position = tempBody.getPosition();
                const x = (position.x + app.screen.width / (2 * SCALE)) * SCALE;
                const y = position.y * SCALE;
                trajectoryLine.lineTo(x, y);
            }

            tempWorld.destroyBody(tempBody);
        };

        const checkGameStatus = () => {
            if (gameEnded) return;

            // 화면 밖으로 나간 목표물 처리
            targets.forEach((t) => {
                const pos = t.body.getPosition();
                const px = (pos.x + app.screen.width / (2 * SCALE)) * SCALE;
                const py = pos.y * SCALE;
                const outOfBound = px < 0 || px > app.screen.width || py < 0 || py > app.screen.height;
                if (outOfBound && !t.isOutOfBound) {
                    t.isOutOfBound = true;
                    createExplosion(px, py);
                    app.stage.removeChild(t.graphics);
                    world.destroyBody(t.body);
                }
            });

            // 벗어난 목표물 제외
            targets = targets.filter(t => !t.isOutOfBound);

            // 모든 목표물 제거 시 게임 클리어
            if (targets.length === 0 && !gameEnded) {
                statusText.text = "Game Clear!";
                gameEnded = true;
            }

            // 목표물이 남았고 발사 기회가 없으면 안정상태인지 확인 -> 추후 오버 처리
        };

        const createExplosion = (x: number, y: number) => {
            const particleCount = 15;
            for (let i = 0; i < particleCount; i++) {
                const p = new PIXI.Graphics();
                p.beginFill(0xffff00);
                p.drawCircle(0, 0, Math.random() * 5 + 5);
                p.endFill();
                p.x = x;
                p.y = y;
                app.stage.addChild(p);

                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * 5 + 2;
                const vx = Math.cos(angle) * speed;
                const vy = Math.sin(angle) * speed;

                particles.push({ sprite: p, vx, vy, life: 60 });
            }
        };

        const updateParticles = () => {
            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.sprite.x += p.vx;
                p.sprite.y += p.vy;
                p.life--;
                p.sprite.alpha = p.life / 60;

                if (p.life <= 0) {
                    app.stage.removeChild(p.sprite);
                    particles.splice(i, 1);
                }
            }
        };

        const isStable = () => {
            // 모든 발사체(projectiles)의 속도를 확인
            if (projectiles.length === 0) {
                // 발사체가 아예 없다면 움직임 없음 = 안정상태
                return true;
            }

            return projectiles.every(p => {
                const vel = p.body.getLinearVelocity();
                const speed = Math.sqrt(vel.x * vel.x + vel.y * vel.y);
                return speed < STABLE_VELOCITY_THRESHOLD;
            });
        };

        app.ticker.add(() => {
            if (gameEnded) {
                updateParticles();
                return;
            }

            world.step(1 / 60);
            updateParticles();

            targets.forEach(({ body, graphics }) => {
                const position = body.getPosition();
                graphics.x = (position.x + app.screen.width / (2 * SCALE)) * SCALE;
                graphics.y = position.y * SCALE;
                graphics.rotation = body.getAngle();
            });

            checkGameStatus();

            // 안정 상태 체크 로직:
            // 목표물이 남아있고(shotsLeft=0), 더 이상 쏠 수 없을 때 발사체 움직임이 모두 멈추면 게임 오버
            if (shotsLeft <= 0 && targets.length > 0 && !gameEnded && isStable()) {
                statusText.text = "Game Over!";
                gameEnded = true;
            }
        });

        return () => {
            app.destroy(true, true);
        };
    }, []);

    return <div ref={canvasRef} />;
};

export default PixiCanvas;
