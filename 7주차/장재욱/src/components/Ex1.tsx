import DrawLineCanvas from "./DrawLineCanvas.tsx";

// 비행기 선 그리는 예제
const Ex1 = () => {
    return (
        <DrawLineCanvas
            id={'airplane'}
            drawingImage={"./src/assets/dottodot_airplane.png"}
            completedImage={"./src/assets/dottodot_airplane_finish.png"}
            totalCount={32}
            positionList={[
                { x: 251, y: 148 }, { x: 81, y: 69 }, { x: 30, y: 77 },
                { x: 149, y: 181 }, { x: 110, y: 210 }, { x: 62, y: 164 },
                { x: 93, y: 224 }, { x: 80, y: 243 }, { x: 109, y: 243 },
                { x: 152, y: 298 }, { x: 142, y: 255 }, { x: 190, y: 252 },
                { x: 220, y: 288 }, { x: 214, y: 313 }, { x: 265, y: 288 },
                { x: 234, y: 280 }, { x: 210, y: 242 }, { x: 224, y: 237 },
                { x: 500, y: 390 }, { x: 560, y: 349 }, { x: 329, y: 194 },
                { x: 446, y: 128 }, { x: 503, y: 158 }, { x: 531, y: 140 },
                { x: 467, y: 107 }, { x: 470, y: 21 }, { x: 444, y: 27 },
                { x: 420, y: 84 }, { x: 370, y: 65 }, { x: 343, y: 80 },
                { x: 392, y: 105 },
            ]}
        />
    );
};

export default Ex1;
