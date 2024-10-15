class Example3 {
    $canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    $audio: HTMLAudioElement;
    audioCtx: AudioContext;
    analyser: AnalyserNode;
    sourceNode: MediaElementAudioSourceNode;
    bufferLength: number;
    dataArray: Uint8Array;

    constructor() {
        this.$canvas = document.getElementById('audio_canvas') as HTMLCanvasElement;
        this.ctx = this.$canvas.getContext('2d')!;
        this.$audio = new Audio();
    }

    ready() {
        const $audio_box = document.getElementById('audio_box')!;
        this.$audio.src = "/nutcracker.mp3";
        this.$audio.controls = true;
        this.$audio.loop = false;
        this.$audio.autoplay = false;
        $audio_box.appendChild(this.$audio);

        return this;
    }

    execute() {
        this.setupAudioNodes();
    }

    setupAudioNodes() {
        this.audioCtx = new AudioContext();
        this.analyser = this.audioCtx.createAnalyser();
        this.sourceNode = this.audioCtx.createMediaElementSource(this.$audio);
        this.sourceNode.connect(this.analyser);
        this.analyser.connect(this.audioCtx.destination);
        this.bufferLength = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(this.bufferLength);

        this.updateVisualization();
    }

    updateVisualization() {
        requestAnimationFrame(this.updateVisualization.bind(this));
        this.analyser.getByteFrequencyData(this.dataArray);
        this.drawBars();
    }

    drawBars() {
        this.ctx.clearRect(0, 0, this.$canvas.width, this.$canvas.height);

        const gradient = this.ctx.createLinearGradient(0, 0, 0, 100);
        gradient.addColorStop(0, '#ffffff');
        gradient.addColorStop(0.25, '#ffff00');
        gradient.addColorStop(0.75, '#ff0000');
        gradient.addColorStop(1, '#000000');

        const barWidth = (this.$canvas.width / this.bufferLength) * 2.5;
        const barAmount = this.dataArray.length;
        let x = 0;
        const space = 2;
        for (let i = 0; i < barAmount; i++) {
            const barHeight = this.dataArray[i] / 2;
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(x, this.$canvas.height - barHeight / 2, barWidth, barHeight);
            x += barWidth + space;

            if(i % 15 === 0) {
                this.ctx.font = '10px, sans-serif';
                this.ctx.textBaseline = 'bottom';
                this.ctx.fillText(`${Math.floor(this.audioCtx.sampleRate / this.analyser.fftSize * i)}`, i * space + 5, 15);
            }
        }
    }
}

export default new Example3();