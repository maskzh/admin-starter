import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Input } from 'antd'
import sha1 from 'sha1'
import './Login.css'

const FormItem = Form.Item

const login = ({
  onOk,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
  },
}) => {
  function handleOk() {
    validateFieldsAndScroll((errors, values) => {
      if (errors) return
      onOk({ ...values, password: sha1(values.password) })
    })
  }

  document.onkeyup = e => e.keyCode === 13 && handleOk()

  return (
    <div className="Login-form">
      <div className="Login-logo">
        <img src="//img.jkbsimg.com/logo.jpg" width="42" height="42" alt="logo" />
        <span>Admin</span>
      </div>
      <form>
        <FormItem hasFeedback>
          {getFieldDecorator('mobile', {
            rules: [{
              required: true,
              message: '请填写用户名',
            }],
          })(<Input size="large" placeholder="用户名" />)}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('password', {
            rules: [{
              required: true,
              message: '请填写密码',
            }],
          })(<Input size="large" type="password" placeholder="密码" />)}
        </FormItem>
        <div>
          <Button type="primary" size="large" onClick={handleOk}>
            登录
          </Button>
        </div>
        <p>
          <span>账号：15968861678</span>
          <span>密码：123456</span>
        </p>
      </form>
    </div>
  )
}

login.propTypes = {
  form: PropTypes.shape(Object).isRequired,
  onOk: PropTypes.func.isRequired,
}

export default Form.create()(login)
