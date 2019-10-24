<template>
  <div class="fazendas">
    <app-grid
      ref="grid"
      url="/financeiro/fazendas/"
      :colunas="colunas"
      :formulario="formulario"
    />
  </div>
</template>

<script>
import colunas from '@/views/fazendas/colunas.mixins'
import formulario from '@/views/fazendas/formulario.mixins'
export default {
  mixins: [
    colunas,
    formulario
  ]
}
</script>
