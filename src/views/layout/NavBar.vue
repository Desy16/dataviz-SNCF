<template>
  <!--NavBar-->
  <v-app-bar app color="white" flat>
    <v-container class="py-0 fill-height">
      <div>
        <h4 class="title text--disabled text-uppercase">dataviz sncf</h4>
      </div>
      <v-spacer></v-spacer>

      <v-btn v-for="item in items" :key="item.title" :to="item.to" text>
        {{ item.title }}
      </v-btn>
      <v-responsive max-width="260">
        <v-text-field
          dense
          flat
          hide-details
          rounded
          solo-inverted
          v-model="q"
          @input="onSearchValueChange"
          @keydown.enter="onSearchSubmit"
        ></v-text-field>
      </v-responsive>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  name: "NavBar",

  watch: {
    $route() {
      this.q = this.$route.query.q;
      console.log(this.q + " NavBar");
    },
  },

  methods: {
    onSearchValueChange() {},
    onSearchSubmit() {
      this.$router.push({ path: `/search?q=${this.q}` });
    },
  },

  data() {
    return {
      q: "",
      drawer: false,
      items: [
        { title: "Home", to: "/" },
        { title: "Data", to: "/data" },
        { title: "Objects", to: "/objects" },
        { title: "About", to: "/about" },
      ],
    };
  },
};
</script>

<style scoped>
</style>