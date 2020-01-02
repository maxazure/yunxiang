import request from '@/utils/request'

export function getPfabrics(params) {
    return request({
        url: '/api/pfabrics',
        method: 'get',
        params
    })
}

export function getPfabric(id) {
    return request({
        url: '/api/pfabrics/' + id,
        method: 'get'
    })
}

export function addPfabric(data) {
    return request({
        url: '/api/pfabrics',
        method: 'post',
        data
    })
}

export function putPfabric(id, data) {
    return request({
        url: '/api/pfabrics/' + id,
        method: 'put',
        data
    })
}

export function delPfabric(id) {
    return request({
        url: '/api/pfabrics/' + id,
        method: 'delete'
    })
}