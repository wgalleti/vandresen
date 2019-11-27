<template>
  <div class="contasreceber">
    <app-grid
      ref="grid"
      url="/financeiro/contasreceber/"
      :colunas="colunas"
      :formulario="formulario"
    />
  </div>
</template>

<script>
import colunas from '@/views/contasreceber/colunas.mixins'
import formulario from '@/views/contasreceber/formulario.mixins'
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
