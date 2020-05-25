import React from 'react'
import PropTypes from 'prop-types'
import {
  Form, 
  Input, 
  InputNumber, 
  Button, 
  AutoComplete, 
  Checkbox, 
  Cascader, 
  DatePicker,
  Rate,
  Radio,
  Switch,
  Select,
  TimePicker,
  Upload
} from 'antd'

const { RangePicker } = DatePicker

function ComForm ({formInputs, formFunc, formClass}) {
  /**
   * @author zhoujingjing
   * @description 表单实列
   */
  const [formInstance] = Form.useForm()

  /**
   * @author zhoujingjing
   * @description 生成对应表单项
   */
  function generateFormItem (item) {
    if (item.type === 'text') {
      return (<Input 
        type="text"
        placeholder={item.placeholder} 
        disabled={item.disabled} 
        maxLength={item.maxLength}
        allowClear={item.allowClear}
      />)
    } else if (item.type === 'textarea') {
      return (<Input.TextArea
        placeholder={item.placeholder} 
        disabled={item.disabled} 
        autoSize={item.autoSize}
      />)
    } else if (item.type === 'password') {
      return (<Input.Password
        placeholder={item.placeholder} 
        disabled={item.disabled}
        visibilityToggle={item.visibilityToggle}
      />)
    } else if (item.type === 'number') {
      return (<InputNumber
        placeholder={item.placeholder} 
        disabled={item.disabled} 
        max={item.max}
        min={item.min}
        precision={item.precision}
        formatter={item.formatter}
        parser={item.parser}
        decimalSeparator={item.decimalSeparator}
        step={item.step}
      />)
    } else if (item.type === 'autoComplete') {
      return (<AutoComplete
        placeholder={item.placeholder} 
        disabled={item.disabled} 
        options={item.options}
        onSelect={item.onSelect}
        onSearch={item.onSearch}
        onChange={item.onChange}
        allowClear={item.allowClear}
        backfill={item.backfill}
        filterOption={item.filterOption}
        open={item.open}
        notFoundContent={item.notFoundContent}
      />)
    } else if (item.type === 'checkbox') {
      return (<Checkbox.Group
        disabled={item.disabled} 
        options={item.options}
        name={item.inputName}
        onChange={item.onChange}
      />)
    } else if (item.type === 'cascader') {
      return (<Cascader
        placeholder={item.placeholder} 
        disabled={item.disabled} 
        options={item.options}
        allowClear={item.allowClear}
        onChange={item.onChange}
        notFoundContent={item.notFoundContent}
      />)
    } else if (item.type === 'date' || item.type === 'week' || item.type === 'month' || item.type === 'quarter' || item.type === 'year') {
      return (<DatePicker
        placeholder={item.placeholder} 
        disabled={item.disabled}
        allowClear={item.allowClear}
        picker={item.type}
        format={item.format}
        showTime={item.showTime}
        disabledDate={item.disabledDate}
      />)
    } else if (item.type === 'range') {
      return (<RangePicker
        placeholder={item.placeholder} 
        disabled={item.disabled}
        allowClear={item.allowClear}
        picker={item.picker}
        format={item.format}
        separator={item.separator}
        showTime={item.showTime}
        disabledDate={item.disabledDate}
      />)
    } else if (item.type === 'rate') {
      return (<Rate
        disabled={item.disabled}
        allowClear={item.allowClear}
        allowHalf={item.allowHalf}
        count={item.count}
      />)
    } else if (item.type === 'radio') {
      return (<Radio.Group
        disabled={item.disabled}
        name={item.inputName}
        options={item.options}
        onChange={item.onChange}
      />)
    } else if (item.type === 'switch') {
      return (<Switch
        disabled={item.disabled}
        onChange={item.onChange}
      />)
    } else if (item.type === 'select') {
      return (<Select
        placeholder={item.placeholder}
        disabled={item.disabled}
        allowClear={item.allowClear}
        filterOption={item.filterOption}
        notFoundContent={item.notFoundContent}
        mode={item.mode}
        onChange={item.onChange}
      >
        {item.options.map(option => (
          <Select.Option key={option.value} value={option.value}>{option.label}</Select.Option>
        ))}
      </Select>)
    } else if (item.type === 'time') {
      return (<TimePicker
        placeholder={item.placeholder} 
        disabled={item.disabled}
        allowClear={item.allowClear}
        clearText={item.clearText}
        format={item.format}
      />)
    } else if (item.type === 'timeRange') {
      return (<TimePicker.RangePicker
        placeholder={item.placeholder} 
        disabled={item.disabled}
        allowClear={item.allowClear}
        picker={item.picker}
        format={item.format}
        separator={item.separator}
        showTime={item.showTime}
        disabledDate={item.disabledDate}
        order={true}
      />)
    } else if (item.type === 'imgUpload') {
      return (<Upload
        placeholder={item.placeholder} 
        disabled={item.disabled}
        allowClear={item.allowClear}
        picker={item.picker}
        format={item.format}
        separator={item.separator}
        showTime={item.showTime}
        disabledDate={item.disabledDate}
        order={true}
      />)
    }
  }

  return (
    <Form
      form={formInstance}
      name={formClass.formName}
      onFinish={formFunc.submitFunc}
      layout={formClass.formLayout}
      {...formClass.formItemLayout}
      className={['com-form', formClass.formClass]}>
        {
          formInputs.map((item, index) => (
            <Form.Item
              name={item.name}
              label={item.label}
              rules={item.rules}
              key={index}
              valuePropName={item.valuePropName || 'value'}>
                {generateFormItem(item)}
            </Form.Item>
          ))
        }
        <Form.Item {...formClass.formBtnLayout}>
          <Button type="primary" htmlType="submit">{formFunc.submitText}</Button>
          <Button htmlType="button">{formFunc.resetText}</Button>
        </Form.Item>
    </Form>
  )
}

ComForm.propTypes = {
  formInputs: PropTypes.array.isRequired,
  formFunc: PropTypes.object.isRequired,
  formClass: PropTypes.object
}

ComForm.defaultProps = {
  formInputs: [],
  formFunc: {
    submitText: '',
    submitFunc: () => {},
    resetText: '',
    resetFunc: () => {}
  },
  formClass: {
    formName: '',
    formClass: '',
    formLayout: '',
    formItemLayout: {},
    formBtnLayout: {}
  }
}

export default ComForm