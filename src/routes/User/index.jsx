import React, { PropTypes } from 'react'
import { connect } from 'dva'
import UserList from './components/List'
import UserSearch from './components/Search'
import UserModal from './components/Modal'

const User = ({ location, dispatch, user }) => {
  const {
    loading, list, pagination, currentItem,
    modalVisible, modalType, modalConfirmLoading,
  } = user

  const { field, keyword } = location.query

  const userModalProps = {
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    visible: modalVisible,
    confirmLoading: modalConfirmLoading,
    onOk(data) {
      dispatch({ type: `user/${modalType}`, payload: data })
    },
    onCancel() {
      dispatch({ type: 'user/hideModal' })
    },
  }

  const userListProps = {
    dataSource: list,
    loading,
    pagination,
    onPageChange(page, filters) {
      dispatch({
        type: 'user/route',
        payload: {
          page: page.current,
          'per-page': page.pageSize,
          ...filters,
        },
      })
    },
    onDeleteItem(id) {
      dispatch({ type: 'user/delete', payload: id })
    },
    onEditItem(item) {
      dispatch({
        type: 'user/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
  }

  const userSearchProps = {
    field,
    keyword,
    onSearch(fieldsValue) {
      dispatch({
        type: 'user/route',
        payload: { ...fieldsValue, page: 1 },
      })
    },
    onAdd() {
      dispatch({
        type: 'user/showModal',
        payload: { modalType: 'create' },
      })
    },
  }

  return (
    <div className="App-content-inner">
      <UserSearch {...userSearchProps} />
      <UserList {...userListProps} />
      <UserModal {...userModalProps} />
    </div>
  )
}

User.propTypes = {
  location: PropTypes.shape(Object),
  dispatch: PropTypes.func,
  user: PropTypes.shape(Object),
}

export default connect(({ user }) => ({ user }))(User)
