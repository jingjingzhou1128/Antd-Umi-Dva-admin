import React, {useEffect, useState} from 'react'
import {Row, Col, Tabs, DatePicker, Card, Dropdown, Icon, Menu, Radio } from 'antd'
// import {formatMessage} from 'umi-plugin-react/locale'
import moment from 'moment'

import ajax from './service'

import {dateFormat, momentDateFormat} from '@/utils'
import {colors, searchOption} from './dataOptions'

import Summary from './components/Summary'
import SaleTab from './components/SaleTab'
import OnlineSearch from './components/OnlineSearch'
import SaleType from './components/SaleType'

import './index.scss'

const echarts = require('echarts')

const {TabPane} = Tabs
const {RangePicker} = DatePicker

function Dashboard (props) {
  const [summaryData, setSummaryData] = useState({
    sales: {},
    visit: {},
    pay: {},
    active: {}
  })
  const [isLoad, setIsLoad] = useState(true)
  const [timeRange, setTimeRange] = useState(null)
  const [timeType, setTimeType] = useState('day')

  const [tableData, setTableData] = useState([])

  const [tablePageData, setTablePageData] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
    pageSizeOptions: ['10', '20', '30', '40'],
    showSizeChanger: false,
    showTotal: total => `共 ${total} 条`,
    showQuickJumper: false,
    hideOnSinglePage: true
  })

  const [saleType, setSaleType] = useState('all')

  const [salePerChartIns, setSalePerChartIns] = useState(null)

  const [saleTrend, setSaleTrend] = useState({})

  const [searchUserOptions, setSearchUserOptions] = useState(searchOption)

  const [searchPerOption, setSearchPerOption] = useState(searchOption)

  const [salePerData, setSalePerData] = useState([])

  function timeChangeHandle (dates, date) {
    let time = null
    if (date && date[0] && date[1]) time = date
    setTimeRange(time)
  }

  function typeChangeHandle (type) {
    setTimeType(type)
  }

  function handleTableChange (pagination, filters, sorter, extra) {
    setTablePageData({
      ...tablePageData,
      current: pagination.current,
      pageSize: pagination.pageSize
    })
  }

  function handleSaleTypeChange (e) {
    setSaleType(e.target.value)
  }

  function toggleSaleTypeLegend (name) {
    let salePerValue = salePerData.map(item => {
      if (item.name !== name) return item
      item.checked = !item.checked
      return item
    })
    salePerChartIns.setOption({
      series: [{
        data: salePerValue.filter(item => item.checked)
      }]
    })
    setSalePerData(salePerValue)
  }

  useEffect(() => {
    // 基于准备好的dom，初始化echarts实例
    let salePerChartIns
    // 获取summary数据
    ajax.getSummaryData({type: 'week'}).then(res => {
      if (res.data.flag) {
        // 初始化归总数据
        setSummaryData({
          sales: res.data.result.sales,
          visit: res.data.result.visit,
          pay: res.data.result.pay,
          active: res.data.result.active
        })
        setIsLoad(false)
        // 初始化销售趋势数据
        setSaleTrend({
          xAxis: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          value: [549, 500, 680, 700, 420, 450, 600, 450, 320, 400, 430, 300]
        })
        // 初始化搜索用户数
        setSearchUserOptions(data => {
          data.xAxis.data = ['2020-03-17', '2020-03-18', '2020-03-19', '2020-03-20', '2020-03-21', '2020-03-22', '2020-03-23']
          data.series[0].data = [6, 5, 3, 4, 7, 5, 2]
          return data
        })
        // 初始化人均搜索次数
        setSearchPerOption(data => {
          data.xAxis.data = ['2020-03-17', '2020-03-18', '2020-03-19', '2020-03-20', '2020-03-21', '2020-03-22', '2020-03-23']
          data.series[0].data = [6, 5, 3, 4, 7, 5, 2]
          return data
        })
        // 初始化表格数据
        setTableData(res.data.result.onlineSearch.table)
        // 初始化表格分页数据
        setTablePageData(data => ({
          ...data,
          total: res.data.result.onlineSearch.tableTotal
        }))
        // 更新销售额类别占比salePer
        // 更新销售额图表，基于准备好的dom，初始化echarts实例
        // salePerChartIns = echarts.init(document.getElementById('salePerChart'))
        // setSalePerChartIns(salePerChartIns)
        // 绘制图表
        // salePerChartIns.setOption(salePerOption)
        let salePerValue = res.data.result.salePer.value.map((item, index) => ({
          ...item,
          selected: true,
          checked: true,
          itemStyle: {
            color: colors[index % colors.length]
          },
          percent: ((item.value / res.data.result.salePer.total) * 100).toFixed(2)
        }))
        salePerChartIns.setOption({
          title: {
            subtext: `￥ ${res.data.result.salePer.total}`
          },
          series: [
            {
              data: salePerValue
            }
          ]
        })
        // 初始化销售图例
        setSalePerData(salePerValue)
      }
    }).catch(() => {})
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

  const saleTypeList = [
    {
      label: '全部渠道',
      value: 'all'
    },
    {
      label: '线上',
      value: 'online'
    },
    {
      label: '门店',
      value: 'offline'
    }
  ]

  return (
    <div className="main-content">
      <Summary isLoad={isLoad} summaryData={summaryData}/>
      {/* <Row gutter={16}>
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
      </Row> */}
      <Tabs defaultActiveKey="1" tabBarExtraContent={tabBarExtraContent} onChange={() => {}}>
        <TabPane tab="销售额" key="1">
          {/* <Row gutter={16} className="tab-content">
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
          </Row> */}
          <SaleTab saleTrend={saleTrend}/>
        </TabPane>
        <TabPane tab="访问量" key="2"></TabPane>
      </Tabs>
      <Row gutter={16}>
        <Col span={12} className="online-search">
          {/* <Card
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
            <div className="table-wrapper">
              <Table 
                columns={tableColumns} 
                dataSource={tableData} 
                rowKey='id'
                onChange={handleTableChange}
                pagination={tablePageData}
              />
            </div>
          </Card> */}
          <OnlineSearch 
            tableData={tableData} 
            tablePageData={tablePageData} 
            handleTableChange={handleTableChange} 
            searchUserOptions={searchUserOptions} 
            searchPerOption={searchPerOption}/>
        </Col>
        <Col span={12} className="sale-per">
          {/* <Card 
            title="销售额类别占比"
            extra={
              <div className="operate">
                <Radio.Group onChange={handleSaleTypeChange} value={saleType}>
                  {
                    saleTypeList.map(item => <Radio.Button value={item.value} key={item.value}>{item.label}</Radio.Button>)
                  }
                </Radio.Group>
                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item>操作一</Menu.Item>
                      <Menu.Item>操作二</Menu.Item>
                    </Menu>
                  }>
                  <Icon type="dash" />
                </Dropdown>
              </div>
            }>
            <Row gutter={16} type="flex" align="middle" justify="space-between">
              <Col span={12}>
                <div id="salePerChart" className="chart"></div>
              </Col>
              <Col span={12}>
                <ul className="legend-list">
                  {
                    salePerData.map((item, index) => {
                      return (
                        <li key={index} onClick={() => {toggleSaleTypeLegend(item.name)}} className={item.checked ? '' : 'unselected'}>
                          <span className="circle" style={{backgroundColor: item.itemStyle.color}}></span>
                          <span className="name">{item.name}</span>
                          <span className="per">{item.percent}%</span>
                          <span className="price">¥ {item.value}</span>
                        </li>
                      )
                    })
                  }
                </ul>
              </Col>
            </Row>
          </Card> */}
          <SaleType handleSaleTypeChange={handleSaleTypeChange} saleType={saleType} salePerData={saleType} toggleSaleTypeLegend={toggleSaleTypeLegend}/>
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard