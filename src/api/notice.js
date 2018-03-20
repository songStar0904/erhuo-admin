import fetch from './fetch/index.js'
// 获取 公告
export function get (params) {
  return fetch({
    url: 'admin/get_notice',
    method: 'get',
    params
  })
}
export function send (data) {
  return fetch({
    url: 'admin/send_notice',
    method: 'post',
    data
  })
}