import request from '@/utils/request'

/**
 * 获取房屋查询条件 渲染顶部picker里的查询条件
 * @param {城市id} id
 * @returns
 */
export const getHousesQueryCondition = (id) => {
  return request({
    url: '/houses/condition',
    params: {
      id
    }
  })
}
/**
 * 根据条件查询房屋
 * @param {查询房屋所需要的各种数据对象} data
 * @returns
 */
export const queryHouses = (params) => {
  return request({
    url: '/houses',
    params
  })
}
