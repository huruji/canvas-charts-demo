const myCanvas = document.querySelector<HTMLCanvasElement>('#pie-container')
myCanvas.width = 300;
myCanvas.height = 300;

var myVinyls = {
  "Classical music": 10,
  "Alternative rock": 14,
  "Pop": 2,
  "Jazz": 12
};

interface Item {
  name: string;
  value: number;
  color: string;
}

interface Options {
  canvas: HTMLCanvasElement;
  data: Item[];
  padding: number;
  gridColor: string;
  gridScale: number;
}

class BarChart{
  options: Options
  ctx: CanvasRenderingContext2D
  canvas: HTMLCanvasElement
  constructor(options:Options) {
    this.options = options
    this.canvas = options.canvas
    this.ctx = this.canvas.getContext('2d')
  }

  draw(){
    let maxValue = 0
    for(const item of this.options.data) {
      maxValue = Math.max(maxValue, item.value)
    }
    const canvasActualHeight = this.canvas.height - this.options.padding * 2
    const canvasActualWidth = this.canvas.width - this.options.padding * 2
    let gridValue = 0
    while(gridValue <= maxValue) {
      const gridY = canvasActualHeight * (1 - gridValue / maxValue) + this.options.padding;
      drawLine(
        this.ctx,
        0,
        gridY,
        this.canvas.width,
        gridY,
        this.options.gridColor
      )
      this.ctx.save()
      this.ctx.fillStyle = this.options.gridColor
      this.ctx.font = 'bold 10px Arial'
      this.ctx.fillText(gridValue + '', 10 , gridY - 2)
      this.ctx.restore()
      gridValue += this.options.gridScale
    }

    let barIndex = 0
    const barSize = canvasActualWidth / this.options.data.length;
    for(const item of this.options.data) {
      const val = item.value;
      const barHeight = Math.round(canvasActualHeight * val / maxValue)
      drawBar(
        this.ctx,
        this.options.padding + barIndex * barSize,
        this.canvas.height - barHeight - this.options.padding,
        barSize,
        barHeight,
        item.color
      )
      barIndex++
    }
  }
}


const barchart = new BarChart({
  canvas: myCanvas,
  padding: 0,
  gridScale: 5,
  gridColor: '#eee',
  data: [{
    name: 'js',
    value: 8,
    color: '#a55ca5'
  }, {
    name: 'css',
    value: 120,
    color: '#67b6c7'
  }, {
    name: 'react',
    value: 17,
    color: '#bccd7a'
  }, {
    name: 'Vue',
    value: 2,
    color: '#eb9743'
  }]
})

barchart.draw()

function drawLine(
  ctx:CanvasRenderingContext2D,
  startX:number,
  startY: number,
  endX: number,
  endY: number,
  color: string
) {
  ctx.save()
  ctx.strokeStyle = color
  ctx.beginPath()
  ctx.moveTo(startX, startY)
  ctx.lineTo(endX, endY)
  ctx.stroke()
  ctx.restore()
}

function drawBar(
  ctx:CanvasRenderingContext2D,
  upperLeftConnerX: number,
  upperLeftConnerY: number,
  width: number,
  height: number,
  color: string
){
  ctx.save()
  ctx.fillStyle = color
  ctx.fillRect(upperLeftConnerX, upperLeftConnerY, width, height)
  ctx.restore()
}