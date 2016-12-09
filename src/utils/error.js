import React from 'react'
import { message } from 'antd'

const reload = () => {
  localStorage.setItem('QPUserId', '')
  localStorage.setItem('QPToken', '')
  location.reload()
}

const error = (err) => {
  message.destroy()

  const { data } = err
  if (data) {
    if (data.status === 401) {
      localStorage.setItem('QPUserId', '')
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
