import React, { useState, useEffect } from 'react'
import {Menu} from 'antd'
import Link from 'umi/link'
import {formatMessage} from 'umi-plugin-react/locale'
import PropTypes from 'prop-types'
import withRouter from 'umi/withRouter'

import MyIcon from '@/components/MyIcon'

const {SubMenu} = Menu

function Sidebar (props) {
  const [selectedKeys, setSelectedKeys] = useState(`menu${props.location.pathname}`)

  useEffect(() => {
    setSelectedKeys(`menu${props.location.pathname}`)
  }, [props.location.pathname])

  return (
    <Menu
      mode="inline"
      selectedKeys={selectedKeys}
      theme="dark"
      className="sidebar-menu"
    >
      {
        props.menus.map(menu => {
          if (menu.routes) {
            return (
              <SubMenu
                key={`menu${menu.path}`}
                title={
                  <span>
                    <MyIcon type={menu.meta.icon}/>
                    <span>{formatMessage({id: `reactFrame.route.${menu.meta.name}`})}</span>
                  </span>
                }
              >
                {
                  menu.routes.map(subMenu => {
                    if (!subMenu.routes) {
                      return (
                        <Menu.Item key={`menu${subMenu.path}`}>
                          <Link to={{pathname: subMenu.path, state: subMenu.meta}}>{formatMessage({id: `reactFrame.route.${subMenu.meta.name}`})}</Link>
                        </Menu.Item>
                      )
                    } else {
                      return null
                    }
                  })
                }
              </SubMenu>
            )
          } else {
            return (
              <Menu.Item key={`menu${menu.path}`}>
                <Link to={{pathname: menu.path, state: menu.meta}}>
                  <MyIcon type={menu.meta.icon}/>
                  <span>{formatMessage({id: `reactFrame.route.${menu.meta.name}`})}</span>
                </Link>
              </Menu.Item>
            )
          }
        })
      }
    </Menu>
  )
}

Sidebar.propTypes = {
  menus: PropTypes.array.isRequired,
}

Sidebar.defaultProps = {
  menus: []
}

export default withRouter(Sidebar)