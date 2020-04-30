import React from 'react'
import {Row, Col, Card, Dropdown, Icon, Menu, Radio} from 'antd'
import PropTypes from 'prop-types'

import {salePerOption, colors} from './dataOptions'

function SaleType ({handleSaleTypeChange, saleType, salePerData, toggleSaleTypeLegend}) {
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
    <Card 
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
    </Card>
  )
}

SaleType.propTypes = {
  saleType: PropTypes.string.isRequired,
  salePerData: PropTypes.object.isRequired,
  handleSaleTypeChange: PropTypes.func.isRequired,
  toggleSaleTypeLegend: PropTypes.func.isRequired
}

SaleType.defaultProps = {}

export default SaleType