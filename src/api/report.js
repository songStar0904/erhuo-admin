import fetch from './fetch/index.js'
// 获取 公告
export function get (params) {
  return fetch({
    url: 'admin/get_report',
    method: 'get',
    params
  })
}