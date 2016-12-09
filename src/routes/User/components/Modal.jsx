import React, { PropTypes } from 'react'
import { Form, Input, Modal } from 'antd'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
}

const modal = ({
  visible,
  item = {},
  confirmLoading,
  onOk,
  onCancel,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
}) => {
  function handleOk() {
    validateFields((errors) => {
      if (errors) return
      const data = {
        ...getFieldsValue(),
        key: item.key,
      }
      onOk(data)
    })
  }

  const modalOpts = {
    title: '修改用户',
    visible,
    confirmLoading,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
  }

  return (
    <Modal {...modalOpts}>
      <Form horizontal>
        <FormItem label="姓名：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: item.name,
            rules: [{
              required: true,
              message: '姓名未填写',
            }],
          })(<Input />)}
        </FormItem>
        <FormItem label="手机：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('mobile', {
            initialValue: item.mobile,
            rules: [{
              required: true,
              message: '手机未填写',
            }],
          })(<Input />)}
        </FormItem>
      </Form>
    </Modal>
  )
}

modal.propTypes = {
  visible: PropTypes.bool,
  confirmLoading: PropTypes.bool,
  form: PropTypes.shape(Object),
  item: PropTypes.shape(Object),
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
}

export default Form.create()(modal)
