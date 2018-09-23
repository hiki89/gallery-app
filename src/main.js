import Vue from 'vue'
import App from './App.vue'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import VueRouter from 'vue-router'

import AllGalleries from './components/AllGalleries'
import Login from './components/Login'
import Register from './components/Register'
import MyGalleries from './components/MyGalleries'
import AuthorGalleries from './components/AuthorGalleries'
import CreateNewGallery from './components/CreateNewGallery'
import SingleGallery from './components/SingleGallery'

Vue.use(VueRouter)
Vue.use(BootstrapVue)

const routes = [
  { path: '/', component: AllGalleries, name: 'all-galleries' },
  { path: '/login', component: Login, name: 'login' },
  { path: '/register', component: Register, name: 'register' },
  { path: '/my-galleries', component:MyGalleries, name: 'my-galleries' },
  { path: '/author/:id', component: AuthorGalleries, name: 'author-galleries' },
  { path: '/galleries/:id', component: SingleGallery, name: 'single-gallery' },
  { path: '/create', component: CreateNewGallery, name: 'create-gallery' }
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