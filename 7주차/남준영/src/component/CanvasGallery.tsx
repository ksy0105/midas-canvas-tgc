// src/components/CanvasGallery.jsx
import { useState } from "react";
import Canvas7 from "./Canvas7";

const CanvasGallery = () => {
  const [currentCanvasIndex, setCurrentCanvasIndex] = useState(0);

  const canvasComponents = [<Canvas7 />];

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
