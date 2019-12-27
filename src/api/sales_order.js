import request from '@/utils/request'

export function getSalesOrders(params) {
    return request({
        url: '/api/sales_orders',
        method: 'get',
        params
    })
}

export function getSalesOrder(id) {
    return request({
        url: '/api/sales_orders/' + id,
        method: 'get'
    })
}

export function addSalesOrder(data) {
    return request({
        url: '/api/sales_orders',
        method: 'post',
        data
    })
}

export function putSalesOrder(id, data) {
    return request({
        url: '/api/sales_orders/' + id,
        method: 'put',
        data
    })
}

export function delSalesOrder(id) {
    return request({
        url: '/api/sales_orders/' + id,
        method: 'delete'
    })
}