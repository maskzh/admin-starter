import React, { PropTypes } from 'react'
import { Card } from 'antd'
import { SidePanel } from '../../../components'

const Side = ({ visible, onDismiss, width, item }) =>
  <SidePanel visible={visible} onDismiss={onDismiss} width={width}>
    <Card loading title="读取数据" />
    <Card className="mt20" title="基本信息">
      <p>姓名：{item.name}</p>
      <p>手机：{item.mobile}</p>
    </Card>
    <Card className="mt20" loading title="读取数据" />
    <Card className="mt20" loading title="读取数据" />
  </SidePanel>


Side.propTypes = {
  visible: PropTypes.bool,
  onDismiss: PropTypes.func,
  width: PropTypes.string,
  item: PropTypes.shape(Object),
}

export default Side
