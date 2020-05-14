import React, {useEffect, useState} from 'react'
import {Row, Col, Tabs, DatePicker} from 'antd'
// import {formatMessage} from 'umi-plugin-react/locale'
import moment from 'moment'

import ajax from './service'

import {dateFormat, momentDateFormat} from '@/utils'

import Summary from './components/Summary'
import SaleTab from './components/SaleTab'
import OnlineSearch from './components/OnlineSearch'
import SaleType from './components/SaleType'

import './index.scss'

const {TabPane} = Tabs
const {RangePicker} = DatePicker

function Dashboard (props) {
  /**
   * @author zhoujingjing
   * @description 当前页面是否处于加载状态
   */
  const [isLoad, setIsLoad] = useState(true)
  /**
   * @author zhoujingjing
   * @description 统计值数据
   */
  const [summaryData, setSummaryData] = useState({
    sales: {},
    visit: {},
    pay: {},
    active: {}
  })
  /**
   * @author zhoujingjing
   * @description 销售额/访问量时间范围值
   */
  const [timeRange, setTimeRange] = useState(null)
  /**
   * @author zhoujingjing
   * @description 销售额/访问量时间快捷键
   */
  const [timeType, setTimeType] = useState()
  /**
   * @author zhoujingjing
   * @description 销售趋势图表数据
   */
  const [saleTrend, setSaleTrend] = useState(null)
  /**
   * @author zhoujingjing
   * @description 线上热门搜索列表数据
   */
  const [tableData, setTableData] = useState([])
  /**
   * @author zhoujingjing
   * @description 线上热门搜索列表分页数据
   */
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
  /**
   * @author zhoujingjing
   * @description 搜索用户数图表数据
   */
  const [searchUserOptions, setSearchUserOptions] = useState(null)
  /**
   * @author zhoujingjing
   * @description 人均搜索次数图表数据
   */
  const [searchPerOption, setSearchPerOption] = useState(null)
  /**
   * @author zhoujingjing
   * @description 销售额类别占比类型
   */
  const [saleType, setSaleType] = useState('all')
  /**
   * @author zhoujingjing
   * @description 销售额类别占比图表数据
   */
  const [salePerData, setSalePerData] = useState(null)
  /**
   * @author zhoujingjing
   * @description 销售额类别占比总数
   */
  const [salePerTotal, setSalePerTotal] = useState(0)
  
  /**
   * @author zhoujingjing
   * @description 页面挂载时执行方法
   */
  useEffect(() => {
    // 根据所选时间类型初始化时间范围值
    function initTime () {
      let curDate = Date.parse(new Date())
      let prevDate = curDate - 24 * 60 * 60 * 1000 * 6
      setTimeRange([window.formatDate(prevDate, dateFormat), window.formatDate(curDate, dateFormat)])
    }
    initTime()
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
        setSaleTrend(res.data.result.saleTrend)
        // 初始化搜索用户数图表数据
        setSearchUserOptions(res.data.result.onlineSearch.user)
        // 初始化人均搜索图表数据
        setSearchPerOption(res.data.result.onlineSearch.per)
        // 初始化线上热门搜索表格数据
        setTableData(res.data.result.onlineSearch.table)
        // 初始化线上热门搜索表格分页数据
        setTablePageData(data => ({
          ...data,
          total: res.data.result.onlineSearch.tableTotal
        }))
        // 更新销售额类别占比数据-总值
        setSalePerTotal(res.data.result.salePer.total)
        // 更新销售额类别占比数据-图表数据
        setSalePerData(res.data.result.salePer.value)
      }
    }).catch(() => {})
  }, [])

  /**
   * @author zhoujingjing
   * @description 更新趋势图
   * @param {*} data 
   */
  function updateSaleTrend (data) {
    ajax.getSaleTrend(data).then(res => {
      if (res.data.flag) {
        setSaleTrend({
          type: res.data.result.type,
          value: res.data.result.value
        })
      }
    })
  }

  /**
   * @author zhoujingjing
   * @description 更改时间回调方法
   * @param {*} dates 
   * @param {*} date 
   */
  function timeChangeHandle (dates, date) {
    let time = null
    if (date && date[0] && date[1]) time = date
    setTimeRange(time)
    updateSaleTrend()
  }

  /**
   * @author zhoujingjing
   * @description 月份对应天数表（除2月外)
   */
  const monthDays = {
    1: 31,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31
  }
  
  /**
   * @author zhoujingjing
   * @description 销售额/访问量时间快捷选择项
   */
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

  /**
   * @author zhoujingjing
   * @description 销售额/访问量tab右侧内容
   */
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

  /**
   * @author zhoujingjing
   * @description 判断当前年是否是闰年
   */
  function isLeapYear (year) {
    return year % 4 === 0
  }

  /**
   * @author zhoujingjing
   * @description 切换时间类型回调方法
   * @param {*} type 
   */
  function typeChangeHandle (type) {
    setTimeType(type)
    let time = []
    let curDate = new Date()
    let firstDate, lastDate
    switch (type) {
      case 'day':
        let day = window.formatDate(Date.parse(curDate), dateFormat)
        time.push(day, day)
        break
      case 'week':
        let weekIndex = curDate.getDay()
        firstDate = Date.parse(curDate) - 24 * 60 * 60 * 1000 * (weekIndex - 1)
        lastDate = Date.parse(curDate) + 24 * 60 * 60 * 1000 * (7 - weekIndex)
        time.push(window.formatDate(firstDate, dateFormat), window.formatDate(lastDate, dateFormat))
        break
      case 'month':
        let monthIndex = curDate.getDate()
        firstDate = Date.parse(curDate) - 24 * 60 * 60 * 1000 * (monthIndex - 1)
        let month = curDate.getMonth()
        let monthDay = month !== 1 ? monthDays[month + 1] : (isLeapYear(curDate.getFullYear()) ? 29 : 28)
        lastDate = Date.parse(curDate) + 24 * 60 * 60 * 1000 * (monthDay - monthIndex)
        time.push(window.formatDate(firstDate, dateFormat), window.formatDate(lastDate, dateFormat))
        break
      case 'year':
        let year = curDate.getFullYear()
        firstDate = Date.parse(new Date(year.toString()))
        let yearDay = isLeapYear(year) ? 366 : 365
        lastDate = firstDate + 24 * 60 * 60 * 1000 * (yearDay - 1)
        time.push(window.formatDate(firstDate, dateFormat), window.formatDate(lastDate, dateFormat))
        break
      default:
        break
    }
    setTimeRange(time)
    updateSaleTrend()
  }

  /**
   * @author zhoujingjing
   * @description 更改搜索列表分页，排序回调方法
   * @param {*} pagination 
   * @param {*} filters 
   * @param {*} sorter 
   * @param {*} extra 
   */
  function handleTableChange (pagination, filters, sorter, extra) {
    setTablePageData({
      ...tablePageData,
      current: pagination.current,
      pageSize: pagination.pageSize
    })
    ajax.getSearchList({pageSize: pagination.pageSize, pageNumber: pagination.current}).then(res => {
      if (res.data.flag) {
        setTableData(res.data.result.data)
        setTablePageData(data => ({
          ...data,
          total: res.data.result.tableTotal
        }))
      }
    }).catch(() => {})
  }
  
  /**
   * @author zhoujingjing
   * @description 更改销售额类别触发回调方法
   * @param {*} e 
   */
  function handleSaleTypeChange (e) {
    setSaleType(e.target.value)
    ajax.getSaleType({type: e.target.value}).then(res => {
      if (res.data.flag) {
        // 更新销售额类别占比数据-总值
        setSalePerTotal(res.data.result.total)
        // 更新销售额类别占比数据-图表数据
        setSalePerData(res.data.result.value)
      }
    }).catch(() => {})
  }

  return (
    <div className="main-wrapper">
      <Summary isLoad={isLoad} summaryData={summaryData}/>
      <Tabs defaultActiveKey="1" tabBarExtraContent={tabBarExtraContent} onChange={() => {}}>
        <TabPane tab="销售额" key="1">
          <SaleTab saleTrend={saleTrend}/>
        </TabPane>
        <TabPane tab="访问量" key="2"></TabPane>
      </Tabs>
      <Row gutter={16}>
        <Col span={12} className="online-search">
          <OnlineSearch 
            tableData={tableData} 
            tablePageData={tablePageData} 
            handleTableChange={handleTableChange} 
            searchUserOptions={searchUserOptions} 
            searchPerOption={searchPerOption}/>
        </Col>
        <Col span={12} className="sale-per">
          <SaleType 
            handleSaleTypeChange={handleSaleTypeChange} 
            saleType={saleType} 
            salePerData={salePerData} 
            salePerTotal={salePerTotal}/>
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard