export default {
  computed: {
    colunas () {
      return [
        {
          dataField: 'id',
          caption: '#'
        },
        {
          dataField: 'nome',
          validationRules: [
            { type: 'required', message: 'O nome é obrigatório' }
          ]
        },
        {
          dataField: 'cpf_cnpj',
          caption: 'CPF/CNPJ',
          validationRules: [
            { type: 'required', message: 'O CPF/CNPJ é obrigatório' }
          ]
        }
      ]
    }
  }
}
