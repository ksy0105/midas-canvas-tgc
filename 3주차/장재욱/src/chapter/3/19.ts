import {initCanvasContext, makeCanvasContainer} from "../../utils.ts";

// 파티클의 불꽃 하나 만들기
const execute3_19_1 = (containerId: string) => {
    const ctx = initCanvasContext(containerId, 1);

    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.arc(200, 150, 5, 0, Math.PI * 2);
    ctx.fill();
}

// 불꽃 파티클 움직이기
const execute3_19_2 = (containerId: string) => {
    const ctx = initCanvasContext(containerId, 2);

    const ctxW = ctx.canvas.width;
    const ctxH = ctx.canvas.height;
    let x = 200;
    let y = 150;

    function animate() {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, ctxW, ctxH);

        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.arc(x++, y+=0.5, 5, 0, Math.PI * 2);
        ctx.fill();
    }

    setInterval(animate, 30);
}

// 원형에 초속도, 중력을 설정하여 튀는 모션 만들기
const execute3_19_3 = (containerId: string) => {
    const ctx = initCanvasContext(containerId, 3);

    const ctxW = ctx.canvas.width;
    const ctxH = ctx.canvas.height;
    let x = ctxW / 2;
    let y = ctxH / 2;

    //초속도
    let vx = 10;
    let vy = -10;

    //중력
    let gravity = 1;

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, ctxW, ctxH);

    ctx.fillStyle = "white";
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();

    function animate() {
        x += vx;
        y += vy;
        vy += gravity;

        // console.log("x:" + x + ", y:" + y);
        // console.log("vx:" + vx + ", vy:" + vy);

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, ctxW, ctxH);

        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();
    }

    setInterval(animate, 1000);
}

// 불꽃 파티클을 여러개 만들기
const execute3_19_4 = (containerId: string) => {
    const ctx = initCanvasContext(containerId, 4);

    type ParticleType = {
        x: number;
        y: number;
        size: number;
        vx: number;
        vy: number;
    }


    const ctxW = ctx.canvas.width;
    const ctxH = ctx.canvas.height;

    // 파티클
    const particles: ParticleType[] = [];
    let totalCount = 30;

    //중력
    let gravity = 1;

    function addParticle() {
        if (particles.length >= totalCount) return;

        const x = ctxW / 2;
        const y = ctxH / 4;
        const size = 3;

        //초속도
        let vx = Math.random() * 20 - 10;
        let vy = Math.random() * 20 - 15;

        // 파티클 배열 삽입
        particles.push({x, y, size, vx, vy});
    }

    function particle() {
        addParticle();

        for (let i in particles) {
            ctx.beginPath();
            ctx.fillStyle = "white";

            let x = particles[i].x += particles[i].vx;
            let y = particles[i].y += particles[i].vy;

            particles[i].vy += gravity;
            ctx.arc(x, y, particles[i].size, 0, Math.PI * 2);
            ctx.fill();

            if (particles[i].y > ctxH) particles.splice(Number(i), 1);
        }
    }

    function animate() {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, ctxW, ctxH);
        particle();
    }

    setInterval(animate, 30);
}

// 불꽃 파티클에 그라데이션 넣기
const execute3_19_5 = (containerId: string) => {
    const ctx = initCanvasContext(containerId, 5);

    type ParticleType = {
        x: number;
        y: number;
        size: number;
        vx: number;
        vy: number;
    }


    const ctxW = ctx.canvas.width;
    const ctxH = ctx.canvas.height;

    // 파티클
    const particles: ParticleType[] = [];
    let totalCount = 30;

    //중력
    let gravity = 1;

    function addParticle() {
        if (particles.length >= totalCount) return;

        const x = ctxW / 2;
        const y = ctxH / 4;
        const size = 3;

        //초속도
        let vx = Math.random() * 20 - 10;
        let vy = Math.random() * 20 - 15;

        // 파티클 배열 삽입
        particles.push({x, y, size, vx, vy});
    }

    function particle() {
        addParticle();

        for (let i in particles) {
            ctx.beginPath();

            const grad = ctx.createLinearGradient(100, 0, 300, 0);
            grad.addColorStop(0, "white");
            grad.addColorStop(0.25, "yellow");
            grad.addColorStop(0.5, "red");
            grad.addColorStop(0.75, "yellow");
            grad.addColorStop(1, "white");
            ctx.fillStyle = grad;

            let x = particles[i].x += particles[i].vx;
            let y = particles[i].y += particles[i].vy;

            particles[i].vy += gravity;
            ctx.arc(x, y, particles[i].size, 0, Math.PI * 2);
            ctx.fill();

            if (particles[i].y > ctxH) particles.splice(Number(i), 1);
        }
    }

    function animate() {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, ctxW, ctxH);
        particle();
    }

    setInterval(animate, 30);
}

const execute3_19 = () => {
    const id = 'chapter3_19'

    makeCanvasContainer(id, '3.19. 간단한 불꽃 파티클 만들기', () => {
        execute3_19_1(id);
        execute3_19_2(id);
        execute3_19_3(id);
        execute3_19_4(id);
        execute3_19_5(id);
    });
}

export default execute3_19;