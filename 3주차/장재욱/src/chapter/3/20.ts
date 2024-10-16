import {initCanvasWithAudioContext, makeCanvasContainer} from "../../utils.ts";

// 오디오 태그에서 재생되는지 확인하기
const execute3_20_1 = (containerId: string) => {
    const {audioPlayerId} = initCanvasWithAudioContext(containerId, 1);

    const audio = new Audio();
    audio.src = "nutcracker.mp3";
    audio.controls = true;
    audio.loop = false;
    audio.autoplay = false;

    const audioBox = document.querySelector<HTMLDivElement>(`#${audioPlayerId} .audio_box`)!;
    audioBox.appendChild(audio);
}

// 음원 분석하여 오디오바 만들기
const execute3_20_2 = (containerId: string) => {
    const {ctx, audioPlayerId} = initCanvasWithAudioContext(containerId, 2);

    const audio = new Audio();
    audio.src = "nutcracker.mp3";
    audio.controls = true;
    audio.loop = false;
    audio.autoplay = false;

    const audioBox = document.querySelector<HTMLDivElement>(`#${audioPlayerId} .audio_box`)!;
    audioBox.appendChild(audio);

    const ctxW = ctx.canvas.width;
    const ctxH = ctx.canvas.height;
    let context: AudioContext | null;
    let analyser: AnalyserNode | null;
    let sourceNode: MediaElementAudioSourceNode | null;
    let bufferLength: number | null;
    let arrData: Uint8Array | null;

    function setupAudioNodes() {
        context = new AudioContext();
        analyser = context.createAnalyser();
        sourceNode = context.createMediaElementSource(audio);
        sourceNode.connect(analyser);
        analyser.connect(context.destination);
        bufferLength = analyser.frequencyBinCount;
        arrData = new Uint8Array(bufferLength);
        updateVisualization();
    }

    function updateVisualization() {
        requestAnimationFrame(updateVisualization);
        if (analyser && arrData) {
            analyser.getByteTimeDomainData(arrData);
            drawBars(arrData);
        }
    }

    function drawBars(arrData: Uint8Array) {
        ctx.clearRect(0, 0, ctxW, ctxH);

        // 그래프 그림
        let barWidth = (ctxW / (bufferLength ?? 0)) * 2.5;
        let bars = arrData.length;
        let x = 0;
        let space = 2;

        for (let i = 0; i < bars; i ++) {
            const barHeight = arrData[i] / 2;
            ctx.fillStyle = `rgb(${barHeight + 100}, 50, 50)`;
            ctx.fillRect(x, ctxH - barHeight/2, barWidth, barHeight);
            x += barWidth + space;
        }
    }

    setupAudioNodes();
}

// 그래프 바를 그라데이션으로 바꾸고, 샘플링 수치 표시하기
const execute3_20_3 = (containerId: string) => {
    const {ctx, audioPlayerId} = initCanvasWithAudioContext(containerId, 3);

    const audio = new Audio();
    audio.src = "nutcracker.mp3";
    audio.controls = true;
    audio.loop = false;
    audio.autoplay = false;

    const audioBox = document.querySelector<HTMLDivElement>(`#${audioPlayerId} .audio_box`)!;
    audioBox.appendChild(audio);

    const ctxW = ctx.canvas.width;
    const ctxH = ctx.canvas.height;
    let context: AudioContext | null;
    let analyser: AnalyserNode | null;
    let sourceNode: MediaElementAudioSourceNode | null;
    let bufferLength: number | null;
    let arrData: Uint8Array | null;

    function setupAudioNodes() {
        context = new AudioContext();
        analyser = context.createAnalyser();
        sourceNode = context.createMediaElementSource(audio);
        sourceNode.connect(analyser);
        analyser.connect(context.destination);
        bufferLength = analyser.frequencyBinCount;
        arrData = new Uint8Array(bufferLength);
        updateVisualization();
    }

    function updateVisualization() {
        requestAnimationFrame(updateVisualization);
        if (analyser && arrData) {
            analyser.getByteTimeDomainData(arrData);
            drawBars(arrData);
        }
    }

    function drawBars(arrData: Uint8Array) {
        ctx.clearRect(0, 0, ctxW, ctxH);

        const grad = ctx.createLinearGradient(0, 50, 0, 100);
        grad.addColorStop(0, "white");
        grad.addColorStop(0.25, "yellow");
        grad.addColorStop(0.75, "red");
        grad.addColorStop(1, "black");

        // 그래프 그림
        let barWidth = (ctxW / (bufferLength ?? 0)) * 2.5;
        let bars = arrData.length;
        let x = 0;
        let space = 2;

        for (let i = 0; i < bars; i ++) {
            const barHeight = arrData[i] / 2;
            ctx.fillStyle = grad;
            ctx.fillRect(x, ctxH - barHeight/2, barWidth, barHeight);
            x += barWidth + space;

            // 샘플링 수치 표시
            if (i % 15 === 0) {
                ctx.font = "10px sans-serif";
                ctx.textBaseline = "bottom";
                if (context && analyser) {
                    ctx.fillText(String(Math.floor(context.sampleRate / analyser.fftSize * i)), i * space + 5, 15);
                }
            }
        }
    }

    setupAudioNodes();
}

const execute3_20 = () => {
    const id = 'chapter3_20'

    makeCanvasContainer(id, '3.20. 오디오 스펙트럼 만들기', () => {
        execute3_20_1(id);
        execute3_20_2(id);
        execute3_20_3(id);
    });
}

export default execute3_20;