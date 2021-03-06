import React, {useState, useEffect, useMemo, useCallback} from 'react'
import {Input, Button, Form} from 'antd'

import ajax from '../../../service'

import ComTable from '@/components/ComTable'

import './index.scss'

/**
 * @author zhoujingjing
 * @description 表单验证规则
 */
const FormRules = {
  name: [
    {required: true, message: '请输入姓名'}
  ],
  age: [
    {required: true, message: '请输入年龄'}
  ],
  address: [
    {required: true, message: '请输入住址'}
  ]
}

const EditTableCell = ({editable, children, row, dataIndex, isEditing, ...otherProps}) => {
  if (!editable) return <td {...otherProps}>{children}</td>
  return isEditing ? (
    <td {...otherProps}>
      <Form.Item name={dataIndex} style={{margin: 0}} rules={FormRules[dataIndex]}>
        <Input />
      </Form.Item>
    </td>
  ) : (
    <td {...otherProps}>
      <div>{children}</div>
    </td>
  )
}

function EditTableLine (props) {
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
    },
    data: []
  })

  /**
   * @author zhoujingjing
   * @description 当前编辑的表格行索引
   */
  const [editIndex, setEditIndex] = useState('')

  /**
   * @author zhoujingjing
   * @description 渲染表格操作菜单
   * @param {*} value 
   * @param {*} row 
   * @param {*} index 
   */
  const renderTableOperate = useCallback((value, row, index) => {
    let isEditing = editIndex === index

    return (
      isEditing ? (
        <div>
          <Button type="link" onClick={() => getSave(row, index)}>Save</Button>
          <Button type="link" onClick={() => getCancel(row, index)}>Cancel</Button>
        </div>
      ) : (
        <Button type="link" onClick={() => {getEdit(row, index)}}>Edit</Button>
      )
    )
  }, [editIndex])

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
  const tableColumns = useMemo(() => [
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
      ellipsis: true,
      editable: true
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
      editable: true
      // width: '100px',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      fixed: 'right',
      render: renderTableOperate
    }
  ], [tableParams.name, renderTableOperate])

  /**
   * @author zhoujingjing
   * @description 表格方法
   */
  const tableFuncs = {
    handleChangePage: handleChangePage,
    handleChangeSize: handleChangeSize,
    handleChange: handleChange,
    showTotal: total => `共计${total}项`
  }

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
          editable: column.editable,
          dataIndex: column.dataIndex,
          isEditing: editIndex === rowIndex
        })
      }
    })
  }, [tableColumns, editIndex])

  /**
   * @author zhoujingjing
   * @description 表单实例
   */
  const [form] = Form.useForm()

  /**
   * @author zhoujingjing
   * @description 编辑表格
   * @param {*} row 
   * @param {*} index 
   */
  function getEdit (row, index) {
    form.setFieldsValue(row)
    setEditIndex(index)
  }

  /**
   * @author zhoujingjing
   * @description 保存当前编辑行
   * @param {*} row 
   * @param {*} index 
   */
  function getSave (row, index) {
    let formData = form.getFieldsValue()
    setTableData(data => {
      let tmpData = {
        ...data,
        data: [...data.data]
      }
      tmpData.data[index] = Object.assign({}, row, formData)
      return tmpData
    })
    setEditIndex('')
  }

  /**
   * @author zhoujingjing
   * @description 取消当前编辑行
   * @param {*} row 
   * @param {*} index 
   */
  function getCancel (row, index) {
    setEditIndex('')
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
    if (tableData.loading) return false
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
    if (tableData.loading) return false
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
    if (tableData.loading) return false
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
   * @description 页面挂载生命周期
   */
  useEffect(() => {
    getTableList()
  }, [])

  return (
    <Form form={form} component={false}>
      <ComTable tableColumns={transTableColumns} tableData={tableData} components={tableComponents} tableFuncs={tableFuncs}/>
    </Form>
  )
}

export default EditTableLine