import {RefObject, useEffect, useRef} from 'react';

// https://blog.dalgu.app/dev/1 소스 참조
export const useCanvas = (
    canvasWidth: number,
    canvasHeight: number,
    animate: (ctx: CanvasRenderingContext2D) => void
) => {
    const canvasRef: RefObject<HTMLCanvasElement> = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');

        const setCanvas = () => {
            // css pixels 와 물리적 화면의 픽셀 해상도의 비율을 반환 함
            const devicePixelRatio = window.devicePixelRatio ?? 1;

            if(canvas && ctx) {
                canvas.style.width = canvasWidth + 'px';
                canvas.style.width = canvasHeight + 'px';

                // scale : 캔버스 단위에 수평 및/또는 수직으로 크기 조정 변환을 추가합니다.
                ctx.scale(devicePixelRatio, devicePixelRatio);
            }
        }

        setCanvas();

        let requestId: number = 0;

        const requestAnimation = () => {
            // requestAnimationFrame 디스플레이 주사율에 따라 반복 호출 해줌
            requestId = window.requestAnimationFrame(requestAnimation);

            if(ctx) {
                animate(ctx);
            }
        }

        requestAnimation();

        return () => {
            window.cancelAnimationFrame(requestId);
        }
    }, [canvasHeight, canvasHeight, animate]);

    return canvasRef;
}