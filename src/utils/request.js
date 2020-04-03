/* eslint-disable */
/**
 * 封装axios请求方法
 */
const axios  = require('axios')
const qs = require('qs')
const config = window.config // config配置文件
var cancel
var promiseArr = {}
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  if (config.method === 'get') {
    config.params = {
      _t: Date.parse(new Date()),
      ...config.params
    }
  }
  // 在发送请求之前做些什么
  // 能做的事如下 检查权限 增加页面loading  网络状态判断等
  if (promiseArr[config.url] && config.url !== `${window.config.baseUrl}/user/prmCodeList`) {
    promiseArr[config.url]('cancel')
    promiseArr[config.url] = cancel
  } else {
    promiseArr[config.url] = cancel
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  delete(promiseArr[response.config.url.replace(response.config.baseURL,'')])
  return response
}, function (error) {
  // 对响应错误做点什么
  // 例如用户请求失效，返回登录页什么的
  return Promise.reject(error)
})

function error(response) {
  // console.log(response)
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status !== 200)) {
    if (response.message !== 'cancel') {
      window.notificationError({
        msg: 'Error',
        desc: 'Network Error'
      })
    }
    return response
  } else {
    window.notificationError({
      msg: 'Error',
      desc: 'Network Error'
    })
  }
}

function success(res) {
  if (!res.data.flag && res.config.url !== `${window.config.baseUrl}/user/isLogin`) {
    window.notificationError({
      msg: 'Error',
      desc: res.data.msg
    })
  }
}

const $axios = (opts, data) => {
  let Public = {}  //用于存放公共参数，类似于当前用户id等
  let httpDefaultOpts = { //http默认配置
    baseURL: config.baseUrl,
    timeout: config.timeout,
    method: opts.method,
    url: opts.url,
    responseType: "json", // 一般一个网站的responseType 都是一样的
    withCredentials: true, // 是否允许带cookie这些
    arrayFormat: opts.arrayFormat,  // 有三个参数 'indices' id[0]=b&id[1]=c  'brackets' 'id[]=b&id[]=c' 'repeat' 'id=b&id=c'
    params: Object.assign(Public, data),
    data: Object.assign(Public, data),
    headers: opts.method === 'post' || opts.method === 'put'|| opts.method === 'delete' ? {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    } :
    {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    },
    cancelToken: new axios.CancelToken(function (c) {
      cancel = c // 记录当前请求的取消方法
    })
  }
  if (opts.method == 'get') {
    delete httpDefaultOpts.data
  } else if (opts.method == 'delete') {
    delete httpDefaultOpts.data
  } else {
    delete httpDefaultOpts.params
    httpDefaultOpts.data = qs.stringify(httpDefaultOpts.data, {arrayFormat: httpDefaultOpts.arrayFormat || 'indices'})
  }
  let promise = new Promise(function (resolve, reject) {
    axios(httpDefaultOpts).then(
      (res) => {
        success(res)
        resolve(res)
      }
    ).catch(
      (response) => {
        error(response)
        reject(response)
      }
    )
  })
  return promise
}
export default $axios
