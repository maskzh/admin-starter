import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button } from 'antd'
import List from '../components/User/List'
import Search from '../components/User/Search'


const User = ({ user, dispatch, location }) => {
  const { loading, list, pagination } = user

  const { query } = location

  const listProps = {
    loading,
    dataSource: list,
    pagination,
    onPageChange(page, filters) {
      dispatch({
        type: 'user/route',
        payload: {
          ...query,
          page: page.current,
          'per-page': page.pageSize,
          ...filters,
        },
      })
    },
    onItemShow(item) {
      dispatch({ type: 'user/show', payload: item })
    },
    onItemEdit(item) {
      dispatch({
        type: 'user/edit',
        payload: { type: 'update', data: item },
      })
    },
    onItemRemove(id) {
      dispatch({ type: 'user/remove', payload: id })
    },
  }

  const searchProps = {
    query,
    onSearch(fields) {
      dispatch({
        type: 'user/route',
        payload: { ...query, ...fields, page: 1 },
      })
    },
  }

  const onItemCreate = () => {
    dispatch({
      type: 'user/edit',
      payload: { type: 'create', data: {} },
    })
  }

  return (
    <div className="App-content-inner">
      <div className="flex mb10">
        <div className="flex1">
          <Search {...searchProps} />
        </div>
        <div>
          <Button type="ghost" onClick={onItemCreate}>新增</Button>
        </div>
      </div>
      <List {...listProps} />
    </div>
  )
}

User.propTypes = {
  location: PropTypes.shape(Object),
  dispatch: PropTypes.func,
  user: PropTypes.shape(Object),
}

export default connect(({ user }) => ({ user }))(User)
