import request from '@/utils/request'

export function getListUser (query) {
  return request({
    url: '/user/list',
    method: 'get',
    params: query
  })
}

export function createItemUser (data) {
  return request({
    url: '/user/create',
    method: 'post',
    data
  })
}

export function updateItemUser (data) {
  return request({
    url: '/user/update',
    method: 'post',
    data
  })
}

export function deleteItemUser (query) {
  return request({
    url: '/user/delete',
    method: 'get',
    params: query
  })
}

export function updatePowerUser (query) {
  return request({
    url: '/user/updatePower',
    method: 'get',
    params: query
  })
}
