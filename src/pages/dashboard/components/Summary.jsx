import React from 'react'
import PropTypes from 'prop-types'

import {Tooltip, Progress, Row, Col, Skeleton} from 'antd'

function Summary ({summaryData, isLoad}) {
  return (
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
  )
}

Summary.propTypes = {
  isLoad: PropTypes.bool.isRequired,
  summaryData: PropTypes.object.isRequired
}

Summary.defaultProps = {
  isLoad: false,
  summaryData: {
    sale: {},
    visit: {},
    pay: {},
    active: {}
  }
}

export default Summary