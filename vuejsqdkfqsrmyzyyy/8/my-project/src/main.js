import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'

import Main from './components/Main.vue'
import Login from './components/Login.vue'

Vue.use(VueRouter)

var router = new VueRouter({})

router.map({
  '/':{
    name:'main',
    component:Main
  },
  '/login':{
    name:'login',
    component:Login
  }
});

var app = Vue.extend({});

router.start(app,'#app');




/* eslint-disable no-new */
// new Vue({
//   el: 'body',
//   components: { App }
// })
