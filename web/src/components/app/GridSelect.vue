<template>
  <v-row class="veiculos">
    <v-col>
      <dx-data-grid
        ref="grid"
        :data-source="dataSource"
        :summary="summary"
        :columns="colunas"
        :show-borders="true"
        :selection="selection"
        :on-toolbar-preparing="loadTollbarPreparing"
        :height="height"
        @selection-changed="onSelectionChanged"
      >
        <dx-search-panel
          :visible="true"
          :width="300"
          placeholder="Pesquisar..."
        />
      </dx-data-grid>
    </v-col>
  </v-row>
</template>

<script>
import { DxDataGrid, DxSearchPanel } from 'devextreme-vue/data-grid'
import CustomStore from 'devextreme/data/custom_store'
import { parserHttpError } from '@/utils/axios'
export default {
  components: {
    DxDataGrid,
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
    height: {
      type: [String, Number],
      default: 'auto'
    },
    mode: {
      type: String,
      default: 'single'
    },
    summary: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      dataSource: [],
      dados: new CustomStore({
        key: this.keyID,
        load: async loadOptions => {
          try {
            const { data } = await this.axios.get(this.url)
            this.$emit('gridData', data)
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
    selection () {
      let mode = {}
      switch (this.mode) {
        case 'single':
          mode = { mode: 'single' }
          break
        case 'multiple':
          mode = {
            selectAllMode: 'allPages',
            mode: 'multiple'
          }
          break
      }
      return mode
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
      return toolbarItems
    },
    showData () {
      this.dataSource = this.dados
    },
    clearData () {
      this.dataSource = []
    },
    refresh () {
      this.$refs.grid.instance.refresh()
    },
    onSelectionChanged ({ selectedRowsData }) {
      this.$emit('dataSelected', selectedRowsData)
    }
  }
}
</script>
