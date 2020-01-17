<template>
  <div class="home">
    <v-row>
      <v-toolbar flat color="#35495e" dark>
        <v-toolbar-title>Dashboard</v-toolbar-title>
        <v-spacer/>
        <v-select
          class="selector-fazenda"
          solo-inverted
          dark
          label="Fazenda"
          v-model="fazenda"
          :items="$store.state.fazenda.lista"
          item-text="nome"
          item-value="id"
          style="max-width: 300px;"
          @change="loadData"
          hide-details
        ></v-select>
      </v-toolbar>
    </v-row>
    <v-row>
      <v-col cols="7">
        <h1 class="text-center grey--text">Fluxo Geral</h1>
        <app-grid-select
          ref="fluxoGeral"
          height="500"
          :url="url"
          :colunas="colunasView"
          :summary="summary"/>
      </v-col>
      <v-col cols="5">
        <h1 class="text-center grey--text">Fluxo por Fornecedor</h1>
        <app-grid-select
          ref="fluxoFornecedor"
          height="500"
          :url="urlFornecedor"
          :colunas="colunasFornecedor"
          :summary="summaryFornecedor"/>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <pivot />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import colunas from '@/views/movimentos/colunas.mixins'
import summary from '@/views/dashboard/summary.mixins'

export default {
  components: {
    Pivot: () => import('./pivot/index.vue')
  },
  mixins: [
    colunas,
    summary
  ],
  computed: {
    colunasView () {
      const colunas = ['fazenda', 'descricao', 'data', 'valor2']
      return this.colunas.filter(f => colunas.indexOf(f.dataField) !== -1)
    },
    url () {
      if (this.fazenda === null) {
        return '/financeiro/movimentos/'
      }
      return `/financeiro/movimentos/?fazenda=${this.fazenda}`
    },
    urlFornecedor () {
      if (this.fazenda === null) {
        return '/financeiro/fornecedores/saldos/'
      }
      return `/financeiro/fornecedores/saldos/?fazenda=${this.fazenda}`
    },
    fazenda: {
      get () {
        return this.$store.state.fazenda.id
      },
      set (value) {
        this.$store.commit('fazenda/SET_ID', value)
      }
    },
    colunasFornecedor () {
      return [
        {
          dataField: 'id',
          caption: '#',
          width: '60'
        },
        {
          dataField: 'nome'
        },
        {
          dataField: 'saldo',
          dataType: 'number',
          format: { type: 'fixedPoint', precision: 2 }
        }
      ]
    }
  },
  methods: {
    loadData () {
      this.$refs.fluxoGeral.clearData()
      this.$refs.fluxoFornecedor.clearData()
      this.$refs.fluxoGeral.showData()
      this.$refs.fluxoFornecedor.showData()
      this.$refs.fluxoGeral.refresh()
      this.$refs.fluxoFornecedor.refresh()
      this.$store.dispatch('fazenda/getLista')
      this.$store.dispatch('fornecedor/getLista')
      this.$store.dispatch('movimento/getTipos')
    }
  },
  mounted () {
    this.loadData()
  }
}
</script>
