import React, { PropTypes } from 'react'
import { Menu, Icon, Switch } from 'antd'
import { Link } from 'dva/router'
import menu from '../../../config/menu'
import './style.css'

const topMenus = menu.map(item => item.key)

const getMenus = (menuArray, siderFold, parentPath = '/') =>
  menuArray.map((item) => {
    if (item.child) {
      return (
        <Menu.SubMenu key={item.key} title={<span>{item.icon ? <Icon type={item.icon} /> : ''}{siderFold && topMenus.indexOf(item.key) >= 0 ? '' : item.name}</span>}>
          {getMenus(item.child, siderFold, `${parentPath}${item.key}/`)}
        </Menu.SubMenu>
      )
    }
    return (
      <Menu.Item key={item.key}>
        <Link to={parentPath + item.key}>
          {item.icon ? <Icon type={item.icon} /> : ''}
          {siderFold && topMenus.indexOf(item.key) >= 0 ? '' : item.name}
        </Link>
      </Menu.Item>
    )
  })

const Sider = ({ siderFold, darkTheme, location, changeTheme }) =>
  <div>
    <Link className="App-sider-logo" to="/">
      <img src="//img.jkbsimg.com/logo.jpg" alt="logo" />
      {siderFold ? '' : <span>轻派体验中心</span>}
    </Link>
    <Menu
      mode={siderFold ? 'vertical' : 'inline'}
      theme={darkTheme ? 'dark' : 'light'}
      defaultSelectedKeys={[location.pathname.split('/')[location.pathname.split('/').length - 1] || 'dashboard']}
    >
      {getMenus(menu, siderFold)}
    </Menu>
    {!siderFold ? <div className="App-switch-theme">
      <span><Icon type="bulb" />切换主题</span>
      <Switch onChange={changeTheme} defaultChecked={darkTheme} checkedChildren="黑" unCheckedChildren="白" />
    </div> : null}
  </div>

Sider.propTypes = {
  siderFold: PropTypes.bool,
  darkTheme: PropTypes.bool,
  location: PropTypes.shape(Object),
  changeTheme: PropTypes.func,
}

export default Sider
