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

// 在找房中请求城市信息
export const cityList = (cityId) => {
  return request({
    method: 'GET',
    url: `/houses?cityId=${cityId}`
  })
}

// 查询房屋的具体信息 根据houseCode查询
export const houseDetails = (id) => {
  return request({
    method: 'GET',
    url: `/houses/${id}`
  })
}
