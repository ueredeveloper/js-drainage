// mapa
var map;
// lista de polígonos criados
var shapes = [];
const analises = new Analises();

const data = { latlng: '' }

function initMap() {
  const myLatLng = { lat: -15.816617049522396, lng: -47.65526409580683 };
  const brasilia = { lat: -15.7567194, lng: -47.8480161 }
  //-15.926693648160802,-48.08341736443031
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: brasilia,
    mapTypeId: 'hybrid'
  });

  let checkboxes = [];
  let cbIds = ["bacias", "uhs"];
  cbIds.forEach(c => {
    checkboxes.push(document.querySelector("#" + c))
  });
  checkboxes.forEach(cb => {
    cb.addEventListener('change', function() {
      if (this.checked) {

        initFeatures(google, map, cb);
      } else {
        initFeatures(google, null, cb);
      }
    });
  });

  // carregar a shape de uhs
  fetch('./json/uhs-to-gmaps.json')
    .then(response => {

      return response.json();
    }).then(data => {

      usePolygons(null, google, { id: 'uhs', features: data.features }, shapes);
    });


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
    // não mostrar no mapa, só mostrar os marcadores relacionados com a área de drenagem
    map,
  });

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
    // não mostrar no mapa, só mostrar os marcadores relacionados com a área de drenagem
    map,
  });

}
/**
* Inicializa as shapes como bacia hidrográfica, unidade hidrográfica etc...
*  @param map
*  @param google
*  @paramcb (checkbox) { 
*    cb.id: [poroso, fraturado, bacias, uhs], 
*    cb.value: [
*      "./poroso-to-gmaps.json", "./fraturado-to-gmaps.json",  
*      "./bacias-to-gmaps.json", "./uhs-to-gmaps.json"]
*/
function initFeatures(google, map, cb) {

  fetch(cb.value)
    .then(response => {
      return response.json();
    }).then(data => {
      data.features.map(f => {
        if (f.attributes.uh_codigo === 25 || f.attributes.uh_codigo === 3) {

        }
      })
      usePolygons(map, google, { id: cb.id, features: data.features }, shapes);
    });
}


