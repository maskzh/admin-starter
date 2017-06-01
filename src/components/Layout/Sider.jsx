import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon, Switch } from 'antd'
import { Link } from 'dva/router'
import menu from '../../config/menu'
import './Sider.css'

const topMenus = menu.map(item => item.key)

const getMenus = (menuArray, siderFold) =>
  menuArray.map((item) => {
    if (item.child) {
      return (
        <Menu.SubMenu key={item.key} title={<span>{item.icon ? <Icon type={item.icon} /> : ''}{siderFold && topMenus.indexOf(item.key) >= 0 ? '' : item.name}</span>}>
          {getMenus(item.child, siderFold)}
        </Menu.SubMenu>
      )
    }
    return (
      <Menu.Item key={item.key}>
        <Link to={`/${item.key}`}>
          {item.icon ? <Icon type={item.icon} /> : ''}
          {siderFold && topMenus.indexOf(item.key) >= 0 ? '' : item.name}
        </Link>
      </Menu.Item>
    )
  })

const Sider = ({ siderFold, darkTheme, location, changeTheme }) => (
  <div>
    <Link className="App-sider-logo" to="/">
      <img src="//img.jkbsimg.com/logo.jpg" alt="logo" />
      {siderFold ? '' : <span>Admin</span>}
    </Link>
    <Menu
      mode={siderFold ? 'vertical' : 'inline'}
      theme={darkTheme ? 'dark' : 'light'}
      selectedKeys={[location.pathname.split('/')[1] || 'dashboard']}
    >
      {getMenus(menu, siderFold)}
    </Menu>
    {!siderFold ? <div className="App-switch-theme">
      <span><Icon type="bulb" />切换主题</span>
      <Switch onChange={changeTheme} defaultChecked={darkTheme} checkedChildren="黑" unCheckedChildren="白" />
    </div> : null}
  </div>
)

Sider.propTypes = {
  siderFold: PropTypes.bool.isRequired,
  darkTheme: PropTypes.bool.isRequired,
  location: PropTypes.shape(Object).isRequired,
  changeTheme: PropTypes.func.isRequired,
}

export default Sider
