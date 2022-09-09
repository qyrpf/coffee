import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/login'
import Admin from '@/views/index'
import categoryEdit from '@/views/CategoryEdit'
import categoryList from '@/views/categoryList'
import orderList from '@/views/orderList'
import menuList from '@/views/menuList'
import menuEdit from '@/views/menuEdit'
import adviceList from '@/views/adviceList'
import userList from '@/views/userList'
import search from '@/views/search'


Vue.use(Router)

const router =  new Router({
  routes: [{
        path: '/login',
        component: Login,
        meta:{requireAuth : false}
      },{
        path: '/',
        component: Admin,
        meta:{requireAuth : true},
        children: [{
          path: '/orderList',
          component: orderList,
           meta:{requireAuth : true}
        },{
          path: '/creatCategory',
          component: categoryEdit,
          meta:{requireAuth : true}
        }, {
          path: '/categoryList',
          component: categoryList,
          meta:{requireAuth : true}
        }, {
          path: '/categoryEdit',
          component: categoryEdit,
          meta:{requireAuth : true}
        }, {
          path: '/menuList',
          component: menuList,
          meta:{requireAuth : true}

        }, {
          path: '/menuEdit',
          component: menuEdit,
          meta:{requireAuth : true}

        },{
          path: '/menuCreat',
          component: menuEdit,
          meta:{requireAuth : true}

        },{
          path: '/adviceList',
          component: adviceList,
          meta:{requireAuth : true}
       },{
        path: '/userList',
        component: userList,
        meta:{requireAuth : true}
     },{
      path: '/search',
      component: search,
      meta:{requireAuth : true}
   }]
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) { // 判断跳转的路由是否需要登录
      if (localStorage.token){ // 判断是否登录
            next()                     
      }else{//未登录
        next({
            path: '/login',
            query: {redirect: to.fullPath} //登录成功后跳转之前拦截的页面
        })
      }      
  } else {//不需要登录权限
     next()

  }
});
export default router;

