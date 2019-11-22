<template>
  <div class="contaspagar">
    <app-grid
      ref="grid"
      url="/financeiro/contaspagar/"
      :colunas="colunas"
      :formulario="formulario"
    />
  </div>
</template>

<script>
import colunas from '@/views/contaspagar/colunas.mixins'
import formulario from '@/views/contaspagar/formulario.mixins'
export default {
  mixins: [
    colunas,
    formulario
  ],
  mounted () {
    this.$store.dispatch('fazenda/getLista')
    this.$store.dispatch('fornecedor/getLista')
  }
}
</script>
