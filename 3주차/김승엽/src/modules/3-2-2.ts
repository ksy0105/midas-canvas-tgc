// 내부를 사각형으로 지우기

const ID = 'canvas3-2-2'

document.querySelector<HTMLDivElement>('#app')!.insertAdjacentHTML('beforeend', `<canvas id="${ID}" width="400" height="300"></canvas>`)
const canvas = document.querySelector<HTMLCanvasElement>(`#${ID}`)!
const ctx = canvas.getContext('2d')!

ctx.lineWidth = 10;
ctx.strokeStyle = 'red';
ctx.fillStyle = 'blue'
ctx.fillRect(50, 50, 200, 200)
ctx.strokeRect(50, 50, 200, 200)
ctx.clearRect(70, 70, 100, 50)