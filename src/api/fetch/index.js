/*
*  统一封装axios
* @Author: songstar
* @Date:   2017-06-30 22:53:48
* @Last Modified by:   Administrator
* @Last Modified time: 2017-07-02 11:26:04
*/

// 导入模块
import axios from 'axios'
import env from '../../../build/env';
import router from '../../router/router';
import md5 from 'js-md5';
import qs from 'qs';
import {Message} from 'iview';
const ajaxUrl = env === 'development'
    ? '/api'
    : env === 'production'
        ? 'http://api.erhuo.com'
        : 'http://api.erhuo.com';
// axios.defaults.withCredentials=true;//让ajax携带cookie
export default function fetch (options) {
  return new Promise((resolve, reject) => {
    // 创建一个axios实例
    const instance = axios.create({
        baseURL: ajaxUrl,
        timeout: 10000,
        headers: {"Content-Type":'application/x-www-form-urlencoded; charset=UTF-8'}
    });
    if (!options['params'] && !options['data']) {
      options['params'] = {};
    }


    let now = Date.parse( new Date() ).toString().substr(0, 10);
    let token = '';
    let method = options['params'] ? 'params' : 'data'; 
    let params = options[method];
    for (let key in params) {
      if (key !== 'time' && key !== 'token') {
        token += md5(params[key] + ''); // md5接受参数为数字0 会出错
      }
    }
    token = md5(`api_${token}_api`);
    options[method]['time'] = now;
    options[method]['token'] = token;
    // 添加请求拦截器
    instance.interceptors.request.use((config) =>{
      // 在发送请求之前做些什么
      if (config.method === 'post') {
          config.data = qs.stringify(config.data);
      }
      return config;
    }, (error) => {
      // 对请求错误做些什么
      console.log(error);
      return Promise.reject(error);
    });
    // 请求处理
    instance(options)
      .then((response) => {
        // 请求成功时,根据业务判断状态
        if (response.status === 200) {
          resolve(response.data)
          return false
        } else {
          router.push('login')
        }
        Message.warning('失败')
        reject(response)
      })
      .catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      // console.log(error.response.data);
      // console.log(error.response.status);
      // console.log(error.response.headers);
      Message.error('Error', error.message);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      Message.error('Error', error.message);
    }
    console.log(error.config);
  });
  })
}
