import axios from 'axios';
import router from './router'
import Vue from 'vue'

const http = axios.create();

http.interceptors.request.use(
    config => {
      if(localStorage.token){
        config.headers.Authorization = localStorage.token;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
});

http.interceptors.response.use(res => {
    return res;
  }, err => {
    if (err.response.data.message) {
      Vue.prototype.$message({
        type: 'error',
        message: err.response.data.message
      })
      
      if (err.response.status === 401) {
        router.push({
            path:'/login',
            query: {redirect: router.currentRoute.fullPath}
        })
      }
    }
    
    return Promise.reject(err)
})
      
Vue.prototype.$http = http;