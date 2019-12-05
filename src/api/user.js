import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/auth/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: 'api/userinfo',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function getUsers(params) {
  return request({
    url: '/api/users',
    method: 'get',
    params
  })
}

export function getUser(id) {
  return request({
    url: '/api/users/' + id,
    method: 'get'
  })
}

export function addUser(data) {
  return request({
    url: '/api/users',
    method: 'post',
    data
  })
}

export function putUser(id, params ) {
  return request({
    url: '/api/users/' + id,
    method: 'put',
    params
  })
}

export function delUser(id) {
  return request({
    url: '/api/users/' + id,
    method: 'delete'
  })
}
export function getRoles(params) {
  return request({
    url: '/api/',
    method: 'get',
    params
  })
}
export function selectCompanies(params) {
  return request({
    url: '/api/siteconfig/companies',
    method: 'get',
    params
  })
}
export function selectRoles(params) {
  return request({
    url: '/api/siteconfig/roles',
    method: 'get',
    params
  })
}
