import { useEffect, useRef, useState } from "react";
import "./App.css";
import styled from "styled-components";
import blackboardImg from "./assets/blackboard.png";
import eraserImg from "./assets/eraser.png";

const Container = styled.div`
  width: 1200px;
  height: 800px;

  & canvas {
    width: 100%;
    height: 100%;
    /* cursor: url("./assets/eraser.png"), 2 2 auto; */
    cursor: url(${eraserImg}), 10 10 auto;
  }
`;

const ParticleInteraction = () => {
  const [keyword, setKeyword] = useState("TGC"); // 최초 키워드만 설정
  const [inputValue, setInputValue] = useState("");
  const canvasRef = useRef(null);
  const bgCanvasRef = useRef(null);

  const DENSITY = 3;
  const ITERATION = 40;
  let parts = [];
  let mouse = { x: -100, y: -100 };
  let mouseOnScreen = false;
  let itercount = 0;
  let animationInterval = null;
  let initialCoords = [];
  let isParticleAllMoved = false;
  const bgImage = new Image();
  bgImage.src = blackboardImg;

  useEffect(() => {
    const canvas = canvasRef.current;
    const bgCanvas = document.createElement("canvas");
    bgCanvasRef.current = bgCanvas;

    const context = canvas.getContext("2d");
    const bgContext = bgCanvas.getContext("2d");

    const CANVAS_WIDTH = 1200;
    const CANVAS_HEIGHT = 800;

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    bgCanvas.width = CANVAS_WIDTH;
    bgCanvas.height = CANVAS_HEIGHT;

    const handleMouseMove = (e) => {
      if (e.layerX || e.layerX === 0) {
        mouseOnScreen = true;
        mouse.x = e.layerX - canvas.offsetLeft;
        mouse.y = e.layerY - canvas.offsetTop;
      }
    };

    const handleMouseOut = () => {
      mouseOnScreen = false;
      mouse.x = -100;
      mouse.y = -100;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseout", handleMouseOut);

    const clearCanvas = () => {
      if (bgImage.complete && bgImage.naturalWidth !== 0) {
        context.drawImage(bgImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      } else {
        bgImage.onload = () => {
          context.drawImage(bgImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        };
        bgImage.onerror = () => {
          console.error("이미지 로드 실패");
        };
      }
    };

    const drawCircle = (x, y) => {
      const startx = Math.random() * canvas.width;
      const starty = Math.random() * canvas.height;

      const velx = (x - startx) / ITERATION;
      const vely = (y - starty) / ITERATION;

      const particle = {
        c: `#fff`,
        x,
        y,
        x2: startx,
        y2: starty,
        r: true,
        v: { x: velx, y: vely },
      };

      parts.push(particle);
      initialCoords.push({ x, y });
    };

    const getCoords = () => {
      parts = [];
      initialCoords = [];
      const imageData = bgContext.getImageData(
        0,
        0,
        bgCanvas.width,
        bgCanvas.height
      );

      for (let height = 0; height < bgCanvas.height; height += DENSITY) {
        for (let width = 0; width < bgCanvas.width; width += DENSITY) {
          const pixel =
            imageData.data[(width + height * bgCanvas.width) * 4 - 1];
          if (pixel === 255) {
            drawCircle(width, height);
          }
        }
      }

      if (animationInterval) {
        clearInterval(animationInterval);
      }
      animationInterval = setInterval(update, 40);
    };

    const update = () => {
      itercount++;
      clearCanvas();

      let allMoved = true; // 모든 파티클이 이동했는지 체크!

      for (let i = 0; i < parts.length; i++) {
        if (parts[i].r) {
          parts[i].x2 += parts[i].v.x;
          parts[i].y2 += parts[i].v.y;
        }

        if (itercount === ITERATION) {
          parts[i].v = {
            x: Math.random() * 6 * 2 - 6,
            y: Math.random() * 6 * 2 - 6,
          };
          parts[i].r = false;
        }

        const dx = parts[i].x - mouse.x;
        const dy = parts[i].y - mouse.y;
        const sqrDist = Math.sqrt(dx * dx + dy * dy);

        if (sqrDist < 20) {
          parts[i].r = true;
        }

        context.fillStyle = parts[i].c;
        context.beginPath();
        context.arc(parts[i].x2, parts[i].y2, 1, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();

        // 최초 좌표에서 벗어났는지 확인
        if (
          parts[i].x2.toFixed(2) === initialCoords[i].x.toFixed(2) &&
          parts[i].y2.toFixed(2) === initialCoords[i].y.toFixed(2)
        ) {
          allMoved = false;
        }
      }

      if (allMoved && !isParticleAllMoved) {
        console.log("깨끗하게 지웠으니 좋은 일 생길 거예요.");
      }
    };

    const drawKeyword = () => {
      bgContext.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
      bgContext.font = "180px pretendard";
      bgContext.fillStyle = "#fff";

      const keywordWidth = bgContext.measureText(keyword).width;
      const offsetX = (CANVAS_WIDTH - keywordWidth) / 2;
      const offsetY = CANVAS_HEIGHT / 2 + 50;

      bgContext.fillText(keyword, offsetX, offsetY);
    };

    drawKeyword();
    getCoords();

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseout", handleMouseOut);
      if (animationInterval) {
        clearInterval(animationInterval);
      }
    };
  }, [keyword]); // keyword가 변경될 때마다 효과 실행

  const handleSubmit = (e) => {
    e.preventDefault();
    setKeyword(inputValue); // 입력받은 값으로 키워드 변경
  };

  return (
    <Container>
      <canvas ref={canvasRef} id="canvas"></canvas>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="하고 싶은 말 적어보기"
          style={{
            outline: "none",
            border: "1px solid #eee",
            padding: "10px",
            fontSize: "16px",
          }}
        />
        <button
          type="submit"
          style={{
            outline: "none",
            border: "1px solid #eee",
            background: "transparent",
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          제출
        </button>
      </form>
    </Container>
  );
};

export default ParticleInteraction;
