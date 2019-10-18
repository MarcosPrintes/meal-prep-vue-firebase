import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from '@/store.js'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path:'/about',
      name: 'about',
      component: () => import('./views/About.vue'),
      meta:{
        authRequired: true
      }
    }, 
    {
      path:'/menu',
      name: 'menu',
      component: () => import('./views/Menu.vue')
    },
    {
      path:'/sigin',
      name: 'sigin',
      component: () => import('./views/Sigin.vue')
    },
    {
      path:'/join',
      name: 'join',
      component: () => import('./views/Join.vue')      
    },
  ]
})

router.beforeEach((to, from, next) =>{
  if(to.matched.some(record => record.meta.authRequired)){
    if(!store.state.isAuthenticated){
      next({
        path: '/sigin'
      })
    }else{
      next()
    }
  }else{
    next()
  }
})


export default router