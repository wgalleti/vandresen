<template>
  <v-row
    align="center"
    justify="center"
  >
    <dx-load-panel
      :position="{ of: 'body' }"
      :visible.sync="loading"
      :show-indicator="true"
      :show-pane="true"
      :shading="true"
      :close-on-outside-click="false"
      shading-color="rgba(0,0,0,0.4)"
      message="Entrando..."
    />
    <form @submit.prevent="submitLogin">
      <v-card
        width="400"
        height="300"
        class="elevation-5 mt-10"
      >
        <v-card-text>
          <dx-form
            ref="form"
            class="form"
            labelLocation="top"
            :form-data.sync="formData"
            :show-colon-after-label="false"
            validation-group="LoginFormValidation"
            :show-validation-summary="true"
            :scrolling-enabled="true"
            :focus-state-enabled="true"
            :items="formItems"
          />
        </v-card-text>
      </v-card>
    </form>
  </v-row>
</template>

<script>
import DxForm from 'devextreme-vue/form'
import { DxLoadPanel } from 'devextreme-vue/load-panel'
import notify from 'devextreme/ui/notify'

export default {
  components: {
    DxForm,
    DxLoadPanel
  },
  data () {
    return {
      loading: false,
      formData: {},
      formItems: [
        {
          itemType: 'group',
          caption: 'Login',
          items: [
            {
              dataField: 'username',
              label: {
                text: 'Usuário'
              },
              validationRules: [
                { type: 'required', message: 'O Usuário é obrigatório' }
              ]
            },
            {
              dataField: 'password',
              label: {
                text: 'Senha'
              },
              validationRules: [
                { type: 'required', message: 'A Senha é obrigatório' }
              ],
              editorOptions: {
                mode: 'password'
              }
            }
          ]
        },
        {
          itemType: 'button',
          buttonOptions: {
            text: 'Entrar',
            icon: 'check',
            useSubmitBehavior: true,
            horizontalAlignment: 'Right',
            verticalAlignment: 'Bottom',
            elementAttr: {
              class: 'btn-submit'
            }
          }
        }
      ]
    }
  },
  methods: {
    async submitLogin () {
      this.loading = true
      try {
        await this.$store.dispatch('auth/doLogin', this.formData)
        this.$router.push('/')
      } catch (e) {
        notify('Erro ao efetuar o login', 'error', 5000)
        notify(e.toString(), 'error', 5000)
      }
      this.loading = false
    }
  }
}
</script>
