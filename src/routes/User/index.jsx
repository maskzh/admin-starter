import React, { PropTypes } from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import UserList from './components/List'
import UserSearch from './components/Search'
import UserModal from './components/Modal'
import './user.css'

const User = ({ location, dispatch, user }) => {
  const {
    loading, list, pagination,
    currentItem, modalVisible, modalType,
  } = user

  const { field, keyword } = location.query

  const userModalProps = {
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    visible: modalVisible,
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
    onPageChange(page) {
      dispatch(routerRedux.push({
        pathname: '/user',
        query: {
          page: page.current,
          'per-page': page.pageSize,
        },
      }))
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
      dispatch({ type: 'user/query', payload: fieldsValue })
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
