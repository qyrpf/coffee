import Vue from 'vue'
import Router from 'vue-router'

import web from '@/views'
import Home from '@/views/home'
import Menu from '@/views/menu'
import Advice from '@/views/advices'
import Cart from '@/views/cart'
import myOrders from '@/views/myOrders'
import orderConfirm from '@/views/orderConfirm'
import orderSuccess from '@/views/orderSuccess'
import Login from '@/views/login'


Vue.use(Router)

const router =  new Router({
  routes: [{
      path: '/login',
      component: Login,
      meta:{requireAuth : false}
    },{
      path: '/register',
      component: Login,
      meta:{requireAuth : false}
    },
    {
      path: '/',
      name: true,
      component: web,
      meta:{requireAuth : false},
      children: [{
          path: '/',
          component: Home,
          meta:{requireAuth : false}
        },{
          path: '/menu',
          component: Menu,
          meta:{requireAuth : false}
        },{
          path: '/advices',
          component: Advice,
          meta:{requireAuth : true}
        },{
          path: '/cart',
          component: Cart,
          meta:{requireAuth : true}
        },{
          path: '/myOrders',
          component: myOrders,
          meta:{requireAuth : true}
        }]
      },{
        path: '/orderConfirm',
        component: orderConfirm,
        meta:{requireAuth : true}
      },{
        path: '/orderSuccess',
        component: orderSuccess,
        meta:{requireAuth : true}
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

