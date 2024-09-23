// 이미지를 원래 크기대로 그리기

const ID = 'canvas3-5-1'

document.querySelector<HTMLDivElement>('#app')!.insertAdjacentHTML('beforeend', `<canvas id="${ID}" width="400" height="300"></canvas>`)
const canvas = document.querySelector<HTMLCanvasElement>(`#${ID}`)!
const ctx = canvas.getContext('2d')!

const iu = new Image()
iu.src = "image02.png"
iu.onload = () => {
    ctx.drawImage(iu, 10, 10)
}