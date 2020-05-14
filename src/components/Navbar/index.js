import {Dropdown, Menu} from 'antd'
import {CaretDownOutlined} from '@ant-design/icons'
import {connect} from 'dva'
import router from 'umi/router'
import {formatMessage} from 'umi-plugin-react/locale'

import MyIcon from '@/components/MyIcon'
import ChangeTheme from '@/components/ChangeTheme'
import ChangeLang from '@/components/ChangeLang'
import userAvatar from '@/assets/images/avatar.jpeg'

function logout () {
  sessionStorage.removeItem('username')
  router.push('/login')
}

function Navbar ({dispatch, app}) {
  return (
    <div className="navbar">
      <div className="nav-left">
      <MyIcon type={app.collapsed ? 'icon-zhankai' : 'icon-shousuo'} onClick={() => {dispatch({type: 'app/toggleSidebar'})}}/>
      </div>
      <ul className="nav-right">
        <li>
          <ChangeTheme/>
        </li>
        <li>
          <ChangeLang/>
        </li>
        <li>
          <Dropdown
            trigger={['click']}
            overlay={() => (
              <Menu>
                <Menu.Item key="profile">
                  <span>{formatMessage({id: 'reactFrame.user.profile'})}</span>
                </Menu.Item>
                <Menu.Item key="logout" onClick={() => {logout()}}>
                  <span>Logout</span>
                </Menu.Item>
              </Menu>
            )}
            className="user-avatar">
            <span className="ant-dropdown-link">
              <img src={userAvatar} alt="User"/>
              <CaretDownOutlined />
            </span>
          </Dropdown>
        </li>
      </ul>
    </div>
  )
}

export default connect(({app}) => ({app}))(Navbar)