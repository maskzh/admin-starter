import React from 'react'
import { Row, Col, Card } from 'antd'
import Sale from '../components/Dashboard/Sale'
import './Dashboard.css'

const Dashboard = () => (
  <div>
    <Row gutter={24}>
      <Col lg={6} md={6}>
        <Card loading title="读取数据" />
      </Col>
      <Col lg={6} md={6}>
        <Card loading title="读取数据" />
      </Col>
      <Col lg={6} md={6}>
        <Card loading title="读取数据" />
      </Col>
      <Col lg={6} md={6}>
        <Card loading title="读取数据" />
      </Col>
    </Row>
    <Row className="mt20" gutter={24}>
      <Col lg={18} md={24}>
        <Card bodyStyle={{ height: '408px' }}>
          <Sale />
        </Card>
      </Col>
      <Col lg={6} md={24}>
        <Row gutter={24}>
          <Col lg={24} md={12}>
            <Card loading title="读取数据" />
          </Col>
          <Col lg={24} md={12}>
            <Card className="mt15" loading title="读取数据" />
          </Col>
        </Row>
      </Col>
    </Row>
    <Row className="mtb20" gutter={24}>
      <Col lg={12} md={24}>
        <Card loading bodyStyle={{ height: 432 }} />
      </Col>
      <Col lg={12} md={24}>
        <Card loading bodyStyle={{ height: 432 }} />
      </Col>
    </Row>
  </div>
)

export default Dashboard
