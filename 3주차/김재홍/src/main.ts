import "./style.css";

// 선 그리기
const canvas_03_1_1 =
  document.querySelector<HTMLCanvasElement>("#canvas_03_1_1")!;
const ctx_03_1_1 = canvas_03_1_1.getContext("2d")!;

ctx_03_1_1.beginPath();
ctx_03_1_1.moveTo(100, 50);
ctx_03_1_1.lineTo(300, 50);
ctx_03_1_1.stroke();

// 사각형 그리기
const canvas_03_1_2 =
  document.querySelector<HTMLCanvasElement>("#canvas_03_1_2")!;
const ctx_03_1_2 = canvas_03_1_2.getContext("2d")!;

ctx_03_1_2.beginPath();
ctx_03_1_2.moveTo(100, 50);
ctx_03_1_2.lineTo(300, 50);
ctx_03_1_2.lineTo(300, 200);
ctx_03_1_2.lineTo(100, 200);
ctx_03_1_2.lineTo(100, 50);
ctx_03_1_2.stroke();

// 내부에 색 채우기
const canvas_03_1_3 =
  document.querySelector<HTMLCanvasElement>("#canvas_03_1_3")!;
const ctx_03_1_3 = canvas_03_1_3.getContext("2d")!;

ctx_03_1_3.beginPath();
ctx_03_1_3.moveTo(100, 50);
ctx_03_1_3.lineTo(300, 50);
ctx_03_1_3.lineTo(300, 200);
ctx_03_1_3.lineTo(100, 200);
ctx_03_1_3.lineTo(100, 50);
ctx_03_1_3.stroke();
ctx_03_1_3.fill();

// 붉은 색으로 내부 채우기
const canvas_03_1_4 =
  document.querySelector<HTMLCanvasElement>("#canvas_03_1_4")!;
const ctx_03_1_4 = canvas_03_1_4.getContext("2d")!;

ctx_03_1_4.beginPath();
ctx_03_1_4.moveTo(100, 50);
ctx_03_1_4.lineTo(300, 50);
ctx_03_1_4.lineTo(300, 200);
ctx_03_1_4.lineTo(100, 200);
ctx_03_1_4.lineTo(100, 50);
ctx_03_1_4.stroke();
ctx_03_1_4.fillStyle = "red";
ctx_03_1_4.fill();

// 선의 색을 다른 색으로 채우고 두께 변경하기
const canvas_03_1_5 =
  document.querySelector<HTMLCanvasElement>("#canvas_03_1_5")!;
const ctx_03_1_5 = canvas_03_1_5.getContext("2d")!;

ctx_03_1_5.beginPath();
ctx_03_1_5.moveTo(100, 50);
ctx_03_1_5.lineTo(300, 50);
ctx_03_1_5.lineTo(300, 200);
ctx_03_1_5.lineTo(100, 200);
ctx_03_1_5.lineTo(100, 50);
ctx_03_1_5.lineWidth = 20;
ctx_03_1_5.strokeStyle = "#0000ff";
ctx_03_1_5.stroke();
ctx_03_1_5.fillStyle = "red";
ctx_03_1_5.fill();

// 끝부분 처리하기
const canvas_03_1_6 =
  document.querySelector<HTMLCanvasElement>("#canvas_03_1_6")!;
const ctx_03_1_6 = canvas_03_1_6.getContext("2d")!;

ctx_03_1_6.beginPath();
ctx_03_1_6.moveTo(100, 50);
ctx_03_1_6.lineTo(300, 50);
ctx_03_1_6.lineTo(300, 200);
ctx_03_1_6.lineTo(100, 200);
ctx_03_1_6.lineTo(100, 50);
ctx_03_1_6.lineWidth = 20;
ctx_03_1_6.strokeStyle = "#0000ff";
ctx_03_1_6.lineCap = "square";
ctx_03_1_6.stroke();
ctx_03_1_6.fillStyle = "red";
ctx_03_1_6.fill();

// 선의 세 가지 끝부분 처리 방법 알아보기
const canvas_03_1_7 =
  document.querySelector<HTMLCanvasElement>("#canvas_03_1_7")!;
const ctx_03_1_7 = canvas_03_1_7.getContext("2d")!;
ctx_03_1_7.lineWidth = 20;
ctx_03_1_7.strokeStyle = "#0000ff";

ctx_03_1_7.beginPath();
ctx_03_1_7.moveTo(100, 50);
ctx_03_1_7.lineTo(300, 50);
ctx_03_1_7.lineCap = "butt";
ctx_03_1_7.stroke();

ctx_03_1_7.beginPath();
ctx_03_1_7.moveTo(100, 100);
ctx_03_1_7.lineTo(300, 100);
ctx_03_1_7.lineCap = "round";
ctx_03_1_7.stroke();

ctx_03_1_7.beginPath();
ctx_03_1_7.moveTo(100, 150);
ctx_03_1_7.lineTo(300, 150);
ctx_03_1_7.lineCap = "square";
ctx_03_1_7.stroke();

// 선의 꺾인 부분 처리하기
const canvas_03_1_8 =
  document.querySelector<HTMLCanvasElement>("#canvas_03_1_8")!;
const ctx_03_1_8 = canvas_03_1_8.getContext("2d")!;
ctx_03_1_8.lineWidth = 20;
ctx_03_1_8.strokeStyle = "#0000ff";

ctx_03_1_8.beginPath();
ctx_03_1_8.moveTo(100, 50);
ctx_03_1_8.lineTo(300, 50);
ctx_03_1_8.lineTo(300, 100);
ctx_03_1_8.lineJoin = "miter";
ctx_03_1_8.stroke();

ctx_03_1_8.beginPath();
ctx_03_1_8.moveTo(100, 150);
ctx_03_1_8.lineTo(300, 150);
ctx_03_1_8.lineTo(300, 200);
ctx_03_1_8.lineJoin = "round";
ctx_03_1_8.stroke();

ctx_03_1_8.beginPath();
ctx_03_1_8.moveTo(100, 250);
ctx_03_1_8.lineTo(300, 250);
ctx_03_1_8.lineTo(300, 290);
ctx_03_1_8.lineJoin = "bevel";
ctx_03_1_8.stroke();

// 선의 간격을 조정하여 점선 만들기
const canvas_03_1_9 =
  document.querySelector<HTMLCanvasElement>("#canvas_03_1_9")!;
const ctx_03_1_9 = canvas_03_1_9.getContext("2d")!;
ctx_03_1_9.lineWidth = 20;
ctx_03_1_9.strokeStyle = "#0000ff";

ctx_03_1_9.beginPath();
ctx_03_1_9.moveTo(100, 50);
ctx_03_1_9.lineTo(300, 50);
ctx_03_1_9.lineTo(300, 100);
ctx_03_1_9.setLineDash([20]);
ctx_03_1_9.stroke();

ctx_03_1_9.beginPath();
ctx_03_1_9.moveTo(100, 150);
ctx_03_1_9.lineTo(300, 150);
ctx_03_1_9.lineTo(300, 200);
ctx_03_1_9.setLineDash([20, 10]);
ctx_03_1_9.stroke();

ctx_03_1_9.beginPath();
ctx_03_1_9.moveTo(100, 250);
ctx_03_1_9.lineTo(300, 250);
ctx_03_1_9.lineTo(300, 290);
ctx_03_1_9.setLineDash([20, 10, 50, 10]);
ctx_03_1_9.stroke();

// 사각형 그리기
const canvas_03_2_1 =
  document.querySelector<HTMLCanvasElement>("#canvas_03_2_1")!;
const ctx_03_2_1 = canvas_03_2_1.getContext("2d")!;

ctx_03_2_1.strokeRect(20, 20, 100, 100);
ctx_03_2_1.strokeRect(150, 150, 50, 50);

// 내부가 채워진 사각형 그리기
const canvas_03_2_2 =
  document.querySelector<HTMLCanvasElement>("#canvas_03_2_2")!;
const ctx_03_2_2 = canvas_03_2_2.getContext("2d")!;

ctx_03_2_2.fillStyle = "magenta";
ctx_03_2_2.fillRect(20, 20, 100, 100);
ctx_03_2_2.strokeRect(20, 20, 100, 100);
ctx_03_2_2.fillStyle = "green";
ctx_03_2_2.fillRect(150, 150, 50, 50);
ctx_03_2_2.strokeRect(150, 150, 50, 50);

// 내부를 사각형으로 지우기
const canvas_03_2_3 =
  document.querySelector<HTMLCanvasElement>("#canvas_03_2_3")!;
const ctx_03_2_3 = canvas_03_2_3.getContext("2d")!;

ctx_03_2_3.lineWidth = 10;
ctx_03_2_3.strokeStyle = "red";
ctx_03_2_3.fillStyle = "blue";
ctx_03_2_3.fillRect(50, 50, 200, 200);
ctx_03_2_3.strokeRect(50, 50, 200, 200);
ctx_03_2_3.clearRect(70, 70, 100, 50);

// 기본 원 그리기
const canvas_03_3_1 =
  document.querySelector<HTMLCanvasElement>("#canvas_03_3_1")!;
const ctx_03_3_1 = canvas_03_3_1.getContext("2d")!;

ctx_03_3_1.arc(150, 150, 100, 0, Math.PI * 2);
ctx_03_3_1.stroke();

// 선과 호를 연결하여 라운드 코너 그리기
const canvas_03_3_2 =
  document.querySelector<HTMLCanvasElement>("#canvas_03_3_2")!;
const ctx_03_3_2 = canvas_03_3_2.getContext("2d")!;

ctx_03_3_2.beginPath();
ctx_03_3_2.moveTo(50, 50);
ctx_03_3_2.lineTo(300, 50);
ctx_03_3_2.arcTo(350, 50, 350, 100, 50);
ctx_03_3_2.lineTo(350, 200);
ctx_03_3_2.stroke();

// quadraticCuerve 그리기
const canvas_03_3_3 =
  document.querySelector<HTMLCanvasElement>("#canvas_03_3_3")!;
const ctx_03_3_3 = canvas_03_3_3.getContext("2d")!;

ctx_03_3_3.beginPath();
ctx_03_3_3.moveTo(50, 50);
ctx_03_3_3.lineTo(300, 50);
ctx_03_3_3.quadraticCurveTo(200, 100, 350, 100);
ctx_03_3_3.lineTo(350, 200);
ctx_03_3_3.stroke();

// bezierCurve 그리기
const canvas_03_3_4 =
  document.querySelector<HTMLCanvasElement>("#canvas_03_3_4")!;
const ctx_03_3_4 = canvas_03_3_4.getContext("2d")!;

ctx_03_3_4.beginPath();
ctx_03_3_4.moveTo(50, 50);
ctx_03_3_4.lineTo(300, 50);
ctx_03_3_4.bezierCurveTo(200, 70, 100, 150, 350, 100);
ctx_03_3_4.lineTo(350, 200);
ctx_03_3_4.stroke();

// Gradient로 내부 채우기
const canvas_03_4_1 =
  document.querySelector<HTMLCanvasElement>("#canvas_03_4_1")!;
const ctx_03_4_1 = canvas_03_4_1.getContext("2d")!;
const grad_03_4_1 = ctx_03_4_1.createLinearGradient(50, 50, 250, 50);
grad_03_4_1.addColorStop(0, "red");
grad_03_4_1.addColorStop(1 / 6, "orange");
grad_03_4_1.addColorStop(2 / 6, "yellow");
grad_03_4_1.addColorStop(3 / 6, "green");
grad_03_4_1.addColorStop(4 / 6, "aqua");
grad_03_4_1.addColorStop(5 / 6, "blue");
grad_03_4_1.addColorStop(1, "purple");
ctx_03_4_1.lineWidth = 5;
ctx_03_4_1.fillStyle = grad_03_4_1;
ctx_03_4_1.fillRect(50, 50, 200, 200);
ctx_03_4_1.strokeRect(50, 50, 200, 200);

// radial gradient로 사각형 내부 채우기
const canvas_03_4_2 =
  document.querySelector<HTMLCanvasElement>("#canvas_03_4_2")!;
const ctx_03_4_2 = canvas_03_4_2.getContext("2d")!;
const grad_03_4_2 = ctx_03_4_2.createRadialGradient(0, 0, 0, 100, 100, 300);
grad_03_4_2.addColorStop(0, "red");
grad_03_4_2.addColorStop(0.5, "yellow");
grad_03_4_2.addColorStop(1, "black");
ctx_03_4_2.lineWidth = 5;
ctx_03_4_2.fillStyle = grad_03_4_2;
ctx_03_4_2.fillRect(0, 0, 300, 300);
ctx_03_4_2.strokeRect(0, 0, 300, 300);

// 패턴으로 사각형 내부 채우기
const canvas_03_4_3 =
  document.querySelector<HTMLCanvasElement>("#canvas_03_4_3")!;
const ctx_03_4_3 = canvas_03_4_3.getContext("2d")!;

const batman = new Image();
batman.src = "src/images/batman.png";
batman.onload = () => {
  const pattern = ctx_03_4_3.createPattern(batman, "repeat");
  // @ts-ignore
  ctx_03_4_3.fillStyle = pattern;
  ctx_03_4_3.fillRect(0, 0, canvas_03_4_3.width, canvas_03_4_3.height);
};

// 이미지를 원래 크기대로 그리기
const canvas_03_5_1 =
  document.querySelector<HTMLCanvasElement>("#canvas_03_5_1")!;
const ctx_03_5_1 = canvas_03_5_1.getContext("2d")!;

const myPic_03_5_1 = new Image();
myPic_03_5_1.src = "src/images/superman.png";
myPic_03_5_1.onload = () => {
  ctx_03_5_1.drawImage(myPic_03_5_1, 10, 10);
};

// 이미지의 크기를 변형하여 그리기
const canvas_03_5_2 =
  document.querySelector<HTMLCanvasElement>("#canvas_03_5_2")!;
const ctx_03_5_2 = canvas_03_5_2.getContext("2d")!;

const myPic_03_5_2 = new Image();
myPic_03_5_2.src = "src/images/superman.png";
myPic_03_5_2.onload = () => {
  ctx_03_5_2.drawImage(myPic_03_5_2, 10, 10, 150, 100);
};

// 이미지의 크기를 변형하여 그리기
const canvas_03_5_3 =
  document.querySelector<HTMLCanvasElement>("#canvas_03_5_3")!;
const ctx_03_5_3 = canvas_03_5_3.getContext("2d")!;

const myPic_03_5_3 = new Image();
myPic_03_5_3.src = "src/images/superman.png";
myPic_03_5_3.onload = () => {
  ctx_03_5_3.drawImage(myPic_03_5_3, 20, 20, 200, 200, 10, 10, 300, 200);
};

// 글씨 그리기
const canvas_03_6_1 =
  document.querySelector<HTMLCanvasElement>("#canvas_03_6_1")!;
const ctx_03_6_1 = canvas_03_6_1.getContext("2d")!;

ctx_03_6_1.fillText(
  "The fillText() method draws filled text on the canvas.",
  50,
  100
);
ctx_03_6_1.fillText(
  "The fillText() method draws filled text on the canvas.",
  50,
  120,
  100
);
ctx_03_6_1.fillText(
  "The fillText() method draws filled text on the canvas.",
  50,
  140,
  200
);
ctx_03_6_1.fillText(
  "The fillText() method draws filled text on the canvas.",
  50,
  160,
  300
);

// 글씨 크기를 크게 변경하기
const canvas_03_6_2 =
  document.querySelector<HTMLCanvasElement>("#canvas_03_6_2")!;
const ctx_03_6_2 = canvas_03_6_2.getContext("2d")!;

ctx_03_6_2.fillStyle = "#6495ED";
ctx_03_6_2.font = "italic bold 28px Arial, sans-serif";
ctx_03_6_2.fillText("Hello Canvas World!", 50, 100);

// 글씨의 외곽선 그리기
const canvas_03_6_3 =
  document.querySelector<HTMLCanvasElement>("#canvas_03_6_3")!;
const ctx_03_6_3 = canvas_03_6_3.getContext("2d")!;

ctx_03_6_3.fillStyle = "#6495ED";
ctx_03_6_3.font = "italic bold 28px Arial, sans-serif";
ctx_03_6_3.fillText("Hello Canvas World!", 10, 100);
ctx_03_6_3.lineWidth = 2;
ctx_03_6_3.strokeText("Hello Canvas World!", 10, 100);

// 글씨의 좌우정렬 알아보기
const canvas_03_6_4 =
  document.querySelector<HTMLCanvasElement>("#canvas_03_6_4")!;
const ctx_03_6_4 = canvas_03_6_4.getContext("2d")!;

ctx_03_6_4.fillStyle = "#6495ED";
ctx_03_6_4.font = "italic bold 30px Arial, sans-serif";
ctx_03_6_4.textAlign = "start";
ctx_03_6_4.fillText("Hello World!", 200, 50);

ctx_03_6_4.textAlign = "end";
ctx_03_6_4.fillText("Hello World!", 200, 100);

ctx_03_6_4.textAlign = "left";
ctx_03_6_4.fillText("Hello World!", 200, 150);

ctx_03_6_4.textAlign = "right";
ctx_03_6_4.fillText("Hello World!", 200, 200);

ctx_03_6_4.textAlign = "center";
ctx_03_6_4.fillText("Hello World!", 200, 250);

ctx_03_6_4.strokeStyle = "red";
ctx_03_6_4.moveTo(200, 20);
ctx_03_6_4.lineTo(200, 370);
ctx_03_6_4.stroke();

// 글씨의 상하정렬 알아보기
const canvas_03_6_5 =
  document.querySelector<HTMLCanvasElement>("#canvas_03_6_5")!;
const ctx_03_6_5 = canvas_03_6_5.getContext("2d")!;

ctx_03_6_5.fillStyle = "#6495ED";
ctx_03_6_5.font = "italic bold 30px Arial, sans-serif";
ctx_03_6_5.textBaseline = "top";
ctx_03_6_5.fillText("top!", 10, 150);

ctx_03_6_5.textBaseline = "bottom";
ctx_03_6_5.fillText("bottom!", 50, 150);

ctx_03_6_5.textBaseline = "middle";
ctx_03_6_5.fillText("middle!", 130, 150);

ctx_03_6_5.textBaseline = "alphabetic";
ctx_03_6_5.fillText("alphabetic!", 220, 150);

ctx_03_6_5.textBaseline = "hanging";
ctx_03_6_5.fillText("hanging!", 300, 150);

ctx_03_6_5.strokeStyle = "red";
ctx_03_6_5.moveTo(0, 150);
ctx_03_6_5.lineTo(400, 150);
ctx_03_6_5.stroke();

// 사각형의 그림자 그려보기
const canvas_03_7_1 =
  document.querySelector<HTMLCanvasElement>("#canvas_03_7_1")!;
const ctx_03_7_1 = canvas_03_7_1.getContext("2d")!;

ctx_03_7_1.shadowColor = "rgba(0, 0, 0, 0.3)";
ctx_03_7_1.shadowOffsetX = 5;
ctx_03_7_1.shadowOffsetY = 5;
ctx_03_7_1.shadowBlur = 3;
ctx_03_7_1.fillStyle = "red";
ctx_03_7_1.fillRect(50, 50, 100, 100);

// 위치 이동시키기
const canvas_03_8_1 =
  document.querySelector<HTMLCanvasElement>("#canvas_03_8_1")!;
const ctx_03_8_1 = canvas_03_8_1.getContext("2d")!;

ctx_03_8_1.fillStyle = "green";
ctx_03_8_1.fillRect(50, 50, 100, 100);
ctx_03_8_1.translate(100, 100);
ctx_03_8_1.fillRect(50, 50, 100, 100);

// 크기 변경하기
const canvas_03_8_2 =
  document.querySelector<HTMLCanvasElement>("#canvas_03_8_2")!;
const ctx_03_8_2 = canvas_03_8_2.getContext("2d")!;

ctx_03_8_2.fillStyle = "green";
ctx_03_8_2.fillRect(50, 50, 100, 100);
ctx_03_8_2.scale(0.5, 0.5);
ctx_03_8_2.fillStyle = "red";
ctx_03_8_2.fillRect(50, 50, 100, 100);

// 회전시키기
const canvas_03_8_3 =
  document.querySelector<HTMLCanvasElement>("#canvas_03_8_3")!;
const ctx_03_8_3 = canvas_03_8_3.getContext("2d")!;

ctx_03_8_3.fillStyle = "yellow";
ctx_03_8_3.strokeStyle = "blue";
ctx_03_8_3.lineWidth = 3;
ctx_03_8_3.strokeRect(100, 100, 100, 100);
ctx_03_8_3.fillRect(100, 100, 100, 100);
ctx_03_8_3.rotate((5 * Math.PI) / 180);
ctx_03_8_3.strokeRect(100, 100, 100, 100);
ctx_03_8_3.fillRect(100, 100, 100, 100);
ctx_03_8_3.rotate((5 * Math.PI) / 180);
ctx_03_8_3.strokeRect(100, 100, 100, 100);
ctx_03_8_3.fillRect(100, 100, 100, 100);

// 사각형 형태 변형하기 I
const canvas_03_8_4 =
  document.querySelector<HTMLCanvasElement>("#canvas_03_8_4")!;
const ctx_03_8_4 = canvas_03_8_4.getContext("2d")!;

ctx_03_8_4.fillStyle = "yellow";
ctx_03_8_4.strokeStyle = "blue";
ctx_03_8_4.lineWidth = 3;
ctx_03_8_4.strokeRect(0, 0, 100, 100);
ctx_03_8_4.fillRect(0, 0, 100, 100);
ctx_03_8_4.transform(1.5, 0, 0, 1.5, 100, 100);
ctx_03_8_4.strokeRect(0, 0, 100, 100);
ctx_03_8_4.fillRect(0, 0, 100, 100);

// 사각형 형태 변형하기 II
const canvas_03_8_5 =
  document.querySelector<HTMLCanvasElement>("#canvas_03_8_5")!;
const ctx_03_8_5 = canvas_03_8_5.getContext("2d")!;

ctx_03_8_5.fillStyle = "yellow";
ctx_03_8_5.strokeStyle = "blue";
ctx_03_8_5.lineWidth = 3;
ctx_03_8_5.strokeRect(0, 0, 100, 100);
ctx_03_8_5.fillRect(0, 0, 100, 100);
ctx_03_8_5.transform(1, 0.2, 0.2, 1, 100, 100);
ctx_03_8_5.strokeRect(0, 0, 100, 100);
ctx_03_8_5.fillRect(0, 0, 100, 100);

// 사각형 형태 변형하기 III
const canvas_03_8_6 =
  document.querySelector<HTMLCanvasElement>("#canvas_03_8_6")!;
const ctx_03_8_6 = canvas_03_8_6.getContext("2d")!;

ctx_03_8_6.fillStyle = "yellow";
ctx_03_8_6.strokeStyle = "blue";
ctx_03_8_6.lineWidth = 3;
ctx_03_8_6.strokeRect(0, 0, 100, 100);
ctx_03_8_6.fillRect(0, 0, 100, 100);
ctx_03_8_6.transform(1, 0.2, 0.2, 1, 100, 100);
ctx_03_8_6.fillStyle = "green";
ctx_03_8_6.fillRect(0, 0, 100, 100);
ctx_03_8_6.setTransform(1, 0, 0, 1, 100, 100);
ctx_03_8_6.fillStyle = "red";
ctx_03_8_6.fillRect(0, 0, 100, 100);

// 사각형 형태 변형하기 IIII
const canvas_03_8_7 =
  document.querySelector<HTMLCanvasElement>("#canvas_03_8_7")!;
const ctx_03_8_7 = canvas_03_8_7.getContext("2d")!;

ctx_03_8_7.fillStyle = "yellow";
ctx_03_8_7.strokeStyle = "blue";
ctx_03_8_7.lineWidth = 3;
ctx_03_8_7.strokeRect(0, 0, 100, 100);
ctx_03_8_7.fillRect(0, 0, 100, 100);
ctx_03_8_7.setTransform(1, 0.2, 0.2, 1, 100, 100);
ctx_03_8_7.fillStyle = "green";
ctx_03_8_7.fillRect(0, 0, 100, 100);
ctx_03_8_7.transform(1, 0, 0, 1, 100, 100);
ctx_03_8_7.fillStyle = "red";
ctx_03_8_7.fillRect(0, 0, 100, 100);

// 색상 보정하기
const canvas_03_9_1 =
  document.querySelector<HTMLCanvasElement>("#canvas_03_9_1")!;
const ctx_03_9_1 = canvas_03_9_1.getContext("2d")!;

ctx_03_9_1.fillStyle = "red";
ctx_03_9_1.fillRect(20, 30, 100, 100);
ctx_03_9_1.fillStyle = "green";
ctx_03_9_1.fillRect(50, 50, 100, 100);

const src_03_9_1 = ctx_03_9_1.getImageData(0, 0, 100, 100);
ctx_03_9_1.putImageData(src_03_9_1, 200, 50);
ctx_03_9_1.strokeRect(0, 0, 100, 100);
ctx_03_9_1.strokeRect(200, 50, 100, 100);

// 지정한 부분의 색상을 흑백으로 바꾸어 출력하기
const canvas_03_9_2 =
  document.querySelector<HTMLCanvasElement>("#canvas_03_9_2")!;
const ctx_03_9_2 = canvas_03_9_2.getContext("2d")!;

ctx_03_9_2.fillStyle = "red";
ctx_03_9_2.fillRect(20, 30, 100, 100);
ctx_03_9_2.fillStyle = "green";
ctx_03_9_2.fillRect(50, 50, 100, 100);

const src_03_9_2 = ctx_03_9_2.getImageData(0, 0, 100, 100);
const pixels_03_9_2 = src_03_9_2.data;
const numPixels_03_9_2 = pixels_03_9_2.length;

for (let i = 0; i < numPixels_03_9_2; i++) {
  const avg =
    (pixels_03_9_2[i * 4] +
      pixels_03_9_2[i * 4 + 1] +
      pixels_03_9_2[i * 4 + 2]) /
    3;
  pixels_03_9_2[i * 4] = avg; // Red
  pixels_03_9_2[i * 4 + 1] = avg; // Green
  pixels_03_9_2[i * 4 + 2] = avg; // Blue
}

ctx_03_9_2.putImageData(src_03_9_2, 200, 50);
ctx_03_9_2.strokeRect(0, 0, 100, 100);
ctx_03_9_2.strokeRect(200, 50, 100, 100);

// 이미지에서 영역을 선택하여 그 부분의 색상 반전시키기
const canvas_03_9_3 =
  document.querySelector<HTMLCanvasElement>("#canvas_03_9_3")!;
const ctx_03_9_3 = canvas_03_9_3.getContext("2d")!;
const img_03_9_3 = new Image();

img_03_9_3.src = "src/images/batman.png";
img_03_9_3.onload = function () {
  draw(this);
};

function draw(img: any) {
  ctx_03_9_3.drawImage(img, 0, 0);
  const src = ctx_03_9_3.getImageData(0, 0, 100, 100);
  const datas = src.data;
  const numPixels = datas.length;

  for (let i = 0; i < numPixels; i += 4) {
    datas[i] = 255 - datas[i]; // red
    datas[i + 1] = 255 - datas[i + 1]; // green
    datas[i + 2] = 255 - datas[i + 2]; // blue
  }
  ctx_03_9_3.putImageData(src, 200, 50);
  ctx_03_9_3.strokeRect(0, 0, 100, 100);
  ctx_03_9_3.strokeRect(200, 50, 100, 100);
}
