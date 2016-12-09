import dva from 'dva'
import errorHandler from './utils/error'
import Router from './router'

import modelApp from './models/app'
import modelUser from './models/user'

import './index.css'

// 1. Initialize
const app = dva({
  onError(error) { errorHandler(error) },
})

// 2. Model
app.model(modelApp)
app.model(modelUser)

// 3. Plugin
// app.use(createLoading(opts))

// 4. Router
app.router(Router)

// 5. Start
app.start('#root')
