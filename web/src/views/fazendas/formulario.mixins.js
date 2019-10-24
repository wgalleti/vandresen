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
            colSpan: 2
          },
          {
            dataField: 'cpf_cnpj',
            colSpan: 1,
            label: {
              text: 'CPF/CNPJ'
            }
          }
        ]
      }
    }
  }
}
