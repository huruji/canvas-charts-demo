const eles = document.querySelectorAll('canvas')
for(let i = 0; i < eles.length; i++) {
  eles[i].width = 200
  eles[i].height = 100
}

function drawLine() {
  const line = document.querySelector<HTMLCanvasElement>('#line')
  const ctx = line.getContext('2d')
  ctx.beginPath()
  ctx.strokeStyle = '#000'
  ctx.lineWidth = 2
  ctx.moveTo(50,50)
  ctx.lineTo(150, 50)
  ctx.stroke()
}

drawLine()


function drawRect() {
  const rect = document.querySelector<HTMLCanvasElement>('#rect')
  const ctx = rect.getContext('2d')
  ctx.beginPath()
  ctx.fillStyle = '#7ee2bb'
  ctx.fillRect(50, 25, 100, 50)
  ctx.fill()
}

drawRect()


function drawCircle() {
  const rect = document.querySelector<HTMLCanvasElement>('#circle')
  const ctx = rect.getContext('2d')
  ctx.beginPath()
  ctx.fillStyle = '#f8cc4c'
  ctx.arc(100, 50, 50, 0, Math.PI * 2)
  ctx.fill()
}

drawCircle()

function drawArc() {
  const rect = document.querySelector<HTMLCanvasElement>('#arc')
  const ctx = rect.getContext('2d')
  ctx.beginPath()
  ctx.moveTo(100, 50)
  ctx.fillStyle = '#7da9fb'
  ctx.arc(100, 50, 50, 0, Math.PI / 2)
  ctx.fill()
}

drawArc()


function drawEllipse() {
  const rect = document.querySelector<HTMLCanvasElement>('#ellipse')
  const ctx = rect.getContext('2d')
  ctx.beginPath()
  ctx.fillStyle = '#ee8a70'
  ctx.ellipse(100,50, 100, 50, 0, 0, Math.PI * 2)
  ctx.fill()
}

drawEllipse()

function drawCircleStroke() {
  const rect = document.querySelector<HTMLCanvasElement>('#circle-stroke')
  const ctx = rect.getContext('2d')
  ctx.beginPath()
  ctx.strokeStyle = '#f8cc4c'
  ctx.lineWidth = 5
  ctx.arc(100, 50, 40, 0, Math.PI * 2)
  ctx.stroke()
}

drawCircleStroke()


function drawArcStroke() {
  const rect = document.querySelector<HTMLCanvasElement>('#arc-stroke')
  const ctx = rect.getContext('2d')
  ctx.beginPath()
  ctx.strokeStyle = '#8ed6f1'
  ctx.lineWidth = 2
  ctx.arc(100, 50, 40, Math.PI, Math.PI * 2)
  ctx.stroke()
}

drawArcStroke()

function drawText() {
  const rect = document.querySelector<HTMLCanvasElement>('#text')
  const ctx = rect.getContext('2d')
  ctx.beginPath()
  ctx.font = '20px serif'
  ctx.fillText('不知何时🌧️',40,40)
  ctx.fillText('已觉此间凉',40,70)
}



drawText()
