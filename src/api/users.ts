import request, { post } from '@/utils/request'

export const getUserInfo = (data: any) =>
  request({
    url: '/users/info',
    method: 'post',
    data
  })

export const login = (data: any) =>
  request({
    url: '/users/login',
    method: 'post',
    data
  })

// export const logout = () =>
//   request({
//     url: '/users/logout',
//     method: 'post'
//   })
export const logout = () => post('/users/logout')

export const updateArticle = (id: number, data: any) =>
  request({
    url: `/api/articles/${id}`,
    method: 'put',
    data
  })

export const deleteArticle = (id: number) =>
  request({
    url: `/api/articles/${id}`,
    method: 'delete'
  })
