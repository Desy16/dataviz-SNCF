<template>
  <!--Main-->
  <v-main class="grey lighten-3">
    <v-container>
      <v-row>
        <!--Station-->
        <Station />
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import Station from "../../components/Station.vue";

export default {
  name: "Main",
  components: { Station },
};
</script>

<style scoped>
</style>