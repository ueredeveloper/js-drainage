/**
 * Array que armazena polilinhas no mapa.
 * @type {google.maps.Polyline[]}
 */
let polylines = [];

/**
 * Buscar as áreas de drenagem (polígonos à montante) a partir de uma coordenada informada.
 * @param {number} lat Latitude de um ponto.
 * @param {number} lng Longitude de um ponto.
 * @returns {Promise<void>} Uma Promise que é resolvida após a conclusão da busca e renderização.
 */
async function useFeatures(lat, lng) {
  // Remover polylines existentes do mapa antes de buscar novas áreas de drenagem.
  polylines.forEach((poly) => {
    poly.setMap(null);
  });
  polylines = [];

  // Buscar informações sobre a unidade hidrográfica a partir da coordenada fornecida.
  await useUHInfo({ lat: lat, lng: lng });

  // URL para buscar as áreas de drenagem no servidor.
  let url =
    "https://njs-drainage-ueredeveloper.replit.app/drainage?" +
    //let url = 'http://localhost:3000/drainage?' +
    new URLSearchParams({
      lat: lat,
      lng: lng,
      uh: analises.uh.attributes.uh_codigo, // atributo código da uh, ex: 37
    });

  //console.log(url);

  /**
   * Buscar as áreas de drenagem no servidor.
   * @param {number} lat Latitude do ponto.
   * @param {number} lng Longitude do ponto.
   * @param {string} uh Unidade Hidrográfica.
   * @returns {Promise<Array>} Uma Promise que resolve com as informações de áreas de drenagem.
   */
  await fetch(url, { method: "GET" })
    .then((features) => {
      let json = features.json();
      console.log("Teste: features to json ", json);
      return json;
    })
    .then((features) => {
      //console.log("Teste then, features ", features);
      let gmapsFeatures = arcGisToGmaps(features);

      // console.log("Teste, arc gis to gmaps , gmaps features ", gmapsFeatures);
      // Calcular a área total das áreas de drenagem (área de contribuição).
      analises.calcularAreaContribuicao(gmapsFeatures);

      //  console.log("Teste: cálculo área de contribuição ", analises.secao);
      // Renderizar polilinhas no mapa com as áreas de drenagem.
      gmapsFeatures.forEach((f) => {
        polylines.push(
          new google.maps.Polyline({
            path: f.geometry.rings[0][0],
            geodesic: true,
            strokeColor: "#0000FF",
            strokeOpacity: 0.8,
            strokeWeight: 1,
            map,
          }),
        );
      });

      // Unir os polígonos para fazer uma única requisição no serviço REST.
      let _rings = createGmapsPolygon(features);

      //console.log("Teste _rings ", _rings);

      // Obter o caminho (vértices) do polígono
      const pathOfPolygon = _rings.getPath().getArray();

      // Encontrar o centroide do polígono
      const centroid = getPolygonCentroid(pathOfPolygon);

      // Definir o centro do mapa para as coordenadas do centroide
      map.setCenter(centroid);

      analises.setRingsAreaContribuicao(_rings);
    });
}

/**
 * Buscar por uma coordenada os atributos da Unidade Hidrográfica - UH (uh_codigo e Area_Km_sq).
 * @param {object} latLng Objeto contendo a latitude e longitude do ponto clicado ou digitado.
 * @param {number} latLng.lat Latitude do ponto.
 * @param {number} latLng.lng Longitude do ponto.
 * @returns {void}
 */
const useUHInfo = (latLng) => {
  for (let i = 0; i < shapes.length; i++) {
    if (shapes[i].id === "uhs") {
      shapes[i].features.forEach((f) => {
        // Verificar se a coordenada está dentro do polígono da Unidade Hidrográfica.
        if (google.maps.geometry.poly.containsLocation(latLng, f)) {
          // Converter os polígonos do formato Google Maps para ArcGIS e obter informações da UH.
          let _rings = gmapsToArcGis(f.getPath().getArray());
          analises.setUHInfo(f.attributes, _rings);
        }
      });
    }
  }
};

/**
 * Calcula o centroide de um polígono.
 * @param {Array<object>} vertices Lista de caminhos (vértices) do polígono.
 * @returns {object} Objeto contendo as coordenadas do centroide (lat, lng).
 */
const getPolygonCentroid = (vertices) => {
  let latSum = 0;
  let lngSum = 0;
  const numVertices = vertices.length;

  for (const vertex of vertices) {
    latSum += vertex.lat();
    lngSum += vertex.lng();
  }

  const centroidLat = latSum / numVertices;
  const centroidLng = lngSum / numVertices;

  return { lat: centroidLat, lng: centroidLng };
};

/**
 * Criar um polígono do Google Maps a partir de um objeto GeoJSON com multipolígonos.
 * @param {object[]} json Array de objetos GeoJSON que representam polígonos.
 * @returns {google.maps.Polygon} Objeto Polygon do Google Maps resultante da união dos polígonos.
 */
const createGmapsPolygon = (polygons) => {

  console.log(polygons)
  // Função de união dos polígonos. Assim se faz apenas uma requisição no serviço.
  function unionPolygons(polygons) {
    // Perform union operation on the list of polygons
    let unionResult = polygons.reduce((acc, polygon) => {
      return turf.union(acc, polygon);
    });

    return unionResult;
  }

  // Conversao de Turf Polygon em Gmaps Polygon.
  function turfPolygonToGoogleMapsPolygon(turfPolygon) {
    const paths = turfPolygon.geometry.coordinates[0].map(
      (coord) => new google.maps.LatLng(coord[1], coord[0]),
    );
    const polygon = new google.maps.Polygon({ paths: paths });
    return polygon;
  }
  

  /* Sorteia os polígonos pelo OBJECTID, do maior para o menor. Percebi que assim une-se os polígonos melhor e resolve o problema da UH 40, em que um dos polígonos, OBJECTID 23327, deu erro de junção sem esta ordenação.
   */
  const polygonsSortedByObjectId = polygons.sort((a, b) => {
    return b.attributes.OBJECTID - a.attributes.OBJECTID;
  });
  // Conversao para turf features.
  const turfPolygons = polygonsSortedByObjectId.map((polygon) =>
    turf.polygon(polygon.geometry.rings),
  );

  
  // União dos polígonos.
  const unionPolygon = unionPolygons(turfPolygons);

  // Conversão de Turf.js polygon para Google Maps polygon.
  const newGmapsPolygon = turfPolygonToGoogleMapsPolygon(unionPolygon);

  return newGmapsPolygon;
};
