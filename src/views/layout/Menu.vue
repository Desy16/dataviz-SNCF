<template>
  <v-app id="inspire">
    <v-app-bar app color="white" flat>
      <v-container class="py-0 fill-height">
        <div>
          <h4 class="title text--disabled text-uppercase">dataviz sncf</h4>
          <p>{{ msg }}</p>
        </div>
        <v-spacer></v-spacer>

        <v-btn v-for="link in links" :key="link" text>
          {{ link }}
        </v-btn>

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

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <!--<v-col cols="2">
            <v-sheet rounded="lg">
              <v-list color="transparent">
                <v-list-item
                  v-for="n in 5"
                  :key="n"
                  link
                >
                
                  <v-list-item-content>
                    <v-list-item-title>
                      List Item {{ n }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <v-list-item
                  link
                  color="grey lighten-4"
                >
                  <v-list-item-content>
                    <v-list-item-title>
                      Refresh
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-col>-->

          <router-view></router-view>

          <v-col>
            <v-sheet min-height="70vh" rounded="lg">
              <!--  
              <v-list dense nav>
                <v-list-item v-for="station in stations" :key="station" text>
                  <v-list-item-content>
                    <v-list-item-title> {{ station }}</v-list-item-title>
                    {{ stationsData.records[0].fields.rg_libelle }} = Libelle gare
                    v-for="stationDataRecord in stationsData.records"
                    v-bind:key="stationDataRecord.strecordId"
                    {{ stationDataRecord.fields.rg_libelle }}
                  </v-list-item-content>
                </v-list-item>
              </v-list>
              -->
              <div>
                <!--{{ stationsData.records[0].fields.rg_libelle }},
                {{ stationsData.records[0].fields.departement_libellemin }},
                {{ stationsData.records[0].fields.adresse_cp }}
                {{ stationsData.records[0].fields.commune_libellemin }}-->

                <!--<div v-for="(stat, id) in station" v-bind:key="id">

                  records.fields.rg_libelle
                  records.fields.commune_libellemin
                  records.fields.adresse_cp
                  records.fields.departement_libellemin

                  {{ stat }}
                </div>-->
              </div>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "Menu",
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