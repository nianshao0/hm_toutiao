// 基于axios封装网络请求
// 每个程序员的想法都不一样，封装的地方和名字都不一样，但是思想相同
import theAxios from 'axios'
import router from '@/router/index.js'
import { Notify } from 'vant'
import { getToken } from '@/utils/token.js'
const axios = theAxios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 20000 // 20秒超时时间(请求20秒无响应直接判定超时)
})

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 目标：统一携带token
  // 判断本地token再携带，判断具体api/index.js里如果没有携带Authorization,再添加上去
  // 没有叫undefined，null具体的值你的赋予才叫空
  // ?. 可选链操作符，如果前面对象里没有length,整个表达式原地返回undefined
  // 如果getToken()在原地有值token字符串，才能调用length获取长度
  if (getToken()?.length > 0 && config.headers.Authorization === undefined) {
    config.headers.Authorization = `Bearer ${getToken()}`
  }
  return config
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

// 添加响应拦截器
// 本质：就是一个函数
axios.interceptors.response.use(function (response) {
  // http响应状态码为2xx,3xx就进入这里
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response
}, function (error) {
  // http响应状态码为4xx,5xx报错就进入这里
  // 对请求错误做些什么
  console.dir(error)
  // console.log(this) // underfined
  // 只有401才代表身份过期，才需要跳转登录
  if (error.response.status === 401) {
    // 不能使用this.$router (因为this不是vue组件对象无法调用$router)
    // 解决：this.$router为了拿到router路由对象，所以直接去上面引入@/router下的router对象
    Notify({ type: 'warning', message: '身份已过期' })
    router.replace('/login')
  }
  // 超出 2xx 范围的状态码都会触发该函数。
  return Promise.reject(error)
})

export default ({ url, method = 'GET', params = {}, data = {}, headers = {} }) => {
  return axios({
    url,
    method,
    params,
    data,
    headers
  })

  // return new Promise((resolve, reject) => {
  //   // 判断如果有值，需要把自己写的js代码，把params对象里key和value拼接到url上
  //   $.ajax({
  //     url,
  //     data,
  //     headers,
  //     type: method,
  //     success:(res)=>{
  //       resolve(res)
  //     },
  //     error:err =>{
  //       reject(err)
  //     }
  //   })
  // })
}

// 但是上面有局限性
// 导出的axios方法在使用时
/*
// 我在逻辑页面调用时，传入的这5个配置名字
    axios({
      url:'请求地址',
      method:'请求方式',
      params:{},
      data:{},
      headers:{}
    })
*/
// 问题来了，万一将来我要更新request.js里封装网络请求的工具
// 把axios换成jquery的$.ajax
// import $ from 'jquery'
// export default $.ajax
/*
  $.ajax({
    url:'请求地址',
    type:'请求方式',
    data:{},  //没有params
    headers:{}
  })
*/
