/**
* Análise de dados
*/
class Analises {

  constructor() {
    /**
    * Latitude e longitude de um ponto.
    */
    this.ll = {
      alias: ['Latitude', 'Longitude'],
      values: { lat: '', lng: '' },
      marker: null
    }
    /**
    * Meses do ano.
    */
    this.mos = {
      alias: 'Quadro de Vazões (L/s)',
      values: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
      elements: []
    },
      /**
      * Vazão solicitada pelo usuário objeto da análise.
      */
      this.q_solicitada = {
        columm: 'd18',
        alias: 'QSOLICITADA-SEÇÃO',
        values: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        elements: []
      },
      /**
      *	Análise da sessão de captação à montante.
      */
      this.secao = {
        alias: 'Análise na Seção de Captação',
        meses: {
          alias: 'Quadro de Vazões (L/s)',
          values: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
        },
        area_contribuicao: {
          alias: "Área de contribuição",
          value: 0,
          rings: [],
          elements: []
        },
        /** 
        * Pontos outorgados (marcadores) à montante.
        */
        outorgas: [],

        /**
        * Vazões outorgadas à montante.
        */

        q_outorgada: {
          alias: 'SQOUTORGADA-MONT.-SEÇÃO',
          values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          elements: []
        },
        /**
        * Vazão de referência (regionalizada)
        *
        */
        q_referencia: {
          alias: 'QREFERÊNCIA-SEÇÃO (Regionalizada)',
          values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          elements: []
        },
        /**
        * Vazão outorgável, 80% da vazão de referência
        */
        q_outorgavel: {
          alias: 'QOUTORGÁVEL-SEÇÃO (80% QREFERÊNCIA-SEÇÃO)',
          values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          elements: []
        },

        /**
        * Vazão individual, 20% da outorgável na seção (v_80)
        */
        q_individual: {
          alias: 'QOUTORGÁVEL-INDIVIDUAL-SEÇÃO (20% QOUTORGÁVEL-SEÇÃO)',
          decimais: [
            {
              alias: "QOUTORGÁVEL-INDIVIDUAL-SEÇÃO (20% QOUTORGÁVEL-SEÇÃO)",
              decimal: 0.20
            },
            {
              alias: "QOUTORGÁVEL-INDIVIDUAL-SEÇÃO (70% QOUTORGÁVEL-SEÇÃO)",
              decimal: 0.70
            },
            {
              alias: "QOUTORGÁVEL-INDIVIDUAL-SEÇÃO (80% QOUTORGÁVEL-SEÇÃO)",
              decimal: 0.80
            },
            {
              alias: "QOUTORGÁVEL-INDIVIDUAL-SEÇÃO (90% QOUTORGÁVEL-SEÇÃO)",
              decimal: 0.90
            },

          ],
          values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          elements: [],
        },
        /**
        * Vazão disponível na seção.
        */
        q_disponivel: {
          alias: 'QDISPONÍVEL-SEÇÃO',
          values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], elements: []
        },
        q_sol_q_dis: {
          alias: 'QSOLICITADA-SEÇÃO ≤ QDISPONÍVEL-SEÇÃO',
          values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          elements: []
        },
        q_sol_q_ind: {
          alias: 'QSOLICITADA-SEÇÃO ≤ QOUTORGÁVEL-INDIVIDUAL-SEÇÃO',
          values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          elements: []
        }

      }
    /**
    * Análise da Unidade Hidrográfica.
    */
    this.uh = {
      alias: 'Análise na Unidade Hidrográfica',
      meses: {
        alias: 'Quadro de Vazões (L/s)',
        values: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
      },
      /** 
      * Atributos da UH ao qual pertence o ponto clicado ou digitado.
      */
      attributes: { uh_codigo: '', uh_nome: '' },
      /**
      * Polígono da UH ao qual pertence o ponto.
      */
      rings: [],
      outorgas: [],
      q_outorgada: {
        alias: 'SQOUTORGADA-UH', values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        elements: []
      },
      q_referencia: {
        alias: 'QREFERÊNCIA-UH', values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        elements: []
      },
      q_remanescente: {
        alias: 'QREMANESCENTE-UH (20% QREFERÊNCIA-UH)', values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        elements: []
      },
      q_outorgavel: {
        alias: 'QOUTORGÁVEL-UH (80% QREFERÊNCIA-SEÇÃO)', values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        elements: []
      },
      q_disponivel: {
        alias: 'QDISPONÍVEL-UH',
        values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        elements: []
      },
      q_sol_q_dis: {
        alias: 'QSOLICITADA-SEÇÃO ≤ QDISPONÍVEL-UH',
        values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        elements: []
      },
      q_disponibilidade: {
        alias: 'Há disponibilidade hídrica para o usuário?',
        values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        elements: []
      },
      q_demanda_ajustada: {
        columm: 'd33',
        alias: 'Demanda ajustada...',
        values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        elements: []
      }

    }

    /**
    *
    *
    *
    */
    //.h_ajuste_bombeamento
    this.h_ajuste = {
      alias: 'Tabela de ajuste das Horas de Bombeamento',
      values: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
      h_bomb_requerida: {
        columm: 'd46',
        alias: 'Horas de bombeamento (Requerimento)',
        values: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        elements: []
      },
      q_secao_m_h: {
        columm: 'd47',
        alias: 'QAJUSTADA-SEÇÃO(m³/h)',
        values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        elements: []

      },
      q_secao_m_d: {
        columm: 'd48',
        alias: 'QAJUSTADA-SEÇÃO(m³/dia)',
        values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        elements: []
      },
      h_bomb_ajustada: {
        columm: 'd49',
        alias: 'Horas de bombeamento (Ajustada)',
        values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        elements: []
      }
    };
    /**
    *
    *
    *
    */
    this.q_modula = {
      alias: 'Tabela final com VAZÃO modulada',
      values: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
      q_outorgada: {
        columm: 'd56',
        alias: 'Q outorgada (L/s)',
        values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        elements: []
      },
      h_bombeamento: {
        columm: 'd57',
        alias: 'Horas de Bombeamento (h)',
        values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        elements: []
      }
    };
    /**
    *
    *
    *
    */
    this.h_modula = {
      alias: 'Tabela final com HORA modulada',
      values: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
      q_outorgada: {
        columm: 'd61',
        alias: 'Q outorgada (L/s)',
        values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        elements: []
      },
      h_bombeamento: {
        columm: 'd62',
        alias: 'Horas de Bombeamento (h)',
        values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        elements: []
      }
    }
  }
  /**
  * Ajusta as horas de bombeamento.
  *
  *
  */

  ajustarSecaoMH() {
    this.h_ajuste.q_secao_m_h.values =
      this.uh.q_demanda_ajustada.values.map((_dem) => {
        return (Number(_dem) * 3.6).toFixed(2);
      });

    // view //////////////////////////////////////////
    this.h_ajuste.q_secao_m_h.values.forEach((v, i) => {
      this.h_ajuste.q_secao_m_h.elements[i].innerHTML = v
    });
  }
  /**
  * Ajusta a vazão na seção (montante).
  *
  *
  */
  ajustarQSecaoMD() {
    this.h_ajuste.q_secao_m_d.values =
      this.h_ajuste.q_secao_m_h.values.map((q_mh, i) => {
        return (Number(q_mh) * Number(this.h_ajuste.h_bomb_requerida.values[i])).toFixed(2);
      });
    // view //////////////////////////////////////////
    this.h_ajuste.q_secao_m_d.values.forEach((v, i) => {
      this.h_ajuste.q_secao_m_d.elements[i].innerHTML = v
    });

  }
  /**
  * Ajusta as horas de bombeamento.
  *
  *
  */
  ajustarHoraBombAjustada() {
    this.h_ajuste.h_bomb_ajustada.values =
      this.h_ajuste.q_secao_m_d.values.map((q_md, i) => {
        // arredondar para cima => resultado + 0.5 e round(resultado)
        let h_bom_aju = (Number(q_md) / (Number(this.q_solicitada.values[i]) * 3.8)) + 0.5
        return Math.round(h_bom_aju);
      });

    // view //////////////////////////////////////////
    this.h_ajuste.h_bomb_ajustada.values.forEach((v, i) => {
      this.h_ajuste.h_bomb_ajustada.elements[i].innerHTML = v
    });
  }

  modularVazaoQ() {
    // excel => =D33 => =demanda_ajustada
    this.q_modula.q_outorgada.values = this.uh.q_demanda_ajustada.values;

    // view //////////////////////////////////////////
    this.q_modula.q_outorgada.values.forEach((v, i) => {
      this.q_modula.q_outorgada.elements[i].innerHTML = v
    });

  }

  modularVazaoH() {
    //excel => =SE(D56=0;0;D46) 
    this.q_modula.h_bombeamento.values = this.q_modula.q_outorgada.values.map((_q, i) => {

      return Number(_q) === 0 ? 0 : Number(this.h_ajuste.h_bomb_requerida.values[i]);
    });

    // view //////////////////////////////////////////
    this.q_modula.h_bombeamento.values.forEach((v, i) => {
      this.q_modula.h_bombeamento.elements[i].innerHTML = v
    });
  }

  modularHoraQ() {
    //excel => =SE(D46=0;" ";SE(D33>0;D18;0))
    this.h_modula.q_outorgada.values = this.h_ajuste.h_bomb_requerida.values.map((hb_r, i) => {
      return Number(hb_r) === 0 ? 0 : Number(this.uh.q_demanda_ajustada.values[i]) > 0 ? Number(this.q_solicitada.values[i]) : 0;
    });
    // view //////////////////////////////////////////
    this.h_modula.q_outorgada.values.forEach((v, i) => {
      this.h_modula.q_outorgada.elements[i].innerHTML = v
    });
  }

  modularHoraH() {
    // excel => =D49 => ah_ajuste.h_bomb_ajustada
    this.h_modula.h_bombeamento.values = this.h_ajuste.h_bomb_ajustada.values;
    // view //////////////////////////////////////////
    this.h_modula.h_bombeamento.values.forEach((v, i) => {
      this.h_modula.h_bombeamento.elements[i].innerHTML = v
    });

  }
  /**
  * Capturar a latitude e longitude de um ponto clicado ou digitado.
  * @param {number} lat Latitude de um ponto.
  * @param {number} lng Longitude de um ponto.
  */
  setLatLng(lat, lng) {
    this.ll.values = { lat: lat, lng: lng }
    //this.ll.marker.setMap(null)
  }
  /**
  *  Soma as vazões outorgadas à montante.
  *  @param outorgas {object[]} Pontos outorgados nos polígonso à montante.
  */
  calcularQOutorgadaSecao(outorgas) {
    // vazões outorgadas
    let _Q = {
      "q_seg_jan": 0,
      "q_seg_fev": 0,
      "q_seg_mar": 0,
      "q_seg_abr": 0,
      "q_seg_mai": 0,
      "q_seg_jun": 0,
      "q_seg_jul": 0,
      "q_seg_ago": 0,
      "q_seg_set": 0,
      "q_seg_out": 0,
      "q_seg_nov": 0,
      "q_seg_dez": 0
    };
    // somar as vazões de cada ponto, mês a mês
    outorgas.forEach((outorga) => {
      // somar a vazão de cada ponto, mês a mês
      for (let p_out in outorga.attributes) {
        for (let p_Q in _Q) {
          if (p_out === p_Q) {
            let _q = Number(_Q[p_Q]) + Number(outorga.attributes[p_out])
            _Q[p_Q] = _q.toFixed(2)
          }
        }
      }
    })
    let values = Object.values(_Q)
    this.secao.q_outorgada.values = values;
    // view //////////////////////////////////////////
    this.secao.q_outorgada.values.forEach((v, i) => {
      this.secao.q_outorgada.elements[i].innerHTML = v
    });
  }
  /**
  * Calcula as vazões de referência (regionalizada)
  * @param uh {object} Unidade Hidrográfica
  * @param {number} area_mon Área de drenagem em Km² à montante de um ponto
  */
  calcularQReferenciaSecao(uh, area_contribuicao) {
    let q_referencia_secao = []
    this.mos.values.forEach(m => {
      let qmm = 'Qmm_' + m;
      q_referencia_secao.push((Number(uh[qmm]) / Number(uh.Area_Km_sq) * Number(area_contribuicao)).toFixed(2))
    })
    this.secao.q_referencia.values = q_referencia_secao;
    // view //////////////////////////////////////////
    this.secao.q_referencia.values.forEach((v, i) => {
      this.secao.q_referencia.elements[i].innerHTML = v
    });
  }
  /**
  * Calcula a vazão outorgável, 80% da vazão de referência (regionalizada) com formatação de duas casas decimais.
  * @param vr {number[]} Vazão de referência
  */
  calcularQOutorgavelSecao(q_referencia_secao) {
    let q_outorgavel_secao = q_referencia_secao.values.map(_vr => { return (Number(_vr) * 0.8).toFixed(2) });
    this.secao.q_outorgavel.values = q_outorgavel_secao;
    // view //////////////////////////////////////////
    this.secao.q_outorgavel.values.forEach((v, i) => {
      this.secao.q_outorgavel.elements[i].innerHTML = v
    });
  }
  /**
  * Calcula a vazão outorgável individual (20% da vazão outorgável) com formatação de duas casas decimais
  * @param {Number} percent Percentual de modificação (20%, 70% ou 80%), sendo que o cálculo principal é 20% (0.2)
  * @param v_80 {number[]} Vazão outorgável, 80% da vazão de referência.
  */
  calcularQIndividualSecao(q_outorgavel_secao, decimal) {
    let q_individual_secao = q_outorgavel_secao.values.map(_v_80 => { return (Number(_v_80) * decimal).toFixed(2) });
    this.secao.q_individual.values = q_individual_secao;

    // view //////////////////////////////////////////
    this.secao.q_individual.values.forEach((v, i) => {
      this.secao.q_individual.elements[i].innerHTML = v
    });
  }
  /**
  * Calcula a vazão disponível
  * @param v_80 {object} Vazão outorgada.
  * @param vo {object} Vazão outorgada à montante.
  */
  calcularQDisponivelSecao(v_80, vo) {
    let _vd = v_80.values.map((_v_80, i) => { return (Number(_v_80) - Number(vo.values[i])).toFixed(2) })
    this.secao.q_disponivel.values = _vd;

    // view //////////////////////////////////////////
    this.secao.q_disponivel.values.forEach((v, i) => {
      this.secao.q_disponivel.elements[i].innerHTML = v
    });
  }
  /***
  * Calcula se a vazão solicitada (vs) é maior que a vazão disponível (vd)
  *
  */
  calcularQSolicitadaMenorQDisponivel(q_solicitada, q_disponivel_secao) {

    let q_sol_q_dis = q_solicitada.values.map((_qs, i) => {
      return (Number(_qs) <= Number(q_disponivel_secao.values[i]))
    });
    this.secao.q_sol_q_dis.values = q_sol_q_dis;
    // view //////////////////////////////////////////
    this.secao.q_sol_q_dis.values.forEach((v, i) => {
      let _v = v ? {
        color: 'bg-green-500',
        value: 'SIM'
      } : {
        color: 'bg-red-500',
        value: 'NÃO'
      }

      this.secao.q_sol_q_dis.elements[i].className = 'sticky top-0 px-2 ' + _v.color
      this.secao.q_sol_q_dis.elements[i].innerHTML = _v.value

    });
  }
  /**
  * Calcula se a vazão solicitada (vs) é maior que a vazão individual (v_20)
  */
  calcularQSolicitadaMenorQIndividual(q_solicitada, q_individual_secao) {
    let q_sol_q_ind = q_solicitada.values.map((_qs, i) => {
      return Number(_qs) <= Number(q_individual_secao.values[i])
    })
    this.secao.q_sol_q_ind.values = q_sol_q_ind;

    // view //////////////////////////////////////////
    this.secao.q_sol_q_ind.values.forEach((v, i) => {
      let _v = v ? {
        color: 'bg-green-500',
        value: 'SIM'
      } : {
        color: 'bg-red-500',
        value: 'NÃO'
      }

      this.secao.q_sol_q_ind.elements[i].className = 'sticky top-0 px-2 ' + _v.color
      this.secao.q_sol_q_ind.elements[i].innerHTML = _v.value

    });
  }
  /**
  * Capturar informações da Unidade Hidrográfica.
  * @param attirbutes {object} Atributos com área e vazões mensais da UH.
  * @param rings {object[]}
  */

  setUHInfo(attributes, rings) {
    this.uh.attributes = attributes;
    this.uh.rings = rings;
  }
  /**
  * Somar as áreas de cada polígono das áreas de drenagem
  *
  *
  */
  calcularAreaContribuicao(features) {
    let area_contribuicao = features.reduce(function(accumulator, curValue) {
      return accumulator + curValue.attributes.nuareacont
    }, 0);
    // limitar quatro números depois do zero
    this.secao.area_contribuicao.value = area_contribuicao.toFixed(4);

    // VIEW //
    document.getElementById('ac_id').innerHTML = this.secao.area_contribuicao.value + ' Km²';
    document.getElementById('uh_codigo_id').innerHTML = this.uh.attributes.uh_codigo;
    document.getElementById('uh_nome_id').innerHTML = this.uh.attributes.uh_nome;

  }

  /**
  * Calcular vazão outorgada na Unidade Hidrográfica - UH.
  * @param {Object} outorgas Pontos outorgados na UH.
  *
  */
  calcularSQOutorgadaUH(outorgas) {

    // vazões outorgadas
    let _Q = {
      "q_seg_jan": 0,
      "q_seg_fev": 0,
      "q_seg_mar": 0,
      "q_seg_abr": 0,
      "q_seg_mai": 0,
      "q_seg_jun": 0,
      "q_seg_jul": 0,
      "q_seg_ago": 0,
      "q_seg_set": 0,
      "q_seg_out": 0,
      "q_seg_nov": 0,
      "q_seg_dez": 0
    };
    // somar as vazões de cada ponto, mês a mês
    outorgas.forEach((outorga) => {
      // somar a vazão de cada ponto, mês a mês
      for (let p_out in outorga.attributes) {
        for (let p_Q in _Q) {
          if (p_out === p_Q) {
            let _q = Number(_Q[p_Q]) + Number(outorga.attributes[p_out])
            _Q[p_Q] = _q.toFixed(2)
          }
        }
      }
    })
    let values = Object.values(_Q)
    this.uh.q_outorgada.values = values;

    // view //////////////////////////////////////////
    this.uh.q_outorgada.values.forEach((v, i) => {
      this.uh.q_outorgada.elements[i].innerHTML = v
    });

  }

  /**
  * Calcula as vazões de referência da Unidade Hidrográfica - UH.
  * @param {uh} Unidade Hidrográfica.
  *
  */
  calcularQReferenciaUH(uh) {
    let _vr = []
    this.mos.values.forEach(m => {
      let qmm = 'Qmm_' + m;
      _vr.push((Number(uh[qmm])))
    })
    this.uh.q_referencia.values = _vr

    // view //////////////////////////////////////////
    this.uh.q_referencia.values.forEach((v, i) => {
      this.uh.q_referencia.elements[i].innerHTML = v
    });
  }

  /**
  * Calcula o valore remanescente na Unidade Hidrográfica - UH.
  * @param {Objetct} q_referencia Vazões de referência da UH.
  *
  */
  calcularQRemanescenteUH(q_referencia) {
    let _q_20 = q_referencia.values.map(_q_ref => { return (Number(_q_ref) * 0.2).toFixed(2) });
    this.uh.q_remanescente.values = _q_20;

    // view //////////////////////////////////////////
    this.uh.q_remanescente.values.forEach((v, i) => {
      this.uh.q_remanescente.elements[i].innerHTML = v
    });
  }

  /**
  * Calcula vazão outorgável na Unidade Hidrográfica - UH.
  * @param {Object} q_referencia Vazão de referência da UH.
  *
  */
  calcularQOutorgavelUH(q_referencia) {
    let _q_80 = q_referencia.values.map(_q_ref => { return (Number(_q_ref) * 0.8).toFixed(2) });
    this.uh.q_outorgavel.values = _q_80;

    // view //////////////////////////////////////////
    this.uh.q_outorgavel.values.forEach((v, i) => {
      this.uh.q_outorgavel.elements[i].innerHTML = v
    });

  }


  /**
  * Calcula vazão disponível na Unidade Hidrográfica - UH.
  * @param {Object} q_outorgavel_80 80% da vazão de referência da UH. 
  * @param {Object} q_outorgada Soma das vazões outorgadas na UH.
  */
  calcularQDisponivelUH(q_outorgavel_80, q_outorgada) {
    let _q_disponivel = q_outorgavel_80.values.map((_q_80, i) => {
      return (Number(_q_80) - Number(q_outorgada.values[i])).toFixed(2)
    })
    this.uh.q_disponivel.values = _q_disponivel;
    // view //////////////////////////////////////////
    this.uh.q_disponivel.values.forEach((v, i) => {
      this.uh.q_disponivel.elements[i].innerHTML = v
    });

  }
  /**
  * Calcula se a vazão solicitada é menor ou igual à vazão disponível na Unidade Hidrográfica - UH.
  * @param {Object} q_solicitada Vazão solicitada pelo usuário mês a mês.
  * @param {Object} q_disponivel_uh Vazão disponível na UH.
  */
  calcularSolicitataMenorDisponivel(q_solicitada, uh_q_disponivel) {
    let q_sol_dis = q_solicitada.values.map((_qs, i) => {
      return Number(_qs) <= Number(uh_q_disponivel.values[i])
    })
    this.uh.q_sol_q_dis.values = q_sol_dis;

    // view //////////////////////////////////////////
    this.uh.q_sol_q_dis.values.forEach((v, i) => {
      let _v = v ? {
        color: 'bg-green-500',
        value: 'SIM'
      } : {
        color: 'bg-red-500',
        value: 'NÃO'
      }

      this.uh.q_sol_q_dis.elements[i].className = 'sticky top-0 px-2 ' + _v.color
      this.uh.q_sol_q_dis.elements[i].innerHTML = _v.value

    });

  }
  /**
  * Calcular se há disponibilidade hídrica.
  * @param
  * @param
  * @param
  * @param
  */
  calcularDisponibilidadeHidrica(secao_q_sol_q_dis, secao_q_sol_q_ind, uh_q_sol_q_dis) {
    let _dis = secao_q_sol_q_dis.values.map((_qs_qd, i) => {
      return _qs_qd === true && secao_q_sol_q_ind.values[i] === true && uh_q_sol_q_dis.values[i]
    })
    this.uh.q_disponibilidade.values = _dis;

    // view //////////////////////////////////////////
    this.uh.q_disponibilidade.values.forEach((v, i) => {
      let _v = v ? {
        color: 'bg-green-500',
        value: 'SIM'
      } : {
        color: 'bg-red-500',
        value: 'NÃO'
      }

      this.uh.q_disponibilidade.elements[i].className = 'sticky top-0 px-2 ' + _v.color
      this.uh.q_disponibilidade.elements[i].innerHTML = _v.value

    });
  }
  /**
  * Ajustar demanda
  * @param
  * @param
  * @param
  * @param
  */

  calcularDemandaAjustada(q_solicitada, uh_disponivel, secao_q_disponivel, secao_q_individual) {
    let _dem_ajus = q_solicitada.values.map((q_sol, i) => {
      let _disp = Math.min(
        Number(q_sol),
        Number(uh_disponivel.values[i]),
        Number(secao_q_disponivel.values[i]),
        Number(secao_q_individual.values[i]));
      return _disp > 0 ? _disp : 0;
    })
    this.uh.q_demanda_ajustada.values = _dem_ajus;

    // view //////////////////////////////////////////
    this.uh.q_demanda_ajustada.values.forEach((v, i) => {
      this.uh.q_demanda_ajustada.elements[i].innerHTML = v
    });
  }
  /**
  * Capturar o polígono da área de contribuição.
  * @param rings União dos polígonos à montante
  */
  setRingsAreaContribuicao(rings) {
    this.secao.area_contribuicao.rings = rings;
  }
  /**
  * Obter o polígono da unidade hidrográfica - UH.
  * @return {object[]} Polígono da UH.
  */
  getUHRings() {
    return this.uh.rings;
  }
}