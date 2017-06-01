import store from 'store'
import fetch from 'dva/fetch'

export default function request(url, options = {}) {
  const op = {
    ...options,
    headers: {
      'access-token': store.get('token'),
      ...options.headers,
    },
  }

  return fetch(url, op)
    .then(response => response.json())
    .then(data => (data.result ? { data: data.data } : { err: data }))
    .catch(err => ({ err }))
}
