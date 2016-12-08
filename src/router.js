import React, { PropTypes } from 'react'
import { Router, Route, IndexRedirect } from 'dva/router'
import App from './routes/App'
import Error from './routes/Error'
import Dashboard from './routes/Dashboard'
// import Users from './routes/users'

const AppRouter = ({ history }) =>
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRedirect to="/dashboard" />
      <Route path="dashboard" component={Dashboard} />
      {/* <Route path="/users" component={Users} /> */}
      <Route path="*" component={Error} />
    </Route>
  </Router>

AppRouter.propTypes = {
  history: PropTypes.shape(Object),
}

export default AppRouter
