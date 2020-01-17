<template>
  <v-app id="app">
    <app-toolbar />
    <v-content>
      <v-container>
        <router-view />
      </v-container>
    </v-content>
  </v-app>

</template>

<style>
.v-content {
  background: #fff;
  color: #004445 !important;

}
.dx-widget {
  font-family: 'Avenir', Helvetica, Arial, sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
