import {Dropdown, Menu, Icon} from 'antd'
import {connect} from 'dva'

import {THEMES} from '@/utils'

function changeTheme (dispatch, theme) {
  dispatch({type: 'app/setTheme', theme})
  document.getElementsByTagName('body')[0].setAttribute('data-theme', theme)
}

function ChangeTheme ({dispatch, app}) {
  return (
    <Dropdown
      trigger={['click']}
      overlay={() => (
        <Menu>
          {
            THEMES.map(item =>
              (
                <Menu.Item
                  key={item.value}
                  disabled={item.value === app.theme}
                  onClick={() => {changeTheme(dispatch, item.value)}}>
                  {item.label}
                </Menu.Item>
              )
            )
          }
        </Menu>
      )}>
      <span className="ant-dropdown-link">
        <span className="text"><i className="iconfont icon-T-yanse"></i></span>
        <Icon type="caret-down"/>
      </span>
    </Dropdown>
  )
}

export default connect(({app}) => ({app}))(ChangeTheme)