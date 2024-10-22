import {useState, useRef, useEffect, FC} from "react";

interface Props {
    isGameOver: boolean;
}

const SoundButton: FC<Props> = ({isGameOver}) => {
    const ref = useRef<HTMLAudioElement | null>(null);
    const gameOverref = useRef<HTMLAudioElement | null>(null);
    const [isPlay, setIsPlay] = useState(true);

    const handleClickBtn = () => {
        if(!ref.current || !gameOverref.current) return;

        if(isPlay) {
            setIsPlay(false);
            gameOverref.current.pause();
            ref.current.pause();
        } else {
            setIsPlay(true);

            if(isGameOver){
                gameOverref.current.play();
            } else {
                ref.current.play();
            }
        }
    }

    useEffect(() => {
        if (isPlay) {
            if (isGameOver) {
                gameOverref.current?.play();
                ref.current?.pause();
            } else {
                gameOverref.current?.pause();
                ref.current?.play();
            }
        }
    }, [isGameOver]);

    useEffect(() => {
        if(ref.current) {
            ref.current.volume = 0.5;
        }
    }, [ref.current]);

    useEffect(() => {
        if(gameOverref.current) {
            gameOverref.current.volume = 0.25;
        }
    }, [gameOverref.current]);

    return (
        <>
            {/*자동 재생 안될 경우 보안 > 해당 사이트 소리 권한을 허용으로 변경*/}
            <a role={'button'} onClick={handleClickBtn}
               style={{position: "absolute", top: 20, right: 30, cursor: "pointer"}}>
                {isPlay ?
                    <img style={{width: 30, height: 25}} src={'/images/soundOn.png'}/>
                    : <img style={{width: 30, height: 25}} src={'/images/soundOff.png'}/>
                }
            </a>
            <audio style={{display: 'none'}} autoPlay controls loop ref={ref}>
                <source src={'/sounds/bg.mp3'} type={'audio/mp3'}/>
            </audio>
            <audio style={{display: 'none'}} loop ref={gameOverref}>
                <source src={'/sounds/game_over.wav'} type={'audio/wav'}/>
            </audio>
        </>
    )
}

export default SoundButton;