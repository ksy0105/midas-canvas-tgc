// src/components/CanvasGallery.jsx
import { useState } from "react";
import Canvas3_10 from "./Canvas4/Canvas3_10";
import Canvas3_11 from "./Canvas4/Canvas3_11";
import Canvas3_12 from "./Canvas4/Canvas3_12";

const CanvasGallery = () => {
  const [currentCanvasIndex, setCurrentCanvasIndex] = useState(0);

  const canvasComponents = [
    <Canvas3_10 key={1} />,
    <Canvas3_11 />,
    <Canvas3_12 />,
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
