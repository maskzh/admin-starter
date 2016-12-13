import { fetch } from '../utils'

export async function login(params) {
  return fetch('/auth/login', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  })
}

export async function logout(params) {
  return fetch('/auth/logout', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  })
}

export async function userInfo(userId) {
  return fetch(`/user/${userId}`)
}
