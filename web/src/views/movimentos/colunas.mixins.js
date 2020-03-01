export default {
  computed: {
    colunas () {
      return [
        {
          dataField: 'id',
          caption: '#',
          width: 50,
          fixed: true
        },
        {
          dataField: 'fazenda',
          lookup: {
            dataSource: this.$store.state.fazenda.lista,
            displayExpr: 'nome',
            valueExpr: 'id'
          },
          fixed: true
        },
        {
          dataField: 'fornecedor',
          lookup: {
            dataSource: this.$store.state.fornecedor.lista,
            displayExpr: 'nome',
            valueExpr: 'id'
          },
          fixed: true
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
          dataField: 'documento',
          width: 100
        },
        {
          dataField: 'valor2',
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
        },
        {
          dataField: 'baixado',
          caption: 'Pago/Recebido',
          dataType: 'boolean'
        }
      ]
    }
  }
}
