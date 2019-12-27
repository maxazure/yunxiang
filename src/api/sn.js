import request from '@/utils/request'

export function getSns(params) {
    return request({
        url: '/api/sns',
        method: 'get',
        params
    })
}

export function getSn(id) {
    return request({
        url: '/api/sns/' + id,
        method: 'get'
    })
}

export function addSn(data) {
    return request({
        url: '/api/sns',
        method: 'post',
        data
    })
}

export function putSn(id, data) {
    return request({
        url: '/api/sns/' + id,
        method: 'put',
        data
    })
}

export function delSn(id) {
    return request({
        url: '/api/sns/' + id,
        method: 'delete'
    })
}