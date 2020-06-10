import React, {useEffect, useState} from 'react'
import {Form, Button, Input, Space} from 'antd'

import ComBreadcrumb from '@/components/ComBreadcrumb'

import './index.scss'
import { isArray } from 'util'

function DynamicForm (props) {
  /**
   * @author zhoujingjing
   * @description 表单初始化值
   */
  const formInitialValues = {
    title: '',
    users: [''],
    goods: [{}],
    user1: [''],
    goods1: [{}]
  }
  /**
   * @author zhoujingjing
   * @description 面包屑导航栏
   */
  const navData = {
    separator: '/',
    list: [
      {
        title: '首页',
        path: '/home/dashboard'
      },
      {
        title: '表单页',
        path: ''
      },
      {
        title: '动态表单',
        path: ''
      }
    ]
  }

  /**
   * @author zhoujingjing
   * @description 表单实例
   */
  const [formInstance] = Form.useForm()

  /**
   * @author zhoujingjing
   * @description 表单数据
   */
  const [formValues, setFormValues] = useState(formInitialValues)

  /**
   * @author zhoujingjing
   * @description 表单项布局数据
   */
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 },
  }

  /**
   * @author zhoujingjing
   * @description 表单按钮布局数据
   */
  const formBtnLayout = {
    wrapperCol: { offset: 6, span: 12 },
  }

  /**
   * @author zhoujingjing
   * @description 表单提交成功回调方法
   */
  function handleSubmit (e) {
    console.log(e)
  }

  /**
   * @author zhoujingjing
   * @description 重置表单数据
   */
  function resetForm () {
    formInstance.resetFields()
  }

  /**
   * @author zhoujingjing
   * @description 验证表单数据-users
   */
  function validUsers (rule, value, callback) {
    let users = formInstance.getFieldValue('users')
    if (!Array.isArray(users)) {
      callback(new Error('Please input one user at least'))
      return
    }
    let hasEmpty = users.some(item => !item)
    if (hasEmpty) {
      callback(new Error('Please input field'))
    } else {
      callback()
    }
  }

  /**
   * @author zhoujingjing
   * @description 验证表单数据-goods
   */
  function validGoods (rule, value, callback) {
    let goods = formInstance.getFieldValue('goods')
    if (!isArray(goods)) {
      callback(new Error('Please input one goods at least'))
      return
    }
    let hasEmpty = goods.some(item => {
      return item ? !item.name || !item.price : true
    })
    if (hasEmpty) {
      callback(new Error('Please input field'))
    } else {
      callback()
    }
  }

  /**
   * @author zhoujingjing
   * @description 页面挂载完成生命周期方法
   */
  useEffect(() => {
    let values = {
      title: 'title',
      users: ['user1'],
      goods: [{name: 'goods1', price: 12}],
      user1: [''],
      goods1: [{name: 'goods1', price: 12}]
    }
    setFormValues(values)
  }, [])

  /**
   * @author zhoujingjing
   * @description 表单数据更新时触发
   */
  useEffect(() => {
    formInstance.setFieldsValue(formValues)
  }, [formInstance, formValues])

  return (
    <div className="main-wrapper">
      <ComBreadcrumb navData={navData}/>
      <div className="main-content">
        <div className="panel-body">
          <Form
            form={formInstance}
            name="basicForm"
            onFinish={handleSubmit}
            layout="horizontal"
            {...formItemLayout}
            className="dynamic-form"
            initialValues={formInitialValues}
          >
            <Form.Item
              name="title"
              label="标题"
              rules={[{required: true, message: 'Please input title'}]}
            >
              <Input placeholder="Please input title"/>
            </Form.Item>
            {/* <Form.List name="users">
              {
                (fields, {add, remove}) => {
                  return (
                    <div className="form-list-items">
                      {
                        fields.map((field, index) => (
                          <Form.Item 
                            label={index === 0 ? '用户' : ''}
                            key={field.key}
                            {...(index === 0 ? formItemLayout : formBtnLayout)}
                            className="form-list-item"
                          >
                            <Form.Item 
                              {...field}
                              validateTrigger={['onBlur']}
                              rules={[
                                {
                                  required: true,
                                  validator: validUsers,
                                  validateTrigger: 'onBlur'
                                }
                              ]}
                            >
                              <Input placeholder="Please input ..."/>
                            </Form.Item>
                            {
                              index > 0 ? <i className="iconfont icon-jianhao btn-remove" onClick={() => {remove(field.name)}}></i> : null
                            }
                          </Form.Item>
                        ))
                      }
                      <Form.Item
                        {...formBtnLayout}
                        className="btn-add"
                      >
                        <Button type="dashed" onClick={() => {add()}} block>Add</Button>
                      </Form.Item>
                    </div>
                  )
                }
              }
            </Form.List> */}
            {/* <Form.List name="goods">
              {
                (fields, {add, remove}) => {
                  return (
                    <div className="form-list-items">
                      {
                        fields.map((field, index) => (
                          <Form.Item 
                            label={index === 0 ? '商品' : ''}
                            key={field.key}
                            {...(index === 0 ? formItemLayout : formBtnLayout)}
                            className="form-list-item"
                          >
                            <Space>
                              <Form.Item 
                                {...field}
                                name={[field.name, 'name']}
                                fieldKey={[field.fieldKey, 'name']}
                              >
                                <Input placeholder="Please input ..."/>
                              </Form.Item>
                              <Form.Item 
                                {...field}
                                name={[field.name, 'price']}
                                fieldKey={[field.fieldKey, 'price']}
                              >
                                <Input placeholder="Please input ..."/>
                              </Form.Item>
                            </Space>
                            {
                              index > 0 ? <i className="iconfont icon-jianhao btn-remove" onClick={() => {remove(field.name)}}></i> : null
                            }
                          </Form.Item>
                        ))
                      }
                      <Form.Item
                        {...formBtnLayout}
                        className="btn-add"
                      >
                        <Button type="dashed" onClick={() => {add()}} block>Add</Button>
                      </Form.Item>
                    </div>
                  )
                }
              }
            </Form.List> */}
            <Form.List name="users">
              {
                (fields, {add, remove}) => {
                  return (
                    <Form.Item 
                      label="用户" 
                      required={true}
                      validateTrigger={['onChange']}
                      name="users"
                      rules={[
                        {
                          required: true,
                          validator: validUsers,
                          validateTrigger: 'onChange'
                        }
                      ]}
                    >
                      <div className="form-list-items" >
                        {
                          fields.map((field, index) => (
                            <div key={field.key} className="form-list-item">
                              <Form.Item 
                                {...field}
                              >
                                <Input placeholder="Please input ..."/>
                              </Form.Item>
                              {
                                index === 0 ? 
                                  <i className="iconfont icon-jiahao btn-add" onClick={() => {add()}}></i> 
                                  : <i className="iconfont icon-jianhao btn-remove" onClick={() => {remove(field.name)}}></i>
                              }
                            </div>
                          ))
                        }
                      </div>
                    </Form.Item>
                  )
                }
              }
            </Form.List>
            <Form.List name="goods">
              {
                (fields, {add, remove}) => {
                  return (
                    <Form.Item 
                      label="商品" 
                      required={true}
                      validateTrigger={['onChange']}
                      name="goods"
                      rules={[
                        {
                          required: true,
                          validator: validGoods,
                          validateTrigger: 'onChange'
                        }
                      ]}
                    >
                      <div className="form-list-items">
                        {
                          fields.map((field, index) => (
                            <div 
                              key={field.key}
                              className="form-list-item"
                            >
                              <Space>
                                <Form.Item 
                                  {...field}
                                  name={[field.name, 'name']}
                                  fieldKey={[field.fieldKey, 'name']}
                                >
                                  <Input placeholder="Please input ..."/>
                                </Form.Item>
                                <Form.Item 
                                  {...field}
                                  name={[field.name, 'price']}
                                  fieldKey={[field.fieldKey, 'price']}
                                >
                                  <Input placeholder="Please input ..."/>
                                </Form.Item>
                              </Space>
                              {
                                index === 0 ? 
                                  <i className="iconfont icon-jiahao btn-add" onClick={() => {add()}}></i> 
                                  : <i className="iconfont icon-jianhao btn-remove" onClick={() => {remove(field.name)}}></i>
                              }
                            </div>
                          ))
                        }
                      </div>
                    </Form.Item>
                  )
                }
              }
            </Form.List>
            <Form.List name="user1">
              {
                (fields, {add, remove}) => {
                  return (
                    <Form.Item label="用户1" className="form-list-items" required={true}>
                      {
                        fields.map((field, index) => (
                          <div key={field.key} className="form-list-item">
                            <Form.Item 
                              {...field}
                              validateTrigger={['onBlur']}
                              rules={[
                                {
                                  required: true,
                                  message: 'Please input field',
                                  validateTrigger: 'onBlur'
                                }
                              ]}
                            >
                              <Input placeholder="Please input ..."/>
                            </Form.Item>
                            {
                              index > 0 ? <i className="iconfont icon-jianhao btn-remove" onClick={() => {remove(field.name)}}></i> : null
                            }
                          </div>
                        ))
                      }
                      <Button type="dashed" onClick={() => {add()}} block>Add</Button>
                    </Form.Item>
                  )
                }
              }
            </Form.List>
            <Form.List name="goods1">
              {
                (fields, {add, remove}) => {
                  return (
                    <Form.Item label="商品1" required={true}>
                      {
                        fields.map((field, index) => (
                          <div 
                            key={field.key}
                            className="form-list-item"
                          >
                            <Space>
                              <Form.Item 
                                {...field}
                                name={[field.name, 'name']}
                                fieldKey={[field.fieldKey, 'name']}
                                rules={[
                                  {
                                    required: true,
                                    message: 'Please input field'
                                  }
                                ]}
                              >
                                <Input placeholder="Please input ..."/>
                              </Form.Item>
                              <Form.Item 
                                {...field}
                                name={[field.name, 'price']}
                                fieldKey={[field.fieldKey, 'price']}
                                rules={[
                                  {
                                    required: true,
                                    message: 'Please input field'
                                  }
                                ]}
                              >
                                <Input placeholder="Please input ..."/>
                              </Form.Item>
                            </Space>
                            {
                              index > 0 ? <i className="iconfont icon-jianhao btn-remove" onClick={() => {remove(field.name)}}></i> : null
                            }
                          </div>
                        ))
                      }
                      <Button type="dashed" onClick={() => {add()}} block>Add</Button>
                    </Form.Item>
                  )
                }
              }
            </Form.List>
            <Form.Item 
              {...formBtnLayout}
              className="form-item-btns"
            >
              <Button type="primary" htmlType="submit">提交</Button>
              <Button htmlType="button" onClick={resetForm}>重置</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default DynamicForm