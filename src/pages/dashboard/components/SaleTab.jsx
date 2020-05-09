import React, {useEffect, useState} from 'react'
import {Row, Col, List} from 'antd'
// import PropTypes from 'prop-types'

import ComChart from '@/components/ComChart'

import {saleTrendOption} from '../dataOptions'

function SaleTab ({saleTrend}) {
  const [trendOptions, setTrendOptions] = useState(saleTrendOption)
  
  useEffect(() => {
    if (saleTrend) {
      let trendOptions = {...saleTrendOption}
      trendOptions.xAxis.data = saleTrend.type
      trendOptions.series[0].data = saleTrend.value
      setTrendOptions(trendOptions)
    }
  }, [saleTrend])

  return (
    <Row gutter={16} className="tab-content">
      <Col span={16}>
        <div className="inner">
          <p className="title">销售趋势</p>
          <ComChart chartId="saleTrendChart" chartOptions={trendOptions}/>
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
  )
}

SaleTab.propTypes = {
  // saleTrend: PropTypes.object.isRequired
}

SaleTab.defaultProps = {
  // saleTrend: {}
}

export default SaleTab