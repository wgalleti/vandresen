export default {
  computed: {
    colunas () {
      return [
        {
          dataField: 'id'
        },
        {
          dataField: 'fazenda',
          lookup: {
            dataSource: this.$store.state.fazenda.lista,
            displayExpr: 'nome',
            valueExpr: 'id'

          }
        },
        {
          dataField: 'fornecedor',
          lookup: {
            dataSource: this.$store.state.fornecedor.lista,
            displayExpr: 'nome',
            valueExpr: 'id'
          }
        },
        {
          dataField: 'data',
          dataType: 'date'
        },
        {
          dataField: 'valor',
          dataType: 'number',
          format: { type: 'fixedPoint', precision: 2 }
        },
        {
          dataField: 'descricao'
        },
        {
          dataField: 'tipo',
          lookup: {
            dataSource: this.$store.state.movimento.tipos,
            displayExpr: 'nome',
            valueExpr: 'id'
          }
        }
      ]
    }
  }
}
