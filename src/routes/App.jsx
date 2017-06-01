import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import classnames from 'classnames'
import { Spin } from 'antd'
import Login from './Login'
import { Header, Bread, Footer, Sider } from '../components/Layout'
import './App.css'

const App = ({ children, location, routes, params, dispatch, app }) => {
  const { login, loading, user, siderFold, darkTheme } = app
  const loginProps = {
    loading,
    onOk(data) {
      dispatch({ type: 'app/login', payload: data })
    },
  }

  const headerProps = {
    user,
    siderFold,
    logout() {
      dispatch({ type: 'app/logout' })
    },
    switchSider() {
      dispatch({ type: 'app/switchSider' })
    },
  }

  const siderProps = {
    siderFold,
    darkTheme,
    location,
    changeTheme() {
      dispatch({ type: 'app/changeTheme' })
    },
  }

  return login ? (
    <div className={classnames('App-layout', { fold: siderFold })}>
      <aside className={classnames('App-sider', { light: !darkTheme })}>
        <Sider {...siderProps} />
      </aside>
      <div className="App-main">
        <Header {...headerProps} />
        <Bread routes={routes} params={params} />
        <div className="App-container">
          <div className="App-content">
            {children}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  ) : (
    <div className="App-spin">
      <Spin tip="加载用户信息..." spinning={loading} size="large">
        <Login {...loginProps} />
      </Spin>
    </div>)
}

App.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.shape(Object).isRequired,
  routes: PropTypes.arrayOf(Object).isRequired,
  params: PropTypes.shape(Object).isRequired,
  dispatch: PropTypes.func.isRequired,
  app: PropTypes.shape(Object).isRequired,
}

export default connect(({ app }) => ({ app }))(App)
