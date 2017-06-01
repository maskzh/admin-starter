import React from 'react'
import store from 'store'
import { message } from 'antd'

const reload = () => {
  store.remove('userId')
  store.remove('token')
  window.location.reload()
}

const error = (err) => {
  message.destroy()

  const { data } = err
  if (data) {
    if (data.status === 401) {
      store.remove('userId')
      message.error((
        <span>{data.message}, <a onClick={reload}>重新登陆</a></span>
      ), 0)
    } else {
      message.error(data.message || err.message)
    }
  } else {
    message.error(err.message)
  }
}

export default error
