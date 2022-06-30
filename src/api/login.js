import request from '@/utils/request'

// 登录的请求
// post---data
// get---params
export const Login = (data) => {
  return request({
    method: 'POST',
    url: 'user/login',
    data
  })
}

// 请求用户的登录信息
export const getUserInfo = (token) => {
  return request({
    method: 'GET',
    url: 'user',
    headers: {
      authorization: token
    }
  })
}
