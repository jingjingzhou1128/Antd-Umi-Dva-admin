import React from 'react'
import Link from 'umi/link'
import {DatePicker} from 'antd'
import {formatMessage} from 'umi-plugin-react/locale'

function Dashboard (props) {
  return (
    <div>
      <div>
        <DatePicker />
      </div>
      {formatMessage({id: 'dashboard'})}
      <Link to="/home/ui">Go to list page</Link>
    </div>
  )
}

export default Dashboard