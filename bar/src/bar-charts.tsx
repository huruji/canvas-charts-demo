interface Options {
  title: string;
  bgColor: string;
  titleColor: string;
  titlePosition: 'top' | 'bottom'
  fillColor: string;
  axisColor: string;
  contentColor: string;
  yEqual: number;
  padding: number;
}

interface DataItem {
  xAxis: string
  value: number
  left?: number
  top?: number
  right?: number
  bottom?: number
}

class MyBarChart{
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  data: DataItem[]
  dataLength: number
  width: number
  height: number
  padding: number
  yEqual: number
  yLength: number
  xLength: number
  yFictitious: number
  yRatio: number
  bgColor: string
  fillColor: string
  axisColor: string
  contentColor: string             // 内容横线颜色
  titleColor: string               // 图表标题颜色
  title: string                         // 图表标题
  titlePosition: 'top' | 'bottom'                 // 图表标题位置: top / bottom
  looped: null | number                      // 是否循环
  current: number                     // 当前加载柱状图高度的百分数
  currentIndex: number
  onceMove: number

  constructor(
    canvas: string,
    data: DataItem[],
    options: Partial<Options> = {}) {
      this.canvas = document.querySelector(canvas)
      this.ctx = this.canvas.getContext('2d')
      this.data = data
      this.dataLength = this.data.length;
      this.width = this.canvas.width
      this.height = this.canvas.height
      this.padding = options.padding || 50
      this.yEqual = options.yEqual || 5
      this.bgColor = options.bgColor || '#ffffff'
      this.fillColor = options.fillColor || '#1E9FFF'
      this.axisColor = options.axisColor || '#666666'
      this.contentColor = options.contentColor || '#eeeeee'
      this.titleColor = options.titleColor || '#000000'
      this.title = options.title || ''
      this.current = 0
      this.titlePosition = options.titlePosition
      this.yLength = Math.floor((this.height - this.padding * 2 - 10) / this.yEqual)
      this.xLength = Math.floor((this.width - this.padding * 1.5 - 10) / this.dataLength)
      this.yFictitious = this.getYFictitious(this.data);
      this.yRatio = this.yLength / this.yFictitious;
      this.looping();
  }
  looping() {
    console.log('looping')
    console.log(this.current)
    this.looped = requestAnimationFrame(this.looping.bind(this))
    if (this.current < 100) {
      this.drawAnimation()
      this.current = (this.current + 5) > 100 ? 100 : this.current + 5
    } else {
      cancelAnimationFrame(this.looped)
      this.looped = null;
      this.watchHover()
    }
  }
  drawAnimation() {
    console.log(this.dataLength)
    for(let i = 0; i < this.dataLength; i++) {
      const x = Math.ceil(this.data[i].value * this.current / 100 * this.yRatio);
      const y = this.height - this.padding - x;
      this.data[i].left = this.padding + this.xLength * (i + 0.25);
      this.data[i].top = y;
      this.data[i].right = this.padding + this.xLength * (i + 0.75);
      this.data[i].bottom = this.height - this.padding;
      this.drawUpdate()
    }
  }
  drawUpdate() {
    console.log(this.bgColor)
    this.ctx.fillStyle = this.bgColor;
    this.ctx.fillRect(0,0,this.width, this.height)
    this.drawAxis()
    this.drawPoint()
    this.drawTitle()
    this.drawChart()
  }

  drawChart() {
    this.ctx.fillStyle = this.fillColor;
    for(var i = 0; i < this.dataLength; i++) {
      this.ctx.fillRect(
        this.data[i].left,
        this.data[i].top,
        this.data[i].right - this.data[i].left,
        this.data[i].bottom - this.data[i].top
      );
      this.ctx.font = '12px Arial'
      this.ctx.fillText(
        (this.data[i].value * this.current / 100) + '',
        this.data[i].left + this.xLength / 4,
        this.data[i].top - 5
      );
    }
  }
  drawAxis() {
    this.ctx.beginPath()
    console.log(this.axisColor)
    this.ctx.strokeStyle = this.axisColor
    this.ctx.moveTo(this.padding + 0.5, this.height - this.padding + 0.5)
    this.ctx.lineTo(this.padding + 0.5, this.padding + 0.5);
		this.ctx.moveTo(this.padding + 0.5, this.height - this.padding + 0.5);
		this.ctx.lineTo(this.width - this.padding / 2 + 0.5, this.height - this.padding + 0.5);
		this.ctx.stroke();
  }

  drawPoint() {
    this.ctx.beginPath()
    this.ctx.font = '12px Microsoft YaHei'
    this.ctx.textAlign = 'center'
    this.ctx.fillStyle = this.axisColor
    for(var i = 0; i < this.dataLength; i ++){
			var xAxis = this.data[i].xAxis;
			var xlen = this.xLength * (i + 1);
			this.ctx.moveTo(this.padding + xlen + 0.5, this.height - this.padding + 0.5);
			this.ctx.lineTo(this.padding + xlen + 0.5, this.height - this.padding + 5.5);
			this.ctx.fillText(xAxis, this.padding + xlen - this.xLength / 2, this.height - this.padding + 15);
		}
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.font = '12px Microsoft YaHei';
    this.ctx.textAlign = 'right';
    this.ctx.fillStyle = this.axisColor;
    this.ctx.moveTo(this.padding + 0.5, this.height - this.padding + 0.5);
    this.ctx.lineTo(this.padding - 4.5, this.height - this.padding + 0.5);
    for(var i=0; i < this.yEqual; i ++){
			var y = this.yFictitious * (i + 1);
			var ylen = this.yLength * (i + 1);
      this.ctx.beginPath();
      this.ctx.strokeStyle = this.axisColor;
			this.ctx.moveTo(this.padding + 0.5, this.height - this.padding - ylen + 0.5);
			this.ctx.lineTo(this.padding - 4.5, this.height - this.padding - ylen + 0.5);
			this.ctx.stroke();
			this.ctx.fillText(y + '', this.padding - 10, this.height - this.padding - ylen + 5);
      this.ctx.beginPath();
			this.ctx.strokeStyle = this.contentColor;
			this.ctx.moveTo(this.padding + 0.5, this.height - this.padding - ylen + 0.5)
			this.ctx.lineTo(this.width - this.padding / 2 + 0.5, this.height - this.padding - ylen+0.5);
      this.ctx.stroke();
		}
  }

  drawTitle() {
    if(this.title){
      this.ctx.beginPath();
      this.ctx.textAlign = 'center';
      this.ctx.fillStyle = this.titleColor;
      this.ctx.font = '16px Microsoft YaHei';
      if(this.titlePosition === 'bottom' && this.padding >= 40){
        this.ctx.fillText(this.title, this.width / 2, this.height - 5)
      }else{
        this.ctx.fillText(this.title, this.width / 2, this.padding / 2)
      }
    }
  }

  watchHover() {
    let self = this
    this.canvas.addEventListener('mousemove', (ev) => {
      ev = ev || window.event;
      self.currentIndex = -1;
			for (var i = 0; i < self.data.length; i ++){
        if( ev.offsetX > self.data[i].left &&
            ev.offsetX < self.data[i].right &&
            ev.offsetY > self.data[i].top &&
            ev.offsetY < self.data[i].bottom
        ){
					self.currentIndex = i;
				}
			}
      self.drawHover();
    })
  }

  drawHover() {
    if(this.currentIndex !== -1){
        if(this.onceMove === -1){
            this.onceMove = this.currentIndex;
            this.canvas.style.cursor = 'pointer';
        }
    }else{
        if(this.onceMove !== -1){
            this.onceMove = -1;
            this.canvas.style.cursor = 'inherit';
        }
    }
  }

  getYFictitious(data:DataItem[]):number {
    const arr = data.slice(0)
    arr.sort((a, b) => {
      return b.value - a.value
    })
    const len = Math.ceil(arr[0].value / this.yEqual)
    let pow = len.toString().length - 1;
    pow = pow > 2 ? 2 : pow;
    return Math.ceil(len / Math.pow(10,pow)) * Math.pow(10,pow);
  }
}


var data = [
  {xAxis:'2012',value:2141},
  {xAxis:'2013',value:1499},
  {xAxis:'2014',value:3260},
  {xAxis:'2015',value:1170},
  {xAxis:'2016',value:970},
  {xAxis:'2017',value:2350}
]
var chart = new MyBarChart('canvas',data,{
  title: 'xxx公司年度盈利',
  bgColor: 'black',
  titleColor: '#ffffff',      // 标题颜色
  titlePosition: 'top',       // 标题位置
  fillColor: '#72f6ff',       // 柱状填充色
  axisColor: '#eeeeee',       // 坐标轴颜色
  contentColor: '#bbbbbb'     // 内容横线颜色
});