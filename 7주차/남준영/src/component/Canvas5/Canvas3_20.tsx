// src/components/Canvas3.tsx
import React, { useEffect, useRef } from "react";
import CanvasComponent from "../CanvasComponent";
import Sample from "./sound/sample.mp3";
const drawCanvas1 = (ctx: CanvasRenderingContext2D) => {};

const Canvas3_20: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.controls = true;
      audioRef.current.loop = false;
      audioRef.current.autoplay = false;
    }
  }, []);

  return (
    <div
      id="audio_player"
      style={{ width: "400px", height: "100px", background: "#000" }}
    >
      <CanvasComponent draw={drawCanvas1} />
      <div id="audio_box" style={{ float: "left" }}>
        <audio src={Sample} ref={audioRef} />
      </div>
    </div>
  );
};

export default Canvas3_20;
