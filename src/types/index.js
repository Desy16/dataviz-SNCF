export class Station {
  constructor(record) {
    this.haveCoords = true
    this.codeUIC = record.uic_code
    this.name = record.rg_libelle
    this.cityName = record.commune_libellemin
    this.deptName = record.departement_libellemin
    this.postalCode = record.adresse_cp
    this.popupContent = `
      <div class="station-popover-content" id="${this.codeUIC}">
        <span class="station-name">${this.name}</span>
        <br/>
        <span class="station-details">${this.cityName}, ${this.postalCode} ${this.deptName}</span>

        <div>
          <a href="#details?id=${this.codeUIC}" class="station-details-btn">Détails</a>
        </div>
      </div>
    `
    this.latlng = record.wgs_84
    this.frequentations = null

    if (!this.latlng) {
      this.haveCoords = false
    }
  }
}

export class ObjectFound {
  constructor(object) {
    this.name = object.gc_obo_nature_c
    this.stationName = object.gc_obo_gare_origine_r_name || "Non défini"
    this.codeUIC = object.gc_obo_gare_origine_r_code_uic_c

    const date = new Date(object.date)
    date.setHours(0, 0, 0, 0)
    date.setMonth(date.getMonth() + 1)

    this.year = date.getFullYear()
    this.month = date.getMonth()
    this.date = `${date.getDate()}-${this.month}-${this.year}`

    this.isReturned = false
    if (object.gc_obo_date_heure_restitution_c != null) {
      this.isReturned = true
    }
  }
}

export class Frequentation {
  constructor(record) {
    this.values = [
      {
        year: 2015,
        'Voyageurs': record.total_voyageurs_2015,
      },
      {
        year: 2016,
        'Voyageurs': record.total_voyageurs_2016,
      },
      {
        year: 2017,
        'Voyageurs': record.totalvoyageurs2017,
      },
      {
        year: 2018,
        'Voyageurs': record.total_voyageurs_2018,
      },
      {
        year: 2019,
        'Voyageurs': record.total_voyageurs_2019,
      },
    ]
  }
}

export class TrainRegularity {
  constructor(fields) {
    const monthLabels = {
      1: "Janvier",
      2: "Février",
      3: "Mars",
      4: "Avril",
      5: "Mai",
      6: "Juin",
      7: "Juillet",
      8: "Août",
      9: "Septembre",
      10: "Octobre",
      11: "Novembre",
      12: "Décembre",
    }

    const yearMonth = fields.date
    const year = yearMonth.split('-')[0]
    const month = yearMonth.split('-')[1]

    const monthLabel = monthLabels[parseInt(month)]
    this.period = `${monthLabel} ${parseInt(year)}`
    this.startStation = fields.gare_depart
    this.stopStation = fields.gare_arrivee
    this.lateTrainsCount = fields.nb_train_depart_retard
    this.canceledTrainsCount = fields.nb_annulation
    this.averageDelayAtDeparture = `${parseInt(fields.retard_moyen_depart)} minute(s)`
    this.averageDelayAtArrival = `${parseInt(fields.retard_moyen_arrivee)} minute(s)`
    this.averageTripDuration = `${parseInt(fields.duree_moyenne)} minute(s)`
  }
}
