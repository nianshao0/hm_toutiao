// 基于axios封装网络请求
// 每个程序员的想法都不一样，封装的地方和名字都不一样，但是思想相同
import theAxios from 'axios'
const axios = theAxios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 20000 // 20秒超时时间(请求20秒无响应直接判定超时)
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
