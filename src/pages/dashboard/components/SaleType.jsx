import React, {useEffect, useState} from 'react'
import {Row, Col, Card, Dropdown, Icon, Menu, Radio} from 'antd'
import PropTypes from 'prop-types'

import {salePerOption, colors} from '../dataOptions'

import ComChart from '@/components/ComChart'

function SaleType ({handleSaleTypeChange, saleType, salePerData, salePerTotal}) {
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

  const [salePerList, setSalePerList] = useState([])
  const [salePerOptions, setSalePerOptions] = useState(salePerOption)

  useEffect(() => {
    if (!salePerData || !salePerTotal) return
    let salePerValue = salePerData.map((item, index) => ({
      ...item,
      selected: true,
      checked: true,
      itemStyle: {
        color: colors[index % colors.length]
      },
      percent: salePerTotal === 0 ? 0 : ((item.value / salePerTotal) * 100).toFixed(2)
    }))
    setSalePerList(salePerValue)
    let options = {...salePerOption}
    options.title.subtext = `￥ ${salePerTotal}`
    options.series[0].data = salePerValue
    setSalePerOptions(options)
  }, [salePerData, salePerTotal])

  function toggleSaleTypeLegend (name) {
    let salePerValue = salePerList.map(item => {
      if (item.name !== name) return item
      item.checked = !item.checked
      return item
    })
    setSalePerList(salePerValue)
    let options = {...salePerOption}
    options.series[0].data = salePerValue.filter(item => item.checked)
    setSalePerOptions(options)
  }
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
          {/* <div id="salePerChart" className="chart"></div> */}
          <ComChart chartId="salePerChart" chartOptions={salePerOptions}/>
        </Col>
        <Col span={12}>
          <ul className="legend-list">
            {
              salePerList.map((item, index) => {
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
  // salePerData: PropTypes.array.isRequired,
  handleSaleTypeChange: PropTypes.func.isRequired,
  // salePerTotal: PropTypes.number.isRequired
}

SaleType.defaultProps = {}

export default SaleType