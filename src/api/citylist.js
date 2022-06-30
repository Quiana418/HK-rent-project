import request from '@/utils/request'

// 请求所有城市列表
// post---data
// get---params
export const getCityList = (level) => {
  return request({
    method: 'GET',
    url: `/area/city?level=${level}`
  })
}

// 请求热门城市列表
export const hotCityList = () => {
  return request({
    method: 'GET',
    url: '/area/hot'
  })
}
