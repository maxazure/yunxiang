import request from '@/utils/request'
/**
 * @param params  分页参数
 */
export function getRoles(params) {
    return request({
        url: '/api/roles',
        method: 'get',
        params
    })
}

export function getRole(id) {
    return request({
        url: '/api/roles/' + id,
        method: 'get'
    })
}

/**
 * @param data  请求体传参
 */
export function addRole(data) {
    return request({
        url: '/api/roles',
        method: 'post',
        data
    })
}

/**
 * @param   对应唯一id
 * @param params url传参
 */
export function putRole(id, data) {
    return request({
        url: '/api/roles/' + id,
        method: 'put',
        data
    })
}

export function delRole(id) {
    return request({
        url: '/api/roles/' + id,
        method: 'delete'
    })
}