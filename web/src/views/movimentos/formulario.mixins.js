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
            colSpan: 1,
            dataField: 'data',
            validationRules: [
              { type: 'required', message: 'A Data é obrigatório' }
            ],
            editorType: 'dxDateBox',
            editorOptions: {
              dateSerializationFormat: 'yyyy-MM-dd'
            }

          },
          {
            colSpan: 2,
            dataField: 'fornecedor',
            validationRules: [
              { type: 'required', message: 'O Fornecedor é obrigatório' }
            ]
          },
          {
            colSpan: 1,
            dataField: 'documento'
          },
          {
            colSpan: 1,
            dataField: 'valor',
            validationRules: [
              { type: 'required', message: 'O Valor é obrigatório' }
            ],
            editorType: 'dxNumberBox',
            editorOptions: {
              format: { type: 'fixedPoint', precision: 2 }
            }
          },
          {
            colSpan: 5,
            dataField: 'descricao',
            validationRules: [
              { type: 'required', message: 'A Descrição é obrigatório' }
            ]
          },

          {
            colSpan: 1,
            dataField: 'tipo',
            validationRules: [
              { type: 'required', message: 'O Tipo é obrigatório' }
            ]
          }
        ]
      }
    }
  }
}
