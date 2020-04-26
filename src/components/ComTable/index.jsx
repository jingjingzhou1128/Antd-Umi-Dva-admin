import React from 'react'
import {Table, Pagination} from 'antd'
import PropTypes from 'prop-types'

import './index.scss'

function ComTable (props) {
  const {tableColumns, tableData} = props
  
  return (
    <div className="table-wrapper">
      <Table columns={tableColumns} dataSource={tableData.data} rowKey={tableData.rowKey || 'id'} pagination={false} onChange={tableData.onChange}></Table>
      {
        tableData.hasPage && (
          <div className="page-wrapper">
            <Pagination 
              current={tableData.page.current} 
              pageSize={tableData.page.pageSize} 
              pageSizeOptions={tableData.page.pageSizeOptions || ['10', '20', '30', '40']}
              total={tableData.page.total}
              onChange={tableData.page.handleChangePage}
              onShowSizeChange={tableData.page.handleChangeSize}
              showQuickJumper={tableData.page.showQuickJumper || false}
              showSizeChanger={tableData.page.showSizeChanger || false}
              showTotal={tableData.page.showTotal}/>
          </div>
        )
      }
    </div>
  )
}

ComTable.propTypes = {
  tableColumns: PropTypes.array.isRequired,
  tableData: PropTypes.object.isRequired
}

ComTable.defaultProps = {
  tableColumns: [],
  tableData: {
    data: []
  }
}

export default ComTable