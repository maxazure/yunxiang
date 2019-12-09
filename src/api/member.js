import request from '@/utils/request'

export function getMembers(params) {
    return request({
        url: '/api/members',
        method: 'get',
        params
    })
}

export function getMember(id) {
    return request({
        url: '/api/members/' + id,
        method: 'get'
    })
}

export function addMember(data) {
    return request({
        url: '/api/members',
        method: 'post',
        data
    })
}

export function putMember(id, data) {
    return request({
        url: '/api/members/' + id,
        method: 'put',
        data
    })
}

export function delMember(id) {
    return request({
        url: '/api/members/' + id,
        method: 'delete'
    })
}