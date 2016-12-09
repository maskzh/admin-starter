import { stringify } from 'qs'
import fetch from '../utils/fetch'

export async function query(params) {
  return fetch(`/user?${stringify(params)}`)
}

export async function create(body) {
  return fetch('/user', { method: 'post', body })
}

export async function remove(id, body) {
  return fetch(`/user/${id}`, { method: 'delete', body })
}

export async function update(id, body) {
  return fetch(`/user/${id}`, { method: 'put', body })
}
