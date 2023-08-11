/**
* Criador de elementos em HTML
*  @param type Tipo do elemento (div, table, ...)
*  @param name Nome do elemento (name: 'mydiv')
*  @param id Id do elemento
*  @param className Class do elemento
*  @param innerHTML Conteúdo do elemento
*/
function criarElemento(type, name, id, className, innerHTML) {
  let elem = document.createElement(type);
  elem.name = name;
  elem.id = id;
  elem.className = className;
  elem.innerHTML = innerHTML;
  return elem;
}
/**
 * Cria elementos tr na tabela.
 * @param {Object} variablevariable Valores (info, values) que serão mostrados na tabela.
 * @param {string} v_id Id do objecto tr que será concatenado com ao id da div principal (div_id).
 * @param {string} div_id Id da div principal que será concatenada com o nome da variavel para criar um id único.
 * @param {string} tbody_id Id da tbody.
 * @param {string} i_classes Classes de css - tailwind - da td de informação.
 * @param {string} i_classes Classes de css - tailwind - da td de com array de valores.
 */
function criarElementoTR(variable, v_id, div_id, tbody_id, i_classes, v_classes) {
  // cria id único concatenando v_vi + div_id
  let _v_id = v_id + '_' + div_id;
  // cria o element tr
  let _v = criarElemento('tr', '', _v_id, '', '');
  document.getElementById(tbody_id).appendChild(_v);
  // cria o element td de informação
  document.getElementById(_v_id).appendChild(criarElemento('td', '', '', i_classes, variable.alias));
  // cria os elements td de valores
  variable.values.forEach(v => {
    let td = criarElemento('td', '', '', v_classes, v);
    document.getElementById(_v_id).appendChild(td);
    variable.elements.push(td)
  });
}

/**
    * Modifica os valores. 
    * @param {Object} _input Elemento com valor digitado pelo usuario.
    * @param {Number} _index Posição na array de elementos.
    */

function modificarValoresDosElementos() {

  analises.calcularQOutorgadaSecao(analises.secao.outorgas);

  analises.calcularQReferenciaSecao(analises.uh.attributes, analises.secao.area_contribuicao.value);
  //80%
  analises.calcularQOutorgavelSecao(analises.secao.q_referencia);
  // 20%
  analises.calcularQIndividualSecao(analises.secao.q_outorgavel, decimal_individual);
  analises.calcularQDisponivelSecao(analises.secao.q_outorgavel, analises.secao.q_outorgada);

  analises.calcularQSolicitadaMenorQDisponivel(analises.q_solicitada, analises.secao.q_disponivel);
  analises.calcularQSolicitadaMenorQIndividual(analises.q_solicitada, analises.secao.q_individual);

  analises.calcularSQOutorgadaUH(analises.uh.outorgas);

  analises.calcularQReferenciaUH(analises.uh.attributes);

  analises.calcularQRemanescenteUH(analises.uh.q_referencia);

  analises.calcularQOutorgavelUH(analises.uh.q_referencia);

  analises.calcularQDisponivelUH(analises.uh.q_outorgavel, analises.uh.q_outorgada);

  analises.calcularSolicitataMenorDisponivel(analises.q_solicitada, analises.uh.q_disponivel)

  analises.calcularDisponibilidadeHidrica(analises.uh.q_sol_q_dis, analises.secao.q_sol_q_ind, analises.secao.q_sol_q_dis)

  analises.calcularDemandaAjustada(analises.q_solicitada, analises.uh.q_disponivel, analises.secao.q_disponivel, analises.secao.q_individual)

}
/** 
* Selecionar o conteúdo de um div e assim facilitar a edição de valores
* @param {Event} e Evento para capturar qual tecla o usuário digitou
* @param {String} nodeId Id do elemento a ser selecionado o conteúdo
*/
function selectText(e, node) {
  //se event keyup => e.key = 'Tab' ou click => e.button = false
  if (e.key === 'Tab' || e.button === 0) {
    if (document.body.createTextRange) {
      const range = document.body.createTextRange();
      range.moveToElementText(node);
      range.select();
    } else if (window.getSelection) {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(node);
      selection.removeAllRanges();
      selection.addRange(range);
    } else {
      console.warn("Could not select text in node: Unsupported browser.");
    }
  }
}

/**
* Modificar o valor da vazão individual de 20% para 60% 70% ou 80% 
*
*/
let decimal_individual = 0.2;

/**
* Cria a tabela de análise de dados
* @param div_id div_idento em que será inserido a tabela
* @param mos Meses do ano com titulo e valores
* @param analise Valores da vazão da seção (analises.gwf.up) ou valores de análise da Unidade Hidrográfica (analises.gwf.hu)
*
*/

function criarTabelaSecao(div_id, q_solicitada, secao) {

  // cria id único para a tabela
  let id_table = 'table_' + div_id;
  // cria tabela e insere na div principal (div_id)
  let table = criarElemento('table', '', id_table, 'w-full text-xs', '');
  document.getElementById(div_id).appendChild(table);
  let tbody_id = 'tbody_' + div_id;
  let tbody = criarElemento('tbody', '', tbody_id, '', '');
  document.getElementById(id_table).appendChild(tbody);

  // th table
  let id_tr = 'tr_' + div_id;
  let tr = criarElemento('tr', '', id_tr, '', '');
  document.getElementById(tbody_id).appendChild(tr);

  // TH TAG //
  document.getElementById(id_tr).appendChild(criarElemento('th', '', '', 'border border-solid text-xs', secao.meses.alias));
  secao.meses.values.forEach(m => {
    document.getElementById(id_tr).appendChild(criarElemento('th', '', '', 'border border-solid text-xs', m));
  });

  let _tr_q_sol = criarElemento('tr', '', '', '', '');
  document.getElementById(tbody_id).appendChild(_tr_q_sol);

  // alias -> informação sobre a linha
  let _td_q_sol = criarElemento('td', '', '', 'border border-solid text-xs', q_solicitada.alias);
  _tr_q_sol.appendChild(_td_q_sol)
  // values -> valores da linha
  q_solicitada.values.forEach((value, _index) => {

    let _td = criarElemento('td', '', '', 'border border-solid', '');
    _tr_q_sol.appendChild(_td);
    //adicionar input para edição
    let _div = document.createElement('div');
    _div.contentEditable = true;
    _div.innerHTML = value;
    _div.className = 'w-full'

    _td.appendChild(_div);
    q_solicitada.elements.push(_div);
    // listener para selecionar todo o texto de edição a clicar em tab
    _div.addEventListener('keyup', (e) => selectText(e, _div));
    // listener para modificar os valores e cálculos ao clicar
    _div.addEventListener("click", function(e) {
      selectText(e, _div);
      analises.q_solicitada.values[_index] = Number(_div.innerHTML);
      modificarValoresDosElementos();
    });
    // listener para modificar os valores e cálculos ao clicar em tab
    _div.addEventListener("keydown", function(e) {

      analises.q_solicitada.values[_index] = Number(_div.innerHTML);
      modificarValoresDosElementos();

    });
  });

  criarElementoTR(secao.q_outorgada, 'q_outorgada', div_id, tbody_id, 'border border-solid text-xs', 'border border-solid');
  criarElementoTR(secao.q_referencia, 'q_referencia', div_id, tbody_id, 'border border-solid text-xs', 'border border-solid');
  criarElementoTR(secao.q_outorgavel, 'q_outorgavel', div_id, tbody_id, 'border border-solid text-xs', 'border border-solid');
  // criarElementoTR(secao.q_individual, 'q_individual', div_id, tbody_id, 'border border-solid text-xs', 'border border-solid');

  let q_individual_id = 'q_individual_' + div_id;
  let q_individual = criarElemento('tr', '', q_individual_id, '', '');
  document.getElementById(tbody_id).appendChild(q_individual);
  let _td = criarElemento('td', '', '', 'border border-solid text-xs', '')
  document.getElementById(q_individual_id).appendChild(_td);
  // criar a opção de valores na vazão individual
  let _select = document.createElement('select')
  _select.id = "select_id"
  _select.className = 'text-xs'
  _select.addEventListener(
    'change',
    function() {
      decimal_individual = this.value
      modificarValoresDosElementos();
    },
    false
  );

  _td.appendChild(_select);

  secao.q_individual.decimais.forEach(d => {
    let _option = document.createElement('option')
    _option.value = d.decimal;
    _option.className = 'text-xs'
    _option.innerHTML = d.alias
    _select.appendChild(_option);

  })
 
  secao.q_individual.values.forEach(v => {
    let __td = criarElemento('td', '', '', 'border border-solid', v);
    document.getElementById(q_individual_id).appendChild(__td);
    secao.q_individual.elements.push(__td)
  });

  criarElementoTR(secao.q_disponivel, 'q_disponivel', div_id, tbody_id, 'border border-solid text-xs', 'border border-solid');


  let id_vsvd = 'vsvd_' + div_id;
  let _vsvd = criarElemento('tr', '', id_vsvd, '', '');
  document.getElementById(tbody_id).appendChild(_vsvd);
  document.getElementById(id_vsvd).appendChild(criarElemento('td', '', '', 'border border-solid text-xs', secao.q_sol_q_dis.alias));
  secao.q_sol_q_dis.values.forEach(v => {
    // Inserção de cor de fundo e palavra SIM se true e cor de fundo e palavra NÃO se false
    let _v = v ? {
      color: 'bg-green-500',
      value: 'SIM'
    } : {
      color: 'bg-red-500',
      value: 'NÃO'
    }
    let td = criarElemento('td', '', '', 'sticky top-0 px-2 ' + _v.color, _v.value);
    document.getElementById(id_vsvd).appendChild(td);
    secao.q_sol_q_dis.elements.push(td)
  });

  let id_vsv_20 = 'vsv_20_' + div_id;
  let _vsv_20 = criarElemento('tr', '', id_vsv_20, '', '');
  document.getElementById(tbody_id).appendChild(_vsv_20);
  document.getElementById(id_vsv_20).appendChild(criarElemento('td', '', '', 'border border-solid text-xs', secao.q_sol_q_ind.alias));
  secao.q_sol_q_ind.values.forEach(v => {
    // Inserção de cor de fundo e palavra SIM se true e cor de fundo e palavra NÃO se false
    let _v = v ? {
      color: 'bg-green-500',
      value: 'SIM'
    } : {
      color: 'bg-red-500',
      value: 'NÃO'
    }
    let td = criarElemento('td', '', '', 'sticky top-0 px-2 ' + _v.color, _v.value)
    document.getElementById(id_vsv_20).appendChild(td);
    secao.q_sol_q_ind.elements.push(td);

  });

}

function criarTabelaUH(div_id, uh) {

  // cria id único para a tabela
  let id_table = 'table_' + div_id;
  // cria tabela e insere na div principal (div_id)
  let table = criarElemento('table', '', id_table, 'w-full text-xs', '');
  document.getElementById(div_id).appendChild(table);
  let tbody_id = 'tbody_' + div_id;
  let tbody = criarElemento('tbody', '', tbody_id, '', '');
  document.getElementById(id_table).appendChild(tbody);

  // th table
  let id_tr = 'tr_' + div_id;
  let tr = criarElemento('tr', '', id_tr, '', '');
  document.getElementById(tbody_id).appendChild(tr);

  document.getElementById(id_tr).appendChild(criarElemento('th', '', '', 'border border-solid text-xs', uh.meses.alias));

  uh.meses.values.forEach(m => {
    document.getElementById(id_tr).appendChild(criarElemento('th', '', '', 'border border-solid text-xs', m));
  });


  criarElementoTR(uh.q_outorgada, 'q_outorgada_uh', div_id, tbody_id, 'border border-solid text-xs', 'border border-solid ');
  criarElementoTR(uh.q_referencia, 'q_referencia_uh', div_id, tbody_id, 'border border-solid text-xs', 'border border-solid');
  criarElementoTR(uh.q_remanescente, 'q_remanescente_20_uh', div_id, tbody_id, 'border border-solid text-xs', 'border border-solid');
  criarElementoTR(uh.q_outorgavel, 'q_outorgavel_80_uh', div_id, tbody_id, 'border border-solid text-xs', 'border border-solid');
  criarElementoTR(uh.q_disponivel, 'q_disponivel_uh', div_id, tbody_id, 'border border-solid text-xs', 'border border-solid');

  let qsqd_id = 'qsqd_' + div_id;
  let _qsqd = criarElemento('tr', '', qsqd_id, '', '');
  document.getElementById(tbody_id).appendChild(_qsqd);
  document.getElementById(qsqd_id).appendChild(criarElemento('td', '', '', 'border border-solid text-xs', uh.q_sol_q_dis.alias));

  uh.q_sol_q_dis.values.forEach(v => {
    // Inserção de cor de fundo e palavra SIM se true e cor de fundo e palavra NÃO se false
    let _v = v ? {
      color: 'bg-green-500',
      value: 'SIM'
    } : {
      color: 'bg-red-500',
      value: 'NÃO'
    }
    let td = criarElemento('td', '', '', 'sticky top-0 px-2 ' + _v.color, _v.value)
    document.getElementById(qsqd_id).appendChild(td);
    uh.q_sol_q_dis.elements.push(td);

  });

  let disp_id = 'disp_' + div_id;
  let disp = criarElemento('tr', '', disp_id, '', '');
  document.getElementById(tbody_id).appendChild(disp);
  document.getElementById(disp_id).appendChild(criarElemento('td', '', '', 'border border-solid text-xs', uh.q_disponibilidade.alias));

  uh.q_disponibilidade.values.forEach(v => {
    // Inserção de cor de fundo e palavra SIM se true e cor de fundo e palavra NÃO se false
    let _v = v ? {
      color: 'bg-green-500',
      value: 'SIM'
    } : {
      color: 'bg-red-500',
      value: 'NÃO'
    }
    let td = criarElemento('td', '', '', 'sticky top-0 px-2 ' + _v.color, _v.value)
    document.getElementById(disp_id).appendChild(td);
    uh.q_disponibilidade.elements.push(td)

  });

  criarElementoTR(uh.q_demanda_ajustada, 'q_demanda_ajus', div_id, tbody_id, 'border border-solid text-xs', 'border border-solid');

}
/**
* Cria gráfico em linhas de análise de dados
*
*
*
*/
async function createUpChart(div_id, analise) {

  // adicionar todos as arrays criadas em uma só array para o valor minimo e maximo do chart
  let minMax = analise.q_outorgada.values.concat(
    analise.q_referencia.values,
    analise.q_outorgavel.values,
    analise.q_individual.values,
    analise.q_disponivel.values)

  new Chart(div_id, {
    type: "line",
    data: {
      labels: analises.mos.values,
      datasets: [
        {
          label: analise.q_outorgada.alias,
          fill: false,
          lineTension: 0,
          backgroundColor: "rgba(0,63,92,1.0)",
          borderColor: "rgba(0,63,92,0.2)",
          data: analise.q_outorgada.values
        },
        {
          label: analise.q_referencia.alias,
          fill: false,
          lineTension: 0,
          backgroundColor: "rgba(0,102,0,1.0)",
          borderColor: "rgba(0,102,0,0.2)",
          data: analise.q_referencia.values
        },

        {
          label: analise.q_outorgavel.alias,
          fill: false,
          lineTension: 0,
          backgroundColor: "rgba(106,90,205,1.0)",
          borderColor: "rgba(106,90,205,0.2)",
          data: analise.q_outorgavel.values
        },
        {
          label: analise.q_individual.alias,
          fill: false,
          //hidden: true - desabilitar linha
          hidden: true,
          lineTension: 0,
          backgroundColor: "rgba(255,99,97,1.0)",
          borderColor: "rgba(255,99,97,0.2)",
          data: analise.q_individual.values
        },
        {
          label: analise.q_disponivel.alias,
          fill: false,
          //hidden: true - desabilitar linha
          hidden: true,
          lineTension: 0,
          backgroundColor: "rgba(255,166,0,1.0)",
          borderColor: "rgba(255,166,0,0.2)",
          data: analise.q_disponivel.values
        }
      ]
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      title: "Análise na Seção de Captação:",
      legend: { display: true },
      scales: {
        yAxes: [{ ticks: { min: Math.min(...minMax), max: Math.max(...minMax) } }],
      }
    }
  });

}

async function createUHChart(div_id, analise) {

  // adicionar todos as arrays criadas em uma só array para o valor minimo e maximo do chart
  let minMax = analise.q_outorgada.values.concat(
    analise.q_referencia.values,
    analise.q_remanescente.values,
    analise.q_outorgavel.values,
    analise.q_disponivel.values,
  );

  new Chart(div_id, {
    type: "line",
    data: {
      labels: analises.mos.values,
      datasets: [
        {
          label: analise.q_outorgada.alias,
          fill: false,
          lineTension: 0,
          backgroundColor: "rgba(0,63,92,1.0)",
          borderColor: "rgba(0,63,92,0.2)",
          data: analise.q_outorgada.values
        },
        {
          label: analise.q_referencia.alias,
          fill: false,
          lineTension: 0,
          backgroundColor: "rgba(0,102,0,1.0)",
          borderColor: "rgba(0,102,0,0.2)",
          data: analise.q_referencia.values
        },

        {
          label: analise.q_remanescente.alias,
          fill: false,
          lineTension: 0,
          backgroundColor: "rgba(106,90,205,1.0)",
          borderColor: "rgba(106,90,205,0.2)",
          data: analise.q_remanescente.values
        },
        {
          label: analise.q_outorgavel.alias,
          fill: false,
          lineTension: 0,
          //hidden: true - desabilitar linha
          hidden: true,
          backgroundColor: "rgba(255,99,97,1.0)",
          borderColor: "rgba(255,99,97,0.2)",
          data: analise.q_outorgavel.values
        },
        {
          label: analise.q_disponivel.alias,
          fill: false,
          lineTension: 0,
          //hidden: true - desabilitar linha
          hidden: true,
          backgroundColor: "rgba(255,166,0,1.0)",
          borderColor: "rgba(255,166,0,0.2)",
          data: analise.q_disponivel.values
        }
      ]
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      title: "Análise na Unidade Hidrográfica:",
      legend: { display: true },
      scales: {
        yAxes: [{ ticks: { min: Math.min(...minMax), max: Math.max(...minMax) } }],
      }
    }
  });

}

function criarTabelaAjusteHora(div_id) {

  function ajustarHoraBombRequerida() {

    analises.ajustarSecaoMH()
    analises.ajustarQSecaoMD();

    analises.ajustarHoraBombAjustada();

    analises.modularVazaoQ();
    analises.modularVazaoH();

    analises.modularHoraQ();
    analises.modularHoraH();

  }

  let table_id = 'table_' + div_id;
  // div principal
  let table = criarElemento('table', '', table_id, 'w-full text-xs', '');
  document.getElementById(div_id).appendChild(table);
  let tbody_id = 'tbody_' + div_id;
  let tbody = criarElemento('tbody', '', tbody_id, '', '');
  document.getElementById(table_id).appendChild(tbody);

  // th table
  let id_tr = 'tr_' + div_id;
  let tr = criarElemento('tr', '', id_tr, '', '');
  document.getElementById(tbody_id).appendChild(tr);

  document.getElementById(id_tr).appendChild(criarElemento('th', '', '', 'border border-solid text-xs ', analises.h_ajuste.alias));
  analises.h_ajuste.values.forEach(m => {
    document.getElementById(id_tr).appendChild(criarElemento('th', '', '', 'border border-solid text-xs', m));
  });



  let h_bomb_requerida_id = 'h_bomb_requerida_' + div_id;
  let h_bomb_requerida = criarElemento('tr', '', h_bomb_requerida_id, '', '');
  document.getElementById(tbody_id).appendChild(h_bomb_requerida);
  document.getElementById(h_bomb_requerida_id).appendChild(criarElemento('td', '', '', 'border border-solid text-xs',
    analises.h_ajuste.h_bomb_requerida.alias));

  analises.h_ajuste.h_bomb_requerida.values.forEach((value, _index) => {
    let _td = criarElemento('td', '', '', 'border border-solid', '');
    h_bomb_requerida.appendChild(_td);
    //adicionar input para edição
    let _div = document.createElement('div');
    _div.contentEditable = true;
    _div.innerHTML = value;
    _div.className = 'w-full'

    _td.appendChild(_div);
    analises.h_ajuste.h_bomb_requerida.elements.push(_div);

    // listener para selecionar todo o texto de edição a clicar em tab
    _div.addEventListener('keyup', (e) => selectText(e, _div));

    _div.addEventListener("click", function(e) {

      selectText(e, _div);
      analises.h_ajuste.h_bomb_requerida.values[_index] = Number(_div.innerHTML);
      ajustarHoraBombRequerida();
    });
    _div.addEventListener("keydown", function() {
      analises.h_ajuste.h_bomb_requerida.values[_index] = Number(_div.innerHTML);
      ajustarHoraBombRequerida();
    });
  });
  criarElementoTR(analises.h_ajuste.q_secao_m_h, 'm_h', div_id, tbody_id, 'border border-solid text-xs', 'border border-solid ');
  criarElementoTR(analises.h_ajuste.q_secao_m_d, 'm_d', div_id, tbody_id, 'border border-solid text-xs', 'border border-solid ');
  criarElementoTR(analises.h_ajuste.h_bomb_ajustada, 'b_a', div_id, tbody_id, 'border border-solid text-xs', 'border border-solid ');

}

function criarTabelaModulaVazao(div_id) {

  let id_table = 'table_' + div_id;
  // div principal
  let table = criarElemento('table', '', id_table, 'w-full text-xs', '');
  document.getElementById(div_id).appendChild(table);
  let tbody_id = 'tbody_' + div_id;
  let tbody = criarElemento('tbody', '', tbody_id, '', '');
  document.getElementById(id_table).appendChild(tbody);

  // th table
  let id_tr = 'tr_' + div_id;
  let tr = criarElemento('tr', '', id_tr, '', '');
  document.getElementById(tbody_id).appendChild(tr);

  document.getElementById(id_tr).appendChild(criarElemento('th', '', '', 'border border-solid text-xs ', analises.q_modula.alias));
  analises.q_modula.values.forEach(m => {
    document.getElementById(id_tr).appendChild(criarElemento('th', '', '', 'border border-solid text-xs', m));
  });

  // q_modula

  criarElementoTR(analises.q_modula.q_outorgada, 'q_m_q_o', div_id, tbody_id, 'border border-solid text-xs', 'border border-solid ');
  criarElementoTR(analises.q_modula.h_bombeamento, 'q_m_h_b', div_id, tbody_id, 'border border-solid text-xs', 'border border-solid ');

}

function criarTabelaModulaHora(div_id) {
  let id_table = 'table_' + div_id;
  // div principal
  let table = criarElemento('table', '', id_table, 'w-full text-xs', '');
  document.getElementById(div_id).appendChild(table);
  let tbody_id = 'tbody_' + div_id;
  let tbody = criarElemento('tbody', '', tbody_id, '', '');
  document.getElementById(id_table).appendChild(tbody);

  // th table
  let id_tr = 'tr_' + div_id;
  let tr = criarElemento('tr', '', id_tr, '', '');
  document.getElementById(tbody_id).appendChild(tr);


  document.getElementById(id_tr).appendChild(criarElemento('th', '', '', 'border border-solid text-xs ', analises.h_modula.alias));
  analises.h_modula.values.forEach(m => {
    document.getElementById(id_tr).appendChild(criarElemento('th', '', '', 'border border-solid text-xs', m));
  });

  // h_modula
  criarElementoTR(analises.h_modula.q_outorgada, 'h_m_q_o', div_id, tbody_id, 'border border-solid text-xs', 'border border-solid ');
  criarElementoTR(analises.h_modula.h_bombeamento, 'h_m_h_b', div_id, tbody_id, 'border border-solid text-xs', 'border border-solid ');
}

let elemId = [];
/*
* Atualizar a tabela de outorgas.
* @param {Objetc[]} Outorgas à montante (seção) ou outorgas na Unidade Hidrográfica - UH
*
*
  @param poits Pontos outorgados de uma área de drenagem
*/
async function atualizarTabelaOutorgas(tbody, outorgas) {

 // console.log(outorgas)
  // remover elementos anteriores
  Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
  }
  NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for (var i = this.length - 1; i >= 0; i--) {
      if (this[i] && this[i].parentElement) {
        this[i].parentElement.removeChild(this[i]);
      }
    }
  }

  // remover todos os elementos antigos para mostrar novos
  elemId.forEach((id) => {
    document.getElementById(id).remove();
  })
  // limpar a array para capturar novos elementos
  elemId = []

  let trs = []
  await outorgas.forEach((p, i) => {
    // capturar temporariamente os ids de elementos mostrados
    elemId.push('tr' + i);
    //(eType, eName, eId, eClassName, eInnerHTML)

    trs[i] = criarElemento('tr', '', 'tr' + i, '', '');
    document.getElementById(tbody).appendChild(trs[i]);
    document.getElementById('tr' + i).appendChild(criarElemento('td', '', '', 'border-solid p-2 bg-white border	border-slate-300', p.attributes.usuario));
    document.getElementById('tr' + i).appendChild(criarElemento('td', '', '', 'border-solid p-2 bg-white border	border-slate-300', p.attributes.cpf_cnpj));
    document.getElementById('tr' + i).appendChild(criarElemento('td', '', '', 'border-solid p-2 bg-white border	border-slate-300', p.attributes.num_proces));
    document.getElementById('tr' + i).appendChild(criarElemento('td', '', '', 'border-solid p-2 bg-white border	border-slate-300', p.attributes.logradouro));
    // vazões
    document.getElementById('tr' + i).appendChild(criarElemento('td', '', '', 'border-solid p-2 bg-white border	border-slate-300 w-10', p.attributes.q_seg_jan));
    document.getElementById('tr' + i).appendChild(criarElemento('td', '', '', 'border-solid p-2 bg-white border	border-slate-300 w-10', p.attributes.q_seg_fev));
    document.getElementById('tr' + i).appendChild(criarElemento('td', '', '', 'border-solid p-2 bg-white border	border-slate-300 w-10', p.attributes.q_seg_mar));
    document.getElementById('tr' + i).appendChild(criarElemento('td', '', '', 'border-solid p-2 bg-white border	border-slate-300 w-10', p.attributes.q_seg_abr));
    document.getElementById('tr' + i).appendChild(criarElemento('td', '', '', 'border-solid p-2 bg-white border	border-slate-300 w-10', p.attributes.q_seg_mai));
    document.getElementById('tr' + i).appendChild(criarElemento('td', '', '', 'border-solid p-2 bg-white border	border-slate-300 w-10', p.attributes.q_seg_jun));

    document.getElementById('tr' + i).appendChild(criarElemento('td', '', '', 'border-solid p-2 bg-white border	border-slate-300 w-10', p.attributes.q_seg_jul));
    document.getElementById('tr' + i).appendChild(criarElemento('td', '', '', 'border-solid p-2 bg-white border	border-slate-300 w-10', p.attributes.q_seg_ago));
    document.getElementById('tr' + i).appendChild(criarElemento('td', '', '', 'border-solid p-2 bg-white border	border-slate-300 w-10', p.attributes.q_seg_set));
    document.getElementById('tr' + i).appendChild(criarElemento('td', '', '', 'border-solid p-2 bg-white border	border-slate-300 w-10', p.attributes.q_seg_out));
    document.getElementById('tr' + i).appendChild(criarElemento('td', '', '', 'border-solid p-2 bg-white border	border-slate-300 w-10', p.attributes.q_seg_nov));
    document.getElementById('tr' + i).appendChild(criarElemento('td', '', '', 'border-solid p-2 bg-white border	border-slate-300 w-10', p.attributes.q_seg_dez));

  })
}

