<template>
  <v-row>
    <!--StationMap-->
    <v-col cols="12" style="padding: 0">
      <v-sheet rounded="lg">
        <StationMap />
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import StationMap from "./StationMap.vue";

export default {
  name: "Station",
  components: { StationMap },
  data() {
    return {
      stations: [],
    };
  },

  methods: {},
};
</script>

<style scoped>
</style>