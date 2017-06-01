import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'antd'
import Form from './Form'

const modal = ({
  type,
  visible,
  width = '50%',
  onCancel,
  ...others
}) => {
  const modalProps = {
    title: type.indexOf('create') !== -1 ? '新增客户' : '修改客户',
    visible,
    width,
    onCancel,
    footer: null,
  }

  return (
    <Modal {...modalProps}>
      <Form onCancel={onCancel} {...others} />
    </Modal>
  )
}

modal.propTypes = {
  type: PropTypes.string,
  visible: PropTypes.bool,
  width: PropTypes.string,
  onCancel: PropTypes.func,
}

export default modal
