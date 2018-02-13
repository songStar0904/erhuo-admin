/*
* @Author: Administrator
* @Date:   2017-06-30 23:28:55
* @Last Modified by:   Administrator
* @Last Modified time: 2017-07-01 19:52:49
*/

// 导入模块
import * as user from './user.js'
import * as main from './main.js'
import * as classify from './classify.js'

const apiObj = {
  main,
  user,
  classify
}
const install = function (Vue) {
  if (install.installed) return
  install.installed = true

  // 定义属性到Vue原型中
  Object.defineProperties(Vue.prototype, {
    $fetch: {
      get () {
        return apiObj
      }
    }
  })
}

export default {
  install,
  apiObj
}
