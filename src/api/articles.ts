import { get } from '@/utils/request'

// export const getArticles = (params: any) =>
//   request({
//     url: '/articles',
//     method: 'get',
//     params
//   })
export const getArticles = (params: any) => get('/api/articles', params)
