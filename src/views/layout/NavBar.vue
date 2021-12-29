<template>
  <!--NavBar-->
  <v-app-bar app color="white" flat>
    <v-container class="py-0 fill-height">
      <div>
        <h4 class="title text--disabled text-uppercase">dataviz sncf</h4>
      </div>
      <v-spacer></v-spacer>

      <v-btn v-for="link in links" :key="link" text>
        {{ link }}
      </v-btn>
      <!--<router-view></router-view>-->
      <v-responsive max-width="260">
        <v-text-field
          dense
          flat
          hide-details
          rounded
          solo-inverted
        ></v-text-field>
      </v-responsive>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  name: "NavBar",
  props: {
    msg: String,
  },
  data: () => ({
    links: ["Home", "Data", "Objects", "About"],
  }),
};
</script>

<style scoped>
</style>