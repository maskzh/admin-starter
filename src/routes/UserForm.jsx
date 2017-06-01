import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { Button } from 'antd'
import Form from '../components/User/Form'

const UserForm = ({ user, dispatch }) => {
  const { item: data, loading, formType } = user

  const title = formType.indexOf('create') !== -1 ? '新增用户' : '修改用户'
  const back = () => dispatch(routerRedux.goBack())

  const formProps = {
    data,
    loading,
    onOk(formData) {
      dispatch({ type: `user/${formType}`, payload: formData })
    },
    onCancel() {
      back()
    },
  }

  return (
    <div className="App-content-inner">
      <div className="flex pb15 mb20 bb1">
        <h2 className="flex1">{title}</h2>
        <div>
          <Button type="default" icon="left" onClick={back}>返回</Button>
        </div>
      </div>
      <Form {...formProps} />
    </div>
  )
}

UserForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.shape(Object).isRequired,
}

export default connect(({ user }) => ({ user }))(UserForm)
