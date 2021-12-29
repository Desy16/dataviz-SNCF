<template>
  <div class="map">
    <l-map
      :zoom="zoom"
      :center="center"
      ref="map"
      @update:center="centerUpdated"
      @update:zoom="zoomUpdated"
    >
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker :lat-lng="markers[0].coords"></l-marker>
      <l-marker :lat-lng="markers[1].coords"></l-marker>
      <l-marker :lat-lng="markers[2].coords"></l-marker>
    </l-map>
  </div>
</template>

<script>
import {
  LMap,
  LTileLayer,
  LMarker,
  LIcon,
  LPopup,
  LControlLayers,
} from "vue2-leaflet";

export default {
  name: "StationMap",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon,
    LPopup,
    LControlLayers,
  },

  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      center: [49.18385033631969, -0.3694965685656017],
      zoom: 12,
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      markers: [
        {
          id: 1,
          coords: [49.201126689560205, -0.40760539219653635],
          imageUrl: "station.svg",
          adress: "12 avenue de la grande cavée 14000 caen",
        },
        {
          id: 2,
          coords: [49.20740750409239, -0.3729297939872819],
          imageUrl: "station.svg",
          adress: "22 avenue de la grande cavée 14000 caen",
        },
        {
          id: 3,
          coords: [49.191928343508216, -0.33070109753138127],
          imageUrl: "station.svg",
          adress: "24 avenue de la grande cavée 14000 caen",
        },
        {
          id: 4,
          coords: [49.17173085290733, -0.3698398893685574],
          imageUrl: "station.svg",
          adress: "28 avenue de la grande cavée 14000 caen",
        },
      ],
    };
  },

  methods: {
    centerUpdated(center) {
      this.center = center;
      console.log("CENTER");
      console.log(this.center);
    },
    zoomUpdated(zoom) {
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