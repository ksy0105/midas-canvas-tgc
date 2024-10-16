import { useEffect, useRef } from "react";

//3.20 오디오 스펙트럼 만들기
//그래프바를 그라데이션으로 바꾸고, 샘플링 수치 표시하기
const GradientAudioSpectrumBar = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLDivElement | null>(null);
  const audio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    canvas.width = 400;
    canvas.height = 100;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    // const audio = new Audio();
    // audio.src = "src/sounds/nutcracker.mp3";
    audio.current = new Audio("src/sounds/nutcracker.mp3");
    audio.current.controls = true;
    audio.current.loop = false;
    audio.current.autoplay = false;

    const currentAudioRef = audioRef.current;
    if (currentAudioRef) {
      currentAudioRef.appendChild(audio.current);
    }

    const ctxH = canvas.height;
    const ctxW = canvas.width;
    let context: AudioContext;
    let analyser: AnalyserNode;
    let sourceNode: MediaElementAudioSourceNode;
    let bufferLength: number;
    let arrData: Uint8Array;

    //음원을 분석하여 노드 생성
    const setupAudioNodes = () => {
      context = new AudioContext();
      if (audio.current) {
        analyser = context.createAnalyser();
        sourceNode = context.createMediaElementSource(audio.current);
        sourceNode.connect(analyser);
        analyser.connect(context.destination);
        bufferLength = analyser.frequencyBinCount;
        arrData = new Uint8Array(bufferLength);
        updateVisualization();
      }
    };

    //현재의 주파수 데이터를 Uint8Array로 복사해 전달
    const updateVisualization = () => {
      requestAnimationFrame(updateVisualization);
      analyser.getByteFrequencyData(arrData);
      drawBars(arrData);
    };

    //음악 샘플링 바 그리기
    const drawBars = (arrData: Uint8Array) => {
      ctx.clearRect(0, 0, ctxW, ctxH);
      //그래프를 그라데이션
      const grad = ctx.createLinearGradient(0, 0, 0, 100);
      grad.addColorStop(0, "#ffffff"); //white
      grad.addColorStop(0.25, "#ffff00"); //yellow
      grad.addColorStop(0.75, "#ff0000"); //red
      grad.addColorStop(1, "#000000"); //black

      //그래프바 그리기
      const barWidth = (ctxW / bufferLength) * 2.5;
      const bars = arrData.length;
      let x = 0;
      const space = 2;
      for (let i = 0; i < bars; i++) {
        const barHeight = arrData[i] / 2;
        ctx.fillStyle = grad;
        ctx.fillRect(x, ctxH - barHeight / 2, barWidth, barHeight);
        x += barWidth + space;

        // sampleRate 표시
        if (i % 15 === 0) {
          ctx.font = "10px sans-serif";
          ctx.textBaseline = "bottom";
          ctx.fillText(
            Math.floor((context.sampleRate / analyser.fftSize) * i).toString(),
            i * space + 5,
            15
          );
        }
      }
    };

    //재생 버튼 클릭 이벤트 핸들러
    const handlePlay = () => {
      context.resume().then(() => {
        audio.current?.play();
      });
    };

    //클릭 이벤트 리스너 추가
    canvas.addEventListener("click", handlePlay);

    setupAudioNodes();

    return () => {
      if (currentAudioRef && audio.current) {
        currentAudioRef.removeChild(audio.current);
      }
      canvas.removeEventListener("click", handlePlay);
    };
  }, []);

  return (
    <>
      <div id="audio_player">
        <canvas ref={canvasRef}>CANVAS를 지원하지 않습니다.</canvas>
        <div id="audio_box" ref={audioRef}></div>
      </div>
    </>
  );
};

export default GradientAudioSpectrumBar;
