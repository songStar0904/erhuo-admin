import fetch from './fetch/index.js'
// 获取 商品
export function get (params) {
  return fetch({
    url: 'goods/get',
    method: 'get',
    params
  })
}
export function get_one (params) {
  return fetch({
    url: 'goods/get_one',
    method: 'get',
    params
  })
}
export function get_edit (params) {
  return fetch({
    url: 'goods/get_edit',
    method: 'get',
    params
  })
}
// 删除商品
export function del (data) {
  return fetch({
    url: 'goods/delete',
    method: 'delete',
    data
  })
}
// 审核商品
export function pass_goods (data) {
  return fetch({
    url: 'admin/pass_goods',
    method: 'post',
    data
  })
}