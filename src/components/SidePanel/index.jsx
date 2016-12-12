import React, { PropTypes } from 'react'
import { classnames } from '../../utils'
import './style.css'

const SidePanel = ({ visible, onDismiss, width, children }) =>
  <div className={classnames('SidePanel', { fold: visible })}>
    <div className="SidePanel-overlay" onClick={onDismiss} />
    <div className="SidePanel-content" style={{ width: !width ? 'auto' : width }}>
      <div className="SidePanel-header">
        <a onClick={onDismiss}>返回</a>
      </div>
      <div className="SidePanel-body">{children}</div>
    </div>
  </div>

SidePanel.propTypes = {
  visible: PropTypes.bool,
  onDismiss: PropTypes.func,
  width: PropTypes.string,
  children: PropTypes.node,
}

export default SidePanel
