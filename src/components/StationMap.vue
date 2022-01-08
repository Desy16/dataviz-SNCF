<template>
  <div class="station-map">
    <!-- Home = Station-map -->
    <div class="station-details-container">
      <div v-if="selectedStation" class="station-pane">
        <div class="station-pane-header">
          <!-- pane-header = station-pane-header -->
          <h3 class="selectedstation-name">{{ selectedStation.name }}</h3>
          <h5 class="selectedstation-details">
            {{ selectedStation.cityName }}, {{ selectedStation.postalCode }}
            {{ selectedStation.deptName }}
          </h5>
          <router-link class="close-selectedstation-pane" to="/"
            >Fermer</router-link
          >
        </div>

        <div class="station-pane-body">
          <!-- pane-body = station-pane-body -->
          <div class="station-pane-section">
            <h3 class="station-pane-section-header">
              Fréquentation de voyageurs
            </h3>
            <D3BarChart
              v-if="showSelectedStationFrequentations"
              :datum="selectedStation.frequentations"
              :config="chartConfig"
            ></D3BarChart>
          </div>
        </div>
      </div>
    </div>
    <div class="map-container">
      <l-map
        :zoom="zoom"
        :center="center"
        @update:center="centerUpdate"
        @update:zoom="zoomUpdate"
        style="height: 100%; width: 100%"
      >
        <l-tile-layer :url="url"></l-tile-layer>
        <l-marker
          v-for="station in stations"
          v-bind:key="station.codeUIC"
          :lat-lng="station.latlng"
        >
          <l-icon
            :icon-size="iconSize"
            :icon-anchor="iconAnchor"
            :icon-url="
              selectedStation && selectedStation.codeUIC === station.codeUIC
                ? selectedIconImageUrl
                : defaultIconImageUrl
            "
          >
          </l-icon>

          <l-popup :content="station.popupContent" />
        </l-marker>
      </l-map>
    </div>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LPopup, LIcon } from "vue2-leaflet";
import { D3BarChart } from "vue-d3-charts";
import { getStations, getStationFrequentations } from "../api";

export default {
  name: "StationMap",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LIcon,
    D3BarChart,
  },
  data() {
    return {
      stations: [],
      zoom: 6,
      center: [48.872829842, 2.321332048],
      url: "https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=5b285e662af64d908cee544c39f11e9d",
      iconSize: [32, 37],
      iconAnchor: [16, 37],
      defaultIconImageUrl: "https://static.thenounproject.com/png/8262-200.png",
      selectedIconImageUrl:
        "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-500.png",
      chartConfig: {
        key: "year",
        values: ["Voyageurs"],
        transition: { duration: 600, ease: "easeCubic" },
      },
      selectedStation: null,
      showSelectedStationFrequentations: false,
    };
  },
  watch: {
    $route() {
      console.log("body");
      this.refreshStationDetails();
    },
  },
  async mounted() {
    this.stations = await getStations(20);
    console.log("bood");
    await this.refreshStationDetails();
  },
  methods: {
    async refreshStationDetails() {
      const route = this.$route;
      this.showSelectedStationFrequentations = false;

      const body = document.documentElement.querySelector("body");

      if (route.hash.toString().includes("#details?id=")) {
        const stationUICCode = route.hash.split("?id=")[1];

        this.selectedStation = this.stations.filter(
          (station) => station.codeUIC === stationUICCode
        )[0];

        body.classList.add("open-station-details");

        const frequentation = await getStationFrequentations(
          this.selectedStation.codeUIC
        );
        this.selectedStation.frequentations = frequentation.values;

        setTimeout(() => {
          this.showSelectedStationFrequentations = true;
          this.$forceUpdate();
        }, 500);
      } else {
        body.classList.remove("open-station-details");
        this.selectedStation = null;
      }
    },
    centerUpdate(center) {
      this.center = center;
    },
    zoomUpdate(zoom) {
      this.zoom = zoom;
    },
  },
};
</script>

<style lang="css" >
/*.station-map {
  width: 100%;
  overflow-x: hidden;
  display: flex;
  flex-direction: row;
}*/

.station-name {
  font-weight: bold;
  font-size: 16px;
  color: black;
  font-family: serif;
}

.station-details {
  font-weight: 100;
  font-size: 14px;
  color: black;
  font-family: serif;
}

.station-details-btn,
.station-details-btn:hover,
.station-details-btn:active,
.station-details-btn:focus {
  text-decoration: none;
  color: black;
}

.station-details-btn {
  display: inline-block;
  padding: 5px 10px;
  border-radius: 6px;
  font-weight: bold;
  margin-top: 15px;
  border: 1px solid #91d3f6;
  color: #fff;
}

.open-station-details .station-details-container {
  width: 450px;
  opacity: 1;
  visibility: visible;
  transition: all 0.2s cubic-bezier(0.165, 0.84, 0.44, 1) 0.1s;
}

.station-details-container {
  width: 0px;
  opacity: 0;
  visibility: hidden;
  overflow-x: hidden;
  overflow-y: scroll;
  background-color: white;
  box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.45) inset;
  z-index: 999;
  transition: all 0.15s cubic-bezier(0.165, 0.84, 0.44, 1) 0s;
}

.station-pane-header {
  position: relative;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 10px;
}

.selectedstation-name {
  font-size: 24px;
  font-weight: bolder;
  line-height: 24px;
}

.selectedstation-details {
  font-size: 16px;
  font-weight: 400;
}

.pane {
  padding: 20px;
}

.close-selectedstation-pane {
  position: absolute;
  right: 0;
  top: 0;
  color: #000;
  text-decoration: none;
  font-weight: bold;
}

.station-pane-body {
  padding-top: 100px;
}

.station-pane-section {
  margin-bottom: 50px;
}

.station-pane-section-header {
  font-size: 18px;
}

.map-container {
  height: 100vh;
}

.station-icon {
  width: 40px;
}
</style>