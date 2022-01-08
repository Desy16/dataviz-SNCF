<template>
  <v-app id="app">
    <NavBar />
    <Main />
  </v-app>
</template>

<script>
import NavBar from "./views/layout/NavBar.vue";
import Main from "./views/layout/Main.vue";

export default {
  name: "app",
  components: {
    NavBar,
    Main,
  },
};
</script>

<style scoped>
</style>
