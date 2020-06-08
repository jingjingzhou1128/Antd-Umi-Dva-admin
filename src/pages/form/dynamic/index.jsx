import React from 'react'
import {Form, Button, Input} from 'antd'

import ComBreadcrumb from '@/components/ComBreadcrumb'

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
            className="basic-form">
              <Form.Item
                name="title"
                label="标题"
                rules={[{required: true, message: 'Please input title'}]}>
                <Input placeholder="Please input title"/>
              </Form.Item>
              <Form.List name="users">
                {
                  (fields, {add, remove}) => {
                    return (
                      <div>
                        {
                          fields.map((field, index) => (
                            <Form.Item 
                              {...field}
                              // label={index === 0 ? '用户' : ''}
                              label="用户"
                              name={[field.name, 'first']}
                              fieldKey={[field.fieldKey, 'first']}>
                              <Input placeholder="Please input ..."/>
                              {/* {
                                index > 0 ? <i className="iconfont icon-jianhao"></i> : null
                              } */}
                            </Form.Item>
                          ))
                        }
                        <Form.Item>
                          <Button type="dashed" onClick={() => {add()}} block>Add</Button>
                        </Form.Item>
                      </div>
                    )
                  }
                }
              </Form.List>
              <Form.Item {...formBtnLayout}>
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