import React, { PropTypes } from 'react'
import { Form, Input, Button } from 'antd'

const search = ({
  keyword,
  onSearch,
  onAdd,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
}) => {
  function handleSubmit(e) {
    e.preventDefault()
    validateFields((errors) => {
      if (errors) return
      onSearch(getFieldsValue())
    })
  }

  return (
    <div className="flex mb20">
      <div className="flex1">
        <Form inline onSubmit={handleSubmit}>
          <Form.Item>
            {getFieldDecorator('keyword', {
              initialValue: keyword || '',
            })(<Input />)}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">搜索</Button>
          </Form.Item>
        </Form>
      </div>
      <div>
        <Button type="ghost" onClick={onAdd}>添加</Button>
      </div>
    </div>
  )
}

search.propTypes = {
  form: PropTypes.shape(Object),
  onSearch: PropTypes.func,
  onAdd: PropTypes.func,
  keyword: PropTypes.string,
}

export default Form.create()(search)
