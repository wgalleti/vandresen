<template>
  <div class="fornecedores">
    <app-grid
      ref="grid"
      url="/financeiro/fornecedores/"
      :colunas="colunas"
      :formulario="formulario"
    />
  </div>
</template>

<script>
import colunas from '@/views/fornecedores/colunas.mixins'
import formulario from '@/views/fornecedores/formulario.mixins'
export default {
  mixins: [
    colunas,
    formulario
  ]
}
</script>
