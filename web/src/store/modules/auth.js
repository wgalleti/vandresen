import axios from '@/plugins/axios'
import { setToken, parserHttpError } from '@/utils/axios'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    token: null,
    username: null
  },
  getters: {
    isLogged: state => state.token !== null
  },
  mutations: {
    SET_TOKEN (state, payload) {
      localStorage.setItem('token', payload)
      setToken(axios, payload)
      state.token = payload
    },
    CLEAR_TOKEN (state) {
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      setToken(axios)
      state.token = null
    },
    SET_USERNAME (state, payload) {
      localStorage.setItem('username', payload)
      state.username = payload
    }
  },
  actions: {
    readToken: ({ commit }) => new Promise(resolve => {
      const token = localStorage.getItem('token')
      const username = localStorage.getItem('username')

      if (!token) {
        commit('CLEAR_TOKEN')
        return resolve()
      }

      commit('SET_TOKEN', token)
      commit('SET_USERNAME', username)
      resolve()
    }),
    doCheck: ({ commit }) =>
      axios
        .get('/rest-auth/user/')
        .then(res => {
          commit('SET_USERNAME', res.data.username)
          return res.data
        })
        .catch(() => {
          commit('CLEAR_TOKEN')
          router.push('/login')
        }),
    doLogin: ({ commit, dispatch }, credentials) =>
      axios
        .post('/rest-auth/login/', credentials)
        .then(async res => {
          commit('SET_TOKEN', res.data.key)
          await dispatch('doCheck')
          router.push('/')
        })
        .catch(err => parserHttpError(err)),
    doLogout: ({ commit }) =>
      axios
        .post('/rest-auth/logout/', {})
        .then(() => {
          commit('CLEAR_TOKEN')
          router.push('/login')
        })
        .catch(() => {
          commit('CLEAR_TOKEN')
          router.push('/login')
        })
  }
}
