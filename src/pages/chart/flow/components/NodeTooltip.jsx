import React from 'react'
import {Timeline} from 'antd'

function NodeTooltip (props) {
  const {data} = props
  return (
    <Timeline>
      {
        data.map(item => (
          <Timeline.Item key={item.id}>{item.content}</Timeline.Item>
        ))
      }
    </Timeline>
  )
}

export default NodeTooltip