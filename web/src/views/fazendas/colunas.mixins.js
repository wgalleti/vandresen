export default {
  computed: {
    colunas () {
      return [
        {
          dataField: 'id',
          caption: '#',
          fixed: true,
          width: 50
        },
        {
          dataField: 'nome',
          validationRules: [
            { type: 'required', message: 'O nome é obrigatório' }
          ],
          fixed: true
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
