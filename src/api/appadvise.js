import request from '@/utils/request'
// 应用建议（应用显示比例配置）

export function getListApp (query) {
  return request({
    url: '/app/rule/list',
    method: 'get',
    params: query
  })
}

export function createApp (data) {
  return request({
    url: '/app/rule/create',
    method: 'post',
    data
  })
}

export function updateApp (data) {
  return request({
    url: '/app/rule/update',
    method: 'post',
    data
  })
}

export function deleteApp (query) {
  return request({
    url: '/app/rule/delete',
    method: 'get',
    params: query
  })
}
