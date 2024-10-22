// src/components/Canvas3.tsx
import React, { useRef, useState } from "react";
import CanvasComponent from "../CanvasComponent";
import Sample from "./sound/sample.mp3";

const drawBars = (
  ctx: CanvasRenderingContext2D,
  arrData: Uint8Array,
  bufferLength: number,
  context: AudioContext,
  analyser: AnalyserNode
) => {
  const canvasHeight = ctx.canvas.height;
  const canvasWidth = ctx.canvas.width;

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  const grad = ctx.createLinearGradient(0, 0, 0, canvasHeight);
  grad.addColorStop(0, "#ff0000"); // red
  grad.addColorStop(0.25, "#ffff00"); // yellow
  grad.addColorStop(0.5, "#00ff00"); // green
  grad.addColorStop(0.75, "#00ffff"); // cyan
  grad.addColorStop(1, "#0000ff"); // blue

  const barWidth = (canvasWidth / bufferLength) * 2.5;
  let x = 0;
  const space = 2;

  for (let i = 0; i < bufferLength; i++) {
    const barHeight = arrData[i] / 2;
    ctx.fillStyle = grad;
    ctx.fillRect(x, canvasHeight - barHeight / 2, barWidth, barHeight);
    x += barWidth + space;

    // sampleRate 표시
    if (i % 5 === 0) {
      ctx.font = "12px sans-serif";
      ctx.textBaseline = "bottom";
      ctx.fillText(
        String(Math.floor((context.sampleRate / analyser.fftSize) * i)), // 숫자를 문자열로 변환
        x,
        canvasHeight - 5
      );
    }
  }
};

const Canvas3_20_3: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const bufferLengthRef = useRef<number>(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null); // AudioContext 참조
  const [isStarted, setIsStarted] = useState(false); // AudioContext 시작 여부 상태

  const drawCanvas = () => {
    if (canvasRef.current && analyserRef.current && dataArrayRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) return;
      analyserRef.current.getByteFrequencyData(dataArrayRef.current);
      drawBars(
        ctx,
        dataArrayRef.current,
        bufferLengthRef.current,
        audioContextRef.current!,
        analyserRef.current
      );
      requestAnimationFrame(drawCanvas);
    }
  };

  //  브라우저에서는 사용자 상호작용이 발생하기 전까지 AudioContext를 자동으로 시작하지 못하도록 제한하는 경우
  const startAudioContext = () => {
    if (!audioContextRef.current && audioRef.current) {
      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;

      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      const sourceNode = audioContext.createMediaElementSource(
        audioRef.current
      );
      sourceNode.connect(analyser);
      analyser.connect(audioContext.destination);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      dataArrayRef.current = dataArray;
      bufferLengthRef.current = bufferLength;

      audioRef.current.play();
      drawCanvas();

      setIsStarted(true);
    }
  };

  return (
    <div
      id="audio_player"
      style={{ width: "400px", height: "100px", background: "#000" }}
    >
      <CanvasComponent
        draw={() => {}}
        onCanvasReady={(canvas) => (canvasRef.current = canvas)}
      />
      <div id="audio_box" style={{ float: "left" }}>
        <audio ref={audioRef} src={Sample} controls />
      </div>
      {!isStarted && (
        <button onClick={startAudioContext} style={{ marginTop: "10px" }}>
          Start Audio
        </button>
      )}
    </div>
  );
};

export default Canvas3_20_3;
