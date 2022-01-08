<template>
  <div class="search-container">
    <p class="search-description">
      Trains annulés/en retard au départ ou à destination de:
      <em
        ><strong>{{ q }}</strong></em
      >
    </p>

    <div class="search-results-container">
      <v-data-table
        v-if="showDatatable"
        :headers="headers"
        :items="trainRegularities"
        :items-per-page="5"
        class="elevation-2"
        no-data-text="Pas de resultat avec ce terme de recherche"
      ></v-data-table>
      <center v-else class="loader-container">
        <v-progress-circular
          color="white"
          :size="70"
          :width="7"
          indeterminate
        ></v-progress-circular>
      </center>
    </div>
  </div>
</template>

<script>
import { getTrainRegularityByStation } from "../../api";

export default {
  components: {
    name: "Search",
  },
  data() {
    return {
      showDatatable: false,
      q: "",
      headers: [
        {
          text: "Gare de départ",
          align: "start",
          sortable: false,
          value: "startStation",
        },

        {
          text: "Gare d'arrivée",
          align: "start",
          sortable: false,
          value: "stopStation",
        },
        {
          text: "Période",
          align: "start",
          sortable: false,
          value: "period",
        },
        {
          text: "Nombre de trains annulés",
          align: "end",
          sortable: false,
          value: "canceledTrainsCount",
        },
        {
          text: "Nombre de trains en retard",
          align: "end",
          sortable: false,
          value: "lateTrainsCount",
        },
        {
          text: "Retard moyen au depart",
          align: "end",
          sortable: false,
          value: "averageDelayAtDeparture",
        },
        {
          text: "Retard moyen à l'arrivée",
          align: "end",
          sortable: false,
          value: "averageDelayAtArrival",
        },
        {
          text: "Durée moyenne du trajet",
          align: "end",
          sortable: false,
          value: "averageTripDuration",
        },
      ],
      trainRegularities: [],
    };
  },

  watch: {
    $route() {
      this.q = this.$route.query.q;
      console.log(this.q + " route");
      this.refreshSearchResults();
    },
  },

  methods: {
    async refreshSearchResults() {
      this.showDatatable = false;
      this.trainRegularities = await getTrainRegularityByStation(this.q);
      this.showDatatable = true;
    },
  },

  async mounted() {
    this.q = this.$route.query.q;
    console.log(this.q + " mounted");
    this.refreshSearchResults();
  },
};
</script>

<style scoped>
.search-description {
  color: #000;
}

.search-container {
  padding: 100px 25px;
}

.loader-container {
  padding: 175px 0;
}
</style>