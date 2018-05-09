import request from '@/utils/request'

export function getListSuggest (query) {
  return request({
    url: '/suggest/rule/list',
    method: 'get',
    params: query
  })
}

export function createSuggest (data) {
  return request({
    url: '/suggest/rule/create',
    method: 'post',
    data
  })
}

export function updateSuggest (data) {
  return request({
    url: '/suggest/rule/update',
    method: 'post',
    data
  })
}

export function deleteSuggest (query) {
  return request({
    url: '/suggest/rule/delete',
    method: 'get',
    params: query
  })
}

export function getSources (query) {
  return request({
    url: '/suggest/rule/sources',
    method: 'get',
    params: query
  })
}
