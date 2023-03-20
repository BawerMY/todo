import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import ArchiveView from '../views/ArchiveView.vue'
import SignUpView from '../views/SignUpView.vue'
import AlboView from '../views/AlboView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/archive',
    name: 'archive',
    component: ArchiveView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUpView
  },
  {
    path: '/albo',
    name: 'albo',
    component: AlboView
  },
]

const router = new VueRouter({
  routes,
  mode: 'history',
})

export default router
