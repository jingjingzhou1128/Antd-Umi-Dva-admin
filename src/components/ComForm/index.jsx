import React, {useEffect, forwardRef, useImperativeHandle} from 'react'
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
  Upload,
  Transfer,
  TreeSelect,
  Tree
} from 'antd'

import './index.scss'

const { RangePicker } = DatePicker

const ComForm = forwardRef(({formInputs, formRules, formValues, formFunc, formClass}, ref) => {
  /**
   * @author zhoujingjing
   * @description 表单实列
   */
  const [formInstance] = Form.useForm()

  /**
   * @author zhoujingjing
   * @description 更改树选中值
   */
  function changeTreeSelectedKeys (selectedKeys, name) {
    let values = []
    values[`${name}`] = selectedKeys
    formInstance.setFieldsValue(values)
  }

  /**
   * @author zhoujingjing
   * @description 更改树复选框选中值
   */
  function changeTreeCheckedKeys (checkedKeys, name) {
    let values = []
    values[`${name}`] = checkedKeys
    formInstance.setFieldsValue(values)
  }

  /**
   * @author zhoujingjing
   * @description 更改穿梭框targetKeys
   */
  function changeTransferTargetKeys (targetKeys, name) {
    let values = []
    values[`${name}`] = targetKeys
    formInstance.setFieldsValue(values)
  }

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
        className="img-uploader"
        disabled={item.disabled}
        listType="picture-card"
        showUploadList={false}
        action={item.action}
        beforeUpload={item.beforeUpload}
        onChange={item.onChange}
        accept={item.accept}
        method={item.method || 'post'}
        customRequest={item.customRequest}
        data={item.data}
        headers={item.headers}
        multiple={false}
        name={item.inputName || 'file'}
        withCredentials={true}
      >
        {
          item.imageUrl ? <img src={item.imageUrl} alt=""/> : <i className="iconfont icon-plus"></i>
        }
      </Upload>)
    } else if (item.type === 'transfer') {
      return (<Transfer
        className="form-item-transfer"
        dataSource={item.dataSource} 
        disabled={item.disabled}
        titles={item.titles}
        // targetKeys={item.targetKeys}
        onChange={(nextTargetKeys) => {changeTransferTargetKeys(nextTargetKeys, item.name)}}
        onScroll={item.onScroll}
        render={item.render}
        operations={item.operations}
        showSelectAll={true}
        rowKey={item.rowKey}
      />)
    } else if (item.type === 'treeSelect') {
      return (<TreeSelect
        showSearch={item.showSearch} 
        disabled={item.disabled}
        placeholder={item.placeholder}
        allowClear={item.allowClear}
        treeDefaultExpandAll={item.treeDefaultExpandAll}
        onChange={item.onChange}
        filterTreeNode={item.filterTreeNode}
        multiple={item.multiple}
        treeCheckable={item.treeCheckable}
        treeData={item.treeData}
        children={item.children}
        treeNodeLabelProp={item.treeNodeLabelProp}
        treeNodeFilterProp={item.treeNodeFilterProp}
      />)
    } else if (item.type === 'tree') {
      return (<Tree
        autoExpandParent={item.autoExpandParent}
        blockNode={true}
        disabled={item.disabled}
        checkable={item.checkable}
        // checkedKeys={item.checkedKeys}
        filterTreeNode={item.filterTreeNode}
        loadData={item.loadData}
        loadedKeys={item.loadedKeys}
        multiple={item.multiple}
        selectable={item.selectable}
        // selectedKeys={item.selectedKeys}
        showIcon={item.showIcon}
        showLine={item.showLine}
        treeData={item.treeData}
        onCheck={(checkedKeys) => {changeTreeCheckedKeys(checkedKeys, item.name)}}
        onExpand={item.onExpand}
        onLoad={item.onLoad}
        onSelect={(selectedKeys) => {changeTreeSelectedKeys(selectedKeys, item.name)}}
      />)
    }
  }

  /**
   * @author zhoujingjing
   * @description 提交表单
   */
  function handleSubmit () {
    formInstance.validateFields().then(values => {
      if (formFunc.submitFunc) {
        formFunc.submitFunc(values)
      }
    }).catch(() => {})
  }
  
  /**
   * @author zhoujingjing
   * @description 重置表单
   */
  function handleReset () {
    if (formFunc.resetFunc) {
      formFunc.resetFunc()
    }
    formInstance.resetFields()
  }

  /**
   * @author zhoujingjing
   * @description 向外暴露的方法(可方便父组件调用子组件方法)
   */
  useImperativeHandle(ref, () => ({
    getFormValue: () => {
      if (!formInstance) return
      return formInstance.getFieldsValue()
    },
    getAppointValue: (name) => {
      if (!name || !formInstance) return
      return formInstance.getFieldValue(name)
    }
  }))

  /**
   * @author zhoujingjing
   * @description 表单值更改时触发
   */
  useEffect(() => {
    formInstance.setFieldsValue(formValues)
  }, [formInstance, formValues])

  return (
    <Form
      form={formInstance}
      name={formClass.formName}
      layout={formClass.formLayout}
      {...formClass.formItemLayout}
      className={['com-form', formClass.formClass]}>
        {
          formInputs.map((item, index) => (
            <Form.Item
              name={item.name}
              label={item.label}
              rules={formRules[item.name]}
              key={index}
              valuePropName={item.valuePropName || 'value'}
              getValueFromEvent={item.getValueFromEvent}
              validateTrigger={['onChange', 'onBlur']}>
              {generateFormItem(item)}
            </Form.Item>
          ))
        }
        <Form.Item {...formClass.formBtnLayout}>
          <Button type="primary" onClick={handleSubmit}>{formFunc.submitText}</Button>
          <Button htmlType="button" onClick={handleReset}>{formFunc.resetText}</Button>
        </Form.Item>
    </Form>
  )
})

ComForm.propTypes = {
  formInputs: PropTypes.array.isRequired,
  formRules: PropTypes.object,
  formFunc: PropTypes.object.isRequired,
  formClass: PropTypes.object
}

ComForm.defaultProps = {
  formInputs: [],
  formRules: {},
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