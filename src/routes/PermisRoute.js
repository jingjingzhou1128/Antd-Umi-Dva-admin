import React, {Fragment, useState, useEffect} from 'react'
import {Redirect} from 'react-router-dom'

import userAjax from '@/services/user'

function PermisRoute ({children, route, location}) {
  const [hasPermis, setHasPermis] = useState(false)
  const [isLoad, setIsLoad] = useState(true)
  const [isLogin, setIsLogin] = useState(true)

  useEffect(() => {
    let username = sessionStorage.getItem('username')
    if (!username) {
      setIsLogin(false)
      setIsLoad(false)
    } else if (location.pathname === '/home/dashboard') {
      window.prmCodeList = null
      userAjax.getPrmCode({username}).then(res => {
        if (res.data.flag) {
          window.prmCodeList = res.data.result
          setHasPermis(true)
          setIsLoad(false)
        }
      }).catch(() => {})
    } else if (!route.meta.prmCode) {
      setHasPermis(true)
      setIsLoad(false)
    } else {
      if (window.prmCodeList) {
        if (window.prmCodeList.includes(route.meta.prmCode)) {
          setHasPermis(true)
          setIsLoad(false)
        } else {
          setHasPermis(false)
          setIsLoad(false)
        }
      } else {
        userAjax.getPrmCode({username}).then(res => {
          if (res.data.flag) {
            window.prmCodeList = res.data.result
            if (res.data.result.includes(route.meta.prmCode)) {
              setHasPermis(true)
              setIsLoad(false)
            } else {
              setHasPermis(false)
              setIsLoad(false)
            }
          }
        })
      }
    }
  }, [route.meta.prmCode, location.pathname])

  return (
    isLoad ?
      <div>Loading</div> :
      (
        !isLogin ?
          <Redirect to="/login"/> :
          (
            hasPermis ?
              <Fragment>{children}</Fragment> :
              <Redirect to="/403"/>
          )
      )
  )
}

export default PermisRoute