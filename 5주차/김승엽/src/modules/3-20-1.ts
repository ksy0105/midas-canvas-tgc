import insertCanvas from "../insertCanvas.ts";

const {ctx} = insertCanvas()

document.querySelector<HTMLDivElement>('#app')!.insertAdjacentHTML('beforeend', `<div id="audio_player"><div id="audio_box"></div></div>`)

const audio = new Audio()
audio.src = "audio01.mp3"
audio.controls = true
audio.loop = false
audio.autoplay = false

document.getElementById('audio_box')!.appendChild(audio)

const ctxW = ctx.canvas.width
const ctxH = ctx.canvas.height

ctx.fillStyle = 'black'
ctx.fillRect(0, 0, ctxW, ctxH)

let context
let analyser
let sourceNode
let bufferLength
let arrData

function setupAudioNodes() {
    context = new AudioContext()
    analyser = context.createAnalyser()
    sourceNode = context.createMediaElementSource(audio)
    sourceNode.connect(analyser)
    analyser.connect(context.destination)
    bufferLength = analyser.frequencyBinCount
    arrData = new Uint8Array(bufferLength)
    updateVisualization()
}

function updateVisualization() {
    requestAnimationFrame(updateVisualization)
    analyser.getByteFrequencyData(arrData)
    drawBars(arrData)
}

function drawBars(arrData) {
    ctx.clearRect(0, 0, ctxW, ctxH)
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, ctxW, ctxH)

    const grad = ctx.createLinearGradient(0, 0, 0, ctxH)
    grad.addColorStop(0, 'white')
    grad.addColorStop(0.85, 'white')
    grad.addColorStop(0.9, 'yellow')
    grad.addColorStop(0.95, 'red')
    grad.addColorStop(1, 'black')

    const barWidth = (ctxW / bufferLength) * 2.5
    const bars = arrData.length
    let x = 0
    let space = 2
    for(let i = 0; i < bars; i++) {
        let barHeight = arrData[i] / 2
        ctx.fillStyle = grad
        ctx.fillRect(x, ctxH - barHeight/2, barWidth, barHeight)
        x += barWidth + space

        if (i % 15 === 0) {
            ctx.font = '10px sans-serif'
            ctx.textBaseline = 'bottom'
            ctx.fillText(Math.floor(context.sampleRate / analyser.fftSize * i), i * space + 5, 15)
        }
    }
}

setupAudioNodes()