import fetch from './fetch/index.js'
// 获取 信息
export function get () {
  return fetch({
    url: 'main/get',
    method: 'get'
  })
}