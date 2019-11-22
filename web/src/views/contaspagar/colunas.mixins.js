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
          dataField: 'documento'
        },
        {
          dataField: 'data_entrega',
          dataType: 'date'
        },
        {
          dataField: 'data_pagamento',
          dataType: 'date'
        },
        {
          dataField: 'descricao'
        },
        {
          dataField: 'valor',
          dataType: 'number',
          format: {
            type: 'fixedPoint',
            precision: 2
          }
        },
        {
          dataField: 'observacao'
        }
      ]
    }
  }
}
