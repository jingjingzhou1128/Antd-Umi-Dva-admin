import React, {useEffect} from 'react'
import {Form, Input, Button, Checkbox} from 'antd'
import router from 'umi/router'

import MyIcon from '@/components/MyIcon'
import userAjax from '@/services/user'

import './index.scss'

// 字符串加密
function compileStr (code) {
  if (code === '') {
    return code
  }
  let c = String.fromCharCode(code.charCodeAt(0) + code.length)
  for (let i = 1; i < code.length; i++) {
    c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1))
  }
  return escape(c)
}

// 字符串解密
function uncompileStr (code) {
  if (code === '') {
    return code
  }
  code = unescape(code)
  let c = String.fromCharCode(code.charCodeAt(0) - code.length)
  for (let i = 1; i < code.length; i++) {
    c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1))
  }
  return c
}

function Login (props) {
  const [loginForm] = Form.useForm()

  useEffect(() => {
    let username = localStorage.getItem('username')
    let password = localStorage.getItem('password')
    let userInfo = {
      username: '',
      password: '',
      isRember: false
    }
    if (username) {
      userInfo.username = username
    }
    if (password) {
      userInfo.password = uncompileStr(password)
    }
    loginForm.setFieldsValue(userInfo)
  }, [loginForm])

  // 登录
  function handleLogin (values) {
    // console.log(values)
    // console.log(this.state.loginData)
    userAjax.login({username: values.username, password: values.password}).then(res => {
      if (res.data.flag) {
        window.notificationSuccess({
          msg: 'Success',
          desc: '登录成功！'
        })
        if (values.isRember) {
          localStorage.setItem('username', values.username)
          localStorage.setItem('password', compileStr(values.password))
        } else {
          localStorage.removeItem('username')
          localStorage.removeItem('password')
        }
        sessionStorage.setItem('username', res.data.result.username)
        router.push('/home/dashboard')
      } else if (res.data.code === 'E0001') {
        window.notificationError({
          msg: 'Error',
          desc: res.data.msg
        })
      }
    })
  }

  return (
    <div className="login">
      <Form onFinish={handleLogin} form={loginForm} className="login-form">
        <Form.Item
          name="username"
          rules={[{required: true, message: 'Please input username'}]}>
          <Input
            prefix={<MyIcon type="icon-user"/>}
            placeholder="Please input username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{required: true, message: 'Please input password'}]}>
          <Input
            prefix={<MyIcon type="icon-mima"/>}
            type="password"
            placeholder="Please input password"
          />
        </Form.Item>
        <Form.Item
          name="isRember"
          valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="btn-login" block>Login</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login
