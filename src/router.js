import React, { PropTypes } from 'react'
import { Router, Route } from 'dva/router'
import App from './routes/App'
// import Error from './routes/Error'
// import Dashboard from './routes/dashboard'
// import Users from './routes/users'

const AppRouter = ({ history }) =>
  <Router history={history}>
    <Route path="/" component={App} />
  </Router>

AppRouter.propTypes = {
  history: PropTypes.shape(Object),
}

export default AppRouter

// <IndexRedirect to="/dashboard" />
// <Route path="dashboard" component={ Dashboard }/>
// <Route path="/users" component={ Users } />
// <Route path="*" component={ Error } />
