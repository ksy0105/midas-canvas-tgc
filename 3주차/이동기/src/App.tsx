import { useEffect } from 'react';
import './App.css';
import {drawRectangleByPath} from "./canvasScript/rectangleByPath.ts";

function App() {
    useEffect(() => {
        const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                drawRectangleByPath(ctx);
            }
        }
    }, []);

    return (
        <>
            <canvas id="myCanvas" width={400} height={300}>
                Your browser does not support the HTML5 canvas tag.
            </canvas>
        </>
    );
}

export default App;
