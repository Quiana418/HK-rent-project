import request from '@/utils/request'

/**
 * 去出租里面 请求搜索建议
 * @param {name} 搜索词 城市
 * @param {id} 城市id
 * @returns
 */
export const getSearchList = ({ name, id }) => {
  return request({
    method: 'GET',
    url: '/area/community',
    params: { name, id }
  })
}

/**
 * 去出租里面 请求房屋发布条件
 * @returns
 */
export const getHouseDetails = () => {
  return request({
    method: 'GET',
    url: '/houses/params'
  })
}

/**
 * 去出租里面 请求房屋发布
 * @returns
 */
export const publishHouse = ({ title, description, houseImg, oriented, supporting, price, roomType, size, floor, community }) => {
  return request({
    method: 'POST',
    url: '/user/houses',
    data: {
      title, description, houseImg, oriented, supporting, price, roomType, size, floor, community
    }
  })
}

/**
 * 去出租里面 请求房屋发布的图片
 * @returns
 */
export const publishImg = (data) => {
  return request({
    method: 'POST',
    url: '/houses/image',
    data,
    headers: {
      ContentType: 'multipart/form-data'
    }
  })
}
