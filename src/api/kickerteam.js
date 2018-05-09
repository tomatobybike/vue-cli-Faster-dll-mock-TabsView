import request from '@/utils/request'

export function getList (query) {
  return request({
    url: '/kickerteam/list',
    method: 'get',
    params: query
  })
}

export function createTeam (data) {
  return request({
    url: '/kickerteam/create',
    method: 'post',
    data
  })
}

export function updateTeam (data) {
  return request({
    url: '/kickerteam/update',
    method: 'post',
    data
  })
}

export function deleteTeam (query) {
  return request({
    url: '/kickerteam/delete',
    method: 'get',
    params: query
  })
}
