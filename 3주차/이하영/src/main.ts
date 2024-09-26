import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter, resetCounter } from './counter.ts'
import { setupCanvas } from './canvas.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
      <button id="reset" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
  <div>
    <canvas id="canvas" width="400" height="400"></canvas>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
resetCounter(document.querySelector<HTMLButtonElement>('#reset')!)

const canvas = document.querySelector<HTMLCanvasElement>('#canvas')!
setupCanvas(canvas)