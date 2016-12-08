import 'isomorphic-fetch'

export default function request(url, options) {
  const token = localStorage.getItem('QPToken')
  let op = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'access-token': token,
    },
  }

  if (options && options.method && options.method.toLowerCase() !== 'get') {
    op = { ...op, ...options, body: JSON.stringify(options.body) }
  }

  return fetch(url, op)
    .then(response => response.json())
}
