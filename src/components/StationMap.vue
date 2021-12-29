<template>
  <div class="map">
    <h2>Center is {{ currentCenter }}, zoom is {{ currentZoom }}</h2>
    <l-map
      :zoom="zoom"
      :center="center"
      ref="map"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
    >
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker
        v-for="station in stations"
        v-bind:key="station.recordid"
        :lat-lng="
          latLng(
            station.fields.latitude_entreeprincipale_wgs84,
            station.fields.longitude_entreeprincipale_wgs84
          )
        "
      >
        <l-icon :icon-size="iconSize" :icon-url="icon"> </l-icon>

        <l-popup
          >{{ station.fields.rg_libelle }} <br />
          {{ station.fields.commune_libellemin }},
          {{ station.fields.adresse_cp }}
          {{ station.fields.departement_libellemin }}
        </l-popup>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LPopup, LIcon } from "vue2-leaflet";
import station from "../assets/img/icons/station.svg";

export default {
  name: "StationMap",
  props: {
    stations: [],
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LIcon,
  },

  data() {
    return {
      zoom: 10,
      center: L.latLng(46.232192999999995, 2.209666999999996),
      currentZoom: 10,
      currentCenter: L.latLng(46.232192999999995, 2.209666999999996),
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: L.latLng(46.232192999999995, 2.209666999999996),
      icon: station,
      iconSize: [20, 20],
    };
  },

  methods: {
    latLng: function (lat, lng) {
      return L.latLng(lat, lng);
    },
    centerUpdate(center) {
      this.center = center;
      console.log("CENTER");
      console.log(this.center);
    },
    zoomUpdate(zoom) {
      this.zoom = zoom;
      console.log("ZOOM");
      console.log(this.zoom);
    },
  },
};
</script>

<style scoped >
.map {
  position: absolute;
  width: 90%;
  height: 90%;
  overflow: hidden;
}

.station-icon {
  width: 40px;
}
</style>