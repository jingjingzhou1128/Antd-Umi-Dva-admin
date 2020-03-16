import {Fragment, useState, useEffect} from 'react'
import {Redirect} from 'react-router-dom'

import Loader from '@/components/Loader/Loader'
import userAjax from '@/services/user'

function BeforeRoute ({children}) {
  // let path = location.pathname
  // if (path === '/login') {
  //   userAjax.isLogin().then(res => {
  //     if (res.data.flag) {
  //       sessionStorage.setItem('username', res.data.result.username)
  //       router.push('/dashboard')
  //       // return (<Redirect to="/dashboard"/>)
  //     } else {
  //       sessionStorage.removeItem('username')
  //       return (<Fragment>{children}</Fragment>)
  //     }
  //   }).catch((error) => {
  //     console.log(error)
  //   })
  //   return (<Loader spinning={true} fullScreen={true}/>)
  //   // return (<Fragment>{children}</Fragment>)
  // } else {
  //   let username = sessionStorage.getItem('username')
  //   if (!username && path !== '/403' && path !== '/404') {
  //     sessionStorage.removeItem('username')
  //     // router.push('/login')
  //     return (<Redirect to="/login"/>)
  //   } else {
  //     return (<Fragment>{children}</Fragment>)
  //   }
  // }
  
  const [isLoad, setIsLoad] = useState(true)
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    userAjax.isLogin({username: sessionStorage.getItem('username')}).then(res => {
      if (res.data.flag) {
        sessionStorage.setItem('username', res.data.result.username)
        setIsLogin(true)
        setIsLoad(false)
      } else {
        sessionStorage.removeItem('username')
        setIsLoad(false)
        setIsLogin(false)
      }
    }).catch((error) => {
      console.log(error)
    })
  }, [])

  return (
    isLoad ?
      <Loader spinning={true} fullScreen={true}/> :
      (!isLogin ?
        <Fragment>{children}</Fragment> :
        <Redirect to="/home/dashboard"/>)
  )
}

export default BeforeRoute
