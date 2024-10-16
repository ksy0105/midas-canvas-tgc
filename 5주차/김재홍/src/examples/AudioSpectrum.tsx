import { useEffect, useRef } from "react";
// import ReactAudioPlayer from "react-audio-player";

const AudioSpectrum = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const audio = audioRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !audio) return;

    const ctxH = canvas.height;
    const ctxW = canvas.width;

    let context: AudioContext;
    let analyser: AnalyserNode;
    let sourceNode: MediaElementAudioSourceNode;
    let bufferLength: number;
    let arrData: Uint8Array;

    const setupAudioNodes = () => {
      // 음원 분석
      context = new AudioContext();
      analyser = context.createAnalyser();
      sourceNode = context.createMediaElementSource(audio);
      sourceNode.connect(analyser);
      analyser.connect(context.destination);
      bufferLength = analyser.frequencyBinCount;
      arrData = new Uint8Array(bufferLength);
      updateVisualization();
    };

    const updateVisualization = () => {
      requestAnimationFrame(updateVisualization);
      analyser.getByteFrequencyData(arrData);
      drawBars(arrData);
    };

    const drawBars = (arrData: Uint8Array) => {
      ctx.clearRect(0, 0, ctxW, ctxH);

      const grad = ctx.createLinearGradient(0, 0, 0, 300);
      grad.addColorStop(0, "white");
      grad.addColorStop(0.25, "yellow");
      grad.addColorStop(0.75, "red");
      grad.addColorStop(1, "black");

      const barWidth = (ctxW / bufferLength) * 2.5;
      const bars = arrData.length;
      let x = 0;
      const space = 2;

      for (let i = 0; i < bars; i++) {
        let barHeight = arrData[i] / 2;
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
    // setupAudioNodes();
    audio.addEventListener("play", () => {
      setupAudioNodes();
    });

    return () => {
      audio.removeEventListener("play", setupAudioNodes);
      if (context) {
        context.close();
      }
    };
  }, []);

  return (
    <>
      <h2>3_20. 오디오 스펙트럼 만들기</h2>
      <div
        style={{
          width: "400px",
          background: "#000",
        }}
      >
        <canvas ref={canvasRef} width={400} height={200}></canvas>
        <div id="audio_box">
          <audio
            ref={audioRef}
            src="sounds/nutcracker.mp3"
            controls
            style={{ width: "400px", background: "#002d3c" }}
          />
        </div>
      </div>
    </>
  );
};

export default AudioSpectrum;
