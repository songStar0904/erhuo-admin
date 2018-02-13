import fetch from './fetch/index.js'
// 获取 分类
export function get (params) {
  return fetch({
    url: 'classify/get',
    method: 'get',
    params
  })
}
// 修改分类
export function edit (data) {
  return fetch({
    url: 'classify/edit',
    method: 'post',
    data
  })
}
// 添加分类
export function add (data) {
  return fetch({
    url: 'classify/add',
    method: 'post',
    data
  })
}
// 删除分类
export function del (data) {
  return fetch({
    url: 'classify/delete',
    method: 'delete',
    data
  })
}