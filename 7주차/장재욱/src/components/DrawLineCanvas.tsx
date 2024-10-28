import {useEffect, useRef, useState} from "react";
import CanvasDrawer from "../classes/canvasDrawer.ts";
import "./drawLineCanvas.css";

interface Record {
    name: string;
    time: number;
}

const DrawLineCanvas = () => {
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

    const startGame = () => {
        setIsStarted(true);
        setBlockScreen(false);
        setIsFirst(false);
        setIsSubmit(false);
        setElapsedTime(0);
        if (canvasRef.current) {
            drawerRef.current = new CanvasDrawer(canvasRef.current, onComplete, () => {setBlockScreen(true)});
        }
    };

    const onComplete = () => {
        setIsStarted(false);
    };

    const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
        if (isStarted) drawerRef.current?.handleClick(event);
    };

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

    const loadRecords = () => {
        const records = localStorage.getItem("records");
        if (records) {
            setRecords(JSON.parse(records));
        }
    };

    const saveRecords = (records: Record[]) => {
        localStorage.setItem("records", JSON.stringify(records));
    };

    return (
        <>
            <div className={"canvas_container"}>
                {blockScreen && (
                    <div className={"before_start_container"}>
                        {(!isFirst && elapsedTime > 0) && <h3 style={{color: "#fff"}}>Your record is {elapsedTime} seconds.</h3>}
                        <button onClick={startGame} style={{fontSize: "20px", padding: "5px"}}>{isFirst ? 'Start' : 'Retry'}</button>
                        {
                            (!isFirst && !isSubmit) &&
                            <form onSubmit={handleNameSubmit} style={{marginTop: "20px"}}>
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    value={playerName}
                                    onChange={(e) => setPlayerName(e.target.value)}
                                    style={{fontSize: "20px", padding: "5px"}}
                                />
                                <button type="submit" style={{fontSize: "20px", padding: "5px"}}>
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
