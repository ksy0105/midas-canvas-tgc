import './style.css'
import PATTERN_IMAGE from './assets/pattern.jpg'
import IMAGE from './assets/image.jpeg'

class CanvasExample {
    $canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    constructor(callback: ($canvas:HTMLCanvasElement, ctx: CanvasRenderingContext2D) => void) {
        const $app = document.getElementById('app')!;
        this.$canvas = document.createElement('canvas');
        this.$canvas.width = 400;
        this.$canvas.height = 300;
        $app.appendChild(this.$canvas);
        this.ctx = this.$canvas.getContext('2d')!;
        callback(this.$canvas, this.ctx)
    }
}

//선그리기
new CanvasExample((_,ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    ctx.moveTo(100, 50);
    ctx.lineTo(300,50);
    ctx.stroke(); // 선 긋기
})

//선으로 사각형 그리기
new CanvasExample((_,ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    ctx.moveTo(100, 50);
    ctx.lineTo(300, 50);
    ctx.lineTo(300, 200);
    ctx.lineTo(100, 200);
    ctx.lineTo(100, 50);
    ctx.stroke(); // 선 긋기
})

//내부에 색 채우기 - 검정색
new CanvasExample((_,ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    ctx.moveTo(100, 50);
    ctx.lineTo(300, 50);
    ctx.lineTo(300, 200);
    ctx.lineTo(100, 200);
    ctx.lineTo(100, 50);
    ctx.stroke(); // 선 긋기
    ctx.fill(); // 채우기

})

//내부에 색 채우기 - 다른색
new CanvasExample((_,ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    ctx.moveTo(100, 50);
    ctx.lineTo(300, 50);
    ctx.lineTo(300, 200);
    ctx.lineTo(100, 200);
    ctx.lineTo(100, 50);
    ctx.stroke(); // 선 긋기
    ctx.fillStyle = "red"; // 채울 색 변경
    ctx.fill();  // 채우기
})

//선을 다른 색으로 하고 두께 변경하기
new CanvasExample((_,ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    ctx.moveTo(100, 50);
    ctx.lineTo(300, 50);
    ctx.lineTo(300, 200);
    ctx.lineTo(100, 200);
    ctx.lineTo(100, 50);
    ctx.lineWidth = 20; // 그을 선 두께 변경
    ctx.strokeStyle = 'blue'; // 그을 선 색 변경
    ctx.stroke(); // 선 긋기
    ctx.fillStyle = "red";
    ctx.fill();
})

//선 끝부분 처리하기
new CanvasExample((_,ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    ctx.moveTo(100, 50);
    ctx.lineTo(300, 50);
    ctx.lineTo(300, 200);
    ctx.lineTo(100, 200);
    ctx.lineTo(100, 50);
    ctx.lineWidth = 20; // 그을 선 두께 변경
    ctx.strokeStyle = 'blue'; // 그을 선 색 변경
    ctx.lineCap = 'square'; // 선 끝부분 처리
    ctx.stroke(); // 선 긋기
    ctx.fillStyle = "red";
    ctx.fill();
})

//선의 세가지 끝부분 처리 방법
new CanvasExample((_,ctx: CanvasRenderingContext2D) => {
    ctx.lineWidth = 20;
    ctx.strokeStyle = "blue"

    ctx.beginPath();
    ctx.moveTo(100, 50);
    ctx.lineTo(300, 50);
    ctx.lineCap = "butt"; // 선 끝을 좌표에 맞춰서 마무리 (기본값)
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(100, 100);
    ctx.lineTo(300, 100);
    ctx.lineCap = "round"; // 선 끝을 둥글게 ( 선 두께를 반지름으로 )
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(100, 150);
    ctx.lineTo(300, 150);
    ctx.lineCap = "square"; // 선 끝을 선 두께만큼 더 길게 처리
    ctx.stroke();
})

//선의 꺾인 부분 처리
new CanvasExample((_,ctx: CanvasRenderingContext2D) => {
    ctx.lineWidth = 20;
    ctx.strokeStyle = "blue";

    ctx.beginPath();
    ctx.moveTo(100, 50);
    ctx.lineTo(300, 50);
    ctx.lineTo(300, 100);
    ctx.lineJoin = "miter"; // 각진 모서리 형태
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(100, 150);
    ctx.lineTo(300, 150);
    ctx.lineTo(300, 200);
    ctx.lineJoin = "round"; // 둥글게
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(100, 250);
    ctx.lineTo(300, 250);
    ctx.lineTo(300, 300);
    ctx.lineJoin = "bevel"; // 잘려나간 모서리
    ctx.stroke();
})

//점선 만들기
new CanvasExample((_,ctx: CanvasRenderingContext2D) => {
    ctx.lineWidth = 20;

    ctx.beginPath();
    ctx.moveTo(100, 50);
    ctx.lineTo(300, 50);
    ctx.setLineDash([20]) //선=공백
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(100, 100);
    ctx.lineTo(300, 100);
    ctx.setLineDash([20, 10]) //선-공백
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(100, 150);
    ctx.lineTo(300, 150);
    ctx.setLineDash([20, 10, 50, 10]) //패턴 선-공백-선-공백
    ctx.stroke();
});

//사각형 그리기
new CanvasExample((_,ctx: CanvasRenderingContext2D) => {
    ctx.strokeRect(20,20,100,100);
    ctx.strokeRect(150,150,50,50);
});

//사각형 내부 채우기
new CanvasExample((_,ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = 'red';
    ctx.fillRect(20,20,100,100); // 내부가 칠해진 사각형 그리기
    ctx.strokeRect(20,20,100,100); // 사각형 모서리 그리기
    ctx.fillStyle = 'green';
    ctx.fillRect(150,150,50,50);
    ctx.strokeRect(150,150,50,50);
});

//특정 영역 (사각형) 지우기
new CanvasExample((_,ctx: CanvasRenderingContext2D) => {
    ctx.lineWidth = 10;
    ctx.strokeStyle = 'red';
    ctx.fillStyle = 'blue';
    ctx.fillRect(50,50,200,200);
    ctx.strokeRect(50,50,200,200);
    ctx.clearRect(70, 70, 100, 50); // 특정 영역 지우기
})

//원 그리기
new CanvasExample((_,ctx: CanvasRenderingContext2D) => {
    ctx.arc(150, 150, 100, 0, Math.PI*2, true); // x, y, 반지름, 시작각도, 끝각도, 그리는방향(시계방향 default)
    ctx.stroke() // 선 긋기
})

//선과 호를 연결하기
new CanvasExample((_,ctx: CanvasRenderingContext2D) => {
    ctx.beginPath(); // 시작 위치로 이동
    ctx.moveTo(50, 50);
    ctx.lineTo(300, 50);
    ctx.arcTo(350,50,350,100,50); //호 그리기 시작x, 시작y, 끝x, 끝y, 반지름
    ctx.lineTo(350, 200);
    ctx.stroke();
})

//조절점 하나짜리 커브 그리기
new CanvasExample((_,ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(300, 50);
    ctx.quadraticCurveTo(200,100,350,100); //조절점x, 조절점y, 끝나는점x, 끝나는점y
    ctx.lineTo(350, 200);
    ctx.stroke();
})

//조절점 두개짜리 커브 그리기
new CanvasExample((_,ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(300, 50);
    ctx.bezierCurveTo(200,70, 100,150, 350,100);
    ctx.lineTo(350, 200);
    ctx.stroke();
})

//리니어 그라디언트로 내부 채우기
new CanvasExample((_,ctx: CanvasRenderingContext2D) => {
    const grad = ctx.createLinearGradient(50, 50, 250, 50); //시작좌표, 종료좌표
    grad.addColorStop(0, 'red');
    grad.addColorStop(1 / 6, "orange");
    grad.addColorStop(2 / 6, "yellow");
    grad.addColorStop(3 / 6, "green");
    grad.addColorStop(4 / 6, "aqua");
    grad.addColorStop(5 / 6, "blue");
    grad.addColorStop(1, "purple");
    ctx.lineWidth = 5;
    ctx.fillStyle = grad; // 만든 그라디언트로 fill 스타일 지정
    ctx.fillRect(50, 50, 200, 200); // 채우기
    ctx.strokeRect(50, 50, 200, 200); // 선 그리기
})

//둥근 그라디언트로 내부 채우기
new CanvasExample((_,ctx: CanvasRenderingContext2D) => {
    const grad = ctx.createRadialGradient(0, 0, 0, 100, 100, 300); // 시작좌표, 시작반지름, 끝좌표, 끝 반지름
    grad.addColorStop(0, 'red');
    grad.addColorStop(0.5, "yellow");
    grad.addColorStop(1, "black");
    ctx.lineWidth = 5;
    ctx.fillStyle = grad; // 만든 그라디언트로 fill 스타일 지정
    ctx.fillRect(0, 0, 300, 300); // 채우기
    ctx.strokeRect(0, 0, 300, 300); // 선 그리기
})

//패턴으로 사각형 내부 채우기 (패턴 원본 사이즈 조절 못함)
new CanvasExample(($canvas:HTMLCanvasElement,ctx: CanvasRenderingContext2D) => {
    const patternImage = new Image();
    patternImage.src = PATTERN_IMAGE;
    patternImage.onload = () => {
        ctx.fillStyle = ctx.createPattern(patternImage, "repeat")!;
        ctx.fillRect(0, 0, $canvas.width, $canvas.height);
    }
})

//패턴 이미지 사이즈 조절해서 사용하기
new CanvasExample(($canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    const patternImage = new Image();
    patternImage.src = PATTERN_IMAGE;

    // 원하는 패턴 크기를 설정하는 변수를 추가합니다
    const patternWidth = 200; // 원하는 패턴의 너비
    const patternHeight = 200; // 원하는 패턴의 높이

    patternImage.onload = () => {
        // 임시 캔버스를 생성하여 패턴 이미지를 조정합니다
        const patternCanvas = document.createElement('canvas');
        const patternCtx = patternCanvas.getContext('2d')!;

        // 패턴 캔버스의 크기를 설정
        patternCanvas.width = patternWidth;
        patternCanvas.height = patternHeight;

        // 이미지를 패턴 크기에 맞게 축소하여 그리기
        patternCtx.drawImage(patternImage, 0, 0, patternWidth, patternHeight);

        // 생성된 패턴을 현재 ctx에 설정
        ctx.fillStyle = ctx.createPattern(patternCanvas, "repeat")!;
        // 캔버스 전체에 패턴을 적용
        ctx.fillRect(0, 0, $canvas.width, $canvas.height);
    };
});

//이미지를 원래 크기대로 그리기
new CanvasExample((_, ctx: CanvasRenderingContext2D) => {
    const myPic = new Image();
    myPic.src = IMAGE;
    myPic.onload = () => {
        ctx.drawImage(myPic, 10, 10); //그릴이미지, 시작 좌표
    }
})

//이미지의 크기를 변형하여 그리기
new CanvasExample((_, ctx: CanvasRenderingContext2D) => {
    const myPic = new Image();
    myPic.src = IMAGE;
    myPic.onload = () => {
        ctx.drawImage(myPic, 10, 10, 150, 100); //그릴이미지, 시작 좌표, 이미지 폭과 높이
    }
})

//이미지를 잘라 일부만 그리기
new CanvasExample((_,ctx: CanvasRenderingContext2D) => {
    const myPic = new Image();
    myPic.src = IMAGE;
    myPic.onload = () => {
        ctx.drawImage(myPic, 20, 20, 200, 200, 10,10, 300,200); //그릴이미지, 잘릴시작 좌표, 잘릴이미지 폭과 높이, 이미지시작좌표, 이미지 폭과 높이
    }
})