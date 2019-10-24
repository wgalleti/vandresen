import store from '@/store'

const authGuard = async (to, from, next) => {
  await store.dispatch('auth/readToken')
  const check = to.matched.some(record =>
    typeof record.meta.requiresAuth === 'undefined'
      ? true
      : record.meta.requiresAuth
  )
  if (check) {
    if (!store.getters['auth/isLogged']) {
      return next('/login')
    }
    return next()
  }
  next()
}

export default authGuard
