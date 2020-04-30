import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'

import {debounce} from '@/utils'
const echarts = require('echarts')

function ComChart ({chartOptions, chartId}) {
  const [chartIns, setChartIns] = useState(null)

  useEffect(() => {
    // 基于准备好的dom，初始化echarts实例
    let chartIns
    // 基于准备好的dom，初始化echarts实例
    chartIns = echarts.init(document.getElementById(chartId))
    setChartIns(chartIns)
    // 绘制图表
    chartIns.setOption(chartOptions)
    return () => {
      if (chartIns) {
        chartIns.dispose()
      }
    }
  }, [chartId, chartOptions])

  useEffect(() => {
    function resizeWindow () {
      if (chartIns) {
        chartIns.resize()
      }
    }
    
    let __resizeHandler = debounce(resizeWindow, 500)
    window.addEventListener('resize', __resizeHandler)
    return () => {
      window.removeEventListener('resize', __resizeHandler)
    }
  }, [chartIns])

  return (
    <div id={chartId} className="chart"></div>
  )
}

ComChart.propTypes = {
  chartId: PropTypes.string.isRequired,
  chartOptions: PropTypes.object.isRequired
}

ComChart.defaultProps = {
  chartId: 'chart',
  chartOptions: {}
}

export default ComChart
