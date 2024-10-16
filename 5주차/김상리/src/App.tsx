import "./App.css";
import Snowflake from "./canvas/week5/Snowflake";
import RealSnowflake from "./canvas/week5/RealSnowflake";
import WindSnowflake from "./canvas/week5/WindSnowflake";
import Particles from "./canvas/week5/Particles";
import SplashParticles from "./canvas/week5/SplashParticles";
import SeveralParticles from "./canvas/week5/SeveralParticles";
import GradientParticles from "./canvas/week5/GradientParticles";
import AudioSpectrum from "./canvas/week5/AudioSpectrum";
import AudioSpectrumBar from "./canvas/week5/AudioSpectrumBar";
import GradientAudioSpectrumBar from "./canvas/week5/GradientAudioSpectrumBar";

function App() {
  return (
    <>
      <h1>🪄5주차</h1>
      <div className="wrap">
        <Snowflake />
        <RealSnowflake />
        <WindSnowflake />
        <Particles />
        <SplashParticles />
        <SeveralParticles />
        <GradientParticles />
        <AudioSpectrum />
        <AudioSpectrumBar />
        <GradientAudioSpectrumBar />
      </div>
    </>
  );
}

export default App;
