import React, {useEffect, useState} from 'react'
import {Row, Col, Tooltip, Progress, Skeleton, Tabs, DatePicker} from 'antd'
// import {formatMessage} from 'umi-plugin-react/locale'
import moment from 'moment'

import ajax from './service'

import {dateFormat, momentDateFormat} from '@/utils'

import './index.scss'

const echarts = require('echarts')

const {TabPane} = Tabs
const {RangePicker} = DatePicker

const lineOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'none'
    },
    renderMode: 'html',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    textStyle: {
      fontSize: '12px',
      widht: 200,
      color: '#333'
    },
    padding: [5, 15],
    formatter: function (params) {
      return `<div class="tip">
          <span>${params[0].axisValue}</span>
          <span>${params[0].value}</span>
      </div>`
    },
    position: function (point, params, dom, rect, size) {
      return [point[0], '50%']
    },
    extraCssText: 'border-radius: 2;box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);'
  },
  grid: {
    left: 0,
    right: 0,
    top: 10,
    bottom: 0
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: [],
    show: false
  },
  yAxis: {
    type: 'value',
    show: false
  },
  series: [{
    data: [],
    type: 'line',
    symbol: 'circle',
    symbolSize: 4,
    smooth: true,
    itemStyle: {
      color: 'transparent'
    },
    lineStyle: {
      color: '#975fe4'
    },
    areaStyle: {
      color: '#975fe4',
      opacity: 1
    },
    emphasis: {
      itemStyle: {
        color: '#975fe4',
        borderType: 'solid',
        borderWidth: 2,
        borderColor: '#fff'
      }
    }
  }]
}

const barOption = {
  color: ['#3aa0ff'],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'none'
    },
    renderMode: 'html',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    textStyle: {
      fontSize: '12px',
      widht: 200,
      color: '#333'
    },
    padding: [5, 15],
    formatter: function (params) {
      return `<div class="tip primary">
        <span>${params[0].axisValue}</span>
        <span>${params[0].value}</span>
      </div>`
    },
    position: function (point, params, dom, rect, size) {
      return [point[0], '50%']
    },
    extraCssText: 'border-radius: 2;box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);'
  },
  grid: {
    left: 0,
    right: 0,
    bottom: 0,
    top: 0
  },
  xAxis: {
    type: 'category',
    data: [],
    show: false
  },
  yAxis: {
    type: 'value',
    show: false
  },
  series: [
    {
      type: 'bar',
      barWidth: 15,
      data: []
    }
  ]
}

function Dashboard (props) {
  const [summaryData, setSummaryData] = useState({
    sales: {
      total: 0,
      dayTotal: 0,
      week: {
        value: 0,
        type: 'asc'
      },
      day: {
        value: 0,
        type: 'desc'
      }
    },
    visit: {
      total: 0,
      dayTotal: 0
    },
    pay: {
      total: 0,
      dayTotal: 0
    },
    active: {
      total: 0,
      week: {
        value: 0,
        type: 'asc'
      },
      day: {
        value: 0,
        type: 'desc'
      }
    }
  })
  const [isLoad, setIsLoad] = useState(true)
  const [timeRange, setTimeRange] = useState(null)
  const [timeType, setTimeType] = useState('day')

  function timeChangeHandle (dates, date) {
    let time = null
    if (date && date[0] && date[1]) time = date
    setTimeRange(time)
  }

  function typeChangeHandle (type) {
    setTimeType(type)
  }

  useEffect(() => {
    // 基于准备好的dom，初始化echarts实例
    let lineChartIns, barChartIns
    // 获取summary数据
    ajax.getSummaryData({type: 'week'}).then(res => {
      if (res.data.flag) {
        setIsLoad(false)
        // 基于准备好的dom，初始化echarts实例
        lineChartIns = echarts.init(document.getElementById('visitChart'))
        // 绘制图表
        lineChartIns.setOption(lineOption)
        // 基于准备好的dom，初始化echarts实例
        barChartIns = echarts.init(document.getElementById('payChart'))
        // 绘制图表
        barChartIns.setOption(barOption)
        // 更新图表数据
        lineChartIns.setOption({
          xAxis: {
            data: res.data.result.visit.category
          },
          series: [
            {
              data: res.data.result.visit.data
            }
          ]
        })
        // 更新图表数据
        barChartIns.setOption({
          xAxis: {
            data: res.data.result.pay.category
          },
          series: [
            {
              data: res.data.result.pay.data
            }
          ]
        })
        setSummaryData(res.data.result)
      }
    }).catch(() => {})
    return () => {
      if (lineChartIns) {
        lineChartIns.dispose()
      }
      if (barChartIns) {
        barChartIns.dispose()
      }
    }
  }, [])

  useEffect(() => {
    // 根据所选时间类型初始化时间范围值
    function initTime () {
      console.log(1)
      let curDate = Date.parse(new Date())
      let prevDate = curDate - 24 * 60 * 60 * 1000 * 6
      setTimeRange([window.formatDate(prevDate, dateFormat), window.formatDate(curDate, dateFormat)])
    }
    initTime()
  }, [timeType])

  const timeTypeList = [
    {
      label: '今日',
      value: 'day'
    },
    {
      label: '本周',
      value: 'week'
    },
    {
      label: '本月',
      value: 'month'
    },
    {
      label: '本年',
      value: 'year'
    }
  ]

  const tabBarExtraContent = (
    <div className="tabbar-right">
      <ul className="filter-list">
        {
          timeTypeList.map(item => (
            <li key={item.value} className={timeType === item.value ? 'active' : ''} onClick={() => {typeChangeHandle(item.value)}}>{item.label}</li>
          ))
        }
      </ul>
      <RangePicker
        separator="→" 
        format={momentDateFormat} 
        value={timeRange ? [moment(timeRange[0], momentDateFormat), moment(timeRange[1], momentDateFormat)] : null} 
        onChange={(dates, date) => {timeChangeHandle(dates, date)}}/>
    </div>
  )

  return (
    <div className="main-content">
      <Row gutter={16}>
        <Col span={6} className="summary-item">
          <div className="inner">
            <Skeleton loading={isLoad} active>
              <div className="header">
                <p className="title">总销售额</p>
                <div className="btn-group">
                  <Tooltip title="指标说明">
                    <i className="iconfont icon-tishi"></i>
                  </Tooltip>
                </div>
              </div>
              <div className="numb">￥ {window.toThousandFilter(summaryData.sales.total, 0)}</div>
              <div className="content">
                <span>周同比 {summaryData.sales.week.value}% 
                  <i className={`iconfont ${summaryData.sales.week.type === 'asc' ? 'icon-arrow-up-full text-danger' : 'icon-arrow-down-full text-success'}`}></i>
                </span>
                <span>日同比 {summaryData.sales.day.value}% 
                  <i className={`iconfont ${summaryData.sales.day.type === 'asc' ? 'icon-arrow-up-full text-danger' : 'icon-arrow-down-full text-success'}`}></i>
                </span>
              </div>
              <div className="bottom">日销售额￥{window.toThousandFilter(summaryData.sales.dayTotal, 0)}</div>
            </Skeleton>
          </div>
        </Col>
        <Col span={6} className="summary-item">
          <div className="inner">
            <Skeleton loading={isLoad} active>
              <div className="header">
                <p className="title">访问量</p>
                <div className="btn-group">
                  <Tooltip title="指标说明">
                    <i className="iconfont icon-tishi"></i>
                  </Tooltip>
                </div>
              </div>
              <div className="numb">{window.toThousandFilter(summaryData.visit.total, 0)}</div>
              <div className="content">
                <div id="visitChart" className="chart"></div>
              </div>
              <div className="bottom">日访问量 {window.toThousandFilter(summaryData.visit.dayTotal, 0)}</div>
            </Skeleton>
          </div>
        </Col>
        <Col span={6} className="summary-item">
          <div className="inner">
            <Skeleton loading={isLoad} active>
              <div className="header">
                <p className="title">支付笔数</p>
                <div className="btn-group">
                  <Tooltip title="指标说明">
                    <i className="iconfont icon-tishi"></i>
                  </Tooltip>
                </div>
              </div>
              <div className="numb">{window.toThousandFilter(summaryData.pay.total, 0)}</div>
              <div className="content">
                <div id="payChart" className="chart"></div>
              </div>
              <div className="bottom">转化率 {summaryData.pay.dayTotal}%</div>
            </Skeleton>
          </div>
        </Col>
        <Col span={6} className="summary-item">
          <div className="inner">
            <Skeleton loading={isLoad} active>
              <div className="header">
                <p className="title">运营活动效果</p>
                <div className="btn-group">
                  <Tooltip title="指标说明">
                    <i className="iconfont icon-tishi"></i>
                  </Tooltip>
                </div>
              </div>
              <div className="numb">{summaryData.active.total}%</div>
              <div className="content">
                <Progress percent={summaryData.active.total} showInfo={false} strokeColor="#13c2c2"/>
              </div>
              <div className="bottom">
              <span>周同比 {summaryData.active.week.value}% 
                <i className={`iconfont ${summaryData.active.week.type === 'asc' ? 'icon-arrow-up-full text-danger' : 'icon-arrow-down-full text-success'}`}></i>
              </span>
              <span>日同比 {summaryData.active.day.value}% 
                <i className={`iconfont ${summaryData.active.day.type === 'asc' ? 'icon-arrow-up-full text-danger' : 'icon-arrow-down-full text-success'}`}></i>
              </span>
            </div>
            </Skeleton>
          </div>
        </Col>
      </Row>
      <Tabs defaultActiveKey="1" tabBarExtraContent={tabBarExtraContent} onChange={() => {}}>
        <TabPane tab="销售额" key="1">
          <Row gutter={16}>
            <Col span={16}></Col>
            <Col span={8}></Col>
          </Row>
        </TabPane>
        <TabPane tab="访问量" key="2"></TabPane>
      </Tabs>
    </div>
  )
}

export default Dashboard