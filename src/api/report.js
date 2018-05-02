import fetch from './fetch/index.js'
// 获取 举报
export function get (params) {
  return fetch({
    url: 'admin/get_report',
    method: 'get',
    params
  })
}
// 删除 举报
export function del (data) {
  return fetch({
    url: 'admin/del_report',
    method: 'post',
    data
  })
}
// 删除 举报的内容
export function delItem (data) {
  return fetch({
    url: 'admin/del_report_item',
    method: 'post',
    data
  })
}