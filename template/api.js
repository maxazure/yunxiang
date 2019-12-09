import request from '@/utils/request'

export function get<%=titleize(@brick[:name_plural])%>(params) {
    return request({
        url: '/api/<%= @brick[:name_plural]%>',
        method: 'get',
        params
    })
}

export function get<%=titleize(@brick[:name])%>(id) {
    return request({
        url: '/api/<%= @brick[:name_plural]%>/' + id,
        method: 'get'
    })
}

export function add<%=titleize(@brick[:name])%>(data) {
    return request({
        url: '/api/<%= @brick[:name_plural]%>',
        method: 'post',
        data
    })
}

export function put<%=titleize(@brick[:name])%>(id, data) {
    return request({
        url: '/api/<%= @brick[:name_plural]%>/' + id,
        method: 'put',
        data
    })
}

export function del<%=titleize(@brick[:name])%>(id) {
    return request({
        url: '/api/<%= @brick[:name_plural]%>/' + id,
        method: 'delete'
    })
}
