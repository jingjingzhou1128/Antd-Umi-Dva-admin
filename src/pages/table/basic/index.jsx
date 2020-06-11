import React from 'react'
import {Table} from 'antd'

import ComBreadcrumb from '@/components/ComBreadcrumb'

function BasicTable (props) {
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

  /**
   * @author zhoujingjing
   * @description 表格数据
   */
  const tableData = [
    {
      id: '1',
      name: '胡彦斌',
      age: 31,
      address: '西湖区湖底公园1号'
    },
    {
      id: '2',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号'
    },
    {
      id: '3',
      name: '胡彦斌',
      age: 33,
      address: '西湖区湖底公园1号'
    },
    {
      id: '4',
      name: '胡彦斌',
      age: 34,
      address: '西湖区湖底公园1号'
    },
    {
      id: '5',
      name: '胡彦斌',
      age: 35,
      address: '西湖区湖底公园1号'
    },
    {
      id: '6',
      name: '胡彦斌',
      age: 36,
      address: '西湖区湖底公园1号'
    },
    {
      id: '7',
      name: '胡彦斌',
      age: 37,
      address: '西湖区湖底公园1号'
    },
    {
      id: '8',
      name: '胡彦斌',
      age: 38,
      address: '西湖区湖底公园1号'
    },
    {
      id: '9',
      name: '胡彦斌',
      age: 39,
      address: '西湖区湖底公园1号'
    }
  ]

  /**
   * @author zhoujingjing
   * @description 表格列项
   */
  const tableColumns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      className: 'name',
      filterMultiple: true,
      filters: [
        {
          label: 'Filter1',
          value: 'filter1'
        },
        {
          label: 'Filter2',
          value: 'filter2'
        }
      ],
      fixed: 'left'
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      sorter: true,
      width: '100px'
    },
    {
      title: '住址',
      dataIndex: 'address',
      sorter: true,
      key: 'address'
    },
    {
      title: '住址1',
      dataIndex: 'address1',
      key: 'address1'
    },
    {
      title: '住址2',
      dataIndex: 'address2',
      key: 'address2'
    },
    {
      title: '住址3',
      dataIndex: 'address3',
      key: 'address3'
    }
  ]

  return (
    <div className="main-wrapper">
      <ComBreadcrumb navData={navData}/>
      <div className="main-content">
        <div className="panel-body">
          <Table 
            dataSource={tableData} 
            columns={tableColumns} 
            bordered={true}
            loading={false}
            rowClassName={(record, index) => {return 'row-class'}}
            rowKey="id"
            rowSelection={{
              columnWidth: '50px',
              fixed: true,
              type: 'checkbox'
            }}
            showHeader={true}
            size="default"
            onChange={(pagination, filters, sorter, extra) => {
              console.log(filters)
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default BasicTable