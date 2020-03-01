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
          dataField: 'nome',
          validationRules: [
            { type: 'required', message: 'O nome é obrigatório' }
          ],
          fixed: true
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
