import React, { PropTypes } from 'react'
import { Menu, Icon } from 'antd'
import './style.css'

const SubMenu = Menu.SubMenu

const Header = ({ user, logout, switchSider, siderFold }) => {
  const handleClickMenu = e => e.key === 'logout' && logout()
  return (
    <div className="App-header">
      <div className="App-sider-btn" onClick={switchSider}>
        <Icon type={siderFold ? 'menu-unfold' : 'menu-fold'} />
      </div>
      <Menu mode="horizontal" onClick={handleClickMenu}>
        <SubMenu
          className="fr"
          title={<span><Icon type="user" />{user.name}</span>}
        >
          <Menu.Item key="logout">
            <a>注销</a>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  )
}

Header.propTypes = {
  user: PropTypes.shape(Object),
  logout: PropTypes.func,
  switchSider: PropTypes.func,
  siderFold: PropTypes.bool,
}

export default Header
