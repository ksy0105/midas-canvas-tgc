import './style.css'

function createCanvas(width: number, height: number) {
    const $app = document.getElementById('app')!;
    const $canvas = document.createElement('canvas');
    $canvas.width = width;
    $canvas.height = height;
    $app.appendChild($canvas);
    return $canvas;
}

//선그리기
const $canvas1 = createCanvas(400, 300);
const ctx1 = $canvas1.getContext('2d')!;
ctx1.beginPath();
ctx1.moveTo(100, 50);
ctx1.lineTo(300,50);
ctx1.stroke(); // 선 긋기

//사각형 그리기
const $canvas2 = createCanvas(400, 300);
const ctx2 = $canvas2.getContext('2d')!;
ctx2.beginPath();
ctx2.moveTo(100, 50);
ctx2.lineTo(300, 50);
ctx2.lineTo(300, 200);
ctx2.lineTo(100, 200);
ctx2.lineTo(100, 50);
ctx2.stroke(); // 선 긋기

//내부에 색 채우기 - 검정색
const $canvas3 = createCanvas(400, 300);
const ctx3 = $canvas3.getContext('2d')!;
ctx3.beginPath();
ctx3.moveTo(100, 50);
ctx3.lineTo(300, 50);
ctx3.lineTo(300, 200);
ctx3.lineTo(100, 200);
ctx3.lineTo(100, 50);
ctx3.stroke(); // 선 긋기
ctx3.fill(); // 채우기

//내부에 색 채우기 - 다른색
const $canvas4 = createCanvas(400, 300);
const ctx4 = $canvas4.getContext('2d')!;
ctx4.beginPath();
ctx4.moveTo(100, 50);
ctx4.lineTo(300, 50);
ctx4.lineTo(300, 200);
ctx4.lineTo(100, 200);
ctx4.lineTo(100, 50);
ctx4.stroke(); // 선 긋기
ctx4.fillStyle = "red"; // 채울 색 변경
ctx4.fill();  // 채우기

//선을 다른 색으로 하고 두께 변경하기
const $canvas5 = createCanvas(400, 300);
const ctx5 = $canvas5.getContext('2d')!;
ctx5.beginPath();
ctx5.moveTo(100, 50);
ctx5.lineTo(300, 50);
ctx5.lineTo(300, 200);
ctx5.lineTo(100, 200);
ctx5.lineTo(100, 50);
ctx5.lineWidth = 20; // 그을 선 두께 변경
ctx5.strokeStyle = 'blue'; // 그을 선 색 변경
ctx5.stroke(); // 선 긋기
ctx5.fillStyle = "red";
ctx5.fill();

//선을 다른 색으로 하고 두께 변경하기
const $canvas6 = createCanvas(400, 300);
const ctx6 = $canvas6.getContext('2d')!;
ctx6.beginPath();
ctx6.moveTo(100, 50);
ctx6.lineTo(300, 50);
ctx6.lineTo(300, 200);
ctx6.lineTo(100, 200);
ctx6.lineTo(100, 50);
ctx6.lineWidth = 20; // 그을 선 두께 변경
ctx6.strokeStyle = 'blue'; // 그을 선 색 변경
ctx6.lineCap = 'square'; // 선 끝부분 처리
ctx6.stroke(); // 선 긋기
ctx6.fillStyle = "red";
ctx6.fill();

//선의 세가지 끝부분 처리 방법
const $canvas7 = createCanvas(400, 300);
const ctx7 = $canvas7.getContext('2d')!;
ctx7.lineWidth = 20;
ctx7.strokeStyle = "blue"

ctx7.beginPath();
ctx7.moveTo(100, 50);
ctx7.lineTo(300, 50);
ctx7.lineCap = "butt"; // 선 끝을 좌표에 맞춰서 마무리 (기본값)
ctx7.stroke();

ctx7.beginPath();
ctx7.moveTo(100, 100);
ctx7.lineTo(300, 100);
ctx7.lineCap = "round"; // 선 끝을 둥글게 ( 선 두께를 반지름으로 )
ctx7.stroke();

ctx7.beginPath();
ctx7.moveTo(100, 150);
ctx7.lineTo(300, 150);
ctx7.lineCap = "square"; // 선 끝을 선 두께만큼 더 길게 처리
ctx7.stroke();

//선의 꺾인 부분 처리
const $canvas8 = createCanvas(400, 300);
const ctx8 = $canvas8.getContext('2d')!;
ctx8.lineWidth = 20;
ctx8.strokeStyle = "blue";

ctx8.beginPath();
ctx8.moveTo(100, 50);
ctx8.lineTo(300, 50);
ctx8.lineTo(300, 100);
ctx8.lineJoin = "miter"; // 각진 모서리 형태
ctx8.stroke();

ctx8.beginPath();
ctx8.moveTo(100, 150);
ctx8.lineTo(300, 150);
ctx8.lineTo(300, 200);
ctx8.lineJoin = "round"; // 둥글게
ctx8.stroke();

ctx8.beginPath();
ctx8.moveTo(100, 250);
ctx8.lineTo(300, 250);
ctx8.lineTo(300, 300);
ctx8.lineJoin = "bevel"; // 잘려나간 모서리
ctx8.stroke();


//점선 만들기
const $canvas9 = createCanvas(400, 300);
const ctx9 = $canvas9.getContext('2d')!;
ctx9.lineWidth = 20;

ctx9.beginPath();
ctx9.moveTo(100, 50);
ctx9.lineTo(300, 50);
ctx9.setLineDash([20]) //선=공백
ctx9.stroke();

ctx9.beginPath();
ctx9.moveTo(100, 100);
ctx9.lineTo(300, 100);
ctx9.setLineDash([20, 10]) //선-공백
ctx9.stroke();

ctx9.beginPath();
ctx9.moveTo(100, 150);
ctx9.lineTo(300, 150);
ctx9.setLineDash([20, 10, 50, 10]) //패턴 선-공백-선-공백
ctx9.stroke();

//사각형 그리기
const $canvas10 = createCanvas(400, 300);
const ctx10 = $canvas10.getContext('2d')!;
ctx10.strokeRect(20,20,100,100);
ctx10.strokeRect(150,150,50,50);

//사각형 내부 채우기
const $canvas11 = createCanvas(400, 300);
const ctx11 = $canvas11.getContext('2d')!;
ctx11.fillStyle = 'red';
ctx11.fillRect(20,20,100,100); // 내부가 칠해진 사각형 그리기
ctx11.strokeRect(20,20,100,100); // 사각형 모서리 그리기
ctx11.fillStyle = 'green';
ctx11.fillRect(150,150,50,50);
ctx11.strokeRect(150,150,50,50);

//특정 영역 (사각형) 지우기
const $canvas12 = createCanvas(400, 300);
const ctx12 = $canvas12.getContext('2d')!;
ctx12.lineWidth = 10;
ctx12.strokeStyle = 'red';
ctx12.fillStyle = 'blue';
ctx12.fillRect(50,50,200,200);
ctx12.strokeRect(50,50,200,200);
ctx12.clearRect(70, 70, 100, 50); // 특정 영역 지우기
