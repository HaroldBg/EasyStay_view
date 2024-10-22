import { h, resolveComponent } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: DefaultLayout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/dashboard/Dashboard.vue'
          ),
      },
      {
        path: '/chambre',
        name: 'Chambre',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/chambre/chambres',
        children: [
          {
            path: '/chambre/chambres',
            name: 'Chambres',
            component: () => import('@/views/chambre/Chambres.vue'),
          },
          {
            path: '/chambre/reservation',
            name: 'Réservations',
            component: () => import('@/views/chambre/reservation.vue'),
          },
        ],
      },{
        path: '/clients',
        name: 'Clients',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/client/client.vue'
            ),
      },{
        path: '/employes',
        name: 'Employés',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/client/Employe.vue'
            ),
      },{
        path: '/factures',
        name: 'Factures',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/factures/Factures.vue'
            ),
      },
    ],
  },
  {
    path: '/auth',
    redirect: '/pages/404',
    name: 'Auth',
    component: {
      render() {
        return h(resolveComponent('router-view'))
      },
    },
    children: [
      {
        path: '404',
        name: 'Page404',
        component: () => import('@/views/pages/Page404'),
      },
      {
        path: '500',
        name: 'Page500',
        component: () => import('@/views/pages/Page500'),
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/auth/Login'),
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/auth/Register'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
})

export default router
