const canvas = document.querySelector('#audio_canvas');
const ctx = canvas.getContext('2d');
const audio = new Audio();
audio.src = '/nutcracker.mp3';
audio.controls = true;
audio.loop = false;
audio.autoplay = false;
document.querySelector('#audio_box').append(audio);

const ctxH = canvas.height;
const ctxW = canvas.width;
let context;
let analyser;
let sourceNode;
let bufferLength;
let arrData;

function setupAudioNodes() {
  context = new AudioContext();
  analyser = context.createAnalyser();
  sourceNode = context.createMediaElementSource(audio);
  sourceNode.connect(analyser);
  analyser.connect(context.destination);
  bufferLength = analyser.frequencyBinCount;
  arrData = new Uint8Array(bufferLength);
  updateVisualization();
}

function updateVisualization() {
  requestAnimationFrame(updateVisualization);
  analyser.getByteFrequencyData(arrData);
  drawBars(arrData);
}

function drawBars(arrData) {
  ctx.clearRect(0, 0, ctxW, ctxH);


  const grad = ctx.createLinearGradient(0,0,0,100);
  grad.addColorStop(0,'#ffffff');
  grad.addColorStop(0.25,'#ffff00');
  grad.addColorStop(0.75,'#ff0000');
  grad.addColorStop(1,'#000000');

  const barWidth = (ctxW / bufferLength) * 2.5;
  const bars = arrData.length;
  let x = 0;
  const space = 2;
  for (let i = 0; i < bars; i++) {
    let barHeight  = arrData[i] / 2;
    ctx.fillStyle = `rgb(${barHeight + 100}, 50, 50)`
    ctx.fillRect(x, ctxH - barHeight / 2, barWidth, barHeight);
    x += barWidth + space;

    if (i % 15 === 0) {
      ctx.font = '10px sans-serif';
      ctx.textBaseline = 'bottom';
      ctx.fillText(Math.floor(context.sampleRate / analyser.fftSize * i), i * space + 5, 15);
    }
  }
}

setupAudioNodes();