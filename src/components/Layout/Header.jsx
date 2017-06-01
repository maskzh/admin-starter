import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon } from 'antd'
import './Header.css'

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
  user: PropTypes.shape(Object).isRequired,
  logout: PropTypes.func.isRequired,
  switchSider: PropTypes.func.isRequired,
  siderFold: PropTypes.bool.isRequired,
}

export default Header
