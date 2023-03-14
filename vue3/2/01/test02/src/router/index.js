import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Films from '@/views/FilmsView.vue'
import NowPlaying from '@/views/NowPlayingView.vue'
const Detail = () => import('@/views/Detail')

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/films',
    component: Films,
    children: [
      {
        path: '/films/nowplaying',
        component: NowPlaying

      },
    ]
  },
  {
    path: '/detail/:myid',
    name: 'zydetail',
    component: Detail
  },

  {
    path: '/:pathMatch(.*)',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  mode: 'history',
  routes
})

// router.beforeEach((to, from) => {
//   console.log(to)
//   next()
//   // return false
// })

export default router
