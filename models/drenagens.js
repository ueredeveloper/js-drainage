
/**
 *	Análise da sessão de captação à montante.
 */
class AnaliseAMontante {
  constructor() {

    this.area_contribuicao = {
      alias: "Área de contribuição",
      value: '',
      rings: []
    }
    /** 
    * Pontos outorgados (marcadores) à montante.
    */
    this.outorgas = []

    /**
    * Vazões outorgadas à montante.
    */
    this.q_outorgas = {
      alias: 'SQOUTORGADA-MONT.-SEÇÃO',
      values: []
    }
    /**
      * Vazão de referência (regionalizada)
      *
      */
    this.q_referencia = {
      alias: 'QREFERÊNCIA-SEÇÃO (Regionalizada)',
      values: []
    },

      /**
       * Vazão outorgável, 80% da vazão de referência
       */
      this.q_outorgavel_80 = {
        alias: 'QOUTORGÁVEL-SEÇÃO (80% QREFERÊNCIA-SEÇÃO)',
        values: []
      },

      /**
      * Vazão individual, 20% da outorgável na seção (v_80)
      */
      this.q_outorgavel_20 = {
        alias: 'QOUTORGÁVEL-INDIVIDUAL-SEÇÃO (20% QOUTORGÁVEL-SEÇÃO)',
        values: []
      },
      /**
      * Vazão disponível na seção.
      */
      this.q_disponivel_secao = {
        alias: 'QDISPONÍVEL-SEÇÃO',
        values: []
      },
      this.q_sol_q_dis = {
        alias: 'QSOLICITADA-SEÇÃO ≤ QDISPONÍVEL-SEÇÃO',
        values: []
      },
      this.q_sol_q_20 = {
        alias: 'QSOLICITADA-SEÇÃO ≤ QOUTORGÁVEL-INDIVIDUAL-SEÇÃO',
        values: []
      }
  }
}