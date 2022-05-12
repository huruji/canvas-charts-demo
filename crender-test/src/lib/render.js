class Render {
  constructor(canvas) {
    const ctx = canvas.getContext('2d')

    const { clientWidth, clientHeight } = canvas

    const area = [clientWidth, clientHeight]

    canvas.setAttribute('width', clientWidth)
    canvas.setAttribute('height', clientHeight)
    /**
     * @description Context of the canvas
     * @type {Object}
     * @example ctx = canvas.getContext('2d')
     */
    this.ctx = ctx
    /**
     * @description Width and height of the canvas
     * @type {Array}
     * @example area = [300，100]
     */
    this.area = area
    /**
     * @description Whether render is in animation rendering
     * @type {Boolean}
     * @example animationStatus = true|false
     */
    this.animationStatus = false
    /**
     * @description Added graph
     * @type {[Graph]}
     * @example graphs = [Graph, Graph, ...]
     */
    this.graphs = []
    /**
     * @description Color plugin
     * @type {Object}
     * @link https://github.com/jiaming743/color
     */
    this.color = color
    /**
     * @description Bezier Curve plugin
     * @type {Object}
     * @link https://github.com/jiaming743/BezierCurve
     */
    this.bezierCurve = bezierCurve

    // bind event handler
    canvas.addEventListener('mousedown', mouseDown.bind(this))
    canvas.addEventListener('mousemove', mouseMove.bind(this))
    canvas.addEventListener('mouseup', mouseUp.bind(this))
  }
}