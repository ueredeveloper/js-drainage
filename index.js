// mapa
var map;
// lista de polígonos e polilinhas solicitados pelo usuário
var shapes = [];
const analises = new Analises();

function initMap() {
  

  const latLng = { lat: -15.7567194, lng: -47.8480161 }

  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: latLng,
    mapTypeId: 'hybrid'
  });

  let checkboxes = [];
  let cbIds = ["bacias", "uhs", "rios_df"];
  cbIds.forEach(c => {
    checkboxes.push(document.querySelector("#" + c))
  });

  checkboxes.forEach(cb => {
    cb.addEventListener('change', function () {
      if (this.checked) {
        initFeatures(google, map, cb);
      } else {
        initFeatures(google, null, cb);
      }
    });
  });

  // Incializa com o mapa as shape de bacias hidrográficas
  (async () => {
    await fetchShape("bacias_hidrograficas")
      .then(features => {
        usePolygons(null, google, { id: 'bacias', features: features }, shapes);
      });
  })();

  // Inicializa com o mapa as shapes de unidades hidrográficas
  (async () => {
    await fetchShape("unidades_hidrograficas")
      .then(features => {
        usePolygons(null, google, { id: 'uhs', features: features }, shapes);
      });
  })();

  google.maps.event.addListener(map, "click", getCoordClick);

  // criar line chart
  createUpChart('up_chart', analises.secao);

  // criar line chart
  createUHChart('uh_chart', analises.uh);

  criarTabelaSecao('tabela_secao', analises.q_solicitada, analises.secao);
  criarTabelaUH('tabela_uh', analises.uh);

  criarTabelaAjusteHora('h_ajusta_id')

  criarTabelaModulaHora('q_modula_id')
  criarTabelaModulaVazao('h_modula_id')

}

window.initMap = initMap;

/**
* Captura o click no mapa do usuário e traz informações sobre o ponto clicado.
*
*/
function getCoordClick(e) {

  analises.setLatLng(e.latLng.lat(), e.latLng.lng());

  // mostrar coodenada clicada
  document.getElementById("idLat").value = analises.ll.values.lat;
  document.getElementById("idLng").value = analises.ll.values.lng;
  // limpar os pontos inseridos pelo método usePoinstInPolygon()
  clearPoints();

  // limpar o mapa dos rios solicitados  anteriormente
  removeRivers();

  // área de drenagem (à montante do ponto clicado)
  useFeatures(analises.ll.values.lat, analises.ll.values.lng);

  // buscar todos os pontos da unidade hidrográfica (uh)
  //usePointsInPolygon(analises.getUHRings());
  // retirando busca pelo polígono da uh e adicionando busca por atributo uh_codigo
  usePointsByUH(analises.uh.attributes.uh_codigo);
  // calcular vazões outorgadas à montante

  // calcular vazões outorgadas à montante
  analises.ll.marker = new google.maps.Marker({
    //attributes: feature.attributes,
    position: { lat: analises.ll.values.lat, lng: analises.ll.values.lng },
    icon: `https://www.google.com/intl/en_us/mapfiles/ms/micons/red-dot.png`,
    // não mostrar no mapa, só mostrar os marcadores relacionados com a área de drenagem
    map,
  });

  // Adicionar animação ao marcador buscado pelo usuário.
  analises.ll.marker.setAnimation(google.maps.Animation.BOUNCE);

  // Após cinco segundos remover animação do marcador.
  setTimeout(function () {
    analises.ll.marker.setAnimation(null);
  }, 4000);

}
/**
* Captura a coordenada digitada pelo usuário, mostra o ponto no mapa e traz informações sobre o ponto.
*
*/
function getLatLng() {

  analises.ll.values.lat = Number(document.getElementById('idLat').value);
  analises.ll.values.lng = Number(document.getElementById('idLng').value);
  // limpar os pontos inseridos pelo método usePoinstInPolygon()
  clearPoints();

  removeRivers()
  // área de drenagem (à montante do ponto clicado)
  useFeatures(analises.ll.values.lat, analises.ll.values.lng);
  // buscar todos os pontos da unidade hidrográfica (uh)

  // retirando a pesquisa por polígono da UH
  //usePointsInPolygon(analises.getUHRings());
  // mudando para pesquisa por código da UH
  usePointsByUH(analises.uh.attributes.uh_codigo);
  // calcular vazões outorgadas à montante
  analises.ll.marker = new google.maps.Marker({
    //attributes: feature.attributes,
    position: { lat: analises.ll.values.lat, lng: analises.ll.values.lng },
    icon: `https://www.google.com/intl/en_us/mapfiles/ms/micons/red-dot.png`,
    // não mostrar no mapa, só mostrar os marcadores relacionados com a área de drenagem
    map,
  });

  // Adicionar animação ao marcador buscado pelo usuário.
  analises.ll.marker.setAnimation(google.maps.Animation.BOUNCE);

  // Após cinco segundos remover animação do marcador.
  setTimeout(function () {
    analises.ll.marker.setAnimation(null);
  }, 10000);

}
/**
* Inicializa as shapes como bacia hidrográfica, unidade hidrográfica etc...
*  @param map
*  @param google
*  @paramcb (checkbox) { 
*    cb.id: [poroso, fraturado, bacias, uhs], 
*    cb.value: [
*      "bacias_hidrograficas", "unidades_hidrograficas",  
*      "rios_df"]
*/
async function initFeatures(google, map, cb) {

  if (cb.value === 'rios_df') {

    if (cb.checked) {
      let lat = document.getElementById("idLat").value;
      let lng = document.getElementById("idLng").value;
      await filterRiversByCoordinates(lat, lng)
        .then(features => {
          usePolylinesRivers(map, google, { id: 'rios_df', features: features }, shapes)
        });
    } else {
      removeRivers()
    }
  } else {
    console.log('cb ', cb.value)
    await fetchShape(cb.value)

      .then(features => {
        usePolygons(map, google, { id: 'uhs', features: features }, shapes);
      });

  }
}


const url = 'https://njs-drainage-ueredeveloper.replit.app';
/**
* Buscar a shape solicitada no servidor
* @param shapeName Pode ser os valores 'hidrogeo_fraturado' ou 'hidrogeo_poroso'
*
  */
async function fetchShape(shapeName) {

  let response = await fetch(url + `/getShape?shape=${shapeName}`, {
    method: 'GET',
    headers: {
      Accept: 'application/JSON',
      'Content-Type': 'application/JSON',
    }

  }).then(res => {
    return res.json();
  })

  return response;
}

const filterRiversByCoordinates = async (lat, lng) => {

  let response = await fetch(url +  `/rivers/filterRiversByCoordinates?lat=${lat}&lng=${lng}`, {
    method: 'GET',
    headers: {
      Accept: 'application/JSON',
      'Content-Type': 'application/JSON',
    }

  }).then(res => {
    return res.json();
  })

  return response;

}

/**
 * Remove os rios do mapa e atualiza a lista de formas.
 *
 */
const removeRivers = () => {
  // Obtém a referência ao elemento de checkbox para rios no DOM.
  let checkbox = document.getElementById('rios_df');

  // Se o checkbox estiver marcado, desmarca-o.
  if (checkbox.checked) {
    checkbox.checked = false;
  }

  // Verifica se a forma `rios_df` existe na lista de formas (`shapes`).
  let s = shapes.find(sh => sh.id === 'rios_df');

  // Remove os rios do mapa utilizando setMap(null).
  if (s !== undefined) {
    // Itera sobre as features e as remove do mapa.
    s.features.map(p => p.setMap(null));
    
    // Remove a forma da lista de formas (`shapes`).
    shapes = shapes.filter(shape => shape.id !== 'rios_df');
  }
};





