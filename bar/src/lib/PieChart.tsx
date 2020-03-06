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
    const radius = Math.floor(Math.min(this.canvas.height / 3, this.canvas.width / 3));
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
      startAngle = endAngle;
    }
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
        if (this.ctx.isPointInPath(pos.x * 2, pos.y * 2)) {
          // 选中的 item radius 加上 20
          this.drawSlicePie(this.ctx, this.centerX, this.centerY, this.radius + 20, startAngle, endAngle, item.color);
          this.showInfo(pos.x, pos.y, item.name, item.value);
        } else {
          this.drawSlicePie(this.ctx, this.centerX, this.centerY, this.radius, startAngle, endAngle, item.color);
        }
        startAngle = endAngle;
      }
    });
  }

}

export default PieChart;
