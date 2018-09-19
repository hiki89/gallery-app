import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'

import AllGalleries from './components/AllGalleries'
import Login from './components/Login'
import Register from './components/Register'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: AllGalleries, name: 'all-galleries' },
  { path: '/login', component: Login, name: 'login' },
  { path: '/register', component: Register, name: 'register' }
]

const router = new VueRouter({
  routes,
  mode: 'history' 
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')