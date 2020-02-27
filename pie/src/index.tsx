const myCanvas = document.querySelector<HTMLCanvasElement>('#pie-container')
myCanvas.width = 300;
myCanvas.height = 300;

interface Data {
  name: string;
  value: number;
  color: string;
}

interface Options {
  canvas: HTMLCanvasElement
  data: Data[]
  doughnutHoleSize?: number
}

class PieChart {
  options: Options
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  constructor(options: Options) {
    this.options = options;
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext('2d')
  }

  draw() {
    let total = 0;
    for(const item of this.options.data) {
      total += item.value
    }
    let startAngle = 0
    for(const item of this.options.data) {
      const angle = item.value * 2 * Math.PI / total
      const pieRadius =  Math.min(this.canvas.height / 2, this.canvas.width / 2);
      drawPieSlice(
        this.ctx,
        this.canvas.width / 2,
        this.canvas.height / 2,
        pieRadius,
        startAngle,
        startAngle + angle,
        item.color
      )
      let labelX = this.canvas.width / 2 + (pieRadius / 2) * Math.cos(startAngle+ angle/2)
      let labelY = this.canvas.height/2 + (pieRadius / 2) * Math.sin(startAngle + angle/2);
      if (this.options.doughnutHoleSize) {
        var offset = (pieRadius * this.options.doughnutHoleSize ) / 2;
        labelX = this.canvas.width/2 + (offset + pieRadius / 2) * Math.cos(startAngle + angle/2);
        labelY = this.canvas.height/2 + (offset + pieRadius / 2) * Math.sin(startAngle + angle/2);
      }
      const label = Math.round(100 * item.value / total)
      this.ctx.fillStyle = 'white'
      this.ctx.font = 'bold 20px Arial'
      this.ctx.fillText(label + '%', labelX, labelY)
      startAngle += angle

    }
    if(this.options.doughnutHoleSize) {
      drawPieSlice(
        this.ctx,
        this.canvas.width / 2,
        this.canvas.height / 2,
        this.options.doughnutHoleSize * Math.min(this.canvas.height / 2, this.canvas.width / 2),
        0,
        2 * Math.PI,
        '#fff'
      )
    }
  }
}

const pie = new PieChart({
  doughnutHoleSize: 0.4,
  canvas: myCanvas,
  data: [
    {
      name: 'React',
      value: 15,
      color:'#fde23e'
    },
    {
      name: 'Vue',
      value: 12,
      color: '#f16e23'
    },
    {
      name: 'Angular',
      value: 7,
      color: '#57d9ff'
    },
    {
      name: 'infono',
      value: 8,
      color: '#937e88'
    }
  ]
})

pie.draw()


function drawLine(
  ctx: CanvasRenderingContext2D,
  startX: number,
  startY:number,
  endX:number,
  endY:number) {
    ctx.beginPath()
    ctx.moveTo(startX, startY)
    ctx.lineTo(endX, endY)
    ctx.stroke()
}

function drawArc(
  ctx:CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number,
  startAngle: number,
  endAngle: number
) {
  ctx.beginPath()
  ctx.arc(centerX, centerY, radius, startAngle, endAngle)
  ctx.stroke()
}

function drawPieSlice(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number,
  startAngle: number,
  endAngle: number,
  color: string
) {
  ctx.fillStyle = color;
  ctx.beginPath()
  ctx.moveTo(centerX, centerY)
  ctx.arc(centerX, centerY, radius, startAngle, endAngle)
  ctx.closePath()
  ctx.fill()
}