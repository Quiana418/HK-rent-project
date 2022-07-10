import request from '@/utils/request'

/**
 * 获取房屋查询条件
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
