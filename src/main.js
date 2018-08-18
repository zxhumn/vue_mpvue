import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'
// 配置axios
import axios from 'axios';
// axios的拦截器
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
   
    wx.showLoading({
        title: '正在加载中',
        mask:true
      })
       // 在发送请求之前做些什么
      return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
// axios的适配器 把axios发送请求xhr转换为微信小程序的
axios.defaults.adapter =function(config){
    // console.log(config)
    return new Promise((resolve,reject)=>{
        wx.request({
          url: config.url, //开发者服务器接口地址",
          data: config.params, //请求的参数",
          method: config.method,
          success: res => {
              resolve(res)
          },
          fail: (err) => {
              reject(err)
          },
          complete: () => {
              wx.hideLoading();
          }
        });
    })
}
axios.defaults.baseURL = 'https://www.zhengzhicheng.cn/';
Vue.prototype.$axios = axios;

const app = new Vue(App)
app.$mount()
