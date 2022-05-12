class Chart {
  container: HTMLElement
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  data: any
  centerX: number
  centerY: number
  tip: HTMLElement
  cur: number
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
    this.tip = document.createElement('div')
    this.cur = 0;
    this.tip.style.cssText = `
      position: absolute;
      display: none;
      background: #000;
      color: rgb(87, 87, 87);
      border-radius: 5px;
      padding: 10px;
      font-size: 12px;
      background-color: rgba(255, 255, 255, 0.9);
      box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 8px;
      z-index: 99;`;
    this.handleContainerStyle()
  }

  handleContainerStyle() {
    const container = this.container;
    if (!['relative', 'absolute'].includes(container.style.position)) {
      container.style.position = 'relative'
    }
  }

  init(opt:any) {
    Object.assign(this, opt)
    this.container.appendChild(this.canvas)
    this.container.appendChild(this.tip)
    this.create()
  }
}

export default Chart
