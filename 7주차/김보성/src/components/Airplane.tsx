import {useCanvas} from "../hook/useCanvas.ts";
import {useLoadImage} from "../hook/useLoadImage.ts";
import {useEffect, useState} from "react";
import MouseVO from "./vo/MouseVO.ts";

// 캔버스 사이즈
const ctxW = 600;
const ctxH = 400;

let startX = 0;
let startY = 0;
let arrCoords: MouseVO[] = [];

const totalPaint = 5;

const Airplane = () => {
    const {dotImg, airplane_Img, isCompleted} = useLoadImage();
    const [ctxObj, setCtxObj] = useState<CanvasRenderingContext2D | null>(null);

    const animate = (ctx: CanvasRenderingContext2D | null) => {
        if(!ctx) return;
        if(!ctxObj) {
            setCtxObj(ctx);
        }
    };

    const ref = useCanvas(ctxW, ctxH, animate);

    useEffect(() => {
        if(ctxObj) {
            ctxObj.drawImage(dotImg, 0,0);

            window.addEventListener('click', (e) => {
                if(!ctxObj) return;

                if(arrCoords.length >= totalPaint) {
                    return;
                }

                let mouseX = e.clientX - ctxObj.canvas.offsetLeft;
                let mouseY = e.clientY - ctxObj.canvas.offsetTop;
                let radius = 8;

                if(!arrCoords.length) {
                    startX = mouseX - 5;
                    startY = mouseY;
                    ctxObj.beginPath();
                    ctxObj.moveTo(startX, startY);
                } else {
                    ctxObj.moveTo(startX, startY);
                    startX = mouseX - 5;
                    startY = mouseY;
                    ctxObj.lineTo(startX, startY);
                }

                ctxObj.stroke();

                // 원 그리기
                ctxObj.beginPath();
                ctxObj.arc(mouseX, mouseY, radius, 0, 6.28);
                ctxObj.fillStyle = 'yellow';
                ctxObj.fill();
                ctxObj.stroke();

                // 텍스트 그리기
                ctxObj.font = 'normal bold 8px Arial, sans-serif';
                ctxObj.fillStyle = '#000000';
                ctxObj.fillText(`${arrCoords.length + 1}`, mouseX -3, mouseY + 4);

                arrCoords.push(new MouseVO({x: mouseX, y: mouseY}));

                if(arrCoords.length == totalPaint) {
                    // 마지막 점이 그려지고 완료되도록 setTimeout 적용
                    setTimeout(() => {
                        alert('완료');
                        ctxObj.drawImage(airplane_Img, 0, 0);
                    }, 300);
                }
            })
        }
    }, [ctxObj]);

    if(isCompleted) return;

    return (
        <div style={{display: 'flex', gap: 10}}>
            <canvas style={{border: '1px solid black'}} ref={ref}/>
            <img style={{border: '1px solid black', display: "none"}} src={'/dottodot_airplane.png'}/>
        </div>
    );
}

export default Airplane;