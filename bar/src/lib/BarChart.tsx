import Chart from './Chart';

class BarChart extends Chart {
  padding: number
  constructor(container: HTMLElement) {
    super(container)
  }
  create() {
    this.padding = 20
    this.drawAxis()
    this.drawBar()
  }

  drawBar() {
    let barWidth = ((this.canvas.width - this.padding * 2) - (this.data.length + 1) * this.padding) / this.data.length
    const max = this.data.reduce((acc, d) => {
      return Math.max(acc, d.value)
    }, 0)
    const maxHeight = this.canvas.height - this.padding * 3
    console.log(max, maxHeight)
    for(let i = 0; i < this.data.length; i++) {
      this.ctx.fillStyle = this.data[i].color || 'black'
      let height = this.data[i].value / max * maxHeight;
      console.log(height)
      console.log((i + 2) * this.padding,
      this.canvas.height - 2 * this.padding - maxHeight + height,
      barWidth,
      height)
      this.ctx.fillRect(
        (i + 2) * this.padding + i * barWidth,
        this.canvas.height - this.padding - height,
        barWidth,
        height
      )
      // this.ctx.fillRect()
    }
  }

  drawAxis() {
    this.drawLine(
      this.ctx,
      this.padding,
      this.padding,
      this.padding,
      this.canvas.height - this.padding,
      'black'
    )
    this.drawLine(
      this.ctx,
      this.padding,
      this.canvas.height - this.padding,
      this.canvas.width - this.padding,
      this.canvas.height - this.padding,
      'black'
    )
  }

  drawLine(ctx:CanvasRenderingContext2D, startx:number, starty: number, endx:number, endy:number, color: string) {
    // ctx.save()
    ctx.strokeStyle = color
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(startx, starty)
    ctx.lineTo(endx, endy)
    ctx.stroke()
    // ctx.restore()
  }
}

export default BarChart
