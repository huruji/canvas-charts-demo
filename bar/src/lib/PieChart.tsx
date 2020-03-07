import Chart from './Chart';

class PieChart extends Chart {
  total: number;
  radius: number;
  animatedFram: number;
  tipNameEle: HTMLElement;
  tipValueEle: HTMLElement;
  constructor (container: HTMLElement) {
    super(container);
  }

  create() {
    this.initData()
    this.animate();
    this.bindEvent();
  }

  initData() {
    const total = this.data.reduce((acc, d) => {
      return acc + d.value;
    }, 0);
    const radius = Math.floor(Math.min(this.canvas.height / 4, this.canvas.width / 4));
    this.total = total;
    this.radius = radius;
  }

  drawSlicePie(
    ctx: CanvasRenderingContext2D,
    centerX: number,
    centerY: number,
    radius: number,
    startAngle: number,
    endAngle: number,
    color: string
  ) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath()
    ctx.fill();
  }

  draw() {
    let startAngle = 0;
    for (let i = 0; i < this.data.length; i++) {
      let item = this.data[i];
      const endAngle = (Math.PI * 2 * item.value / this.total) + startAngle;
      this.drawSlicePie(this.ctx, this.centerX, this.centerY, this.radius, startAngle, endAngle, item.color);
      const centerAngle = startAngle + (endAngle - startAngle) / 2
      const text = item.name + ' ' + Math.round(item.value / this.total * 1000) / 10 + '%'
      this.drawOuterDes(centerAngle, text, item.color);
      startAngle = endAngle;
    }
  }

  drawOuterDes(angle:number, name: string, color: string) {
    this.ctx.save()
    this.ctx.translate(this.canvas.width / 2, this.canvas.height/2)
    const r = this.radius + 20;
    const x = r * Math.cos(angle)
    const y = r * Math.sin(angle)
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = 2
    this.ctx.beginPath()
    this.ctx.moveTo(0, 0)
    this.ctx.lineTo(x, y)
    this.ctx.font = "20px serif";
    const { width } = this.ctx.measureText(name)
    if (angle > (Math.PI / 2) && angle < (Math.PI / 2 * 3)) {
      console.log('9999')
      this.ctx.lineTo(x -30, y)
      this.ctx.fillText(name, x - 40 - width, y + 10)
    } else {
      this.ctx.lineTo(x + 30, y)
      this.ctx.fillText(name, x + 40, y + 10)
    }
    this.ctx.stroke()
    this.ctx.restore()
  }

  hideInfo() {
    this.tip.style.display = 'none';
  }

  showInfo(x: number, y: number, name: string, value: string) {
    if (!this.tipNameEle) {
      let p = document.createElement('p');
      p.style.display = 'flex';
      const nameEle = document.createElement('span');
      const valueEle = document.createElement('span');
      this.tipNameEle = nameEle;
      this.tipValueEle = valueEle;
      valueEle.style.marginLeft = '30px';
      p.appendChild(nameEle);
      p.appendChild(valueEle);
      this.tip.appendChild(p);
    }
    this.tipNameEle.textContent = name;
    this.tipValueEle.textContent = value;
    this.tip.style.display = 'flex';
    this.tip.style.top = y + 'px';
    this.tip.style.left = x + 'px';
  }

  animate() {
    this.animatedFram = requestAnimationFrame(this.animate.bind(this))
    if (this.cur < 100) {
      this.cur = (this.cur + 3) > 100 ? 100 : this.cur + 3
      this.drawAnimation()
    } else {
      cancelAnimationFrame(this.animatedFram)
      this.draw();
    }
  }

  drawAnimation() {
    let startAngle = 0;
    for (let i = 0; i < this.data.length; i++) {
      let item = this.data[i];
      let endAngle = (Math.PI * 2 * item.value / this.total) * this.cur / 100 + startAngle;
      this.drawSlicePie(this.ctx, this.centerX, this.centerY, this.radius, startAngle, endAngle, item.color);
      startAngle = endAngle;
    }
  }

  bindEvent() {
    this.canvas.addEventListener('mousemove', (e) => {
      this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
      let startAngle = 0;
      e.preventDefault();
      const { left, top } = this.canvas.getBoundingClientRect();
      const pos = {
        x: e.clientX - left,
        y: e.clientY - top
      };
      this.hideInfo()
      for (let i = 0; i < this.data.length; i++) {
        let item = this.data[i];
        const endAngle = (Math.PI * 2 * item.value / this.total) + startAngle;
        this.drawSlicePie(this.ctx, this.centerX, this.centerY, this.radius, startAngle, endAngle, item.color);
        const centerAngle = startAngle + (endAngle - startAngle) / 2
        const text = item.name + ' ' + Math.round(item.value / this.total * 1000) / 10 + '%'
        if (this.ctx.isPointInPath(pos.x * 2, pos.y * 2)) {
          this.drawOuterDes(centerAngle, text, item.color);
          this.drawSlicePie(this.ctx, this.centerX, this.centerY, this.radius + 20, startAngle, endAngle, item.color);
          this.showInfo(pos.x, pos.y, item.name, item.value);
        } else {
          this.drawOuterDes(centerAngle, text, item.color);
          console.log('false')
          this.drawSlicePie(this.ctx, this.centerX, this.centerY, this.radius, startAngle, endAngle, item.color);
        }
        startAngle = endAngle;
      }
    });
  }

}

export default PieChart;
