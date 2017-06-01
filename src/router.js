import React from 'react'
import PropTypes from 'prop-types'
import { Router, Route, IndexRedirect } from 'dva/router'
import App from './routes/App'
import Error from './routes/Error'
import Dashboard from './routes/Dashboard'

import User from './routes/User'
import UserDetail from './routes/UserDetail'
import UserForm from './routes/UserForm'

const AppRouter = ({ history }) => (
  <Router history={history}>
    <Route breadcrumbName="首页" path="/" component={App}>
      <IndexRedirect to="/dashboard" />
      <Route breadcrumbName="仪表盘" path="dashboard" component={Dashboard} />

      <Route breadcrumbName="用户" path="user">
        <IndexRedirect to="list" />
        <Route breadcrumbName="列表" path="list" component={User} />
        <Route breadcrumbName="新增" path="new" component={UserForm} />
        <Route breadcrumbName="修改-:id" path=":id/edit" component={UserForm} />
        <Route breadcrumbName="详情-:id" path=":id/show" component={UserDetail} />
      </Route>

      <Route breadcrumbName="404" path="*" component={Error} />
    </Route>
  </Router>
)

AppRouter.propTypes = {
  history: PropTypes.shape(Object).isRequired,
}

export default AppRouter
