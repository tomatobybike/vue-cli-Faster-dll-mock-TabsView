import request from '@/utils/request'

export function getListGroup (query) {
  return request({
    url: '/group/list',
    method: 'get',
    params: query
  })
}

export function createItemGroup (data) {
  return request({
    url: '/group/create',
    method: 'post',
    data
  })
}

export function updateItemGroup (data) {
  return request({
    url: '/group/update',
    method: 'post',
    data
  })
}

export function deleteItemGroup (query) {
  return request({
    url: '/group/delete',
    method: 'get',
    params: query
  })
}
