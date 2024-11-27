import { useCallback, useState } from "react";
import Face from "./components/Face";
import "./App.css";

function App() {
  const [changeExpression, setChangeExpression] = useState<
    ((expression: string) => void) | null
  >(null);

  const handleFaceReady = useCallback(
    (changeExpressionFn: (expression: string) => void) => {
      setChangeExpression(() => changeExpressionFn);
    },
    []
  );

  return (
    <>
      <Face onReady={handleFaceReady} />
      <div id="info">
        {/* <a href="https://threejs.org" target="_blank" rel="noopener">
          three.js
        </a>
        webgl - morph targets - face
        <br />
        model by{" "}
        <a
          href="https://www.bannaflak.com/face-cap"
          target="_blank"
          rel="noopener"
        >
          Face Cap
        </a> */}
        <button onClick={() => changeExpression?.("openMouth")}>
          입 벌리기
        </button>
        <button onClick={() => changeExpression?.("closeMouth")}>
          입 닫기
        </button>
      </div>
    </>
  );
}

export default App;
