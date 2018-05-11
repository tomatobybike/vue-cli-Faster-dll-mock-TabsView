import request from '@/utils/request'

export function login (account, password) {
  return request({
    url: '/member/login',
    method: 'post',
    data: {
      account,
      password
    }
  })
}

export function getInfo (token) {
  return request({
    url: '/member/info',
    method: 'get',
    params: { token }
  })
}

export function logout () {
  return request({
    url: '/member/logout',
    method: 'get'
  })
}
