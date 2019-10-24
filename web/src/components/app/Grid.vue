<template>
  <v-row class="veiculos">
    <v-col>
      <dx-data-grid
        ref="grid"
        :data-source="dados"
        :columns="colunas"
        :show-borders="true"
        :selection="{ mode: 'single' }"
        :column-auto-width="true"
        :on-toolbar-preparing="loadTollbarPreparing"
        @selection-changed="onSelectionChanged"
      >
        <dx-search-panel
          :visible="true"
          :width="400"
          placeholder="Pesquisar..."
        />
        <dx-editing
          :allow-updating="true"
          :allow-deleting="true"
          :allow-adding="true"
          :use-icons="true"
          :form="formulario"
          mode="form"
        />
      </dx-data-grid>
    </v-col>
  </v-row>
</template>

<script>
import { DxDataGrid, DxEditing, DxSearchPanel } from 'devextreme-vue/data-grid'
import CustomStore from 'devextreme/data/custom_store'
import { parserHttpError } from '@/utils/axios'
export default {
  components: {
    DxDataGrid,
    DxEditing,
    DxSearchPanel
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
