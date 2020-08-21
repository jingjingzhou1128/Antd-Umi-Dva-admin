import React from 'react'
import {Table, Pagination} from 'antd'
import PropTypes from 'prop-types'

import './index.scss'

function ComTable (props) {
  const {tableColumns, tableData, tableFuncs, ...otherProps} = props
  
  return (
    <div className="table-wrapper">
      <Table 
        columns={tableColumns} 
        dataSource={tableData.data} 
        rowKey={tableData.rowKey || 'id'} 
        pagination={false} 
        onChange={tableFuncs.handleChange}
        tableLayout="fixed"
        bordered={tableData.bordered}
        loading={tableData.loading}
        rowClassName={tableData.rowClassName}
        rowSelection={tableData.rowSelection}
        showHeader={tableData.showHeader}
        size="default"
        scroll={tableData.scroll || {
          x: '100%',
          scrollToFirstRowOnChange: true
        }}
        showSorterTooltip={false}
        {...otherProps}
      ></Table>
      {
        tableData.hasPage && (
          <div className="page-wrapper">
            <Pagination 
              current={tableData.page.current} 
              pageSize={tableData.page.pageSize} 
              pageSizeOptions={tableData.page.pageSizeOptions || ['10', '20', '30', '40']}
              total={tableData.page.total}
              onChange={tableFuncs.handleChangePage}
              onShowSizeChange={tableFuncs.handleChangeSize}
              showQuickJumper={tableData.page.showQuickJumper || false}
              showSizeChanger={true}
              showTotal={tableFuncs.showTotal}/>
          </div>
        )
      }
    </div>
  )
}

ComTable.propTypes = {
  tableColumns: PropTypes.array.isRequired,
  tableData: PropTypes.object.isRequired,
  tableFuncs: PropTypes.object
}

ComTable.defaultProps = {
  tableColumns: [],
  tableData: {
    data: []
  },
  tableFuncs: {}
}

export default ComTable