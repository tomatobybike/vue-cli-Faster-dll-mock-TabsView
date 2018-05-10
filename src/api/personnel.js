import request from '@/utils/request'

export function getList (query) {
  return request({
    url: '/personnel/list',
    method: 'get',
    params: query
  })
}

export function createItem (data) {
  return request({
    url: '/personnel/create',
    method: 'post',
    data
  })
}

export function updateItem (data) {
  return request({
    url: '/personnel/update',
    method: 'post',
    data
  })
}

export function deleteItem (query) {
  return request({
    url: '/personnel/delete',
    method: 'get',
    params: query
  })
}
