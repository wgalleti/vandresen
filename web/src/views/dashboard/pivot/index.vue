<template>
  <div>
    <DxPivotGrid
      id="pivotgrid"
      ref="grid"
      :data-source="dataSource"
      :allow-sorting-by-summary="true"
      :allow-filtering="true"
      :show-borders="true"
      :show-column-grand-totals="false"
      :show-row-grand-totals="false"
      :show-row-totals="false"
      :show-column-totals="false"
      width="100%"
    >
      <DxFieldChooser
        :enabled="true"
        :height="400"
      />
    </DxPivotGrid>
  </div>
</template>

<script>
import {
  DxPivotGrid,
  DxFieldChooser
} from 'devextreme-vue/pivot-grid'

export default {
  components: {
    DxPivotGrid,
    DxFieldChooser
  },
  computed: {
    dataSource () {
      return {
        fields: [{
          caption: 'Fazenda',
          dataField: 'fazenda',
          area: 'column',
          width: 150,
          sortBySummaryField: 'valor'
        },
        {
          dataField: 'data',
          dataType: 'date',
          area: 'row'
        },
        {
          groupName: 'date',
          groupInterval: 'month',
          visible: false,
          area: 'column'
        },
        {
          groupName: 'date',
          groupInterval: 'year',
          visible: false,
          area: 'column'
        },
        {
          caption: 'Fornecedor',
          dataField: 'fornecedor',
          width: 300,
          area: 'row'
        },
        {
          caption: 'Total',
          dataField: 'valor',
          dataType: 'number',
          summaryType: 'sum',
          format: {
            type: 'fixedPoint',
            precision: 2
          },
          area: 'data'
        }],
        store: this.dados
      }
    }
  },
  data () {
    return {
      dados: []
    }
  },
  async mounted () {
    this.dados = await this.axios.get('financeiro/movimentos/pivot/').then(res => res.data)
  }
}
</script>
<style>
#pivotgrid {
  margin-top: 20px;
  width: 100%;
}
.currency {
    text-align: center;
}
</style>
