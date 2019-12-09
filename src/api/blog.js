import request from '@/utils/request'

export function getBlogs(params) {
    return request({
        url: '/api/blogs',
        method: 'get',
        params
    })
}

export function getBlog(id) {
    return request({
        url: '/api/blogs/' + id,
        method: 'get'
    })
}

export function addBlog(data) {
    return request({
        url: '/api/blogs',
        method: 'post',
        data
    })
}

export function putBlog(id, data) {
    return request({
        url: '/api/blogs/' + id,
        method: 'put',
        data
    })
}

export function delBlog(id) {
    return request({
        url: '/api/blogs/' + id,
        method: 'delete'
    })
}