import request from '@/utils/request'
/**
 * @param params  分页参数
 */
export function getCompanies(params) {
  return request({
    url: '/api/companies',
    method: 'get',
    params
  })
}

export function getCompany(id) {
  return request({
    url: '/api/companies/' + id,
    method: 'get'
  })
}

/**
 * @param data  请求体传参
 */
export function addCompany(data) {
  return request({
    url: '/api/companies',
    method: 'post',
    data
  })
}

/**
 * @param   对应唯一id
 * @param params url传参
 */
export function putCompany(id, data) {
  return request({
    url: '/api/companies/' + id,
    method: 'put',
    data
  })
}

export function delCompany(id) {
  return request({
    url: '/api/companies/' + id,
    method: 'delete'
  })
}