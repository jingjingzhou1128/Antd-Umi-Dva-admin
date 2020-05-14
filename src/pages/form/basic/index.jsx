import React from 'react'

import ComBreadcrumb from '@/components/ComBreadcrumb'
import ComForm from '@/components/ComForm'

import './index.scss'

function FormBasic (props) {
  // /**
  //  * @author zhoujingjing
  //  * @description 表单布局方式
  //  */
  // const [formLayout, setFormLayout] = useState('horizontal')

  // /**
  //  * @author zhoujingjing
  //  * @description 表单标签、输入框布局
  //  */
  // const formItemlayout = {
  //   labelCol: { span: 6 },
  //   wrapperCol: { span: 12 },
  // }

  // /**
  //  * @author zhoujingjing
  //  * @description 表单按钮布局
  //  */
  // const formBtnLayout = {
  //   wrapperCol: { offset: 6, span: 12 },
  // }

  /**
   * @author zhoujingjing
   * @description 面包屑导航
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
        title: '基础表单',
        path: ''
      }
    ]
  }

  // /**
  //  * @author zhoujingjing
  //  * @description 表单实列
  //  */
  // const [formInstance] = Form.useForm()

  // /**
  //  * @author zhoujingjing
  //  * @description 提交表单
  //  */
  // function handleSubmit (values) {}

  const formInputs = [
    {
      name: 'title',
      label: '标题',
      rules: [{required: true, message: 'Please input title'}],
      type: 'text',
      placeholder: 'Please input title'
    },
    {
      name: 'desc',
      label: '描述',
      rules: [{required: false}],
      type: 'textarea',
      placeholder: 'Please input description',
      autoSize: { minRows: 4, maxRows: 6 }
    },
    {
      name: 'password',
      label: '密码',
      rules: [{required: false}],
      type: 'password',
      placeholder: 'Please input password',
      visibilityToggle: true
    },
    {
      name: 'number',
      label: '权重',
      rules: [{required: false}],
      type: 'number',
      placeholder: 'Please input weight',
      precision: 0,
      min: 0,
      max: 6,
      formatter: (value) => `${value}%`
    },
    {
      name: 'autoComplete',
      label: 'AutoComplete',
      rules: [{required: false}],
      type: 'autoComplete',
      placeholder: '',
      options: [
        {
          label: 'label1',
          value: 'label11'
        },
        {
          label: 'label2',
          value: 'label22'
        }
      ],
      onSearch: (value) => {
        console.log('search:', value)
      },
      onChange: (value) => {
        console.log('change:', value)
      },
      filterOption: true
    }
  ]
  const formFunc = {
    submitText: '提交',
    submitFunc: (values) => {console.log(values)},
    resetText: '重置',
    resetFunc: () => {}
  }
  const formClass = {
    formName: 'basicForm',
    formClass: 'basic-form',
    formLayout: 'horizontal',
    formItemLayout: {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 },
    },
    formBtnLayout: {
      wrapperCol: { offset: 6, span: 12 },
    }
  }

  return (
    <div className="main-wrapper">
      <ComBreadcrumb navData={navData}/>
      <div className="main-content">
        <ComForm formInputs={formInputs} formFunc={formFunc} formClass={formClass}/>
        {/* <Form
          form={formInstance}
          name="basicForm"
          onFinish={handleSubmit}
          layout={formLayout}
          {...formItemlayout}
          className="basic-form">
            <Form.Item
              name="title"
              label="标题"
              rules={[{required: true, message: 'Please input title'}]}>
              <Input placeholder="Please input title"/>
            </Form.Item>
            <Form.Item
              name="date"
              label="起止日期"
              rules={[{required: true, message: 'Please select date'}]}>
                <RangePicker />
            </Form.Item>
            <Form.Item
              name="desc"
              label="目标描述"
              rules={[{required: false}]}>
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item
              name="custom"
              label="客户"
              rules={[{required: false}]}>
                <Select
                  placeholder=""
                  allowClear>
                  <Select.Option value="user1">User1</Select.Option>
                  <Select.Option value="user2">User2</Select.Option>
                  <Select.Option value="user3">User3</Select.Option>
                </Select>
              </Form.Item>
            <Form.Item
              name="weight"
              label="权重"
              rules={[{required: false}]}>
              <InputNumber />
            </Form.Item>
            <Form.Item
              name="roles"
              label="角色"
              rules={[{required: false}]}>
              <Radio.Group>
                <Radio value={1}>A</Radio>
                <Radio value={2}>B</Radio>
                <Radio value={3}>C</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item {...formBtnLayout}>
              <Button type="primary" htmlType="submit">提交</Button>
              <Button htmlType="button">重置</Button>
            </Form.Item>
        </Form> */}
      </div>
    </div>
  )
}

export default FormBasic