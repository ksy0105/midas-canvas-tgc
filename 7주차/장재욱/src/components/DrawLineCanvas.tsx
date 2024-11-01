import {FC, useEffect, useRef, useState} from "react";
import CanvasDrawer, {Position} from "../classes/canvasDrawer.ts";
import "./drawLineCanvas.css";

interface Record {
    name: string;
    time: number;
}

interface Props {
    id: string;
    drawingImage: string;
    completedImage: string;
    totalCount: number;
    positionList: Position[];
}

const DrawLineCanvas: FC<Props> = ({id, drawingImage, completedImage, totalCount, positionList}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const drawerRef = useRef<CanvasDrawer | null>(null);
    const timerRef = useRef<number | null>(null);
    const [playerName, setPlayerName] = useState('');
    const [records, setRecords] = useState<Record[]>([]);
    const [blockScreen, setBlockScreen] = useState(true);
    const [isFirst, setIsFirst] = useState(true);
    const [isSubmit, setIsSubmit] = useState(false);
    const [isStarted, setIsStarted] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
        loadRecords();
    }, []);

    // 시작하면 타이머 시작
    useEffect(() => {
        if (isStarted) {
            timerRef.current = window.setInterval(() => {
                setElapsedTime((prev) => prev + 1);
            }, 1000);
        } else if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isStarted]);

    // 게임 리셋
    const resetGame = () => {
        setIsStarted(true);
        setBlockScreen(false);
        setIsFirst(false);
        setIsSubmit(false);
        setElapsedTime(0);
    }

    // 게임 시작, CanvasDrawer 객체 생성
    const startGame = () => {
        resetGame();
        if (canvasRef.current) {
            drawerRef.current = new CanvasDrawer(
                canvasRef.current,
                drawingImage,
                completedImage,
                totalCount,
                positionList,
                onComplete,
                onCelebrationAnimationComplete
            );
        }
    };

    // 게임 완료
    const onComplete = () => {
        setIsStarted(false);
    };

    // 게임 완료 축하 애니메이션 종료
    const onCelebrationAnimationComplete = () => {
        setBlockScreen(true)
    }

    // 점 클릭
    const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
        if (isStarted) drawerRef.current?.handleClick(event);
    };

    // 기록 제출
    const handleNameSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (playerName.trim() !== "") {
            const newRecord: Record = { name: playerName, time: elapsedTime };
            const updatedRecords = [...records, newRecord];
            updatedRecords.sort((a, b) => a.time - b.time);
            saveRecords(updatedRecords);
            setRecords(updatedRecords);
            setIsSubmit(true);
            setPlayerName("");
        }
    };

    // 로컬스토리지에서 기록 불러오기
    const loadRecords = () => {
        const records = localStorage.getItem(`${id} records`);
        if (records) {
            setRecords(JSON.parse(records));
        }
    };

    // 로컬스토리지에 기록 저장
    const saveRecords = (records: Record[]) => {
        localStorage.setItem(`${id} records`, JSON.stringify(records));
    };

    return (
        <>
            <div className={"canvas_container"}>
                {blockScreen && (
                    <div className={"before_start_container"}>
                        {(!isFirst && elapsedTime > 0) && <h3>Your record is {elapsedTime} seconds.</h3>}
                        <button onClick={startGame}>{isFirst ? 'Start' : 'Retry'}</button>
                        {
                            (!isFirst && !isSubmit) &&
                            <form onSubmit={handleNameSubmit} className={"record_container"}>
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    value={playerName}
                                    onChange={(e) => setPlayerName(e.target.value)}
                                />
                                <button type="submit">
                                    Submit
                                </button>
                            </form>
                        }
                    </div>
                )}
                {!blockScreen && <div className={"time"}>Time: {elapsedTime}s</div>}
                <canvas ref={canvasRef} width={600} height={400} onClick={handleClick}/>
            </div>
            <h3>Records</h3>
            <ol>
                {records.map((hs, index) => (
                    <li key={index}>
                        {hs.name}: {hs.time}초
                    </li>
                ))}
            </ol>
        </>
    );
};

export default DrawLineCanvas;
