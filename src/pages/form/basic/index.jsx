import React, {useState, useRef} from 'react'

import ComBreadcrumb from '@/components/ComBreadcrumb'
import ComForm from '@/components/ComForm'

import {validateImage} from '@/utils/validate'

import {Radio} from 'antd'

import './index.scss'

function FormBasic (props) {
  /**
   * @author zhoujingjing
   * @description 表单布局方式
   */
  const [formLayout, setFormLayout] = useState('horizontal')

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

  /**
   * @author zhoujingjing
   * @description 表单引用对象
   */
  const formRef = useRef()

  /**
   * @author zhoujingjing
   * @description 表单验证规则
   */
  const formRules = {
    text: [{required: true, message: 'Please input', validateTrigger: ['onBlur']}],
    textarea: [{required: false}]
  }

  /**
   * @author zhoujingjing
   * @description 表单值
   */
  const [formValues] = useState({})

  /**
   * @author zhoujingjing
   * @description 表单输入项
   */
  const [formInputs, setFormInputs] = useState([
    {
      name: 'text',
      label: 'Text',
      type: 'text',
      placeholder: 'Please input'
    },
    {
      name: 'textarea',
      label: 'Textarea',
      type: 'textarea',
      placeholder: 'Please input',
      autoSize: { minRows: 4, maxRows: 6 }
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Please input',
      visibilityToggle: true
    },
    {
      name: 'number',
      label: 'Number',
      type: 'number',
      placeholder: 'Please input',
      precision: 0,
      min: 0,
      max: 6,
      formatter: (value) => {
        return value ? `${value}%` : value
      }
    },
    {
      name: 'autoComplete',
      label: 'AutoComplete',
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
      type: 'date',
      allowClear: true,
      format: 'YYYY-MM-DD'
    },
    {
      name: 'week',
      label: 'Week',
      type: 'week',
      allowClear: true,
      format: 'YYYY-wo'
    },
    {
      name: 'month',
      label: 'Month',
      type: 'month',
      allowClear: true,
      format: 'YYYY-MM'
    },
    {
      name: 'quarter',
      label: 'Quarter',
      type: 'quarter',
      allowClear: true
    },
    {
      name: 'year',
      label: 'Year',
      type: 'year',
      allowClear: true,
      format: 'YYYY'
    },
    {
      name: 'range',
      label: 'Range',
      type: 'range',
      picker: 'date',
      allowClear: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      showTime: true
    },
    {
      name: 'rate',
      label: 'Rate',
      type: 'rate',
      allowHalf: true,
      allowClear: true,
      count: 5
    },
    {
      name: 'radio',
      label: 'Radio',
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
      type: 'switch',
      valuePropName: 'checked',
      onChange: (value) => {
        console.log(value)
      }
    },
    {
      name: 'select',
      label: 'Select',
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
      type: 'time',
      allowClear: true,
      format: 'HH:mm:ss'
    },
    {
      name: 'timeRange',
      label: 'TimeRange',
      type: 'timeRange',
      allowClear: true,
      format: 'HH:mm:ss'
    },
    {
      name: 'imgUpload',
      label: 'ImgUpload',
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
      type: 'transfer',
      dataSource: [
        {
          key: '1',
          title: 'Label1'
        },
        {
          key: '2',
          title: 'Label2'
        },
        {
          key: '3',
          title: 'Label3'
        },
        {
          key: '4',
          title: 'Label4'
        }
      ],
      render: item => item.title,
      valuePropName: 'targetKeys',
      className: 'width-all'
    },
    {
      name: 'treeSelect',
      label: 'TreeSelect',
      type: 'treeSelect',
      treeData: [
        {
          title: 'Node1',
          value: '0-0',
          children: [
            {
              title: 'Child Node1',
              value: '0-0-1'
            },
            {
              title: 'Child Node2',
              value: '0-0-2'
            }
          ]
        },
        {
          title: 'Node2',
          value: '0-1'
        }
      ],
      showSearch: true,
      placeholder: 'Please select ...',
      allowClear: true,
      treeDefaultExpandAll: false,
      treeCheckable: true,
      onChange: (value) => {
        console.log(value)
      }
    },
    {
      name: 'tree',
      label: 'Tree',
      type: 'tree',
      treeData: [
        {
          title: 'parent 1',
          key: '0-0',
          children: [
            {
              title: 'parent 1-0',
              key: '0-0-0',
              children: [
                {
                  title: 'leaf',
                  key: '0-0-0-0'
                },
                {
                  title: 'leaf',
                  key: '0-0-0-1'
                }
              ]
            },
            {
              title: 'parent 1-1',
              key: '0-0-1',
              children: [
                {
                  title: 'leaf',
                  key: '0-0-1-0'
                },
                {
                  title: 'leaf',
                  key: '0-0-1-1'
                }
              ]
            }
          ]
        }
      ],
      checkable: true,
      selectable: false,
      showLine: false,
      multiple: true,
      valuePropName: 'checkedKeys'
    }
  ])

  /**
   * @author zhoujingjing
   * @description 表单方法
   */
  const formFunc = {
    submitText: '提交',
    submitFunc: (values) => {console.log(values)},
    resetText: '重置',
    resetFunc: resetForm
  }

  /**
   * @author zhoujingjing
   * @description 表单样式
   */
  const [formStyle, setFormStyle] = useState({
    formName: 'basicForm',
    formClass: 'com-form-hor',
    formItemClass: 'com-form-item',
    formBtnClass: 'com-form-btns',
    formLayout: 'horizontal',
    formItemLayout: {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 },
    },
    formBtnLayout: {
      wrapperCol: { offset: 6, span: 12 },
    }
  })

  /**
   * @author zhoujingjing
   * @description 图片上传更改回调方法
   * @param {*} file 
   */
  function changeImg (file) {
    let tmpFormInputs = [...formInputs]
    if (file.file.status === 'done' && file.file.response.flag) {
      tmpFormInputs[20].imageUrl = file.file.response.result.fileUrl
      setFormInputs(tmpFormInputs)
    }
  }

  /**
   * @author zhoujingjing
   * @description 重置表单
   */
  function resetForm () {
    let tmpFormInputs = [...formInputs]
    tmpFormInputs[20].imageUrl = ''
    setFormInputs(tmpFormInputs)
  }

  /**
   * @author zhoujingjing
   * @description 表单项排布方式更改触发回调
   */
  function handleLayoutChange (e) {
    if (e.target.value === 'horizontal') {
      setFormStyle({
        formName: 'basicForm',
        formClass: 'com-form-hor',
        formItemClass: 'com-form-item',
        formBtnClass: 'com-form-btns',
        formLayout: 'horizontal',
        formItemLayout: {
          labelCol: { span: 6 },
          wrapperCol: { span: 12 },
        },
        formBtnLayout: {
          wrapperCol: { offset: 6, span: 12 },
        }
      })
    } else {
      setFormStyle({
        formName: 'basicForm',
        formClass: 'com-form-ver',
        formItemClass: 'com-form-item',
        formBtnClass: 'com-form-btns',
        formLayout: 'vertical',
        formItemLayout: {},
        formBtnLayout: {}
      })
    }
    setFormLayout(e.target.value)
  }

  // function test () {
  //   console.log(formRef.current.getValue('text'))
  // }

  return (
    <div className="main-wrapper">
      <ComBreadcrumb navData={navData}/>
      <div className="main-content">
        <div className="panel-body">
          <Radio.Group value={formLayout} onChange={handleLayoutChange} className="layout-selector">
            <Radio.Button value="horizontal">Horizontal</Radio.Button>
            <Radio.Button value="vertical">Vertical</Radio.Button>
          </Radio.Group>
          {/* <Button onClick={test}>test</Button> */}
          <ComForm ref={formRef} formInputs={formInputs} formRules={formRules} formValues={formValues} formFunc={formFunc} formStyle={formStyle}/>
        </div>
      </div>
    </div>
  )
}

export default FormBasic