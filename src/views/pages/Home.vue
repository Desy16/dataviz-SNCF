 <template>
  <!--Main-->
  <v-main class="grey lighten-3" style="padding: 0; margin: 0">
    <v-container style="max-width: unset">
      <v-row>
        <!--Station-->
        <Station />

        <!--Search
        <Search />-->
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import Station from "../../components/Station.vue";
//import Search from "./Search.vue";

export default {
  name: "Home",
  components: { Station },
};
</script>

<style scoped>
</style>
