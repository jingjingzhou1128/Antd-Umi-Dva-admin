import React, {useEffect, useState} from 'react'
import {Row, Col, Tooltip, Card, Dropdown, Menu, Table } from 'antd'
import {DashOutlined} from '@ant-design/icons'
import PropTypes from 'prop-types'

import ComChart from '@/components/ComChart'

import {searchOption} from '../dataOptions'

function OnlineSearch ({tableData, tablePageData, handleTableChange, searchUserOptions, searchPerOption}) {
  const tableColumns = [
    {
      title: '排名',
      dataIndex: 'rank',
      render: (text, row, index) => <span>{index + 1}</span>
    },
    {
      title: '搜索关键词',
      dataIndex: 'searchKey',
      render: (text, row, index) => <a href="/">{text}</a>
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

  const [userData, setUserData] = useState(searchOption)
  const [perData, setPerData] = useState(searchOption)

  useEffect(() => {
    if (!searchUserOptions) return
    let options = {...searchOption}
    options.xAxis.data = searchUserOptions.type
    options.series[0].data = searchUserOptions.value
    setUserData(options)
  }, [searchUserOptions])

  useEffect(() => {
    if (!searchPerOption) return
    let options = {...searchOption}
    options.xAxis.data = searchPerOption.type
    options.series[0].data = searchPerOption.value
    setPerData(options)
  }, [searchPerOption])

  return (
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
          <DashOutlined />
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
          <ComChart chartId="searchUserChart" chartOptions={userData}/>
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
          <ComChart chartId="searchPerChart" chartOptions={perData}/>
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
    </Card>
  )
}

OnlineSearch.propTypes = {
  tableData: PropTypes.array.isRequired,
  tablePageData: PropTypes.object.isRequired,
  handleTableChange: PropTypes.func.isRequired
}

OnlineSearch.defaultProps = {
  tableData: [],
  tablePageData: {}
}

export default OnlineSearch