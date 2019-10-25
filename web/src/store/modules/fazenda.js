import axios from '@/plugins/axios'
import { parserHttpError } from '@/utils/axios'

const url = '/financeiro/fazendas/'

export default {
  namespaced: true,
  state: {
    lista: [],
    id: null
  },
  mutations: {
    SET_LISTA (state, payload) {
      state.lista = payload
    },
    SET_ID (state, payload = null) {
      state.id = payload
    }
  },
  actions: {
    getLista: ({ commit }, filter) =>
      axios.get(url, { params: filter })
        .then(res => commit('SET_LISTA', res.data))
        .catch(err => parserHttpError(err))
  }
}
