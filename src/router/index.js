import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import authenticate from "../auth/autheticate";

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:'/register',
    name:'Register',
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')

  },
  { 
    path: "/social",
    name:"Social",
    component: () => import(/* webpackChunkName: "about" */ '../views/Social.vue')

  },
  { 
    path: "/manage-account",
    name:"Manage-Account",
    component: () => import(/* webpackChunkName: "about" */ '../views/ManageAccount.vue')

  },
  {
    path:'/verify-account',
    name:'Verify',
    component: () => import(/* webpackChunkName: "about" */ '../views/Verify.vue')

  },
  {
    path:'/subscribe',
    name:'Payments',
    component: () => import(/* webpackChunkName: "about" */ '../views/Payment.vue')

  },
  {
    path:'/forgot-password',
    name:'ForgotPassword',
    component: () => import(/* webpackChunkName: "about" */ '../views/ForgotPAssword.vue')

  },
  { 
    path: "/change-password/:token",
    name:'ChangePassword',
    component: () => import(/* webpackChunkName: "about" */ '../views/ChangePassword.vue')

  },
  {
    path: '/playmovie/',
    name: 'PlayMovie',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/PlayMovie.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
