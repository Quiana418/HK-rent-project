import request from '@/utils/request'

// 请求轮播图
// post---data
// get---params
export const SwiperPic = () => {
  return request({
    method: 'GET',
    url: '/home/swiper'
  })
}

// 请求租房小组图片
// post---data
// get---params
export const rentGroups = (area) => {
  return request({
    method: 'GET',
    url: '/home/groups',
    area
  })
}
