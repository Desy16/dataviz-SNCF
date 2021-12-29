<template>
  <v-app id="app">
    <!--NavBar-->
    <NavBar />

    <!--Main-->
    <Main />

    <!--Home
    <Home />-->

    <!--Data
    <Data />-->

    <!--Objects
    <Objects />-->

    <!--About
    <About />-->
  </v-app>
</template>

<script>
import NavBar from "./views/layout/NavBar.vue";
import Main from "./views/layout/Main.vue";
import Home from "./views/pages/Home.vue";
import Data from "./views/pages/Data.vue";
import Objects from "./views/pages/Objects.vue";
import About from "./views/pages/About.vue";

export default {
  name: "app",
  components: {
    NavBar,
    Main,
    Home,
    Data,
    Objects,
    About,
  },
};
</script>

<style scoped>
</style>
