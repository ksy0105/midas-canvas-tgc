// 이미지를 잘라 일부만 그리기

const ID = 'canvas3-5-3'

document.querySelector<HTMLDivElement>('#app')!.insertAdjacentHTML('beforeend', `<canvas id="${ID}" width="400" height="300"></canvas>`)
const canvas = document.querySelector<HTMLCanvasElement>(`#${ID}`)!
const ctx = canvas.getContext('2d')!

const iu = new Image()
iu.src = "image02.png"
iu.onload = () => {
    ctx.drawImage(iu, 20, 20, 200, 200, 10, 10, 300, 200)
}