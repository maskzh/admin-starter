import React, { PropTypes } from 'react'
import { Card } from 'antd'
import { SidePanel } from '../../../components'

const Side = ({ visible, onDismiss, width }) =>
  <SidePanel visible={visible} onDismiss={onDismiss} width={width}>
    <Card loading title="读取数据" />
    <Card className="mt20" loading title="读取数据" />
    <Card className="mt20" loading title="读取数据" />
    <Card className="mt20" loading title="读取数据" />
    <Card className="mt20" loading title="读取数据" />
    <Card className="mt20" loading title="读取数据" />
    <Card className="mt20" loading title="读取数据" />
  </SidePanel>


Side.propTypes = {
  visible: PropTypes.bool,
  onDismiss: PropTypes.func,
  width: PropTypes.string,
}

export default Side
