import CanvasComponent from '../../CanvasComponent.tsx';
import {useEffect, useRef, useState} from "react";

const JsonObjectArray = () => {
    const ref = useRef<HTMLCanvasElement>(null);

    const [ctxObj, setCtxObj] = useState<CanvasRenderingContext2D | null>(null);

    const buildingsImg = new Image();
    buildingsImg.src = 'buildings.png';

    // 블록 그리기
    const rects = [
        {id: '1', x: 50, y: 100, w: 50, h: 50, bg: 'magenta'},
        {id: '2', x: 150, y: 100, w: 50, h: 50, bg: 'green'},
        {id: '3', x: 250, y: 100, w: 50, h: 50, bg: 'orange'},
    ];

    const buildings = [
        {id: 'AirPort', x: 50, y: 250, w: 64, h: 64, sx: 0, sy: 0},
        {id: 'Bank', x: 150, y: 250, w: 64, h: 64, sx: 100, sy: 0},
        {id: 'CarRepair', x: 250, y: 250, w: 64, h: 64, sx: 200, sy: 0},
        {id: 'GasStation', x: 50, y: 350, w: 64, h: 64, sx: 300, sy: 0},
        {id: 'Hospital', x: 150, y: 350, w: 64, h: 64, sx: 400, sy: 0},
        {id: 'Temple', x: 250, y: 350, w: 64, h: 64, sx: 500, sy: 0},
    ];

    const drawImage = () => {
        if(!ctxObj) return;

        // 블록 그리기
        rects.forEach((item) => {
            ctxObj.fillStyle = item.bg;
            ctxObj.fillRect(item.x, item.y, item.w, item.h);
        });

        buildings.forEach((item) => {
            ctxObj.drawImage(buildingsImg, item.sx, item.sy, item.w, item.h, item.x, item.y, item.w, item.h);
        });
    }

    const draw = (ctx: CanvasRenderingContext2D) => {
        setCtxObj(ctx);
    }

    useEffect(() => {
        if(ctxObj){
            // 이미지 못불러오는 이슈로 setTimeout 처리
            setTimeout(drawImage, 50);
        }
    }, [ctxObj]);

    useEffect(() => {
        if(!ref.current) return;

        // 마우스 충돌 이벤트
        ref.current.addEventListener('click', (e) => {
            if(!ctxObj) return;

            const mouseX = e.clientX - ctxObj.canvas.offsetLeft;
            const mouseY = e.clientY - ctxObj.canvas.offsetTop;

            buildings.forEach((item) => {

                if(mouseX >= item.x && mouseX < item.x + item.w
                 && mouseY >= item.y && mouseY < item.y + item.h
                ) {
                    ctxObj.clearRect(100, 450, 200, 30);

                    ctxObj.fillStyle = 'black';
                    ctxObj.fillRect(100, 450, 200, 30);

                    ctxObj.fillStyle = 'white';
                    ctxObj.textAlign = 'center';
                    ctxObj.font = 'bold 20px Arial, sans-serif';
                    ctxObj.fillText(item.id, 200, 470);
                }
            })
        })
    }, [ref.current]);

    return (
        <CanvasComponent draw={draw} ref={ref}/>
    );
}

export default JsonObjectArray;