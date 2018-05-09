import request from '@/utils/request'

export function getListHotNews (query) {
  return request({
    url: '/hotnews/rule/list',
    method: 'get',
    params: query
  })
}

export function createHotNews (data) {
  return request({
    url: '/hotnews/rule/create',
    method: 'post',
    data
  })
}

export function updateHotNews (data) {
  return request({
    url: '/hotnews/rule/update',
    method: 'post',
    data
  })
}

export function deleteHotNews (query) {
  return request({
    url: '/hotnews/rule/delete',
    method: 'get',
    params: query
  })
}

export function getSources (query) {
  return request({
    url: '/hotnews/rule/sources',
    method: 'get',
    params: query
  })
}

/* custom hot news */

export function getListCustomHotNews (query) {
  return request({
    url: '/hotnews/custom/list',
    method: 'get',
    params: query
  })
}

export function createCustomHotNews (data) {
  return request({
    url: '/hotnews/custom/create',
    method: 'post',
    data
  })
}

export function updateCustomHotNews (data) {
  return request({
    url: '/hotnews/custom/update',
    method: 'post',
    data
  })
}

export function deleteCustomHotNews (query) {
  return request({
    url: '/hotnews/custom/delete',
    method: 'get',
    params: query
  })
}
