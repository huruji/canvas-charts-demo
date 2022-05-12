// import CRender from '@jiaminghi/c-redner'
import CRender from '@jiaminghi/c-render'

const canvas = document.getElementById('canvas')

// 实例化 CRender
const render = new CRender(canvas)

// 向render中添加图形
const [w, h] = render.area
const circle = render.add({
  name: 'circle',
  animationCurve: 'easeOutCubic',
  animationFrame: 50,
  drag: true,
  hover: true,
  shape: {
    rx: w / 2,
    ry: h / 2,
    r: 50
  },
  style: {
    fill: '#ffee97',
    stroke: 'goldenrod',
    lineWidth: 2
  }
})