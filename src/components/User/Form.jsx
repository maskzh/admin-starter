import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Button, Row, Col } from 'antd'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
}

const UserForm = ({
  data,
  loading,
  onOk,
  onCancel,
  form: {
    getFieldDecorator,
    validateFields,
  },
}) => {
  function _onOk(e) {
    e.preventDefault()
    validateFields((errors, values) => {
      if (errors) return
      const formData = {
        ...values,
        id: data.id,
      }
      onOk(formData)
    })
  }

  return (
    <Form layout="horizontal" onSubmit={_onOk}>
      <Row>
        <Col span={12}>
          <FormItem label="姓名" hasFeedback {...formItemLayout}>
            {getFieldDecorator('name', {
              initialValue: data.name,
              rules: [{
                required: true,
                message: '姓名未填写',
              }],
            })(<Input />)}
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem label="手机" hasFeedback {...formItemLayout}>
            {getFieldDecorator('mobile', {
              initialValue: data.mobile,
              rules: [{
                required: true,
                message: '手机未填写',
              }],
            })(<Input />)}
          </FormItem>
        </Col>
      </Row>
      <div className="bt1 pt15">
        <Button icon="left" type="default" onClick={onCancel}>返回</Button>
        <Button className="ml10" type="primary" htmlType="submit" loading={loading}>保存</Button>
      </div>
    </Form>
  )
}

UserForm.propTypes = {
  data: PropTypes.shape(Object),
  loading: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  form: PropTypes.shape(Object),
}

export default Form.create()(UserForm)
