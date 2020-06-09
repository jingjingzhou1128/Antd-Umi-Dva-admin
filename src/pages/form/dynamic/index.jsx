import React, {useEffect, useState} from 'react'
import {Form, Button, Input, Space} from 'antd'

import ComBreadcrumb from '@/components/ComBreadcrumb'

import './index.scss'

function DynamicForm (props) {
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
  const [formValues, setFormValues] = useState({
    title: '',
    users: ['']
  })

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
   * @description 页面挂载完成生命周期方法
   */
  useEffect(() => {
    let values = {
      title: 'title',
      users: ['user1'],
      goods: [{name: 'goods1', price: 12}]
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
          >
            <Form.Item
              name="title"
              label="标题"
              rules={[{required: true, message: 'Please input title'}]}
            >
              <Input placeholder="Please input title"/>
            </Form.Item>
            <Form.List name="users">
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
            </Form.List>
            <Form.List name="goods">
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
            </Form.List>
            <Form.Item 
              {...formBtnLayout}
              className="form-item-btns"
            >
              <Button type="primary" htmlType="submit">提交</Button>
              <Button htmlType="button">重置</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default DynamicForm