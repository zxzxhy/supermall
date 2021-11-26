import axios from 'axios'
// 网络请求封装
export function request(config) {
  const instance = axios.create({
    baseURL:'http://152.136.185.210:7878/api/hy66',
    timeout: 5000
  })
  // 请求拦截器
  instance.interceptors.request.use(config=>{
    return config
  },err =>{})
  // 响应拦截器
  instance.interceptors.response.use(res=>{
    return res.data
  },err =>{})

  // 这里返回的是Promise
  return instance(config)
}