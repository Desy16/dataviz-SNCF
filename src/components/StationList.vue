<template>
  <v-list color="transparent">
    <v-list-item v-for="station in stations" :key="station.recordid">
      <v-list-item-content>
        <v-list-item-title>
          Item {{ station.fields.rg_libelle }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: "StationList",
  props: {
    stations: [],
  },
};
</script>

<style scoped>
</style>