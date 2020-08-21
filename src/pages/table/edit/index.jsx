import React from 'react'

import ComBreadcrumb from '@/components/ComBreadcrumb'
import EditTableCell from './components/editCell'
import EditTableLine from './components/editLine'

function EditTable (props) {
  /**
   * @author zhoujingjing
   * @description 面包屑导航栏
   */
  const navData = {
    separator: '/',
    list: [
      {
        title: '首页',
        path: '/home/dashboard'
      },
      {
        title: '表格页',
        path: ''
      },
      {
        title: '基础表格',
        path: ''
      }
    ]
  }
  
  return (
    <div className="main-wrapper">
      <ComBreadcrumb navData={navData}/>
      <div className="main-content">
        <div className="panel-body">
          <EditTableCell />
        </div>
        <div className="panel-body">
          <EditTableLine />
        </div>
      </div>
    </div>
  )
}

export default EditTable