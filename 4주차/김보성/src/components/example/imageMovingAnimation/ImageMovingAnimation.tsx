import CanvasComponent from '../../CanvasComponent.tsx';
import {useEffect, useRef, useState} from "react";
import BackgroundVO from "./vo/BackgroundVO";
import PlayerVO from "./vo/PlayerVO";

let animateInterval: number | null = null;

const ImageMovingAnimation = () => {
    const ref = useRef<HTMLCanvasElement>(null);
    const speed = 5;

    const [player, setPlayer] = useState(new PlayerVO());
    const [ctxObj, setCtxObj] = useState<CanvasRenderingContext2D | null>(null);
    const canvasWidth = 1692 / 2;
    const canvasHeight = 840 / 2;

    const background = new BackgroundVO();

    const animation = () => {
        if(!ctxObj) return;

        background.render(ctxObj);
        player.render(ctxObj);
    }

    const update = (code: string) => {
        switch (code) {
            case  'w':
                player.y -= speed;
                return;
            case  's':
                player.y += speed;
                return;
            case  'a':
                player.x -= speed;
                return;
            case  'd':
                player.x += speed;
                return;
        }

        setPlayer(new PlayerVO(player));
    }

    const draw = (ctx: CanvasRenderingContext2D) => {
        setCtxObj(ctx);
    }

    useEffect(() => {
        if(ctxObj){
            animateInterval = setInterval(animation, 30);
        }
    }, [ctxObj]);

    useEffect(() => {
        window.addEventListener('keydown',(e) => {
            update(e.key);
        });

        return () => {
            if(animateInterval) {
                clearInterval(animateInterval);
            }

            window.removeEventListener('keydown',(e) => {
                update(e.key);
            });
        }
    }, []);

    return (
        <CanvasComponent draw={draw} ref={ref} widthVal={canvasWidth} heightVal={canvasHeight}/>
    );
}

export default ImageMovingAnimation;