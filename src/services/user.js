import { stringify } from 'qs'
import { request } from '../utils'

export async function query(params) {
  return request(`/user?${stringify(params)}`)
}

export async function get(id, params) {
  return request(`/user/${id}?${stringify(params)}`)
}

export async function create(params) {
  return request('/user', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  })
}

export async function update(id, params) {
  return request(`/user/${id}`, {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  })
}

export async function remove(id) {
  return request(`/user/${id}`, {
    method: 'delete',
  })
}
