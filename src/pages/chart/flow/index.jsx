import React, {useRef, useEffect, useState} from 'react'
import G6 from '@antv/g6'

import ajax from '../service'
import ComBreadcrumb from '@/components/ComBreadcrumb'
import NodeTooltip from './components/NodeTooltip'
import EdgeTooltip from './components/EdgeTooltip'
import './registerEdge'

import './index.scss'

function Flow (props) {
  /**
   * @author zhoujingjing
   * @description 面包屑导航栏数据
   */
  const navData = {
    separator: '/',
    list: [
      {
        title: '首页',
        path: '/home/dashboard'
      },
      {
        title: '图表页',
        path: ''
      },
      {
        title: '流程图',
        path: ''
      }
    ]
  }

  /**
   * @author zhoujingjing
   * @description 流程图容器
   */
  const containerRef = useRef(null)

  /**
   * @author zhoujingjing
   * @description 控制是否展示节点tooltip
   */
  const [showNodeTip, setShowNodeTip] = useState(false)

  /**
   * @author zhoujingjing
   * @description 节点tooltip数据
   */
  const [timeLineData, setTimeLineData] = useState([])

  const [nodeTooltipStyle, setNodeTooltipStyle] = useState({})

  const [showEdgeTip, setShowEdgeTip] = useState(false)

  const [dealData] = useState({
    type: '凭证开立',
    amount: '100,000,000,00 元',
    date: '2019-08-03',
    deal: [
      {
        code: '123456789'
      }
    ]
  })

  const [edgeTooltipStyle, setEdgeTooltipStyle] = useState({})

  useEffect(() => {
    let g6 = new G6.Graph({
      container: containerRef.current,
      width: 1200,
      height: 800,
      modes: {
        default: ['drag-canvas', 'name']
      },
      defaultNode: {
        type: 'rect',
        size: [100, 30],
        labelCfg: {
          style: {
            fontSize: 14,
            fill: '#000000A6'
          }
        },
        style: {
          radius: 15,
          stroke: '#72CC4A',
          lineWidth: 1,
          fill: '#FFFFFF',
          fillOpacity: 1
        },
        linkPoints: {
          left: true,
          right: true,
          size: 5,
          fill: '#72CC4A'
        }
      },
      defaultEdge: {
        type: 'customEdge',
        // labelCfg: {
        //   style: {
        //     fill: '#333',
        //     fontSize: 14,
        //   }
        // },
        style: {
          radius: 10
        }
      },
      layout: {
        type: 'dagre',
        rankdir: 'LR',
        nodesep: 30,
        ranksep: 100
      },
      // fitView: true,
      // fitViewPadding: [20, 40, 50, 20]
    })
    // 添加鼠标移入节点事件
    g6.on('node:mouseenter', evt => {
      let model = evt.item.getModel()
      let {x, y} = model
      let point = g6.getCanvasByPoint(x, y)
      let data = [
        {
          id: 1,
          content: 'Create a services site 2015-09-01'
        },
        {
          id: 2,
          content: 'Solve initial network problems 2015-09-01'
        },
        {
          id: 3,
          content: 'Technical testing 2015-09-01'
        },
        {
          id: 4,
          content: 'Network problems being solved 2015-09-01'
        }
      ]
      setNodeTooltipStyle({left: `${point.x - 75}px`, top: `${point.y + 15}px`})
      setTimeLineData(data)
      setShowNodeTip(true)
    })
    // 添加鼠标移出节点事件
    g6.on('node:mouseleave', evt => {
      setTimeLineData([])
      setShowNodeTip(false)
    })
    // 添加鼠标移入边事件
    g6.on('edge:mouseenter', evt => {
      let model = evt.item.getModel()
      let {endPoint} = model
      let point = g6.getCanvasByPoint(endPoint.x, endPoint.y)
      setEdgeTooltipStyle({left: `${point.x}px`, top: `${point.y}px`})
      setShowEdgeTip(true)
    })
    // 添加鼠标移出边事件
    g6.on('edge:mouseleave', evt => {
      setShowEdgeTip(false)
    })
    ajax.getFlowData().then(res => {
      if (res.data.flag) {
        // let transData = res.data.result.edges.map(edge => {
        //   edge.style = {
        //     radius: 10,
        //     stroke: ColorMap[edge.data.type]
        //   }
        //   edge.label = edge.data.amount
        //   return edge
        // })
        // g6.data({...res.data.result, edges: transData})
        g6.data(res.data.result)
        g6.render()
      }
    }).catch(() => {})
  }, [])

  return (
    <div className="main-wrapper">
      <ComBreadcrumb navData={navData}/>
      <div className="main-content">
        <div className="panel-body">
          <div ref={containerRef} className="flow-container">
            {showNodeTip && (
              <div style={nodeTooltipStyle} className="node-tooltip">
                <NodeTooltip data={timeLineData} />
              </div>
            )}
            {showEdgeTip && <div style={{position: 'absolute', ...edgeTooltipStyle}}>
              <EdgeTooltip data={dealData} />
            </div>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Flow