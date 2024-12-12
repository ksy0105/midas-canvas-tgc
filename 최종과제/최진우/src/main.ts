import './style.css'
import {imageData1, imageData2, imageData3} from './imageData.ts';

const canvas1 = document.querySelector<HTMLCanvasElement>('#canvas1')!;
const ctx1 = canvas1.getContext('2d')!;
const canvas2 = document.querySelector<HTMLCanvasElement>('#canvas2')!;
const ctx2 = canvas2.getContext('2d')!;

const img1 = new Image();
img1.src = imageData1;

const img2 = new Image();
img2.src = imageData2;

img1.addEventListener('load', () => {
    canvas1.width = 439;
    canvas1.height = 555;

    ctx1.drawImage(img1, 0, 0, canvas1.width, canvas1.height);
    const pixels = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);

    const particlesArray: Particle[] = [];
    const numberOfParticles = 3000;

    let mappedImage: number[][][] = [];
    for (let y = 0; y < canvas1.height; y++) {
        let row = [];
        for (let x = 0; x < canvas1.width; x++) {
            const red = pixels.data[(y * 4 * pixels.width) + (x * 4)];
            const green = pixels.data[(y * 4 * pixels.width) + (x * 4) + 1];
            const blue = pixels.data[(y * 4 * pixels.width) + (x * 4) + 2];
            const cell = [calculateRelativeBrightness(red, green, blue)];
            row.push(cell);
        }
        mappedImage.push(row);
    }

    function calculateRelativeBrightness(red: number, green: number, blue: number): number {
        return Math.sqrt(
            (red * red) * 0.299 +
            (green * green) * 0.587 +
            (blue * blue) * 0.114
        ) / 100;
    }

    const charArray = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    const fontSize = 10;

    class Particle {
        x: number;
        y: number;
        speed: number;
        velocity: number;
        size: number;
        position1: number;
        position2: number;
        value: string;

        constructor() {
            this.x = Math.random() * canvas1.width;
            this.y = 0;
            this.speed = 0;
            this.velocity = Math.random() * 0.5;
            this.size = Math.random() * 1.5 + 1;
            this.position1 = Math.floor(this.y);
            this.position2 = Math.floor(this.x);
            this.value = charArray[Math.floor(Math.random() * charArray.length)];
        }
        update() {
            this.position1 = Math.floor(this.y);
            this.position2 = Math.floor(this.x);
            this.speed = mappedImage[this.position1][this.position2][0];
            const movement = (2.5 - this.speed) + this.velocity

            this.y += movement;
            if (this.y >= canvas1.height) {
                this.y = 0;
                this.x = Math.random() * canvas1.width;
            }
        }
        draw() {
            ctx1.beginPath();
            ctx1.fillStyle = 'white';
            ctx1.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx1.fill();
        }
    }

    function init() {
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    init();

    function animate() {
        ctx1.globalAlpha = 0.05;
        ctx1.fillStyle = 'rgb(0, 0, 0)';
        ctx1.fillRect(0, 0, canvas1.width, canvas1.height);
        ctx1.globalAlpha = 0.2;

        for(let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            ctx1.globalAlpha = particlesArray[i].speed * 0.5;
            particlesArray[i].draw();
        }

        requestAnimationFrame(animate);
    }

    ctx1.drawImage(img1, 0, 0, canvas1.width, canvas1.height);
    setTimeout(() => {
        animate();
    }, 500)
});

img2.addEventListener('load', () => {
    canvas2.width = 700;
    canvas2.height = 520;
    // canvas2.width = 800;
    // canvas2.height = 374;

    ctx2.drawImage(img2, 0, 0, canvas2.width, canvas2.height);
    const pixels = ctx2.getImageData(0, 0, canvas2.width, canvas2.height);
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

    const particlesArray: Particle[] = [];
    const numberOfParticles = 1500;

    let mappedImage: number[][][] = [];
    for (let y = 0; y < canvas2.height; y++) {
        let row = [];
        for (let x = 0; x < canvas2.width; x++) {
            const red = pixels.data[(y * 4 * pixels.width) + (x * 4)];
            const green = pixels.data[(y * 4 * pixels.width) + (x * 4) + 1];
            const blue = pixels.data[(y * 4 * pixels.width) + (x * 4) + 2];
            const cell = [calculateRelativeBrightness(red, green, blue)];
            row.push(cell);
        }
        mappedImage.push(row);
    }

    function calculateRelativeBrightness(red: number, green: number, blue: number): number {
        return Math.sqrt(
            (red * red) * 0.299 +
            (green * green) * 0.587 +
            (blue * blue) * 0.114
        ) / 100;
    }

    const charArray = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    const fontSize = 10;

    class Particle {
        x: number;
        y: number;
        speed: number;
        velocity: number;
        size: number;
        position1: number;
        position2: number;
        value: string;

        constructor() {
            this.x = Math.random() * canvas2.width;
            this.y = 0;
            this.speed = 0;
            this.velocity = Math.random() * 0.5;
            this.size = Math.random() * 1.5 + 1;
            this.position1 = Math.floor(this.y);
            this.position2 = Math.floor(this.x);
            this.value = charArray[Math.floor(Math.random() * charArray.length)];
        }
        update() {
            this.position1 = Math.floor(this.y);
            this.position2 = Math.floor(this.x);
            this.speed = mappedImage[this.position1][this.position2][0];
            const movement = (2.5 - this.speed) + this.velocity

            this.y += movement;
            if (this.y >= canvas2.height) {
                this.y = 0;
                this.x = Math.random() * canvas2.width;
            }
        }
        draw() {
            ctx2.beginPath();
            ctx2.fillStyle = `rgba(102, 255, 102, ${this.speed * 0.5 + this.velocity})`;
            ctx2.font = fontSize + 'px Arial, sans-serif';
            ctx2.fillText(this.value, this.x, this.y);
            ctx2.fill();
        }
    }

    function init() {
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    init();

    function animate() {
        ctx2.globalAlpha = 0.05;
        ctx2.fillStyle = 'rgb(0, 0, 0)';
        ctx2.fillRect(0, 0, canvas2.width, canvas2.height);
        ctx2.globalAlpha = 0.2;

        for(let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            ctx2.globalAlpha = particlesArray[i].speed * 0.5;
            particlesArray[i].draw();
        }

        requestAnimationFrame(animate);
    }

    ctx2.drawImage(img2, 0, 0, canvas2.width, canvas2.height);
    setTimeout(() => {
        animate();
    }, 500)
});