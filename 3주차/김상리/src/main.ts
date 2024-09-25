import "./style.css";

//3.1 선 그리기
const canvas_03_1_1 =
  document.querySelector<HTMLCanvasElement>("#canvas_03_1_1")!;
const ctx_03_1_1 = canvas_03_1_1.getContext("2d")!;

//선 그리기 ~ 끝부분 처리하기
ctx_03_1_1.beginPath();
ctx_03_1_1.moveTo(100, 50);
ctx_03_1_1.lineTo(300, 50);
ctx_03_1_1.lineTo(300, 200);
ctx_03_1_1.lineTo(100, 200);
ctx_03_1_1.lineTo(100, 50);
ctx_03_1_1.lineWidth = 20;
ctx_03_1_1.strokeStyle = "#00f";
ctx_03_1_1.lineCap = "square";
ctx_03_1_1.stroke();
ctx_03_1_1.fillStyle = "red";
ctx_03_1_1.fill();

//선의 세 가지 끝부분 처리 방법 알아보기 ~ 선의 간격을 조정하여 점선 만들기
const canvas_03_1_7 =
  document.querySelector<HTMLCanvasElement>("#canvas_03_1_7")!;
const ctx_03_1_7 = canvas_03_1_7.getContext("2d")!;
ctx_03_1_7.lineWidth = 10;
ctx_03_1_7.strokeStyle = "#00f";
ctx_03_1_7.beginPath();
ctx_03_1_7.moveTo(100, 50);
ctx_03_1_7.lineTo(300, 50);
ctx_03_1_7.lineTo(300, 100);
// ctx_03_1_7.setLineDash([20]);
// ctx_03_1_7.setLineDash([20, 10]);
ctx_03_1_7.setLineDash([20, 10, 50, 10]);
// ctx_03_1_7.lineJoin = "miter";
// ctx_03_1_7.lineJoin = "round";
// ctx_03_1_7.lineJoin = "bevel";
// ctx_03_1_7.lineCap = "butt";
ctx_03_1_7.stroke();

// ctx_03_1_7.beginPath();
// ctx_03_1_7.moveTo(100, 100);
// ctx_03_1_7.lineTo(300, 100);
// ctx_03_1_7.lineCap = "round";
// ctx_03_1_7.stroke();

// ctx_03_1_7.beginPath();
// ctx_03_1_7.moveTo(100, 150);
// ctx_03_1_7.lineTo(300, 150);
// ctx_03_1_7.lineCap = "square";
// ctx_03_1_7.stroke();

//3.2 사각형 그리기
const canvas_03_2_1 =
  document.querySelector<HTMLCanvasElement>("#canvas_03_2_1")!;
const ctx_03_2_1 = canvas_03_2_1.getContext("2d")!;

//사각형 그리기 ~ 내부를 사각형으로 지우기
ctx_03_2_1.lineWidth = 10;
ctx_03_2_1.strokeStyle = "red";
ctx_03_2_1.fillStyle = "blue";
ctx_03_2_1.fillRect(50, 50, 200, 200);
ctx_03_2_1.strokeRect(50, 50, 200, 200);
ctx_03_2_1.clearRect(70, 70, 100, 50);
// ctx_03_2_1.fillStyle = "magenta";
// ctx_03_2_1.fillRect(20, 20, 100, 100);
// ctx_03_2_1.strokeRect(20, 20, 100, 100);
// ctx_03_2_1.fillStyle = "green";
// ctx_03_2_1.fillRect(150, 150, 50, 50);
// ctx_03_2_1.strokeRect(150, 150, 50, 50);

//3.3 원 그리기
//기본 원 그리기
const canvas_03_3_1 =
  document.querySelector<HTMLCanvasElement>("#canvas_03_3_1")!;
const ctx_03_3_1 = canvas_03_3_1.getContext("2d")!;
ctx_03_3_1.arc(150, 150, 100, 0, Math.PI * 2);
ctx_03_3_1.stroke();

//선과 호를 연결하여 라운드 코너 그리기
const canvas_03_3_2 =
  document.querySelector<HTMLCanvasElement>("#canvas_03_3_2")!;
const ctx_03_3_2 = canvas_03_3_2.getContext("2d")!;
ctx_03_3_2.beginPath();
ctx_03_3_2.moveTo(50, 50);
ctx_03_3_2.lineTo(300, 50);
ctx_03_3_2.arcTo(350, 50, 350, 100, 50);
ctx_03_3_2.lineTo(350, 200);
ctx_03_3_2.stroke();

//quadraticCurve 그리기
const canvas_03_3_3 =
  document.querySelector<HTMLCanvasElement>("#canvas_03_3_3")!;
const ctx_03_3_3 = canvas_03_3_3.getContext("2d")!;
ctx_03_3_3.beginPath();
ctx_03_3_3.moveTo(50, 50);
ctx_03_3_3.lineTo(300, 50);
ctx_03_3_3.quadraticCurveTo(200, 100, 350, 100);
ctx_03_3_3.lineTo(350, 200);
ctx_03_3_3.stroke();

//bezierCurve 그리기
const canvas_03_3_4 =
  document.querySelector<HTMLCanvasElement>("#canvas_03_3_4")!;
const ctx_03_3_4 = canvas_03_3_4.getContext("2d")!;
ctx_03_3_4.beginPath();
ctx_03_3_4.moveTo(50, 50);
ctx_03_3_4.lineTo(300, 50);
ctx_03_3_4.bezierCurveTo(200, 70, 100, 150, 350, 100);
ctx_03_3_4.lineTo(350, 200);
ctx_03_3_4.stroke();

//3.4 내부 채우기
//gradient로 내부 채우기
const canvas_03_4_1 =
  document.querySelector<HTMLCanvasElement>("#canvas_03_4_1")!;
const ctx_03_4_1 = canvas_03_4_1.getContext("2d")!;
const grad = ctx_03_4_1.createLinearGradient(50, 50, 250, 50);
grad.addColorStop(0, "red");
grad.addColorStop(1 / 6, "orange");
grad.addColorStop(2 / 6, "yellow");
grad.addColorStop(3 / 6, "green");
grad.addColorStop(4 / 6, "aqua");
grad.addColorStop(5 / 6, "blue");
grad.addColorStop(1, "purple");
ctx_03_4_1.lineWidth = 5;
ctx_03_4_1.fillStyle = grad;
ctx_03_4_1.fillRect(50, 50, 200, 200);
ctx_03_4_1.strokeRect(50, 50, 200, 200);

//radial gradient로 사각형 내부 채우기
const canvas_03_4_2 =
  document.querySelector<HTMLCanvasElement>("#canvas_03_4_2")!;
const ctx_03_4_2 = canvas_03_4_2.getContext("2d")!;
const grad2 = ctx_03_4_2.createRadialGradient(0, 0, 0, 100, 100, 300);
grad2.addColorStop(0, "red");
grad2.addColorStop(0.5, "yellow");
grad2.addColorStop(1, "black");
ctx_03_4_2.lineWidth = 5;
ctx_03_4_2.fillStyle = grad2;
ctx_03_4_2.fillRect(0, 0, 300, 300);
ctx_03_4_2.strokeRect(0, 0, 300, 300);

//패턴으로 사각형 내부 채우기
const canvas_03_4_3 =
  document.querySelector<HTMLCanvasElement>("#canvas_03_4_3")!;
const ctx_03_4_3 = canvas_03_4_3.getContext("2d")!;
const heart = new Image();
heart.src = "src/images/heart.png";
heart.onload = function () {
  ctx_03_4_3.fillStyle = ctx_03_4_3.createPattern(heart, "repeat");
  ctx_03_4_3.fillRect(0, 0, canvas_03_4_3.width, canvas_03_4_3.height);
};

//3.5 이미지 그리기
//이미지를 원래 크기대로 그리기 ~ 이미지를 잘라 일부만 그리기
const canvas_03_5_1 =
  document.querySelector<HTMLCanvasElement>("#canvas_03_5_1")!;
const ctx_03_5_1 = canvas_03_5_1.getContext("2d")!;
const heart2 = new Image();
heart2.src = "src/images/heart.png";
heart2.onload = function () {
  // ctx_03_5_1.drawImage(heart2, 0, 0);
  // ctx_03_5_1.drawImage(heart2, 0, 0, 150, 100);
  ctx_03_5_1.drawImage(heart2, 100, 0, 150, 100, 0, 0, 300, 200);
};

//3.6 글씨 쓰기
//글씨 그리기 ~ 글씨의 외곽선 그리기
const canvas_03_6_1 =
  document.querySelector<HTMLCanvasElement>("#canvas_03_6_1")!;
const ctx_03_6_1 = canvas_03_6_1.getContext("2d")!;
ctx_03_6_1.fillStyle = "#6495ED";
ctx_03_6_1.font = "italic bold 30px Arial, sans-serif";
ctx_03_6_1.fillText("Hello Canvas World!", 10, 100);
ctx_03_6_1.lineWidth = 2;
ctx_03_6_1.strokeText("Hello Canvas World!", 10, 100);
// ctx_03_6_1.fillText("The fillText() method draws filled text on the canvas.", 50, 100);
// ctx_03_6_1.fillText("The fillText() method draws filled text on the canvas.", 50, 120, 100);
// ctx_03_6_1.fillText("The fillText() method draws filled text on the canvas.", 50, 140, 200);
// ctx_03_6_1.fillText("The fillText() method draws filled text on the canvas.", 50, 160, 300);

//글씨의 좌우정렬 알아보기
const canvas_03_6_4 =
  document.querySelector<HTMLCanvasElement>("#canvas_03_6_4")!;
const ctx_03_6_4 = canvas_03_6_4.getContext("2d")!;
ctx_03_6_4.fillStyle = "#ctx_03_6_5";
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
ctx_03_6_4.strokeStyle = "blue";
ctx_03_6_4.moveTo(200, 0);
ctx_03_6_4.lineTo(200, 400);
ctx_03_6_4.stroke();

//글씨의 상하정렬 알아보기
const canvas_03_6_5 =
  document.querySelector<HTMLCanvasElement>("#canvas_03_6_5")!;
const ctx_03_6_5 = canvas_03_6_5.getContext("2d")!;
ctx_03_6_5.fillStyle = "#ctx_03_6_5";
ctx_03_6_5.font = "italic bold 20px Arial, sans-serif";
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

//3.7 그림자 그리기
const canvas_03_7_1 =
  document.querySelector<HTMLCanvasElement>("#canvas_03_7_1")!;
const ctx_03_7_1 = canvas_03_7_1.getContext("2d")!;
ctx_03_7_1.shadowColor = "rgba(0, 0, 0, 0.3)";
ctx_03_7_1.shadowOffsetX = 5;
ctx_03_7_1.shadowOffsetY = 5;
ctx_03_7_1.shadowBlur = 3;
ctx_03_7_1.fillStyle = "red";
ctx_03_7_1.fillRect(50, 50, 100, 100);

//3.8 이동, 회전, 스케일, 변형하기
//위치 이동시키기 ~ 크기 변형하기
const canvas_03_8_1 =
  document.querySelector<HTMLCanvasElement>("#canvas_03_8_1")!;
const ctx_03_8_1 = canvas_03_8_1.getContext("2d")!;
ctx_03_8_1.fillStyle = "green";
ctx_03_8_1.fillRect(50, 50, 100, 100);
ctx_03_8_1.scale(0.5, 0.5);
// ctx_03_7_1.translate(100, 100);
ctx_03_8_1.fillStyle = "red";
ctx_03_8_1.fillRect(50, 50, 100, 100);

//회전시키기 ~ 사각형 형태 변형하기
const canvas_03_8_3 =
  document.querySelector<HTMLCanvasElement>("#canvas_03_8_3")!;
const ctx_03_8_3 = canvas_03_8_3.getContext("2d")!;
ctx_03_8_3.fillStyle = "yellow";
ctx_03_8_3.strokeStyle = "blue";
ctx_03_8_3.lineWidth = 3;
// ctx_03_8_3.strokeRect(100, 100, 100, 100);
// ctx_03_8_3.fillRect(100, 100, 100, 100);
// ctx_03_8_3.rotate(5 * Math.PI / 180);
// ctx_03_8_3.strokeRect(100, 100, 100, 100);
// ctx_03_8_3.fillRect(100, 100, 100, 100);
// ctx_03_8_3.rotate(5 * Math.PI / 180);
// ctx_03_8_3.strokeRect(100, 100, 100, 100);
// ctx_03_8_3.fillRect(100, 100, 100, 100);

// ctx_03_8_3.strokeRect(0, 0, 100, 100);
// ctx_03_8_3.fillRect(0, 0, 100, 100);
// ctx_03_8_3.transform(1.5, 0, 0, 1.5, 100, 100);
// ctx_03_8_3.strokeRect(0, 0, 100, 100);
// ctx_03_8_3.fillRect(0, 0, 100, 100);

ctx_03_8_3.strokeRect(0, 0, 100, 100);
ctx_03_8_3.fillRect(0, 0, 100, 100);
ctx_03_8_3.setTransform(1, 0.2, 0.2, 1, 100, 100);
ctx_03_8_3.fillStyle = "green";
ctx_03_8_3.fillRect(0, 0, 100, 100);
ctx_03_8_3.transform(1, 0, 0, 1, 100, 100);
ctx_03_8_3.fillStyle = "red";
ctx_03_8_3.fillRect(0, 0, 100, 100);
// ctx_03_8_3.strokeRect(0, 0, 100, 100);
// ctx_03_8_3.fillRect(0, 0, 100, 100);

//3.9 색상 보정하기
//~ 지정한 부분의 색상을 흑백으로 바꾸어 출력하기
const canvas_03_9_1 =
  document.querySelector<HTMLCanvasElement>("#canvas_03_9_1")!;
const ctx_03_9_1 = canvas_03_9_1.getContext("2d")!;
ctx_03_9_1.fillStyle = "red";
ctx_03_9_1.fillRect(20, 30, 100, 100);
ctx_03_9_1.fillStyle = "green";
ctx_03_9_1.fillRect(50, 50, 100, 100);
const src_03_9_1 = ctx_03_9_1.getImageData(0, 0, 100, 100);
const pixels = src_03_9_1.data;
const numPixels = pixels.length;

for (let i = 0; i < numPixels; i++) {
  const avg = (pixels[i * 4] + pixels[i * 4 + 1] + pixels[i * 4 + 2]) / 3;
  pixels[i * 4] = avg;
  pixels[i * 4 + 1] = avg;
  pixels[i * 4 + 2] = avg;
}

ctx_03_9_1.putImageData(src_03_9_1, 200, 50);
ctx_03_9_1.strokeRect(0, 0, 100, 100);
ctx_03_9_1.strokeRect(200, 50, 100, 100);

//이미지에서 영역을 선택하여 그 부분의 색상 반전시키기
const canvas_03_9_2 =
  document.querySelector<HTMLCanvasElement>("#canvas_03_9_2")!;
const ctx_03_9_2 = canvas_03_9_2.getContext("2d")!;
const heart3 = new Image();
heart3.src = "src/images/heart.png";
heart3.onload = function () {
  draw(this);
};

function draw(img: any) {
  ctx_03_9_2.drawImage(img, 0, 0);
  const src = ctx_03_9_2.getImageData(100, 0, 100, 100);
  const datas = src.data;
  const numPixels = datas.length;

  for (let i = 0; i < numPixels; i += 4) {
    datas[i] = 255 - datas[i];
    datas[i + 1] = 255 - datas[i + 1];
    datas[i + 2] = 255 - datas[i + 2];
  }

  ctx_03_9_2.putImageData(src, 100, 100);
  ctx_03_9_2.strokeStyle = "blue";
  ctx_03_9_2.lineWidth = 3;
  ctx_03_9_2.strokeRect(100, 0, 100, 100);
  ctx_03_9_2.strokeRect(100, 100, 100, 100);
}
