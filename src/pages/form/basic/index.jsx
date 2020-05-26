import React, {useState} from 'react'

import ComBreadcrumb from '@/components/ComBreadcrumb'
import ComForm from '@/components/ComForm'

import {validateImage} from '@/utils/validate'

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

  const [formInputs, setFormInputs] = useState([
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
    },
    {
      name: 'checkbox',
      label: 'Checkbox',
      rules: [{required: false}],
      type: 'checkbox',
      placeholder: 'Please select ...',
      options: [
        {
          label: 'Check1',
          value: 'check1'
        },
        {
          label: 'Check2',
          value: 'check2',
          disabled: true
        },
        {
          label: 'Check3',
          value: 'check3'
        }
      ],
      onChange: (value) => {
        console.log('change:', value)
      },
      inputName: 'checkbox'
    },
    {
      name: 'cascader',
      label: 'Cascader',
      rules: [{required: false}],
      type: 'cascader',
      placeholder: 'Please select ...',
      allowClear: true,
      options: [
        {
          label: 'Cascader1',
          value: 'cascader1',
          children: [
            {
              label: 'Cascader1-1',
              value: 'cascader1-1'
            },
            {
              label: 'Cascader1-2',
              value: 'cascader1-2'
            }
          ]
        },
        {
          label: 'Cascader2',
          value: 'cascader2',
          children: [
            {
              label: 'Cascader2-1',
              value: 'cascader2-1'
            },
            {
              label: 'Cascader2-2',
              value: 'cascader2-2'
            }
          ]
        },
        {
          label: 'Cascader3',
          value: 'cascader3'
        }
      ],
      onChange: (value) => {
        console.log('change:', value)
      }
    },
    {
      name: 'date',
      label: 'Date',
      rules: [{required: false}],
      type: 'date',
      allowClear: true,
      format: 'YYYY-MM-DD'
    },
    {
      name: 'week',
      label: 'Week',
      rules: [{required: false}],
      type: 'week',
      allowClear: true,
      format: 'YYYY-wo'
    },
    {
      name: 'month',
      label: 'Month',
      rules: [{required: false}],
      type: 'month',
      allowClear: true,
      format: 'YYYY-MM'
    },
    {
      name: 'quarter',
      label: 'Quarter',
      rules: [{required: false}],
      type: 'quarter',
      allowClear: true
    },
    {
      name: 'year',
      label: 'Year',
      rules: [{required: false}],
      type: 'year',
      allowClear: true,
      format: 'YYYY'
    },
    {
      name: 'range',
      label: 'Range',
      rules: [{required: false}],
      type: 'range',
      picker: 'date',
      allowClear: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      showTime: true
    },
    {
      name: 'rate',
      label: 'Rate',
      rules: [{required: false}],
      type: 'rate',
      allowHalf: true,
      allowClear: true,
      count: 5
    },
    {
      name: 'radio',
      label: 'Radio',
      rules: [{required: false}],
      type: 'radio',
      options: [
        {
          label: 'Radio1',
          value: 'radio1'
        },
        {
          label: 'Radio2',
          value: 'radio2'
        },
        {
          label: 'Radio3',
          value: 'radio3'
        }
      ],
      inputName: 'radio',
      count: 5,
      onChange: (value) => {
        console.log(value)
      }
    },
    {
      name: 'switch',
      label: 'Switch',
      rules: [{required: false}],
      type: 'switch',
      valuePropName: 'checked',
      onChange: (value) => {
        console.log(value)
      }
    },
    {
      name: 'select',
      label: 'Select',
      rules: [{required: false}],
      type: 'select',
      placeholder: 'Please select ...',
      allowClear: true,
      filterOption: true,
      options: [
        {
          label: 'Select1',
          value: 'select1'
        },
        {
          label: 'Select2',
          value: 'select2'
        },
        {
          label: 'Select3',
          value: 'select3'
        }
      ],
      onChange: (value) => {
        console.log(value)
      }
    },
    {
      name: 'select2',
      label: 'Select2',
      rules: [{required: false}],
      type: 'select',
      placeholder: 'Please select ...',
      allowClear: true,
      filterOption: true,
      options: [
        {
          label: 'Select1',
          value: 'select1'
        },
        {
          label: 'Select2',
          value: 'select2'
        },
        {
          label: 'Select3',
          value: 'select3'
        }
      ],
      onChange: (value) => {
        console.log(value)
      },
      mode: 'tags'
    },
    {
      name: 'time',
      label: 'Time',
      rules: [{required: false}],
      type: 'time',
      allowClear: true,
      format: 'HH:mm:ss'
    },
    {
      name: 'timeRange',
      label: 'TimeRange',
      rules: [{required: false}],
      type: 'timeRange',
      allowClear: true,
      format: 'HH:mm:ss'
    },
    {
      name: 'imgUpload',
      label: 'ImgUpload',
      rules: [{required: false}],
      type: 'imgUpload',
      action: `${window.config.baseUrl}/file/upload`,
      beforeUpload: (file, fileList) => {
        if (!validateImage(file.type)) {
          window.messageError({
            content: '请上传正确的图片格式！'
          })
          return false
        }
        return true
      },
      onChange: changeImg,
      valuePropName: 'fileList',
      imageUrl: '',
      inputName: 'avatar',
      getValueFromEvent: (e) => {
        if (Array.isArray(e)) {
          return e
        }
        if (e.file.status === 'done' && e.file.response.flag) {
          return e.file.response.result.fileUrl
        }
        return e && e.fileList
      }
    },
    {
      name: 'transfer',
      label: 'Transfer',
      rules: [{required: false}],
      type: 'transfer',
      dataSource: [
        {
          key: 1,
          title: 'Label1'
        },
        {
          key: 2,
          title: 'Label2'
        },
        {
          key: 3,
          title: 'Label3'
        },
        {
          key: 4,
          title: 'Label4'
        }
      ],
      targetKeys: [],
      selectedKeys: [],
      render: item => item.title
    }
  ])
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

  function changeImg (file) {
    let tmpFormInputs = [...formInputs]
    if (file.file.status === 'done' && file.file.response.flag) {
      tmpFormInputs[20].imageUrl = file.file.response.result.fileUrl
      setFormInputs(tmpFormInputs)
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