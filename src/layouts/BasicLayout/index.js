import React, {useState, useEffect, useRef} from 'react'
import {Layout, ConfigProvider} from 'antd'
import {connect} from 'dva'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import antdEnUS from 'antd/es/locale/en_US'
import antdZhCN from 'antd/es/locale/zh_CN'

import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import routes from '@/../config/route.config'
import {debounce} from '@/utils'
import userAjax from '@/services/user'

import './index.scss'

const {Sider, Header, Content} = Layout

// console.log(window.g_app)
function BasicLayout({app, dispatch, children, location}) {
  function nprogressStart () {
    NProgress.start()
  }
  
  function nprogressDone () {
    NProgress.done()
  }

  function resizeWindow (device, collapsed, dispatch) {
    // 获取屏幕当前宽度
    let screenWidth = window.innerWidth || document.documentElement.clientWidth
    if (screenWidth >= 1024) {
      if (device === 'mobile') {
        dispatch({type: 'app/setDevice', device: 'desktop'})
      }
    } else if (screenWidth < 1024) {
      if (device === 'desktop') {
        dispatch({type: 'app/setDevice', device: 'mobile'})
      }
      if (!collapsed) {
        dispatch({type: 'app/closeSidebar'})
      }
    }
  }

  const [menus, setMenus] = useState([])

  const prevPathRef = useRef()

  const [isInit, setIsInit] = useState(true)
  
  if (prevPathRef.current !== location.pathname) {
    nprogressStart()
    if (!app.collapsed && app.device === 'mobile') {
      dispatch({type: 'app/closeSidebar'})
    }
  }
  
  if (isInit) {
    resizeWindow(app.device, app.collapsed, dispatch)
  }

  // const [menus, setMenus] = useState(() => getPermissionMenu(routes))
  // 初始化菜单数据
  useEffect(() => {
    function getPermissionMenu (menus, codes) {
      let filterMenus = []
      for (let index in menus) {
        if (menus[index].hidden || menus[index].meta && menus[index].meta.prmCode && !codes.includes(menus[index].meta.prmCode)) {
          continue
        }
        if (menus[index].showSub && menus[index].routes) {
          filterMenus.push(...getPermissionMenu(menus[index].routes, codes))
          continue
        }
        if (menus[index].rootShow) {
          let tmpMenu = {...menus[index]}
          delete tmpMenu.routes
          filterMenus.push(tmpMenu)
          continue
        }
        if (menus[index].routes) {
          filterMenus.push({
            ...menus[index],
            routes: getPermissionMenu(menus[index].routes, codes)
          })
        } else {
          filterMenus.push(menus[index])
        }
      }
      return filterMenus
    }
    async function getPrmCodeList () {
      if (window.prmCodeList) {
        setMenus(getPermissionMenu(routes, window.prmCodeList))
      } else {
        try {
          let prmCodeList = await userAjax.getPrmCode({username: sessionStorage.getItem('username')})
          if (prmCodeList.data.flag) {
            window.prmCodeList = prmCodeList.data.result
            setMenus(getPermissionMenu(routes, prmCodeList.data.result))
          }
        } catch (e) {
          console.log(e)
        }
      }
    }
    getPrmCodeList()
    setIsInit(false)
  }, [])

  // 加载进度更新
  useEffect(() => {
    prevPathRef.current = location.pathname
    nprogressDone()
  }, [location.pathname])

  useEffect(() => {
    const __resizeHandler = debounce(() => {resizeWindow(app.device, app.collapsed, dispatch)}, 500)
    window.addEventListener('resize', __resizeHandler)
    return () => {
      window.removeEventListener('resize', __resizeHandler)
    }
  }, [dispatch, app.device, app.collapsed])

  return (
    <ConfigProvider locale={app.lang === 'zh-CN' ? antdZhCN : antdEnUS}>
      <Layout id="app">
        {app.device === 'mobile' && !app.collapsed &&
          <div className="backstage" onClick={() => {dispatch({type: 'app/closeSidebar'})}}></div>
        }
        <Sider collapsed={app.collapsed} collapsible trigger={null} className={`sidebar ${app.device}`}>
          <Sidebar menus={menus}/>
        </Sider>
        <Layout>
          <Header className="app-header">
            <Navbar/>
          </Header>
          <Content className="app-main">
            {children}
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  )
}

export default connect(({app}) => ({app}))(BasicLayout)
