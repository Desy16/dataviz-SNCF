import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/pages/Home.vue';

Vue.use(VueRouter)

const nameApp = 'DATAVIZ SNCF';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home - ' + nameApp
    }
  },
  {
    path: '/data',
    name: 'Data',
    // route level code-splitting
    // this generates a separate chunk (data.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "data" */ '../views/pages/Data.vue'),
    meta: {
      title: 'Data - ' + nameApp
    }
  },
  {
    path: '/objects',
    name: 'Objects',
    // route level code-splitting
    // this generates a separate chunk (objects.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "objects" */ '../views/pages/Objects.vue'),
    meta: {
      title: 'Objects found - ' + nameApp
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/pages/About.vue'),
    meta: {
      title: 'About - ' + nameApp
    }
  },
  {
    path: '/:pathMatch(.*)',
    name: 'NotFound',
    // route level code-splitting
    // this generates a separate chunk (NotFound.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "NotFound" */ '../views/pages/NotFound.vue'),
    meta: {
      title: '404 not found - ' + nameApp
    }
  }
]

const router = new VueRouter({
  routes
})

router.afterEach((to, from) => {
  document.title = to.meta.title;
});

export default router
