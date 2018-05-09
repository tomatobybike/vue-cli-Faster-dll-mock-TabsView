import request from '@/utils/request'

export function login (account, password) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      account,
      password
    }
  })
}

export function getInfo (token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout () {
  return request({
    url: '/user/logout',
    method: 'get'
  })
}
