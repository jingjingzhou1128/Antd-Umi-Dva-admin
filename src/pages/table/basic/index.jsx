import React, {useState, useEffect} from 'react'
// import {Table} from 'antd'

import ComBreadcrumb from '@/components/ComBreadcrumb'
import ComTable from '@/components/ComTable'

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
  const [tableData, setTableData] = useState({
    bordered: true,
    loading: false,
    rowSelection: {
      columnWidth: '50px',
      fixed: true,
      type: 'checkbox'
    },
    hasPage: true,
    page: {
      current: 1,
      pageSize: 10,
      total: 20,
      handleChangePage: handleChangePage,
      handleChangeSize: handleChangeSize,
      showTotal: total => `共计${total}项`
    },
    data: []
  })

  /**
   * @author zhoujingjing
   * @description 表格列项
   */
  const tableColumns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      className: 'name',
      filterMultiple: true,
      filters: [
        {
          text: 'Filter1',
          value: 'filter1'
        },
        {
          text: 'Filter2',
          value: 'filter2'
        }
      ],
      ellipsis: true,
      // width: '100px'
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      sorter: true,
      ellipsis: true,
      // width: '100px'
    },
    {
      title: '住址',
      dataIndex: 'address',
      sorter: true,
      key: 'address',
      ellipsis: true,
      // width: '100px',
    }
  ]

  /**
   * @author zhoujingjing
   * @description 表格分页-页码更改触发回调
   */
  function handleChangePage (page, pageSize) {
    setTableData(cur => {
      let tmpTableData = {...cur}
      tmpTableData.page.current = page
      return tmpTableData
    })
  }
  
  /**
   * @author zhoujingjing
   * @description 表格分页-pageSize选择器更改触发回调
   */
  function handleChangeSize (current, size) {
    setTableData(cur => {
      let tmpTableData = {...cur}
      tmpTableData.page.current = 1
      tmpTableData.page.pageSize = size
      return tmpTableData
    })
  }

  /**
   * @author zhoujingjing
   * @description 页面挂载生命周期
   */
  useEffect(() => {
    let data = [
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
    setTableData(cur => ({
      ...cur,
      data
    }))
  }, [])

  return (
    <div className="main-wrapper">
      <ComBreadcrumb navData={navData}/>
      <div className="main-content">
        <div className="panel-body">
          <ComTable tableColumns={tableColumns} tableData={tableData}/>
          {/* <Table 
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
              console.log(pagination)
              console.log(filters)
              console.log(sorter)
            }}
            scroll={{
              x: 'max-content',
              scrollToFirstRowOnChange: true
            }}
            showSorterTooltip={false}
            pagination={{
              position: ['bottomCenter'],
              current: 1,
              disabled: false,
              pageSize: 10,
              total: 20,
              showTotal: total => `Total ${total} items`,
              pageSizeOptions: ['10', '30', '50', '100'],
              showQuickJumper: true,
              showSizeChanger: true
            }}
          /> */}
        </div>
      </div>
    </div>
  )
}

export default BasicTable