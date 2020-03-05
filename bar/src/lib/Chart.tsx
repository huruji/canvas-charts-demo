class Chart {
  container: HTMLElement
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  data: any
  centerX: number
  centerY: number
  constructor(container:HTMLElement) {
    this.container = container;
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')
    this.canvas.width = 400 * 2
    this.canvas.height = 400 * 2
    this.canvas.style.width = 400 + 'px'
    this.canvas.style.height = 400 + 'px'
    this.centerX = this.canvas.width / 2
    this.centerY = this.canvas.height / 2
  }

  init(opt:any) {
    Object.assign(this, opt)
    this.container.appendChild(this.canvas)
    this.create()
  }
}

export default Chart
