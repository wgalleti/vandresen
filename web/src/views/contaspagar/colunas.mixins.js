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
          dataField: 'pago',
          dataType: 'boolean'
        },
        {
          dataField: 'observacao'
        }
      ]
    }
  }
}
