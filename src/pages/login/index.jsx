import React, {Component} from 'react'
import {Form, Input, Button, Checkbox} from 'antd'
import router from 'umi/router'
// import {connect} from 'dva'

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

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  componentDidMount () {
    let username = localStorage.getItem('username')
    let password = localStorage.getItem('password')
    if (username) {
      this.setState({
        username: username
      })
    }
    if (password) {
      this.setState({
        password: uncompileStr(password)
      })
    }
  }

  // 登录
  handleLogin (e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (err) return
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
      // this.props.dispatch({
      //   type: 'user/setUsername',
      //   username: values.username
      // })
    })
  }
  
  render () {
    const {getFieldDecorator} = this.props.form
    return (
      <div className="login">
        <Form onSubmit={(e) => {this.handleLogin(e)}} className="login-form">
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{required: true, message: 'Please input username'}],
              initialValue: this.state.username
            })(
              <Input
                prefix={<MyIcon type="icon-user"/>}
                placeholder="Please input username"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{required: true, message: 'Please input password'}],
              initialValue: this.state.password
            })(
              <Input
                prefix={<MyIcon type="icon-mima"/>}
                type="password"
                placeholder="Please input password"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('isRember', {
              valuePropName: 'checked',
              initialValue: false
            })(
              <Checkbox>Remember me</Checkbox>
            )}
            <Button type="primary" htmlType="submit" className="btn-login" block>Login</Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}


// export default connect(({user}) => ({user}))(Form.create({name: 'login_form'})(Login))
export default Form.create({name: 'login_form'})(Login)
