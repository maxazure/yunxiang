import request from '@/utils/request'

export function getUsers(params) {
  return request({
    url: '/management/users',
    method: 'get',
    params
  })
}
