import request from '@/utils/request'

export function getInventories(params) {
    return request({
        url: '/api/inventories',
        method: 'get',
        params
    })
}

export function getInventory(id) {
    return request({
        url: '/api/inventories/' + id,
        method: 'get'
    })
}

export function addInventory(data) {
    return request({
        url: '/api/inventories',
        method: 'post',
        data
    })
}

export function putInventory(id, data) {
    return request({
        url: '/api/inventories/' + id,
        method: 'put',
        data
    })
}

export function delInventory(id) {
    return request({
        url: '/api/inventories/' + id,
        method: 'delete'
    })
}