import Chart from './Chart';

class LineChart extends Chart {
  padding: number
  constructor(container:HTMLElement) {
    super(container)
  }

  create() {
    this.padding = 20
    this.drawAxis()
    const max = this.data.reduce((acc, d) => {
      return Math.max(acc, d.value)
    }, 0)
    console.log(max, 'max')
    const margin = (this.canvas.width - 4 * this.padding) / this.data.length;
    const maxHeight = this.canvas.height - this.padding * 3
    console.log(maxHeight, 'max')
    let prex = Math.floor(2 * this.padding);
    let height = this.data[0].value / max * maxHeight;
    let prey = Math.floor(this.canvas.height - this.padding - height)
    debugger;
    for(let i = 1; i < this.data.length; i++) {
      // console.log(data[i])
      let x = Math.floor(2 * this.padding + i * margin)
      let height = this.data[i].value / max * maxHeight;
      console.log('height', height)
      let y = Math.floor(this.canvas.height - this.padding - height)
      console.log(this.canvas.height - this.padding - height)

      this.drawLine(
        this.ctx,
        prex,
        prey,
        x,
        y,
        this.color || 'black'
      )
      console.log('line')
      console.log( prex,
        prey,
        x,
        y,)
      prex = x
      prey = y
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
    ctx.save()
    ctx.strokeStyle = color
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(startx, starty)
    ctx.lineTo(endx, endy)
    ctx.stroke()
    ctx.restore()
  }
}

export default LineChart
