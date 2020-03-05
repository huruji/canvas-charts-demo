import Chart from './Chart'

class PieChart extends Chart {
  constructor(container:HTMLElement){
    super(container)
  }

  create() {
    const total = this.data.reduce((acc, d) => {
      return acc + d.value
    }, 0)
    const radius = Math.floor(Math.min(this.canvas.height / 2, this.canvas.width / 2))
    let startAngle = 0
    for(let i = 0; i < this.data.length; i++) {
      let item = this.data[i]
      this.ctx.fillStyle = item.color
      this.ctx.beginPath()
      this.ctx.moveTo(this.centerX, this.centerY)
      const endAngle = (Math.PI * 2 * item.value / total) + startAngle
      this.ctx.arc(this.centerX, this.centerY, radius, startAngle, endAngle)
      this.ctx.fill()
      startAngle = endAngle
    }
  }

  initData() {

  }
}

export default PieChart;
