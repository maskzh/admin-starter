import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Button } from 'antd'

const Search = ({
  query,
  onSearch,
  form: {
    getFieldDecorator,
    validateFields,
  },
}) => {
  function onSubmit(e) {
    e.preventDefault()
    validateFields((errors, values) => {
      if (errors) return
      onSearch(values)
    })
  }

  return (
    <Form layout="inline" onSubmit={onSubmit}>
      <Form.Item>
        {getFieldDecorator('keyword', {
          initialValue: query.keyword || '',
        })(<Input placeholder="根据关键字进行搜索" />)}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">搜索</Button>
      </Form.Item>
    </Form>
  )
}

Search.propTypes = {
  query: PropTypes.shape(Object),
  onSearch: PropTypes.func,
  form: PropTypes.shape(Object),
}

export default Form.create()(Search)
