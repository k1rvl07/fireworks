import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, top: 132, behavior: 'smooth' }
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/catalog/',
      name: 'catalog',
      component: () => import('@/views/CatalogView.vue'),
    },
    {
      path: '/catalog/salyuti/',
      name: 'salyuti',
      component: () => import('@/views/SalyutiView.vue'),
    },
    {
      path: '/catalog/salyuti/:slug/',
      name: 'product',
      component: () => import('@/views/ProductView.vue'),
    },
    {
      path: '/docs/sert/',
      name: 'sert',
      component: () => import('@/views/SertView.vue'),
    },
    {
      path: '/dostavka/',
      name: 'dostavka',
      component: () => import('@/views/DostavkaView.vue'),
    },
    {
      path: '/show/',
      name: 'show',
      component: () => import('@/views/ShowView.vue'),
    },
    {
      path: '/o-kompanii/',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
    },
    {
      path: '/contacts/',
      name: 'contacts',
      component: () => import('@/views/ContactsView.vue'),
    },
    {
      path: '/cart/',
      name: 'cart',
      component: () => import('@/views/CartView.vue'),
    },
    {
      path: '/checkout/',
      name: 'checkout',
      component: () => import('@/views/CheckoutView.vue'),
    },
    {
      path: '/checkout/success/',
      name: 'success',
      component: () => import('@/views/SuccessView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
})

export default router
