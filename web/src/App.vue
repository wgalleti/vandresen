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

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
