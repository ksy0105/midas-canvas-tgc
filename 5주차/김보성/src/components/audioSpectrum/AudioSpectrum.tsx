import {useEffect, useRef, useState} from "react";

let context = new AudioContext();
let analyser = context.createAnalyser();
let sourceNode;
let bufferLength;
let arrData : Uint8Array = new Uint8Array(1024);

const AudioSpectrum = () => {
    const audioRef = useRef<HTMLAudioElement>(null);

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [canvasCtx, setCanvasCtx] = useState<CanvasRenderingContext2D>();

    const ctxW = 400;
    const ctxH = 100;

    let audio = new Audio();
    audio.src = "/nutcracker.mp3";
    audio.controls = true;
    audio.loop = false;
    audio.autoplay = false;

    const drawBars = (arr: Uint8Array) => {
        if(!canvasCtx || !arr) return;

        canvasCtx.clearRect(0, 0, ctxW, ctxH);

        // 그래프바를 그린다.
        let barWidth = (ctxW / arr.length) * 2.5;
        let barHeight = 0;
        let bars = arr.length;
        let x = 0;
        let space = 2;
        for (let i = 0; i < bars; i++) {
            barHeight  = arr[i] / 2;
            canvasCtx.fillStyle = 'rgb(' + (barHeight+100) + ',50,50)';
            canvasCtx.fillRect(x, ctxH - barHeight/2, barWidth, barHeight);
            x += barWidth + space;
        }
    }

    const updateVisualization = () => {
        requestAnimationFrame(updateVisualization);
        analyser.getByteFrequencyData(arrData);
        console.log(arrData);
        drawBars(arrData);
    }

    const setupAudioNodes = () => {
        sourceNode = context.createMediaElementSource(audio);
        sourceNode.connect(analyser);
        analyser.connect(context.destination);
        bufferLength = analyser.frequencyBinCount;
        arrData = new Uint8Array(bufferLength);

        updateVisualization();
    }

    useEffect(() => {
        if(canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if(!ctx) return;
            setCanvasCtx(ctx);
        }
    }, [canvasRef.current]);

    useEffect(() => {
        if(canvasCtx) {
            setupAudioNodes();
        }
    }, [canvasCtx]);

    return (
        <div style={{width: 400, height: 100, backgroundColor: '#000'}}>
            <canvas width={ctxW} height={ctxH} style={{border: '1px solid black'}} ref={canvasRef}/>
            <audio preload={'auto'} controls style={{width: 400}} ref={audioRef} src="/nutcracker.mp3"/>
        </div>
    );
}

export default AudioSpectrum

