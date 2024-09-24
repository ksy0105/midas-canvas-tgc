import './style.css'

// 3.1 선 그리기
// 선 그리기, 사각형 그리기, 내부에 색 채우기, 붉은 색으로 내부 채우기
// 선의 색을 다른 색으로 채우고 두께 변경하기, 끝부분 처리하기
const canvas1_1 = document.querySelector<HTMLCanvasElement>('#canvas1_1')!;
const ctx1_1 = canvas1_1.getContext('2d')!;

ctx1_1.beginPath(); // 선 그리기 시작
ctx1_1.moveTo(100, 50); // 시작점으로 이동
ctx1_1.lineTo(300, 50); // 선의 끝점으로 이동
ctx1_1.lineTo(300, 200); // 선의 끝점으로 이동
ctx1_1.lineTo(100, 200); // 선의 끝점으로 이동
ctx1_1.lineTo(100, 50); // 선의 끝점으로 이동
ctx1_1.lineWidth = 20; // 선 두께 지정
ctx1_1.strokeStyle = "#00f"; // 선 색 지정
ctx1_1.lineCap = "square"; // 선 끝부분 정리(butt, round, square)
ctx1_1.stroke(); // 선을 그림
ctx1_1.fillStyle = "red"; // 내부에 채울 색 지정
ctx1_1.fill(); // 내부에 색을 채움

// 선의 세 가지 끝부분 처리 방법 알아보기, 선의 꺾인 부분 처리하기, 선의 간격을 조정하여 점선 만들기
const canvas1_2 = document.querySelector<HTMLCanvasElement>('#canvas1_2')!;
const ctx1_2 = canvas1_2.getContext('2d')!;

ctx1_2.lineWidth = 10; // 선 두께 지정
ctx1_2.strokeStyle = "#00f"; // 선 색 지정

ctx1_2.beginPath();
ctx1_2.moveTo(100, 30);
ctx1_2.lineTo(300, 30);
ctx1_2.lineTo(300, 80);
// ctx1_2.lineCap = "butt"; // 선 끝부분을 좌표에 맞추어 마무리(default)
// ctx1_2.lineJoin = "miter"; // 선의 꺾인 부분을 각진 모서리 형태로 처리(default)
ctx1_2.setLineDash([20]); // 선의 간격이 20씩 벌어짐
ctx1_2.stroke();

ctx1_2.beginPath();
ctx1_2.moveTo(100, 130);
ctx1_2.lineTo(300, 130);
ctx1_2.lineTo(300, 180);
// ctx1_2.lineCap = "round"; // 선 끝을 둥글림, 선 두께는 반지름
// ctx1_2.lineJoin = "round"; // 선의 꺾인 부분을 둥근 모서리 형태로 처리
ctx1_2.setLineDash([20, 10]); // 선의 길이: 20, 선의 간격: 10
ctx1_2.stroke();

ctx1_2.beginPath();
ctx1_2.moveTo(100, 230);
ctx1_2.lineTo(300, 230);
ctx1_2.lineTo(300, 280);
// ctx1_2.lineCap = "square"; // 선 끝을 사각형으로 처리, 선 두꼐만큼 길어짐
// ctx1_2.lineJoin = "bevel"; // 선의 꺾인 부분을 잘려나간 모서리 형태로 처리
ctx1_2.setLineDash([20, 10, 50, 10]); // 선의 길이: 20, 50, 선의 간격: 10
ctx1_2.stroke();

// 3.2 사각형 그리기
// 사각형 그리기, 내부가 채워진 사각형 그리기, 내부를 사각형으로 지우기
const canvas2_1 = document.querySelector<HTMLCanvasElement>('#canvas2_1')!;
const ctx2_1 = canvas2_1.getContext('2d')!;

ctx2_1.lineWidth = 10;
ctx2_1.strokeStyle = "red";
ctx2_1.fillStyle = "magenta"; // 내부 색상 지정(color, hex, rgba, gradient, pattern)
ctx2_1.fillRect(20, 20, 100, 100); // 내부가 채워진 사각형 그리기
ctx2_1.strokeRect(20, 20, 100, 100); // x: 20, y:20에서 폭과 높이가 각각 100인 사각형 그리기
ctx2_1.clearRect(50, 50, 20, 20); // x: 50, y: 50에서 폭과 높이가 각각 20인 사각형 지우기
ctx2_1.fillStyle = "green";
ctx2_1.fillRect(150, 150, 50, 50);
ctx2_1.strokeRect(150, 150, 50, 50); // x: 150, y: 150에서 폭과 높이가 각각 50인 사각형 그리기

// 3.3. 원 그리기
// 기본 원 그리기
const canvas3_1 = document.querySelector<HTMLCanvasElement>('#canvas3_1')!;
const ctx3_1 = canvas3_1.getContext('2d')!;

// context.arc(x, y, r, sAngle, eAngle, counterClockWise);
// x: x 좌표, y: y 좌표, r: 반지름, sAngle: 시작 각도, eAngle: 끝 각도, counterClockWise: 시계 반향으로 회전
ctx3_1.arc(200, 150, 100, 0, Math.PI * 2); // x: 150, y: 150 좌표에 반지름 100 크기로 각도 360의 원 그리기
ctx3_1.stroke();

// 선과 호를 연결하여 라운드 코너 그리기
const canvas3_2 = document.querySelector<HTMLCanvasElement>('#canvas3_2')!;
const ctx3_2 = canvas3_2.getContext('2d')!;

ctx3_2.beginPath();
ctx3_2.moveTo(50, 50);
ctx3_2.lineTo(300, 50);
// context.arcTo(x1, y1, x2, y2, r);
// x1: 시작하는 점의 x 좌표, y1: 시작하는 점의 y 좌표, x2: 끝나는 점의 x 좌표, y2: 끝나는 점의 y좌표, r: 호의 반지름
ctx3_2.arcTo(350, 50, 350, 100, 50);
ctx3_2.lineTo(350, 200);
ctx3_2.stroke();

// quadraticCurve 그리기
const canvas3_3 = document.querySelector<HTMLCanvasElement>('#canvas3_3')!;
const ctx3_3 = canvas3_3.getContext('2d')!;

ctx3_3.beginPath();
ctx3_3.moveTo(50, 50);
ctx3_3.lineTo(300, 50);
// context.quadraticCurveTo(cpx, cpy, x, y);
// cpx: 조절하는 점의 x 좌표, cpy: 조절하는 점의 y 좌표, x: 끝나는 점의 x 좌표, y: 끝나는 점의 y 좌표
ctx3_3.quadraticCurveTo(200, 100, 350, 100);
ctx3_3.lineTo(350, 200);
ctx3_3.stroke();

// bezierCurve 그리기
const canvas3_4 = document.querySelector<HTMLCanvasElement>('#canvas3_4')!;
const ctx3_4 = canvas3_4.getContext('2d')!;

ctx3_4.beginPath();
ctx3_4.moveTo(50, 50);
ctx3_4.lineTo(300, 50);
// context.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
// cp1x: 조절하는 1번째의 x 좌표, cp1y: 조절하는 1번째의 y 좌표, cp2x: 조절하는 2번째의 x 좌표, cp2y: 조절하는 2번째의 y 좌표, x: 끝나는 점의 x 좌표, y: 끝나는 점의 y 좌표
ctx3_4.bezierCurveTo(200, 70, 100, 150, 350, 100);
ctx3_4.lineTo(350, 200);
ctx3_4.stroke();

// 3.4 내부 채우기
// gradient로 내부 채우기
const canvas4_1 = document.querySelector<HTMLCanvasElement>('#canvas4_1')!;
const ctx4_1 = canvas4_1.getContext('2d')!;

// context.createLinearGradient(x0, y0, x1, y1);
// x0: 시작하는 점의 x 좌표, y0: 시작하는 점의 y 좌표, x1: 끝나는 점의 x 좌표, y1: 끝나는 점의 y 좌표
const grad4_1 = ctx4_1.createLinearGradient(50, 50, 250, 50);
grad4_1.addColorStop(0, "red");
grad4_1.addColorStop(1 / 6, "orange");
grad4_1.addColorStop(2 / 6, "yellow");
grad4_1.addColorStop(3 / 6, "green");
grad4_1.addColorStop(4 / 6, "aqua");
grad4_1.addColorStop(5 / 6, "blue");
grad4_1.addColorStop(1, "purple");
ctx4_1.lineWidth = 5;
ctx4_1.fillStyle = grad4_1;
ctx4_1.fillRect(50, 50, 200, 200);
ctx4_1.strokeRect(50, 50, 200, 200);

// radial gradient로 사각형 내부 채우기
const canvas4_2 = document.querySelector<HTMLCanvasElement>('#canvas4_2')!;
const ctx4_2 = canvas4_2.getContext('2d')!;

// context.createRadialGradient(x0, y0, r0, x1, y1, r1);
// x0: 시작하는 점의 x 좌표, y0: 시작하는 점의 y 좌표, r0: 시작하는 곳의 반지름
// x1: 끝나는 점의 x 좌표, y1: 끝나는 점의 y 좌표, r1: 끝나는 곳의 반지름
const grad4_2 = ctx4_2.createRadialGradient(0, 0, 0, 100, 100, 300);
grad4_2.addColorStop(0, "red");
grad4_2.addColorStop(0.5, "yellow");
grad4_2.addColorStop(1, "black");

ctx4_2.lineWidth = 5;
ctx4_2.fillStyle = grad4_2;
ctx4_2.fillRect(0, 0, 300, 300);
ctx4_2.strokeRect(0, 0, 300, 300);

// 패턴으로 사각형 내부 채우기
const canvas4_3 = document.querySelector<HTMLCanvasElement>('#canvas4_3')!;
const ctx4_3 = canvas4_3.getContext('2d')!;

const img4_3 = new Image();
img4_3.src = "src/images/prague.png";
img4_3.onload = function() {
    // context.createPattern(image, "repeat | repeat-x | repeat-y | no-repeat");
    // image: 이미지 소스, repeat: 패턴 반복, repeat-x: x축 반복, repeat-y: y축 반복, no-repeat: 반복 X
    // @ts-ignore
    ctx4_3.fillStyle = ctx4_3.createPattern(img4_3, "repeat");
    ctx4_3.fillRect(0, 0, canvas4_3.width, canvas4_3.height);
};

// 3.5 이미지 그리기
// 이미지를 원래 크기대로 그리기
const canvas5_1 = document.querySelector<HTMLCanvasElement>('#canvas5_1')!;
const ctx5_1 = canvas5_1.getContext('2d')!;

const img5_1 = new Image();
img5_1.src = "src/images/prague.png";
img5_1.onload = function() {
    // context.drawImage(img, x, y);
    // img: 이미지 소스, x: 이미지가 그려지는 x 좌표, y: 이미지가 그려지는 y 좌표
    ctx5_1.drawImage(img5_1, 0, 0);
};

// 이미지의 크기를 변형하여 그리기
const canvas5_2 = document.querySelector<HTMLCanvasElement>('#canvas5_2')!;
const ctx5_2 = canvas5_2.getContext('2d')!;

const img5_2 = new Image();
img5_2.src = "src/images/prague.png";
img5_2.onload = function() {
    // context.drawImage(img, x, y, width, height);
    // img: 이미지 소스, x: 이미지가 그려지는 x 좌표, y: 이미지가 그려지는 y 좌표, width: 이미지 폭, height: 이미지 높이
    ctx5_2.drawImage(img5_2, 0, 0, 150, 100);
};

// 이미지를 잘라 일부만 그리기
const canvas5_3 = document.querySelector<HTMLCanvasElement>('#canvas5_3')!;
const ctx5_3 = canvas5_3.getContext('2d')!;

const img5_3 = new Image();
img5_3.src = "src/images/prague.png";
img5_3.onload = function() {
    // context.drawImage(img, sx, sy, sWidth, sHeight, x, y, width, height);
    // img: 이미지 소스, sx: 소스 이미지에서 잘라 가져올 시작점의 x 좌표, sy: 소스 이미지에서 잘라 가져올 시작점의 y 좌표
    // sWidth: 소스 이미지에서 잘라 가져올 시작점 기준의 이미지 폭, sHeight: 소스 이미지에서 잘라 가져올 시작점 기준의 이미지 높이
    // x: 이미지가 그려지는 x 좌표, y: 이미지가 그려지는 y 좌표, width: 이미지 폭, height: 이미지 높이
    ctx5_3.drawImage(img5_3, 100, 0, 150, 100, 0, 0, 300, 200);
};

// 3.6. 글씨 쓰기
// 글씨 그리기, 글씨 크기를 크게 변경하기
const canvas6_1 = document.querySelector<HTMLCanvasElement>('#canvas6_1')!;
const ctx6_1 = canvas6_1.getContext('2d')!;

// context.fillText(text, x, y, maxWidth);
// text: 화면에 표시될 글씨, x: 글씨가 표시될 x 좌표, y: 글씨가 표시될 y 좌표, maxWidth: 화면에 표시될 최대 폭(선택)
ctx6_1.fillText("The fillText() method draws filled text on the canvas.", 50, 100);
ctx6_1.fillText("The fillText() method draws filled text on the canvas.", 50, 120, 100);
ctx6_1.fillText("The fillText() method draws filled text on the canvas.", 50, 140, 200);
ctx6_1.fillText("The fillText() method draws filled text on the canvas.", 50, 160, 300);

// 글씨의 외곽선 그리기
const canvas6_2 = document.querySelector<HTMLCanvasElement>('#canvas6_2')!;
const ctx6_2 = canvas6_2.getContext('2d')!;

ctx6_2.fillStyle = "red";
ctx6_2.font = "italic bold 40px Arial, sans-serif"; // 글씨의 스타일을 지정
ctx6_2.fillText("Hello Canvas World!", 10, 100);
ctx6_2.lineWidth = 2; // 글씨 외곽선 크기 설정
ctx6_2.strokeText("Hello Canvas World!", 10, 100); // 외곽선만 있는 글씨 표기

// 글씨의 좌우정렬 알아보기
const canvas6_3 = document.querySelector<HTMLCanvasElement>('#canvas6_3')!;
const ctx6_3 = canvas6_3.getContext('2d')!;

ctx6_3.fillStyle = "red";
ctx6_3.font = "italic bold 40px Arial, sans-serif"; // 글씨의 스타일을 지정
ctx6_3.textAlign = "start"; // 글씨의 시작점 기준 정렬(default)
ctx6_3.fillText("Hello World!", 200, 50);
ctx6_3.textAlign = "end"; // 글씨의 끝점 기준 정렬
ctx6_3.fillText("Hello World!", 200, 100);
ctx6_3.textAlign = "left"; // 글씨의 왼쪽 기준 정렬
ctx6_3.fillText("Hello World!", 200, 150);
ctx6_3.textAlign = "right"; // 글씨의 오른쪽 기준 정렬
ctx6_3.fillText("Hello World!", 200, 200);
ctx6_3.textAlign = "center"; // 글씨의 중심 기준 정렬
ctx6_3.fillText("Hello World!", 200, 250);
ctx6_3.strokeStyle = "blue";
ctx6_3.moveTo(200, 0);
ctx6_3.lineTo(200, 400);
ctx6_3.stroke();

// 글씨의 상하정렬 알아보기
const canvas6_4 = document.querySelector<HTMLCanvasElement>('#canvas6_4')!;
const ctx6_4 = canvas6_4.getContext('2d')!;

ctx6_4.fillStyle = "red";
ctx6_4.font = "italic bold 40px Arial, sans-serif"; // 글씨의 스타일을 지정
ctx6_4.textBaseline = "top"; // 베이스 라인 기준으로 글씨의 위에 정렬
ctx6_4.fillText("top!", 10, 150);
ctx6_4.textBaseline = "bottom"; // 베이스 라인 기준으로 글씨의 바닥에 정렬
ctx6_4.fillText("bottom!", 50, 150);
ctx6_4.textBaseline = "middle"; // 베이스 라인 기준으로 글씨의 중간에 정렬
ctx6_4.fillText("middle!", 130, 150);
ctx6_4.textBaseline = "alphabetic"; // 베이스 라인 기준으로 기본적인 정렬(default)
ctx6_4.fillText("alphabetic!", 220, 150);
ctx6_4.textBaseline = "hanging"; // 베이스 라인 기준으로 글씨의 바로 위에 정렬
ctx6_4.fillText("hanging!", 300, 150);
ctx6_4.strokeStyle = "blue";
ctx6_4.moveTo(0, 150);
ctx6_4.lineTo(400, 150);
ctx6_4.stroke();

// 3.7 그림자 그리기
// 사각형의 그림자 그려보기
const canvas7_1 = document.querySelector<HTMLCanvasElement>('#canvas7_1')!;
const ctx7_1 = canvas7_1.getContext('2d')!;

ctx7_1.shadowColor = "rgba(0, 0, 0, 0.3)"; // 그림자 색 설정
ctx7_1.shadowOffsetX = 5; // 그림자의 간격을 x: 5만큼 이동
ctx7_1.shadowOffsetY = 5; // 그림자의 간격을 y: 5만큼 이동
ctx7_1.shadowBlur = 3; // 그림자 흐림을 3만큼 적용
ctx7_1.fillStyle = "red";
ctx7_1.fillRect(50, 50, 100, 100);

// 3.8. 이동, 회전, 스케일, 변형하기
// 위치 이동시키기
const canvas8_1 = document.querySelector<HTMLCanvasElement>('#canvas8_1')!;
const ctx8_1 = canvas8_1.getContext('2d')!;

ctx8_1.fillStyle = "green";
ctx8_1.fillRect(50, 50, 100, 100);
ctx8_1.translate(100, 100); // x: 100, y: 100만큼 이동
ctx8_1.fillRect(50, 50, 100, 100); // 이동된 위치에 사각형 그리기

// 크기 변형하기
const canvas8_2 = document.querySelector<HTMLCanvasElement>('#canvas8_2')!;
const ctx8_2 = canvas8_2.getContext('2d')!;

ctx8_2.fillStyle = "green";
ctx8_2.fillRect(50, 50, 100, 100);
ctx8_2.scale(0.5, 0.5); // 크기를 절반 줄임, (0, 0)을 기준으로 하여 크기를 줄이기 떄문에 위치가 상단으로 이동
ctx8_2.fillStyle = "red";
ctx8_2.fillRect(50, 50, 100, 100); // 변형되는 사각형 그리기

// 회전시키기
const canvas8_3 = document.querySelector<HTMLCanvasElement>('#canvas8_3')!;
const ctx8_3 = canvas8_3.getContext('2d')!;

ctx8_3.fillStyle = "yellow";
ctx8_3.strokeStyle = "blue";
ctx8_3.lineWidth = 3;
ctx8_3.strokeRect(100, 100, 100, 100);
ctx8_3.fillRect(100, 100, 100, 100);
ctx8_3.rotate(5 * Math.PI / 180); // 시계 방향으로 5도만큼 사각형 회전
ctx8_3.strokeRect(100, 100, 100, 100);
ctx8_3.fillRect(100, 100, 100, 100);
ctx8_3.rotate(5 * Math.PI / 180); // 시계 방향으로 5도만큼 사각형 회전
ctx8_3.strokeRect(100, 100, 100, 100);
ctx8_3.fillRect(100, 100, 100, 100);

// 사각형 형태 변형하기 - 확대 및 이동
const canvas8_4 = document.querySelector<HTMLCanvasElement>('#canvas8_4')!;
const ctx8_4 = canvas8_4.getContext('2d')!;

ctx8_4.fillStyle = "yellow";
ctx8_4.strokeStyle = "blue";
ctx8_4.lineWidth = 3;
ctx8_4.strokeRect(0, 0, 100, 100);
ctx8_4.fillRect(0, 0, 100, 100);
// context.transform(s1, sk1, sk2, s2, m1, m2);
// s1: 수평으로 확대, sk1: 수평으로 기울임, sk2: 수직으로 기울임
// s2: 수직으로 확대, m1: 수평으로 이동, m2: 수직으로 이동
ctx8_4.transform(1.5, 0, 0, 1.5, 100, 100); // 1.5배 확대 후 x: 100, y: 100만큼 이동
ctx8_4.strokeRect(0, 0, 100, 100);
ctx8_4.fillRect(0, 0, 100, 100);

// 사각형 형태 변형하기 - 기울임 및 이동
const canvas8_5 = document.querySelector<HTMLCanvasElement>('#canvas8_5')!;
const ctx8_5 = canvas8_5.getContext('2d')!;

ctx8_5.fillStyle = "yellow";
ctx8_5.strokeStyle = "blue";
ctx8_5.lineWidth = 3;
ctx8_5.strokeRect(0, 0, 100, 100);
ctx8_5.fillRect(0, 0, 100, 100);
// context.transform(s1, sk1, sk2, s2, m1, m2);
// s1: 수평으로 확대, sk1: 수평으로 기울임, sk2: 수직으로 기울임
// s2: 수직으로 확대, m1: 수평으로 이동, m2: 수직으로 이동
ctx8_5.transform(1, 0.2, 0.2, 1, 100, 100); // 수평, 수직으로 0.2만큼 기울임 후 x: 100, y: 100만큼 이동
ctx8_5.strokeRect(0, 0, 100, 100);
ctx8_5.fillRect(0, 0, 100, 100);

// 사각형 형태 변형하기 - transform 선언 이후 setTransform 선언
const canvas8_6 = document.querySelector<HTMLCanvasElement>('#canvas8_6')!;
const ctx8_6 = canvas8_6.getContext('2d')!;

ctx8_6.fillStyle = "yellow";
ctx8_6.strokeStyle = "blue";
ctx8_6.lineWidth = 3;
ctx8_6.strokeRect(0, 0, 100, 100);
ctx8_6.fillRect(0, 0, 100, 100);
// context.transform(s1, sk1, sk2, s2, m1, m2);
// s1: 수평으로 확대, sk1: 수평으로 기울임, sk2: 수직으로 기울임
// s2: 수직으로 확대, m1: 수평으로 이동, m2: 수직으로 이동
ctx8_6.transform(1, 0.2, 0.2, 1, 100, 100); // 수평, 수직으로 0.2만큼 기울임 후 x: 100, y: 100만큼 이동
ctx8_6.fillStyle = "green";
ctx8_6.fillRect(0, 0, 100, 100);
ctx8_6.setTransform(1, 0, 0, 1, 100, 100); // transform 에서 변형한 값을 초기화하고 다시 변경
ctx8_6.fillStyle = "red";
ctx8_6.fillRect(0, 0, 100, 100);

// 사각형 형태 변형하기 - setTransform 선언 이후 transform 선언
const canvas8_7 = document.querySelector<HTMLCanvasElement>('#canvas8_7')!;
const ctx8_7 = canvas8_7.getContext('2d')!;

ctx8_7.fillStyle = "yellow";
ctx8_7.strokeStyle = "blue";
ctx8_7.lineWidth = 3;
ctx8_7.strokeRect(0, 0, 100, 100);
ctx8_7.fillRect(0, 0, 100, 100);
ctx8_7.setTransform(1, 0.2, 0.2, 1, 100, 100);
ctx8_7.fillStyle = "green";
ctx8_7.fillRect(0, 0, 100, 100);
// context.transform(s1, sk1, sk2, s2, m1, m2);
// s1: 수평으로 확대, sk1: 수평으로 기울임, sk2: 수직으로 기울임
// s2: 수직으로 확대, m1: 수평으로 이동, m2: 수직으로 이동
ctx8_7.transform(1, 0, 0, 1, 100, 100); // x: 100, y: 100만큼 이동, setTransform 에서 변형한 값에 이어서 변형
ctx8_7.fillStyle = "red";
ctx8_7.fillRect(0, 0, 100, 100);

// 3.9 색상 보정하기
// 캔버스에서 일부분을 가져와서 다른 곳에 출력하기
const canvas9_1 = document.querySelector<HTMLCanvasElement>('#canvas9_1')!;
const ctx9_1 = canvas9_1.getContext('2d')!;

ctx9_1.fillStyle = "red";
ctx9_1.fillRect(20, 30, 100, 100);
ctx9_1.fillStyle = "green";
ctx9_1.fillRect(50, 50, 100, 100);
// context.getImageData(x, y, width, height);
// x: 왼쪽 상단 x 좌표, y: 왼쪽 상단 y 좌표, width: 사각형 영역의 폭, height: 사각형 영역의 높이
const src9_1 = ctx9_1.getImageData(0, 0, 100, 100);
// context.putImageData(imgData, x, y, dirtyX, dirtyY, dirtyWidth, dirtyHeight);
// imgData: getImageData 로 가져온 이미지 값, x: 왼쪽 상단 x 좌표, y: 왼쪽 상단 y 좌표
// dirtyX: 가져올 이미지의 x 좌표, dirtyY: 가져올 이미지의 y 좌표
// dirtyWidth: 가져와서 그릴 사각형 영역의 폭, dirtyHeight: 가져와서 그릴 사각형 영역의 높이
ctx9_1.putImageData(src9_1, 200, 50);
ctx9_1.strokeRect(0, 0, 100, 100);
ctx9_1.strokeRect(200, 50, 100, 100);

// 지정한 부분의 색상을 흑백으로 바꾸어 출력하기
const canvas9_2 = document.querySelector<HTMLCanvasElement>('#canvas9_2')!;
const ctx9_2 = canvas9_2.getContext('2d')!;

ctx9_2.fillStyle = "red";
ctx9_2.fillRect(20, 30, 100, 100);
ctx9_2.fillStyle = "green";
ctx9_2.fillRect(50, 50, 100, 100);
// context.getImageData(x, y, width, height);
// x: 왼쪽 상단 x 좌표, y: 왼쪽 상단 y 좌표, width: 사각형 영역의 폭, height: 사각형 영역의 높이
const src9_2 = ctx9_2.getImageData(0, 0, 100, 100);
const pixels = src9_2.data; // 지정한 영역의 이미지를 data 로 가져옴, rgba 배열로 되어 있음
const numPixels = pixels.length; // 픽셀의 개수를 변수로 저장

// 각 픽셀의 색상 값을 흑백으로 변경하여 다시 저장
for(let i = 0; i < numPixels; i++) {
    const avg = (pixels[i * 4] + pixels[i * 4 + 1] + pixels[i * 4 + 2]) / 3;
    pixels[i * 4] = avg; // red
    pixels[i * 4 + 1] = avg; // green
    pixels[i * 4 + 2] = avg; // blue
}

// context.putImageData(imgData, x, y, dirtyX, dirtyY, dirtyWidth, dirtyHeight);
// imgData: getImageData 로 가져온 이미지 값, x: 왼쪽 상단 x 좌표, y: 왼쪽 상단 y 좌표
// dirtyX: 가져올 이미지의 x 좌표, dirtyY: 가져올 이미지의 y 좌표
// dirtyWidth: 가져와서 그릴 사각형 영역의 폭, dirtyHeight: 가져와서 그릴 사각형 영역의 높이
ctx9_2.putImageData(src9_2, 200, 50); // 흑백으로 저장된 이미지 출력
ctx9_2.strokeRect(0, 0, 100, 100);
ctx9_2.strokeRect(200, 50, 100, 100);

// 이미지에서 영역을 선택하여 그 부분의 색상 반전시키기
const canvas9_3 = document.querySelector<HTMLCanvasElement>('#canvas9_3')!;
const ctx9_3 = canvas9_3.getContext('2d')!;

const img9_3 = new Image();
img9_3.src = "src/images/prague.png";
img9_3.onload = function() {
    draw(this);
};

function draw(img: any) {
    ctx9_3.drawImage(img, 0, 0);
    const src = ctx9_3.getImageData(115, 0, 100, 100);
    const datas = src.data;
    const numPixels = datas.length;

    for(let i = 0; i < numPixels; i += 4) {
        datas[i] = 255 - datas[i]; // red
        datas[i + 1] = 255 - datas[i + 1]; // green
        datas[i + 2] = 255 - datas[i + 2]; // blue
    }

    // context.putImageData(imgData, x, y, dirtyX, dirtyY, dirtyWidth, dirtyHeight);
    // imgData: getImageData 로 가져온 이미지 값, x: 왼쪽 상단 x 좌표, y: 왼쪽 상단 y 좌표
    // dirtyX: 가져올 이미지의 x 좌표, dirtyY: 가져올 이미지의 y 좌표
    // dirtyWidth: 가져와서 그릴 사각형 영역의 폭, dirtyHeight: 가져와서 그릴 사각형 영역의 높이
    ctx9_3.putImageData(src, 115, 160);
    ctx9_3.strokeStyle = "red";
    ctx9_3.lineWidth = 3;
    ctx9_3.strokeRect(115, 0, 100, 100);
    ctx9_3.strokeRect(115, 160, 100, 100);
}
