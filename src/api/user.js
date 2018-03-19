
import fetch from './fetch/index.js'
// 登录
export function login (params) {
  return fetch({
    url: 'user/login',
    method: 'get',
    params
  })
}
// islogin
export function islogin (params) {
  return fetch({
    url: 'user',
    method: 'get',
    params
  })
}
// 登出
export function loginOut (params) {
  return fetch({
    url: 'user/login_out',
    method: 'get',
    params
  })
}
// 注册
export function register (data) {
  return fetch({
    url: 'user/register',
    method: 'post',
    data
  })
}
// 修改密码
export function change_psd (data) {
  return fetch({
    url: 'user/change_psd',
    method: 'post',
    data
  })
}
// upload
export function upload (data) {
  return fetch({
    url: 'user/upload',
    method: 'post',
    data
  })
}
// checkPhone
export function checkPhone (params) {
  return fetch({
    url: 'user/phonecheck',
    method: 'get',
    params
  })
}
// get user
export function get (params) {
  return fetch({
    url: 'user/get',
    method: 'get',
    params
  })
}
export function edit (data) {
  return fetch({
    url: 'user/edit',
    method: 'post',
    data
  })
}
// smsCode
export function getSmsCode (params) {
  return fetch({
    url: 'service/sms',
    method: 'get',
    params
  })
}
// getMsg
export function getMsg (params) {
  return fetch({
    url: '',
    method: 'get',
    params
  })
}
