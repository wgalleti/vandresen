<template>
  <div class="fazendas">
    <app-grid
      ref="grid"
      url="/financeiro/fazendas/"
      :colunas="colunas"
      :formulario="formulario"
      :toolbar-items="toolbarItems"
    />
  </div>
</template>

<script>
import colunas from '@/views/fazendas/colunas.mixins'
import formulario from '@/views/fazendas/formulario.mixins'
import { saveAs } from 'file-saver'

export default {
  mixins: [
    colunas,
    formulario
  ],
  data () {
    return {
      toolbarItems: [
        {
          location: 'before',
          widget: 'dxButton',
          options: {
            icon: 'save',
            hint: 'Backup do Banco de dados',
            text: 'Backup do Banco de dados',
            onClick: async () => {
              const { data } = await this.axios.get('financeiro/fazendas/backup/', {
                responseType: 'blob'
              })
              const rightNow = new Date()
              const res = rightNow.toISOString().slice(0, 10).replace(/-/g, '')
              saveAs(new Blob([data], { type: 'application/zip' }), `${res}_backup.psql.zip`)
            }
          }
        }
      ]
    }
  }
}
</script>
