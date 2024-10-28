import './style.css'

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

const img = document.getElementById('img') as HTMLImageElement;
ctx.drawImage(img, 0, 0);

interface Point {
    x: number;
    y: number;
    connections: number[];
}
const POINTS: {[key: number]: Point} = {
    1: { x: 274, y: 54, connections: [2, 8, 10, 16] },
    2: { x: 413, y: 55, connections: [1, 3, 9, 11] },
    3: { x: 512, y: 154, connections: [2, 4, 10, 12] },
    4: { x: 512, y: 293, connections: [3, 5, 11, 13] },
    5: { x: 413, y: 393, connections: [4, 6, 12, 14] },
    6: { x: 274, y: 393, connections: [5, 7, 13, 15] },
    7: { x: 175, y: 293, connections: [6, 8, 14, 16] },
    8: { x: 175, y: 156, connections: [1, 7, 9, 15] },
    9: { x: 308, y: 139, connections: [2, 8, 12, 14] },
    10: { x: 378, y: 140, connections: [1, 3, 13, 15] },
    11: { x: 429, y: 189, connections: [2, 4, 14, 16] },
    12: { x: 428, y: 259, connections: [3, 5, 9, 15] },
    13: { x: 378, y: 308, connections: [4, 6, 10, 16] },
    14: { x: 308, y: 308, connections: [5, 7, 9, 11] },
    15: { x: 259, y: 259, connections: [6, 8, 10, 12] },
    16: { x: 259, y: 189, connections: [1, 7, 11, 13] },
};
let curPointKey: number | null = null;

const connections = new Set<string>();

const getConnection = (point1: number, point2: number) => {
    const min = Math.min(point1, point2);
    const max = Math.max(point1, point2);
    return `${min}-${max}`;
}

const TOTAL_CONNECTION_SIZE = new Set(Object.keys(POINTS).reduce((acc, cur) => {
    return [...acc, ...POINTS[parseInt(cur)].connections.map(endId => getConnection(parseInt(cur), endId))];
}, new Array<string>())).size;

let clickIndex = 0;

// 오차 범위 내에 있는지 확인
const withInErrorRange = (x1: number, y1: number, x2: number, y2: number) => {
    const ERROR_RANGE = 10;
    return Math.abs(x1 - x2) <= ERROR_RANGE && Math.abs(y1 - y2) <= ERROR_RANGE;
}

const drawPoint = (x: number, y: number) => {
    const radius = 8;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'yellow';
    ctx.fill();
    ctx.stroke();

    ctx.font = "normal bold 8px Arial, sans-serif";
    ctx.fillStyle = 'black';
    ctx.fillText((++clickIndex).toString(), x - 4, y + 1);
}

const isUnableMove = (pointId: number) => {
    const point = POINTS[pointId];
    if (!point) return false;

    return point.connections.every((connectedPoint) =>
        connections.has(getConnection(pointId, connectedPoint))
    );
}

canvas.addEventListener("click", (e: MouseEvent) => {
    if (!curPointKey) {
        const firstPoint = Object.entries(POINTS).find(([_, point]) =>
            withInErrorRange(point.x, point.y, e.clientX - ctx.canvas.offsetLeft, e.clientY - ctx.canvas.offsetTop)
        );
        if (!firstPoint) return;

        const [key, point] = firstPoint;
        curPointKey = parseInt(key);
        drawPoint(point.x, point.y);
    } else {
        const mouseX = e.clientX - ctx.canvas.offsetLeft;
        const mouseY = e.clientY - ctx.canvas.offsetTop;

        const _nextPoint = Object.entries(POINTS).find(([key, point]) =>
            withInErrorRange(point.x, point.y, mouseX, mouseY) &&
            curPointKey !== null && POINTS[curPointKey].connections.includes(parseInt(key))
        );

        if (!_nextPoint) return;

        const [_nextPointKey, nextPoint] = _nextPoint;
        const nextPointKey = parseInt(_nextPointKey);

        const connection = getConnection(curPointKey, nextPointKey);
        if (connections.has(connection)) {
            alert("이미 그린 선입니다.");
            return;
        }
        connections.add(connection);

        if (curPointKey) {
            ctx.moveTo(POINTS[curPointKey].x, POINTS[curPointKey].y);
            ctx.lineTo(nextPoint.x, nextPoint.y);
        } else {
            ctx.moveTo(nextPoint.x, nextPoint.y);
        }
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 3;
        ctx.stroke();

        drawPoint(nextPoint.x, nextPoint.y);

        curPointKey = nextPointKey;

        if (connections.size === TOTAL_CONNECTION_SIZE) {
            setTimeout(() => {
                alert("한붓그리기에 성공하였습니다!");
            }, 10);
        } else if (isUnableMove(curPointKey)) {
            setTimeout(() => {
                alert("한붓그리기에 실패하였습니다. 다시 시도하세요.");
            }, 10);
        }
    }
});

const restartButton = document.getElementById('restart') as HTMLButtonElement;
restartButton.addEventListener('click', () => {
    clickIndex = 0;
    curPointKey = null;
    connections.clear();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
});