<template>
  <v-row>
    <!--StationList
    <v-col cols="4">
      <v-sheet rounded="lg">
        <StationList :stations="stations" />
      </v-sheet>
    </v-col>-->

    <!--StationList-->
    <v-col cols="8">
      <v-sheet rounded="lg">
        <StationMap :stations="stations" />
      </v-sheet>
    </v-col>

    <!--<div>
      <StationMap :stations="stations" />
    </div>-->
  </v-row>
</template>

<script>
import axios from "axios";
import StationList from "./StationList.vue";
import StationMap from "./StationMap.vue";

const res_url =
  "https://data.sncf.com/api/records/1.0/search/?dataset=referentiel-gares-voyageurs&rows=100";

export default {
  name: "Station",
  components: { StationList, StationMap },
  data: () => ({
    stations: [],
  }),

  mounted: function () {
    axios.get(res_url).then((response) => {
      this.stations = response.data.records;
      console.log(this.stations);
    });
  },
};
</script>

<style scoped>
</style>