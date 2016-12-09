import React from 'react'
import { message } from 'antd'

const error = (err) => {
  message.destroy()

  const { data } = err
  if (data) {
    if (data.status === 401) {
      localStorage.setItem('QPUserId', '')
      message.error((
        <span>{data.message}, <a onClick={() => location.reload()}>重新登陆</a></span>
      ), 0)
    } else {
      message.error(data.message)
    }
  } else {
    message.error(error.message)
  }
}

export default error
