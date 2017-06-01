import { request } from '../utils'

export async function login(params) {
  return request('/auth/login', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  })
}

export async function logout(params) {
  return request('/auth/logout', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  })
}

export async function userInfo(userId) {
  return request(`/user/${userId}`)
}
