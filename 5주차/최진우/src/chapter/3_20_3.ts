import {initAudioCanvas} from '../common.ts';

const draw3_20_3 = (subTitle: string, id: string, canvasId: string, audioId: string) => {
    const {canvas, ctx} = initAudioCanvas(subTitle, id, canvasId, audioId);

    const ctxW = canvas.width;
    const ctxH = canvas.height;

    const audio = new Audio();
    audio.src = 'src/sounds/nutcracker.mp3';
    audio.controls = true;
    audio.loop = false;
    audio.autoplay = false;

    document.querySelector(`#${audioId}`)!.appendChild(audio);

    let context: AudioContext;
    let analyser: AnalyserNode;
    let sourceNode: MediaElementAudioSourceNode;
    let bufferLength: number;
    let dataArray: Uint8Array;

    const setupAudioNodes = () => {
        context = new AudioContext();
        analyser = context.createAnalyser();
        sourceNode = context.createMediaElementSource(audio);
        sourceNode.connect(analyser);
        analyser.connect(context.destination);
        bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);
        updateVisualization();
    }

    const updateVisualization = () => {
        requestAnimationFrame(updateVisualization);
        analyser.getByteFrequencyData(dataArray);
        drawBars(dataArray);
    }

    const drawBars = (dataArray: Uint8Array) => {
        ctx.clearRect(0, 0, ctxW, ctxH);

        const grad = ctx.createLinearGradient(0, 0, 0, 100);
        grad.addColorStop(0, 'white');
        grad.addColorStop(0.25, 'yellow');
        grad.addColorStop(0.75, 'red');
        grad.addColorStop(1, 'black');

        const barWidth = (ctxW / bufferLength) * 2.5;
        const bars = dataArray.length;
        let x = 0;
        const space = 2;

        for (let i = 0; i < bars; i++) {
            const barHeight = dataArray[i] / 2;

            ctx.fillStyle = grad;
            ctx.fillRect(x, ctxH - barHeight / 2, barWidth, barHeight);
            x += barWidth + space;

            if (i % 15 === 0) {
                ctx.font = '10px sans-serif';
                ctx.textBaseline = 'bottom';
                ctx.fillText(String(Math.floor(context.sampleRate / analyser.fftSize * i)), i * space + 5, 15);
            }
        }
    }

    setupAudioNodes();
};

export default draw3_20_3;
