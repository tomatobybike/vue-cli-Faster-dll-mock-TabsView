import request from '@/utils/request'

export function getListNode (params) {
  return request({
    url: '/menu/list',
    method: 'get',
    params
  })
}

export function createChild (data) {
  return request({
    url: '/menu/createChild',
    method: 'post',
    data
  })
}

export function createSiblings (data) {
  return request({
    url: '/menu/createSiblings',
    method: 'post',
    data
  })
}

export function updateNode (data) {
  return request({
    url: '/menu/updateNode',
    method: 'post',
    data
  })
}

export function deleteNode (params) {
  return request({
    url: '/menu/delete',
    method: 'get',
    params
  })
}
