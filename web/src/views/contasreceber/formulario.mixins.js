export default {
  computed: {
    formulario () {
      return {
        showValidationSummary: true,
        labelLocation: 'top',
        colCount: 6,
        items: [
          {
            colSpan: 1,
            dataField: 'fazenda',
            validationRules: [
              { type: 'required', message: 'A Fazenda é obrigatório' }
            ]
          },
          {
            colSpan: 2,
            dataField: 'cliente',
            validationRules: [
              { type: 'required', message: 'O Cliente é obrigatório' }
            ]
          },
          {
            colSpan: 1,
            dataField: 'documento',
            validationRules: [
              { type: 'required', message: 'O Documento é obrigatório' }
            ]
          },
          {
            colSpan: 2,
            dataField: 'descricao'
          },
          {
            colSpan: 1,
            dataField: 'data_entrega',
            editorOptions: {
              dateSerializationFormat: 'yyyy-MM-dd'
            },
            validationRules: [
              { type: 'required', message: 'A Data de entrega é obrigatório' }
            ]
          },
          {
            colSpan: 1,
            dataField: 'data_recebimento',
            editorOptions: {
              dateSerializationFormat: 'yyyy-MM-dd'
            },
            validationRules: [
              { type: 'required', message: 'A Data de recebimento é obrigatório' }
            ]
          },
          {
            colSpan: 1,
            dataField: 'valor',
            editorType: 'dxNumberBox',
            editorOptions: {
              format: { type: 'fixedPoint', precision: 2 }
            },
            validationRules: [
              { type: 'required', message: 'O Valor é obrigatório' }
            ]
          },
          {
            colSpan: 3,
            dataField: 'observacao'
          },
          {
            colSpan: 1,
            dataField: 'recebido'
          }
        ]
      }
    }
  }
}
