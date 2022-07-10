import request from '@/utils/request'

/**
 * 查看已发布房源
 * 传token 在请求拦截器里面已经传了
 * @returns
 */
export const checkPublishedHouse = () => {
  return request({
    url: '/user/houses'
  })
}
