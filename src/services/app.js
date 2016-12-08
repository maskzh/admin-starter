import fetch from '../utils/fetch'

export async function login(body) {
  return fetch('/auth/login', { method: 'post', body })
}

export async function logout(body) {
  return fetch('/auth/logout', { method: 'post', body })
}

export async function userInfo(userId) {
  return fetch(`/user/${userId}`)
}
