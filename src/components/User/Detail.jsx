import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'

const Detail = ({ data }) => (
  <div>
    <h3 className="mb15">客户信息</h3>
    <Row className="b1 rounded p15">
      <Col className="ptbh" span={8}>姓名：{data.name}</Col>
      <Col className="ptbh" span={8}>手机：{data.mobile}</Col>
      <Col className="ptbh" span={8}>性别：{+data.gender ? '男' : '女'}</Col>
      <Col className="ptbh" span={8}>生日：{data.birthday}</Col>
      <Col className="ptbh" span={8}>介绍人：{data.from_customer_id}</Col>
      <Col className="ptbh" span={8}>年龄：{data.age}</Col>
      <Col className="ptbh" span={8}>职业：{data.job}</Col>
      <Col className="ptbh" span={8}>积分：{data.point}</Col>
      <Col span={24}>详细地址：{data.address}</Col>
    </Row>
  </div>
)

Detail.propTypes = {
  data: PropTypes.shape(Object),
}

Detail.defaultProps = {
  data: {},
}

export default Detail
