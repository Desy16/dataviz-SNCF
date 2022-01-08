<template>
  <div class="object-container">
    <!-- chart-container = object-container -->
    <div class="object-filters">
      <!-- filters = object-filters -->
      <v-row align="center">
        <v-col sm="3" cols="12" class="d-flex">
          <v-select
            v-model="selectedMonth"
            :items="months"
            label="Mois"
            dense
            solo
          ></v-select>
        </v-col>

        <v-col sm="3" cols="12" class="d-flex">
          <v-select
            v-model="selectedYear"
            :items="years"
            label="Année"
            dense
            solo
          ></v-select>
        </v-col>

        <v-col sm="6" cols="12" class="d-flex">
          <v-autocomplete
            v-model="selectedStationName"
            :items="stationNames"
            label="Station"
            auto-select-first
            clearable
            dense
            solo
          ></v-autocomplete>
        </v-col>
      </v-row>
    </div>

    <div class="object-content">
      <!-- chart-content = object-content -->
      <center v-if="!showChart" class="loader-container">
        <v-progress-circular
          :size="70"
          :width="7"
          color="purple"
          indeterminate
        ></v-progress-circular>
      </center>
      <D3LineChart
        class="chart-self"
        v-else
        :config="chart_config"
        :datum="chart_data"
      ></D3LineChart>
    </div>
  </div>
</template>

<script>
import { getLostObjects } from "../../api";
import { D3LineChart } from "vue-d3-charts";

const NO_STATION_SELECTED = "Gares";

export default {
  components: {
    D3LineChart,
  },

  watch: {
    async selectedMonth() {
      await this.refreshChart();
    },
    async selectedYear() {
      await this.refreshChart();
    },
    async selectedStationName() {
      await this.refreshChart();
    },
  },

  data() {
    return {
      stationNames: [],
      years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022].reverse(),
      months: [
        "Janvier",
        "Février",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Août",
        "Septembre",
        "Octobre",
        "Novembre",
        "Décembre",
      ],
      selectedYear: 2022,
      selectedMonth: "Janvier",
      selectedStationName: NO_STATION_SELECTED,
      showChart: false,
      chart_data: [],
      chart_config: {
        date: { key: "when", inputFormat: "%d-%m-%Y", outputFormat: "%d-%b" },
        values: ["Trouvés", "Restitués"],
        color: { scheme: "schemeCategory10" },
        axis: {
          xTicks: 0,
        },
        curve: "curveCatmullRom",
      },
    };
  },

  methods: {
    monthToInt(monthLabel) {
      const months = {
        Janvier: "01",
        Février: "02",
        Mars: "03",
        Avril: "04",
        Mai: "05",
        Juin: "06",
        Juillet: "07",
        Août: "08",
        Septembre: "09",
        Octobre: "10",
        Novembre: "11",
        Décembre: "12",
      };

      return months[monthLabel];
    },
    async refreshChart() {
      this.showChart = false;

      const lostObjectsDict = await getLostObjects(
        this.selectedYear,
        this.monthToInt(this.selectedMonth)
      );

      this.chart_data = Object.keys(lostObjectsDict.byDate).map((date) => {
        let objectsByDate = lostObjectsDict.byDate[date];
        if (this.selectedStationName) {
          objectsByDate = lostObjectsDict.byDate[date].filter((object) => {
            if (this.selectedStationName === NO_STATION_SELECTED) {
              return true;
            } else {
              return object.stationName.includes(this.selectedStationName);
            }
          });
        }

        return {
          when: date,
          Trouvés: objectsByDate.length,
          Restitués: objectsByDate.filter(
            (objectFound) => objectFound.isReturned
          ).length,
        };
      });
      this.chart_config.axis = {
        xTicks: this.chart_data.length,
      };
      this.stationNames = [NO_STATION_SELECTED].concat(
        Object.keys(lostObjectsDict.byStationName)
      );

      this.showChart = true;
    },
  },

  async mounted() {
    this.refreshChart();
  },
};
</script>

<style scoped>
</style>
