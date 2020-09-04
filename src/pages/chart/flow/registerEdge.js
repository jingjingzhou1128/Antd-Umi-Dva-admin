import G6 from '@antv/g6'
import {ColorMap} from './dataOptions'

G6.registerEdge('customEdge', {
  draw (cfg, group) {
    let startPoint = cfg.startPoint
    let endPoint = cfg.endPoint
    let yDiff = endPoint.y - startPoint.y
    let slope = yDiff !== 0 ? 500 / Math.abs(yDiff) : 0
    let cpOffset = 16
    let offset = yDiff < 0 ? cpOffset : -cpOffset
    let line1EndPoint = {
      x: startPoint.x + slope,
      y: endPoint.y + offset
    }
    let line2StartPoint = {
      x: line1EndPoint.x + cpOffset,
      y: endPoint.y
    }
    // 控制点坐标
    let controlPoint = {
      x:
      ((line1EndPoint.x - startPoint.x) * (endPoint.y - startPoint.y)) /
      (line1EndPoint.y - startPoint.y) +
      startPoint.x,
      y: endPoint.y
    }
    let path = [
      ['M', startPoint.x, startPoint.y],
      ['L', line1EndPoint.x, line1EndPoint.y],
      [
        'Q',
        controlPoint.x,
        controlPoint.y,
        line2StartPoint.x,
        line2StartPoint.y
      ],
      ['L', endPoint.x, endPoint.y]
    ]
    if (yDiff === 0) {
      path = [
        ['M', startPoint.x, startPoint.y],
        ['L', endPoint.x, endPoint.y]
      ]
    }
    // path
    let line = group.addShape('path', {
      attrs: {
        path,
        stroke: ColorMap[cfg.data.type],
        lineWidth: 1.2,
        endArrow: false
      }
    })
    const labelLeftOffset = 8
    const labelTopOffset = 8
    // amount
    const amount = group.addShape('text', {
      attrs: {
        text: cfg.data.amount,
        x: line2StartPoint.x + labelLeftOffset,
        y: endPoint.y - labelTopOffset - 2,
        fontSize: 14,
        textAlign: 'left',
        textBaseline: 'middle',
        fill: '#000000D9'
      }
    })
    // type
    group.addShape('text', {
      attrs: {
        text: cfg.data.type,
        x: line2StartPoint.x + labelLeftOffset,
        y: endPoint.y - labelTopOffset - amount.getBBox().height - 2,
        fontSize: 10,
        textAlign: 'left',
        textBaseline: 'middle',
        fill: '#000000D9'
      }
    })
    // date
    group.addShape('text', {
      attrs: {
        text: cfg.data.date,
        x: line2StartPoint.x + labelLeftOffset,
        y: endPoint.y + labelTopOffset + 4,
        fontSize: 12,
        fontWeight: 300,
        textAlign: 'left',
        textBaseline: 'middle',
        fill: '#000000D9'
      }
    })
    return line
  }
})