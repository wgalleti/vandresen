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
          dataField: 'rg_ie',
          caption: 'RG/Inscrição Estadual',
          validationRules: [
            { type: 'required', message: 'O RG/Inscrição Estadual é obrigatório' }
          ]
        },
        {
          dataField: 'cpf_cnpj',
          caption: 'CPF/CNPJ',
          validationRules: [
            { type: 'required', message: 'O CPF/CNPJ é obrigatório' }
          ]
        },
        'endereco',
        'telefone',
        'email'
      ]
    }
  }
}
