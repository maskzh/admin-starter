import React, { PropTypes } from 'react'
import { Table, Popconfirm } from 'antd'
import { Dot } from '../../../components'
import { pic, moment } from '../../../utils'

const List = ({
  loading,
  dataSource,
  pagination,
  onPageChange,
  onDeleteItem,
  onEditItem,
}) => {
  const columns = [
    {
      title: '头像',
      dataIndex: 'pic',
      key: 'pic',
      width: 64,
      render: text => <img className="circle" width="32" height="32" src={pic(text)} alt="avatar" />,
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
      render: text => <span><Dot type="success" />{moment(text * 1000).format('YYYY-MM-DD')}</span>,
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => (
        <p>
          <a onClick={() => onEditItem(record)}>编辑</a>
          <span className="ant-divider" />
          <Popconfirm title="确定要删除吗？" onConfirm={() => onDeleteItem(record.id)}>
            <a>删除</a>
          </Popconfirm>
        </p>
      ),
    },
  ]

  return (
    <div>
      <Table
        size="middle"
        bordered
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        onChange={onPageChange}
        pagination={pagination}
        rowKey={record => record.id}
      />
    </div>
  )
}

List.propTypes = {
  onPageChange: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  dataSource: PropTypes.arrayOf(Object),
  loading: PropTypes.bool,
  pagination: PropTypes.shape(Object),
}

export default List
