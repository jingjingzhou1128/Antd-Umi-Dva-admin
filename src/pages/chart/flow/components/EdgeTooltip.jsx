import React from 'react'

function EdgeTooltip (props) {
  const {data} = props
  return (
    <div className="tooltip-container">
      <div className="tooltip-body">
        <p>{data.type}</p>
        <p>{data.amount}</p>
        <p>{data.date}</p>
      </div>
      <ul className="tooltip-bottom">
        {
          data.deal.map((item, index) => (
            <li key={index}>
              <p className="deal-title">交易编码：</p>
              <p className="deal-code">{item.code}</p>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default EdgeTooltip