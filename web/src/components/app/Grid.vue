<template>
  <v-row class="veiculos">
    <v-col>
      <dx-data-grid
        ref="grid"
        v-bind="gridOptions"
        @selection-changed="onSelectionChanged"
      >
      </dx-data-grid>
    </v-col>
  </v-row>
</template>

<script>
import { DxDataGrid } from 'devextreme-vue/data-grid'
import CustomStore from 'devextreme/data/custom_store'
import { parserHttpError } from '@/utils/axios'

export default {
  components: {
    DxDataGrid
  },
  props: {
    url: String,
    keyID: {
      type: String,
      default: 'id'
    },
    colunas: {
      type: Array,
      default: () => ([])
    },
    formulario: {
      type: Object,
      default: () => ({})
    },
    toolbarItems: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      dados: new CustomStore({
        key: this.keyID,
        load: async loadOptions => {
          try {
            const { data } = await this.axios.get(this.url)
            return {
              data: data,
              totalCount: data.length
            }
          } catch (e) {
            parserHttpError(e)
          }
        },
        insert: async values => {
          try {
            await this.axios.post(this.url, values)
          } catch (e) {
            parserHttpError(e)
          }
        },
        update: async (key, values) => {
          try {
            await this.axios.patch(`${this.url}${key}/`, values)
          } catch (e) {
            parserHttpError(e)
          }
        },
        remove: async key => {
          try {
            await this.axios.delete(`${this.url}${key}/`)
          } catch (e) {
            parserHttpError(e)
          }
        }
      })
    }
  },
  computed: {
    gridOptions () {
      return {
        dataSource: this.dados,
        columns: this.colunas,
        showBorders: true,
        selection: { mode: 'single' },
        columnAutoWidth: true,
        onToolbarPreparing: this.loadTollbarPreparing,
        height: '87vh',
        scrolling: {
          mode: 'infinite'
        },
        columnFixing: {
          enabled: true
        },
        rowAlternationEnabled: true,
        loadPanel: {
          enabled: true,
          shading: true,
          shadingColor: 'rgba(0,0,0,0.5)'
        },
        pager: {
          allowedPageSizes: [5, 10, 15],
          showPageSizeSelector: true,
          showInfo: true
        },
        paging: {
          pageSize: 10
        },
        searchPanel: {
          visible: true,
          width: '400',
          placeholder: 'Pesquisar...'
        },
        editing: {
          allowUpdating: true,
          allowDeleting: true,
          allowAdding: true,
          useIcons: true,
          form: this.formulario,
          mode: 'popup',
          popup: {
            height: 'auto',
            width: '70%',
            shadingColor: 'rgba(0,0,0,0.5)'
          }
        },
        summary: {
          totalItems: [
            {
              alignment: 'right',
              column: 'id',
              showInColumn: 'id',
              summaryType: 'count',
              customizeText: e => {
                return e.value
              }
            }
          ]
        }
      }
    }
  },
  methods: {
    loadTollbarPreparing (grid) {
      const toolbarItems = grid.toolbarOptions.items
      toolbarItems.unshift({
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'refresh',
          onClick (e) {
            grid.component.refresh()
          }
        }
      })
      this.toolbarItems.forEach(item => {
        toolbarItems.unshift(item)
      })
      return toolbarItems
    },
    onSelectionChanged ({ selectedRowsData }) {
      this.$emit('dataSelected', selectedRowsData[0])
    },
    refresh () {
      this.$refs.grid.instance.refresh()
    }
  }
}
</script>
