import React from 'react'
import PropTypes from 'prop-types'
import { Table, Popconfirm } from 'antd'
import { cloudPic, moment } from '../../utils'

const List = ({
  size = 'middle',
  loading,
  dataSource,
  pagination,
  onPageChange,
  onItemRemove,
  onItemEdit,
  onItemShow,
}) => {
  const columns = [
    {
      title: '头像',
      dataIndex: 'pic',
      key: 'pic',
      width: 64,
      render: text => <img className="circle" width="32" height="32" src={cloudPic(text)} alt="avatar" />,
    }, {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '手机',
      dataIndex: 'mobile',
      key: 'mobile',
    }, {
      title: '创建时间',
      dataIndex: 'created_at',
      key: 'created_at',
      render: text => <span>{moment(text * 1000).format('YYYY-MM-DD')}</span>,
    }, {
      title: '操作',
      key: 'operation',
      width: 150,
      render: (text, record) => (
        <div>
          {onItemShow ? (
            <a onClick={() => onItemShow(record)}>查看</a>
          ) : null}
          {onItemEdit ? (
            <span>
              <span className="ant-divider" /><a onClick={() => onItemEdit(record)}>编辑</a>
            </span>
          ) : null}
          {onItemRemove ? (
            <Popconfirm title="确定要删除吗？" onConfirm={() => onItemRemove(record.id)}>
              <span className="ant-divider" /><a>删除</a>
            </Popconfirm>
          ) : null}
        </div>
      ),
    },
  ]

  return (
    <Table
      size={size}
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      onChange={onPageChange}
      pagination={pagination && { ...pagination, size }}
      rowKey={record => record.id}
    />
  )
}

List.propTypes = {
  size: PropTypes.string,
  loading: PropTypes.bool,
  dataSource: PropTypes.arrayOf(Object),
  pagination: PropTypes.shape(Object),
  onPageChange: PropTypes.func,
  onItemRemove: PropTypes.func,
  onItemEdit: PropTypes.func,
  onItemShow: PropTypes.func,
}

export default List
