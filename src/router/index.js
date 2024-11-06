import { h, resolveComponent } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: DefaultLayout,
    redirect: '/dashboard',
    meta: { requiresAuth: true },
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
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));

        if (token && user && user.role === 'Admin') {
          // Allow access if the user is an admin
          next();
        } else {
          // Redirect to the Forbidden page or show a 403 error
          next({ name: 'Forbidden' });
        }
      },
        redirect: '/dashboard',
        children: [
          {
            path: '/chambre/chambres',
            name: 'Chambres',
            component: () => import('@/views/chambre/Chambres.vue'),
          },{
            path: '/chambre/chambres/create',
            name: 'Chambres.create',
            component: () => import('@/views/chambre/CreateChambres.vue'),
          },
          {
            path: '/chambre/reservation',
            name: 'Réservations',
            component: () => import('@/views/chambre/reservation.vue'),
          },
          {
            path: '/reservation/create',
            name: 'Creer Réservations',
            component: () => import('@/views/chambre/CreateReservation.vue'),
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
        path: '/clients/create',
        name: 'Créer Client',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/client/CreateClient.vue'
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
        path: '/employes/create',
        name: 'Creer Réceptionniste',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/client/Employe.vue'
            ),
      },
      {
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
      {
        path: '/hotels',
        name: 'Hôtels',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/hotel/Hotels.vue'
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
      {
        path: '403',
        name: 'Forbidden',
        component: () => import('@/views/pages/Forbidden'),
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
// Navigation guard to check authentication
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');// Replace with your store logic to track auth

  // If the route requires authentication and the user is not logged in
  if (to.meta.requiresAuth && !token) {
    // Redirect to the auth view
    next({ name: 'Login' });
  } else {
    next(); // Proceed to the requested route
  }
});
export default router
