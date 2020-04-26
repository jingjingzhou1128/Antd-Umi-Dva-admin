import React, {useEffect, useState} from 'react'
import {Row, Col, Tooltip, Progress, Skeleton, Tabs, DatePicker, List, Card, Dropdown, Icon, Menu} from 'antd'
// import {formatMessage} from 'umi-plugin-react/locale'
import moment from 'moment'

import ajax from './service'

import {dateFormat, momentDateFormat} from '@/utils'
import {lineOption, barOption, saleTrendOption, searchOption} from './dataOptions'

import ComTable from '@/components/ComTable'

import './index.scss'

const echarts = require('echarts')

const {TabPane} = Tabs
const {RangePicker} = DatePicker

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

  const [tableData, setTableData] = useState({
    data: [
      {
        id: '1',
        rank: 1,
        searchKey: '搜索关键词-1',
        userCount: 221,
        weekGain: 0
      },
      {
        id: '2',
        rank: 2,
        searchKey: '搜索关键词-2',
        userCount: 222,
        weekGain: 1
      },
      {
        id: '3',
        rank: 3,
        searchKey: '搜索关键词-3',
        userCount: 227,
        weekGain: 2
      }
    ],
    hasPage: true,
    page: {
      current: 1,
      pageSize: 10,
      total: 50,
      handleChangePage: handleChangePage,
      handleChangeSize: (current, size) => {}
    },
    onChange: (pagination, filters, sorter) => {}
  })

  const tableColumns = [
    {
      title: '排名',
      dataIndex: 'rank'
    },
    {
      title: '搜索关键词',
      dataIndex: 'searchKey'
    },
    {
      title: '用户数',
      dataIndex: 'userCount',
      sorter: true,
    },
    {
      title: '周涨幅',
      dataIndex: 'weekGain',
      sorter: true
    }
  ]

  function handleChangePage (page) {
    setTableData({
      ...tableData,
      page: {
        ...tableData.page,
        current: page
      }
    })
  }

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
    let lineChartIns, barChartIns, saleTrendChartIns, searchUserChartIns, searchPerChartIns
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
    // 基于准备好的dom，初始化echarts实例
    saleTrendChartIns = echarts.init(document.getElementById('saleTrendChart'))
    // 绘制图表
    saleTrendChartIns.setOption(saleTrendOption)
    saleTrendChartIns.setOption({
      xAxis: {
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
      },
      series: [
        {
          data: [549, 500, 680, 700, 420, 450, 600, 450, 320, 400, 430, 300]
        }
      ]
    })
    // 基于准备好的dom，初始化echarts实例
    searchUserChartIns = echarts.init(document.getElementById('searchUserChart'))
    // 绘制图表
    searchUserChartIns.setOption(searchOption)
    searchUserChartIns.setOption({
      xAxis: {
        data: ['2020-03-17', '2020-03-18', '2020-03-19', '2020-03-20', '2020-03-21', '2020-03-22', '2020-03-23']
      },
      series: [{
        data: [6, 5, 3, 4, 7, 5, 2]
      }]
    })
    // 基于准备好的dom，初始化echarts实例
    searchPerChartIns = echarts.init(document.getElementById('searchPerChart'))
    // 绘制图表
    searchPerChartIns.setOption(searchOption)
    searchPerChartIns.setOption({
      xAxis: {
        data: ['2020-03-17', '2020-03-18', '2020-03-19', '2020-03-20', '2020-03-21', '2020-03-22', '2020-03-23']
      },
      series: [{
        data: [6, 5, 3, 4, 7, 5, 2]
      }]
    })
    return () => {
      if (lineChartIns) {
        lineChartIns.dispose()
      }
      if (barChartIns) {
        barChartIns.dispose()
      }
      if (saleTrendChartIns) {
        saleTrendChartIns.dispose()
      }
      if (searchUserChartIns) {
        searchUserChartIns.dispose()
      }
    }
  }, [])

  useEffect(() => {
    // 根据所选时间类型初始化时间范围值
    function initTime () {
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
          <Row gutter={16} className="tab-content">
            <Col span={16}>
              <div className="inner">
                <p className="title">销售趋势</p>
                <div id="saleTrendChart" className="chart"></div>
              </div>
            </Col>
            <Col span={8}>
              <div className="inner">
                <p className="title">门店销售额排名</p>
                <List
                  split={false}
                  dataSource={[1,2,3,4,5,6]}
                  renderItem={(item, index) => (
                    <List.Item key={index}>
                        <span className="index">{index + 1}</span>
                        <span>工专路0号店</span>
                        <span>{window.toThousandFilter(323234)}</span>
                      </List.Item>
                  )}>
                </List>
              </div>
            </Col>
          </Row>
        </TabPane>
        <TabPane tab="访问量" key="2"></TabPane>
      </Tabs>
      <Row gutter={16}>
        <Col span={12} className="online-search">
          <Card
            title="线上热门搜索"
            extra={
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item>操作一</Menu.Item>
                    <Menu.Item>操作二</Menu.Item>
                  </Menu>
                }>
                <Icon type="dash" />
              </Dropdown>
            }>
            <Row gutter={16}>
              <Col span={12}>
                <div className="type">
                  <span className="title">搜索用户数</span>
                  <span className="tooltip">
                    <Tooltip title="指标说明">
                      <i className="iconfont icon-tishi"></i>
                    </Tooltip>
                  </span>
                </div>
                <div className="numb">
                  <span>{window.toThousandFilter(12321, 0)}</span>
                  <span>17.1<i className="iconfont icon-arrow-up-full text-danger"></i></span>
                </div>
                <div id="searchUserChart" className="chart"></div>
              </Col>
              <Col span={12}>
                <div className="type">
                  <span className="title">人均搜索次数</span>
                  <span className="tooltip">
                    <Tooltip title="指标说明">
                      <i className="iconfont icon-tishi"></i>
                    </Tooltip>
                  </span>
                </div>
                <div className="numb">
                  <span>2.7</span>
                  <span>26.2<i className="iconfont icon-arrow-down-full text-success"></i></span>
                </div>
                <div id="searchPerChart" className="chart"></div>
              </Col>
            </Row>
            <ComTable tableColumns={tableColumns} tableData={tableData}/>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Card title">
            Card content
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard