import {Dropdown, Menu, Icon} from 'antd'
import {connect} from 'dva'
import { setLocale } from 'umi-plugin-react/locale'

import {LANGS} from '@/utils'

function changeLang (value, dispatch) {
  setLocale(value, false)
  dispatch({type: 'app/setLang', lang: value})
}

function ChangeLang ({dispatch, app}) {
  return (
    <Dropdown
      trigger={['click']}
      overlay={() => (
        <Menu>
          {
            LANGS.map(item => 
              (
                <Menu.Item
                  key={item.value}
                  disabled={item.value === app.lang}
                  onClick={() => {changeLang(item.value, dispatch)}}>
                  {item.label}
                </Menu.Item>
              )
            )
          }
        </Menu>
      )}>
      <span className="ant-dropdown-link">
        <span className="text"><i className="iconfont icon-language"></i></span>
        <Icon type="caret-down"/>
      </span>
    </Dropdown>
  )
}

export default connect(({app}) => ({app}))(ChangeLang)