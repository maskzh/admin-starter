import dva from 'dva'
import Router from './router'

import modelApp from './models/app'

import './index.css'

// 1. Initialize
const app = dva()

// 2. Model
app.model(modelApp)
// app.model(require('./models/users'))

// 3. Plugin
// app.use(createLoading(opts))

// 4. Router
app.router(Router)

// 5. Start
app.start('#root')
