import store from '@/store'

export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/dashboard/Index.vue')
  },
  {
    path: '/fazendas',
    name: 'fazendas',
    component: () => import('@/views/fazendas/Index.vue')
  },
  {
    path: '/fornecedores',
    name: 'fornecedores',
    component: () => import('@/views/fornecedores/Index.vue')
  },
  {
    path: '/movimentos',
    name: 'movimentos',
    component: () => import('@/views/movimentos/Index.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/Index.vue'),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/logout',
    name: 'logout',
    beforeEnter: async (to, from, next) => {
      await store.dispatch('auth/doLogout')
      next('/login')
    },
    meta: {
      requiresAuth: false
    }
  }

]
