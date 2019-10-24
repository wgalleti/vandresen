<template>
  <div class="movimentos">
    <app-grid
      ref="grid"
      url="/financeiro/movimentos/"
      :colunas="colunas"
      :formulario="formulario"
    />
  </div>
</template>

<script>
import colunas from '@/views/movimentos/colunas.mixins'
import formulario from '@/views/movimentos/formulario.mixins'
export default {
  mixins: [
    colunas,
    formulario
  ],
  mounted () {
    this.$store.dispatch('fazenda/getLista')
    this.$store.dispatch('fornecedor/getLista')
    this.$store.dispatch('movimento/getTipos')
  }
}
</script>
