export default {
  computed: {
    formulario () {
      return {
        showValidationSummary: true,
        labelLocation: 'top',
        colCount: 3,
        items: [
          {
            dataField: 'nome',
            colSpan: 1
          },
          {
            dataField: 'email',
            colSpan: 2
          },
          {
            dataField: 'rg_ie',
            colSpan: 1
          },
          {
            dataField: 'cpf_cnpj',
            colSpan: 1
          },
          {
            dataField: 'telefone',
            colSpan: 1
          },
          {
            dataField: 'endereco',
            colSpan: 3
          },
          {
            dataField: 'banco',
            colSpan: 1
          },
          {
            dataField: 'agencia',
            colSpan: 1
          },
          {
            dataField: 'conta',
            colSpan: 1
          }

        ]
      }
    }
  }
}
