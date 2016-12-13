import fetch from 'dva/fetch'

export default function request(url, options = {}) {
  const op = {
    ...options,
    headers: {
      'access-token': localStorage.getItem('QPToken'),
      ...options.headers,
    },
  }

  return fetch(url, op)
    .then(response => response.json())
    .then(data => (data.result ? { data } : { error: data }))
    .catch(error => ({ error }))
}
