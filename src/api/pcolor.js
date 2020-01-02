import request from '@/utils/request'

export function getPcolors(params) {
    return request({
        url: '/api/pcolors',
        method: 'get',
        params
    })
}

export function getPcolor(id) {
    return request({
        url: '/api/pcolors/' + id,
        method: 'get'
    })
}

export function addPcolor(data) {
    return request({
        url: '/api/pcolors',
        method: 'post',
        data
    })
}

export function putPcolor(id, data) {
    return request({
        url: '/api/pcolors/' + id,
        method: 'put',
        data
    })
}

export function delPcolor(id) {
    return request({
        url: '/api/pcolors/' + id,
        method: 'delete'
    })
}