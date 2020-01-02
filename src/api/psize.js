import request from '@/utils/request'

export function getPsizes(params) {
    return request({
        url: '/api/psizes',
        method: 'get',
        params
    })
}

export function getPsize(id) {
    return request({
        url: '/api/psizes/' + id,
        method: 'get'
    })
}

export function addPsize(data) {
    return request({
        url: '/api/psizes',
        method: 'post',
        data
    })
}

export function putPsize(id, data) {
    return request({
        url: '/api/psizes/' + id,
        method: 'put',
        data
    })
}

export function delPsize(id) {
    return request({
        url: '/api/psizes/' + id,
        method: 'delete'
    })
}