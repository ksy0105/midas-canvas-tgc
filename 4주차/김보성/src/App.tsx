import Synthesis from "./components/example/Synthesis";
import Animation from "./components/example/Animation";
import ClickDraw from "./components/example/ClickDraw";
import BackgroundAnimation from "./components/example/BackgroundAnimation";
import ImageMovingAnimation from "./components/example/imageMovingAnimation/ImageMovingAnimation";
import JsonObjectArray from "./components/example/jsonObjectArray/JsonObjectArray";
import ShootingCollision from "./components/example/shootingCollision/ShootingCollision.tsx";

function App() {
  return (
    <div style={{display: 'flex', flexWrap: 'wrap'}}>
        <ShootingCollision />
        <Synthesis />
        <Animation/>
        <ClickDraw />
        <BackgroundAnimation />
        <ImageMovingAnimation />
        <JsonObjectArray />
    </div>
  )
}

export default App
