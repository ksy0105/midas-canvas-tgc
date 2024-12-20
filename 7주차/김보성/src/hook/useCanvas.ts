import {RefObject, useEffect, useRef} from 'react';

// https://blog.dalgu.app/dev/1 소스 참조
export const useCanvas = (
    canvasWidth: number,
    canvasHeight: number,
    animate: (ctx: CanvasRenderingContext2D | null) => void
) => {
    const canvasRef: RefObject<HTMLCanvasElement> = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;

        if(!canvas) return;

        const ctx = canvas.getContext('2d');

        const setCanvas = () => {
            // css pixels 와 물리적 화면의 픽셀 해상도의 비율을 반환 함
            const devicePixelRatio = window.devicePixelRatio ?? 1;

            if(canvas && ctx) {
                canvas.style.width = canvasWidth + 'px';
                canvas.style.height = canvasHeight + 'px';

                canvas.width = canvasWidth * devicePixelRatio;
                canvas.height = canvasHeight * devicePixelRatio;

                // scale : 캔버스 단위에 수평 및/또는 수직으로 크기 조정 변환을 추가합니다.
                ctx.scale(devicePixelRatio, devicePixelRatio);
            }
        }

        setCanvas();

        animate(ctx);

    }, [canvasHeight, canvasHeight, animate, canvasRef.current]);

    return canvasRef;
}