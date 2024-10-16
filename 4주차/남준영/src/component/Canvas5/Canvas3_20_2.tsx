// src/components/Canvas3.tsx
import React, { useEffect, useRef, useState } from "react";
import CanvasComponent from "../CanvasComponent";
import Sample from "./sound/sample.mp3";

const drawBars = (
  ctx: CanvasRenderingContext2D,
  arrData: Uint8Array,
  bufferLength: number
) => {
  const canvasHeight = ctx.canvas.height;
  const canvasWidth = ctx.canvas.width;

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  const barWidth = (canvasWidth / bufferLength) * 2.5;
  let x = 0;
  const space = 2;

  for (let i = 0; i < bufferLength; i++) {
    const barHeight = arrData[i] / 2;
    ctx.fillStyle = `rgb(${barHeight + 100}, 50, 50)`;
    ctx.fillRect(x, canvasHeight - barHeight / 2, barWidth, barHeight);
    x += barWidth + space;
  }
};

const Canvas3_20_2: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const bufferLengthRef = useRef<number>(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null); // canvas 참조
  const audioContextRef = useRef<AudioContext | null>(null); // AudioContext 참조
  const [isStarted, setIsStarted] = useState(false); // AudioContext 시작 여부 상태

  const drawCanvas = () => {
    if (canvasRef.current && analyserRef.current && dataArrayRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) return;
      analyserRef.current.getByteFrequencyData(dataArrayRef.current);
      drawBars(ctx, dataArrayRef.current, bufferLengthRef.current);
      requestAnimationFrame(drawCanvas);
    }
  };

  //  브라우저에서는 사용자 상호작용이 발생하기 전까지 AudioContext를 자동으로 시작하지 못하도록 제한하는 경우
  const startAudioContext = () => {
    if (!audioContextRef.current && audioRef.current) {
      const audioContext = new AudioContext();
      audioContextRef.current = audioContext; // AudioContext 설정

      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256; // fft 크기를 설정
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

      audioRef.current.play(); // 오디오 재생
      drawCanvas(); // 애니메이션 시작

      setIsStarted(true); // AudioContext 시작됨을 상태로 설정
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

export default Canvas3_20_2;
