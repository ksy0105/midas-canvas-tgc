// 글씨의 상하정렬 알아보기

const ID = 'canvas3-6-5'

document.querySelector<HTMLDivElement>('#app')!.insertAdjacentHTML('beforeend', `<canvas id="${ID}" width="400" height="300"></canvas>`)
const canvas = document.querySelector<HTMLCanvasElement>(`#${ID}`)!
const ctx = canvas.getContext('2d')!

ctx.fillStyle = '#6495ED'
ctx.font = 'italic bold 30px Arial, sans-serif'
ctx.textBaseline = 'top'
ctx.fillText('top!', 10, 150)
ctx.textBaseline = 'bottom'
ctx.fillText('bottom!', 50, 150)
ctx.textBaseline = 'middle'
ctx.fillText('middle!', 130, 150)
ctx.textBaseline = 'alphabetic'
ctx.fillText('alphabetic!', 220, 150)
ctx.textBaseline = 'hanging'
ctx.fillText('hanging!', 300, 150)
ctx.strokeStyle = 'red'
ctx.moveTo(20, 150)
ctx.lineTo(370, 150)
ctx.stroke()
