import Face from "./components/Face";
import "./App.css";

function App() {
  return (
    <>
      <Face />
      <div id="info">
        <a href="https://threejs.org" target="_blank" rel="noopener">
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
        </a>
      </div>
    </>
  );
}

export default App;
