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
          caption: 'RG/Inscrição Estadual'
        },
        {
          dataField: 'cpf_cnpj',
          caption: 'CPF/CNPJ'
        },
        'endereco',
        'telefone',
        'email',
        'banco',
        'agencia',
        'conta'
      ]
    }
  }
}
