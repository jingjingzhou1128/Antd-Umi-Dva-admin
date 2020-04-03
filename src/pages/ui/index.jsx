import React from 'react'
import {connect} from 'dva'

function UI () {
  return (
    <div>ui</div>
  )
}

export default connect(({app}) => ({app}))(UI)