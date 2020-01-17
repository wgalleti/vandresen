<template>
  <v-app-bar
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    app
    color="#347474"
    flat
    dark
    v-if="$store.getters['auth/isLogged']"
  >
    <v-toolbar-title class="mr-4 pl-4">
      <span class="hidden-sm-and-down title">Vandresen Agricola</span>
    </v-toolbar-title>
    <v-btn icon to="/">
      <v-icon>mdi-home</v-icon>
    </v-btn>
    <v-btn
      dark
      text
      v-for="menu in menus"
      :key="menu.to"
      :to="menu.to"
    >
      {{ menu.title }}
    </v-btn>
    <v-spacer />
    <v-btn text to="logout">
      <v-icon>exit_to_app</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  data () {
    return {
      menus: [
        { to: 'fazendas', title: 'Fazendas' },
        { to: 'fornecedores', title: 'Fornecedores' },
        { to: 'movimentos', title: 'Movimentos' },
        { to: 'contaspagar', title: 'Contas a Pagar' },
        { to: 'contasreceber', title: 'Contas a Receber' }
      ]
    }
  }
}
</script>
