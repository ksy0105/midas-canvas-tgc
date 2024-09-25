// src/components/CanvasGallery.jsx
import { useState } from "react";
import Canvas3_1 from "./Canvas3/Canvas3_1";
import Canvas3_2 from "./Canvas3/Canvas3_2";
import Canvas3_3 from "./Canvas3/Canvas3_3";
import Canvas3_4 from "./Canvas3/Canvas3_4";
import Canvas3_9 from "./Canvas3/Canvas3_9";

const CanvasGallery = () => {
  const [currentCanvasIndex, setCurrentCanvasIndex] = useState(0);

  const canvasComponents = [
    <Canvas3_1 key={1} />,
    <Canvas3_2 key={2} />,
    <Canvas3_3 />,
    <Canvas3_4 />,
    <Canvas3_9 />,
  ];

  const nextCanvas = () => {
    setCurrentCanvasIndex((prevIndex) =>
      prevIndex === canvasComponents.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevCanvas = () => {
    setCurrentCanvasIndex((prevIndex) =>
      prevIndex === 0 ? canvasComponents.length - 1 : prevIndex - 1
    );
  };

  return (
    <div style={{ margin: "10px", background: "#D0D0D0" }}>
      {canvasComponents[currentCanvasIndex]}
      <div style={{ marginTop: "10px" }}>
        <button onClick={prevCanvas}>Previous</button>
        <button onClick={nextCanvas}>Next</button>
      </div>
    </div>
  );
};

export default CanvasGallery;
