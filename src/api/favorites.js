import request from '@/utils/request'

/**
 * 请求添加收藏房屋
 * @param {房屋的id===houseCode值} id
 * @returns
 */
export const addCollectHouse = (id) => {
  return request({
    method: 'POST',
    url: `/user/favorites/${id}`
  })
}

/**
 * 请求取消收藏房屋
 * @param {房屋的id===houseCode值} id
 * @returns
 */
export const delCollectHouse = (id) => {
  return request({
    method: 'DELETE',
    url: `/user/favorites/${id}`
  })
}

/**
 * 获取房屋收藏列表
 * @returns
 */
export const checkCollectList = () => {
  return request({
    url: 'user/favorites'
  })
}

/**
 * 判断房屋是否收藏
 * @param {房屋id===houseCode} id
 * @returns
 */
export const isHouseCollected = (id) => {
  return request({
    url: `/user/favorites/${id}`
  })
}
