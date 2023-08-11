class Usuario {
  constructor() {
    /**
    *Mesesdoano.
    */
    this.mos = {
      alias: 'QuadrodeVazões(L/s)',
      values: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
    };
    /**
    *
    *
    *
    */
    this.lat_lng = {
      lat: '',
      lng: ''
    };
    /**
    *Vazãosolicitadapelousuárioobjetodaanálise.
    */
    this.q_solicitacao_secao = {
      alias: 'QSOLICITADA-SEÇÃO',
      values: [22.56, 2.56, 2.56, 2.56, 2.56, 2.56, 2.56, 2.56, 2.56, 2.56, 2.56, 22.56]
    };
    /**
    *
    *
    *
    */
    this.horas_bombeamento = {
      alias: 'TabeladeajustedasHorasdeBombeamento',
      horas_bomb: {
        alias: 'Horasdebombeamento(Requerimento)',
        values: []
      },
      q_ajuste_secao_m_h: {
        alias: 'QAJUSTADA-SEÇÃO(m³/h)',
        values: []
      },
      q_ajuste_secao_m_d: {
        alias: 'QAJUSTADA-SEÇÃO(m³/dia)',
        values: []
      },
      q_ajuste_horas: {
        alias: 'Horasdebombeamento(Ajustada)',
        values: []
      }

    };
    /**
    *
    *
    *
    */
    this.vazao_modulada = {
      alias: 'TabelafinalcomVAZÃOmodulada',
      q_outorgada_l_s: {
        alias: 'Qoutorgada(L/s)',
        values: []
      },
      horas_bomb_h: {
        alias: 'HorasdeBombeamento(h)',
        values: []
      }

    };
    /**
    *
    *
    *
    */
    this.hora_modulada = {
      alias: 'TabelafinalcomVAZÃOmodulada',
      q_outorgada_l_s: {
        alias: 'Qoutorgada(L/s)',
        values: []
      },
      horas_bomb_h: {
        alias: 'HorasdeBombeamento(h)',
        values: []
      }

    };
  }

  /**
  *Capturaralatitudeelongitudedeumpontoclicadooudigitado.
  *@param{number}latLatitudedeumponto.
  *@param{number}lngLongitudedeumponto.
  */
  setLatLng(lat, lng) {
    this.lat_lng = {
      lat: lat,
      lng: lng
    }
  }

}
