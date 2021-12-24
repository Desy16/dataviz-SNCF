<template>
  <div id="app">
    <Menu />
    <Home />
    <Data />
    <Objects />
    <About />
  </div>
</template>

<script>
//https://data.sncf.com/api/datasets/1.0/search/?q=
//https://data.sncf.com/api/records/1.0/search/?dataset=referentiel-gares-voyageurs

//import axios from "axios";
import Menu from "./views/layout/Menu.vue";
import Home from "./views/pages/Home.vue";
import Data from "./views/pages/Data.vue";
import Objects from "./views/pages/Objects.vue";
import About from "./views/pages/About.vue";

export default {
  name: "app",
  components: {
    Menu,
    Home,
    Data,
    Objects,
    About,
  },
  //data: () => ({
  //links: ["Home", "Data", "Objects", "About"],
  // stationsData: [{}],
  // }),

  //mounted: function () {
  //axios
  //.get(
  //"https://data.sncf.com/api/records/1.0/search/?dataset=referentiel-gares-voyageurs"
  //)
  //.then((response) => {
  // this.stationsData = response.data;
  //});
  //},
};
</script>
