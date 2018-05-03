import fetch from './fetch/index.js'
// 获取 信息
export function get () {
  return fetch({
    url: 'main/get',
    method: 'get'
  })
}
// 获取反馈信息
export function get_fmsg (params) {
  return fetch({
    url: 'admin/get_fmsg',
    method: 'get',
    params
  })
}
// 修改反馈信息
export function edit_fmsg (data) {
  return fetch({
    url: 'admin/edit_fmsg',
    method: 'post',
    data
  })
}
// 解锁
export function on_clock (data) {
  return fetch({
    url: 'admin/on_lock',
    method: 'post',
    data
  })
}