import insertCanvas from "../insertCanvas.ts";

const {ctx, canvas} = insertCanvas({style: { border: '1px solid black' }})

// 클릭한 곳에 사각형 그리기
canvas.addEventListener('click', e => {
    const x = e.clientX - canvas.offsetLeft
    const y = e.clientY - canvas.offsetTop
    ctx.fillStyle = 'red'
    ctx.fillRect(x - 10, y - 10, 20, 20)
})