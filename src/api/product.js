import request from '@/utils/request'

export function getProducts(params) {
    return request({
        url: '/api/products',
        method: 'get',
        params
    })
}

export function getProduct(id) {
    return request({
        url: '/api/products/' + id,
        method: 'get'
    })
}

export function addProduct(data) {
    return request({
        url: '/api/products',
        method: 'post',
        data
    })
}

export function putProduct(id, data) {
    return request({
        url: '/api/products/' + id,
        method: 'put',
        data
    })
}

export function delProduct(id) {
    return request({
        url: '/api/products/' + id,
        method: 'delete'
    })
}