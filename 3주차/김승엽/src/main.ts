import './style.css'

// 3.1 선그리기

// 사각형 그리기
const canvas1 = document.querySelector<HTMLCanvasElement>('#canvas1')!
const ctx1 = canvas1.getContext('2d')!

ctx1.beginPath()
ctx1.moveTo(100, 50)
ctx1.lineTo(300, 50)
ctx1.lineTo(300, 200)
ctx1.lineTo(100, 200)
ctx1.lineTo(100, 50)
ctx1.lineWidth = 20
ctx1.strokeStyle = '#0000ff'
ctx1.lineCap = 'square'
ctx1.stroke()
ctx1.fillStyle = 'red'
ctx1.fill()

// 선의 세 가지 끝부분 처리 방법 알아보기
const canvas2 = document.querySelector<HTMLCanvasElement>('#canvas2')!
const ctx2 = canvas2.getContext('2d')!

ctx2.lineWidth = 20
ctx2.strokeStyle = '#0000ff'

ctx2.beginPath()
ctx2.moveTo(100, 50)
ctx2.lineTo(300, 50)
ctx2.lineCap = 'butt'
ctx2.stroke()

ctx2.beginPath()
ctx2.moveTo(100, 100)
ctx2.lineTo(300, 100)
ctx2.lineCap = 'round'
ctx2.stroke()

ctx2.beginPath()
ctx2.moveTo(100, 150)
ctx2.lineTo(300, 150)
ctx2.lineCap = 'square'
ctx2.stroke()

// 선의 꺾인 부분 처리하기
const canvas3 = document.querySelector<HTMLCanvasElement>('#canvas3')!
const ctx3 = canvas3.getContext('2d')!

ctx3.lineWidth = 20
ctx3.strokeStyle = '#0000ff'

ctx3.beginPath()
ctx3.moveTo(100, 50)
ctx3.lineTo(300, 50)
ctx3.lineTo(300, 100)
ctx3.lineJoin = 'miter'
ctx3.stroke()

ctx3.beginPath()
ctx3.moveTo(100, 150)
ctx3.lineTo(300, 150)
ctx3.lineTo(300, 200)
ctx3.lineJoin = 'round'
ctx3.stroke()

ctx3.beginPath()
ctx3.moveTo(100, 250)
ctx3.lineTo(300, 250)
ctx3.lineTo(300, 300)
ctx3.lineJoin = 'bevel'
ctx3.stroke()

// 선의 간격을 조정하여 점선 만들기
const canvas4 = document.querySelector<HTMLCanvasElement>('#canvas4')!
const ctx4 = canvas4.getContext('2d')!

ctx4.lineWidth = 10

ctx4.beginPath()
ctx4.moveTo(100, 50)
ctx4.lineTo(300, 50)
ctx4.lineTo(300, 100)
ctx4.setLineDash([20])
ctx4.stroke()

ctx4.beginPath()
ctx4.moveTo(100, 150)
ctx4.lineTo(300, 150)
ctx4.lineTo(300, 200)
ctx4.setLineDash([20, 10])
ctx4.stroke()

ctx4.beginPath()
ctx4.moveTo(100, 250)
ctx4.lineTo(300, 250)
ctx4.lineTo(300, 300)
ctx4.setLineDash([20, 10, 50, 10])
ctx4.stroke()