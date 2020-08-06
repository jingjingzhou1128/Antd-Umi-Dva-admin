import React, {useState, useEffect, useRef, useMemo} from 'react'
import {Dropdown, Menu, Input} from 'antd'

import ajax from '../service'

import ComBreadcrumb from '@/components/ComBreadcrumb'
import ComTable from '@/components/ComTable'
import MyIcon from '@/components/MyIcon'

const EditTableCell = ({editable, children, row, rowIndex,  dataIndex, onSaveCell, ...otherProps}) => {
  const [isEditing, setEditing] = useState(false)

  const inputRef = useRef(null)

  function toggleEdit () {
    setEditing(!isEditing)
  }

  function saveValue (e) {
    toggleEdit()
    onSaveCell(dataIndex, rowIndex, e.target.value)
  }

  useEffect(() => {
    if (inputRef && isEditing) {
      inputRef.current.focus()
    }
  }, [isEditing])

  if (!editable) return <td {...otherProps}>{children}</td>
  return isEditing ? (
    <td {...otherProps}>
      <Input ref={inputRef} defaultValue={row[dataIndex]} onPressEnter={saveValue} onBlur={saveValue}/>
    </td>
  ) : (
    <td {...otherProps}>
      <div onClick={toggleEdit}>{children}</div>
    </td>
  )
}

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
      total: 0,
      handleChangePage: handleChangePage,
      handleChangeSize: handleChangeSize,
      showTotal: total => `共计${total}项`
    },
    handleChange: handleChange,
    data: []
  })

  /**
   * @author zhoujingjing
   * @description 表格过滤，排序等数据
   */
  const [tableParams, setTableParams] = useState({
    name: '',
    sorterKey: '',
    sorterOrder: ''
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
      filteredValue: tableParams.name,
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
      ellipsis: true
      // width: '100px'
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      sorter: true,
      ellipsis: true,
      editable: true
      // width: '100px'
    },
    {
      title: '住址',
      dataIndex: 'address',
      sorter: true,
      key: 'address',
      ellipsis: true,
      // width: '100px',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      fixed: 'right',
      render: renderTableOperate
    }
  ]

  /**
   * @author zhoujingjing
   * @description 覆盖表格table元素
   */
  const tableComponents = {
    body: {
      cell: EditTableCell
    }
  }

  /**
   * @author zhoujingjing
   * @description 转换列表项，添加单元格属性
   */
  const transTableColumns = useMemo(() => {
    return tableColumns.map(column => {
      if (!column.editable) return column
      return {
        ...column,
        onCell: (row, rowIndex) => ({
          row,
          rowIndex,
          editable: column.editable,
          dataIndex: column.dataIndex,
          onSaveCell: handleSaveCell
        })
      }
    })
  }, [tableColumns])

  /**
   * @author zhoujingjing
   * @description 渲染表格操作菜单
   * @param {*} value 
   * @param {*} row 
   * @param {*} index 
   */
  function renderTableOperate (value, row, index) {
    let menus = (
      <Menu>
        <Menu.Item key="delete">Delete</Menu.Item>
        <Menu.Item key="view">View Detail</Menu.Item>
      </Menu>
    )

    return (
      <Dropdown
        overlay={menus}
        trigger={['click']}
      >
        <MyIcon type="icon-more"/>
      </Dropdown>
    )
  }

  /**
   * @author zhoujingjing
   * @description 列表过滤条件、排序条件更改触发回调
   * @param {*} pagination 
   * @param {*} filters 
   * @param {*} sorter 
   * @param {*} extra 
   */
  function handleChange (pagination, filters, sorter, extra) {
    let data = {
      ...tableParams,
      ...filters,
      sorterKey: sorter.field,
      sorterOrder: sorter.order
    }
    setTableParams(data)
    getTableList(data)
  }

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
    getTableList({pageNumb: page})
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
    getTableList({pageSize: size, pageNumb: 1})
  }

  /**
   * @author zhoujingjing
   * @description 获取列表数据
   * @param {*} data 
   */
  function getTableList (data = {}) {
    setTableData(cur => ({
      ...cur,
      loading: true
    }))
    // eslint-disable-next-line compat/compat
    let queryData = Object.assign({pageSize: tableData.page.pageSize, pageNumb: tableData.page.current, ...tableParams}, data)
    ajax.getTableList(queryData).then(res => {
      if (res.data.flag) {
        setTableData(cur => ({
          ...cur,
          loading: false,
          page: {
            ...cur.page,
            total: res.data.result.total
          },
          data: res.data.result.data
        }))
      } else {
        setTableData(cur => ({
          ...cur,
          loading: true
        }))
      }
    }).catch(error => {
      setTableData(cur => ({
        ...cur,
        loading: false
      }))
    })
  }

  /**
   * @author zhoujingjing
   * @description 保存修改后的表格值
   * @param {*} name 
   * @param {*} rowIndex 
   * @param {*} value 
   */
  function handleSaveCell (name, rowIndex, value) {
    setTableData(data => {
      let tmpData = {...data}
      tmpData.data[rowIndex][name] = value
      return tmpData
    })
  }

  /**
   * @author zhoujingjing
   * @description 页面挂载生命周期
   */
  useEffect(() => {
    getTableList()
  }, [])

  return (
    <div className="main-wrapper">
      <ComBreadcrumb navData={navData}/>
      <div className="main-content">
        <div className="panel-body">
          <ComTable tableColumns={transTableColumns} tableData={tableData} components={tableComponents}/>
        </div>
      </div>
    </div>
  )
}

export default EditTable