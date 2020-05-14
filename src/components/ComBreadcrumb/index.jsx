import React from 'react'
import {Breadcrumb} from 'antd'
import Link from 'umi/link'
import PropTypes from 'prop-types'

import './index.scss'

function ComBreadcrumb ({navData, children}) {
  return (
    <div className="breadcrumb-wrapper">
      <Breadcrumb separator={navData.separator}>
        {
          navData.list.map((item, index) => (
            <Breadcrumb.Item key={index}>
              {
                item.path ? 
                  <Link to={item.path}>{item.title}</Link> : 
                  <span>{item.title}</span>
              }
            </Breadcrumb.Item>
          ))
        }
      </Breadcrumb>
      <div className="operate-group">
        {children}
      </div>
    </div>
  )
}

ComBreadcrumb.propTypes = {
  navData: PropTypes.object
}

export default ComBreadcrumb