import { stringify } from 'qs'
import { fetch } from '../utils'

export async function query(params) {
  return fetch(`/user?${stringify(params)}`)
}

export async function create(params) {
  return fetch('/user', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  })
}

export async function update(id, params) {
  return fetch(`/user/${id}`, {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  })
}

export async function remove(id) {
  return fetch(`/user/${id}`, {
    method: 'delete',
  })
}
