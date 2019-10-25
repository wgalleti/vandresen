export default {
  computed: {
    summary () {
      return {
        totalItems: [{
          column: 'valor2',
          summaryType: 'sum',
          customizeText: function (data) {
            return data.value.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' })
          }
        }]
      }
    },
    summaryFornecedor () {
      return {
        totalItems: [{
          column: 'saldo',
          summaryType: 'sum',
          customizeText: function (data) {
            return data.value.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' })
          }
        }]
      }
    }
  }
}
