import axios from '@/plugins/axios'
import { parserHttpError } from '@/utils/axios'

const url = '/financeiro/movimentos/'

export default {
  namespaced: true,
  state: {
    lista: [],
    tipos: []
  },
  mutations: {
    SET_LISTA (state, payload) {
      state.lista = payload
    },
    SET_TIPOS (state, payload) {
      state.tipos = payload
    }
  },
  actions: {
    getLista: ({ commit }, filter) =>
      axios.get(url, { params: filter })
        .then(res => commit('SET_LISTA', res.data))
        .catch(err => parserHttpError(err)),
    getTipos: ({ commit }, filter) =>
      axios.get(`${url}tipos/`, { params: filter })
        .then(res => commit('SET_TIPOS', res.data))
        .catch(err => parserHttpError(err))
  }
}
