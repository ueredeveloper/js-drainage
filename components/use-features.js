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
  polylines.forEach(poly => { poly.setMap(null); });
  polylines = [];

  // Buscar informações sobre a unidade hidrográfica a partir da coordenada fornecida.
  await useUHInfo({ lat: lat, lng: lng });

  // URL para buscar as áreas de drenagem no servidor.
  let url = 'https://njs-drainage-ueredeveloper.replit.app/drainage?' +
    //let url = 'http://localhost:3000/drainage?' +
    new URLSearchParams({
      lat: lat,
      lng: lng,
      uh: analises.uh.attributes.uh_codigo // atributo código da uh, ex: 37
    });

  console.log(url)

  /**
   * Buscar as áreas de drenagem no servidor.
   * @param {number} lat Latitude do ponto.
   * @param {number} lng Longitude do ponto.
   * @param {string} uh Unidade Hidrográfica.
   * @returns {Promise<Array>} Uma Promise que resolve com as informações de áreas de drenagem.
   */
  await fetch(url, { method: 'GET', })
    .then(features => {
      return features.json();
    })
    .then(features => {
      console.log(features)
      let gmapsFeatures = arcGisToGmaps(features);
      // Calcular a área total das áreas de drenagem (área de contribuição).
      analises.calcularAreaContribuicao(gmapsFeatures);

      // Renderizar polilinhas no mapa com as áreas de drenagem.
      gmapsFeatures.forEach(f => {
        polylines.push(
          new google.maps.Polyline({
            path: f.geometry.rings[0][0],
            geodesic: true,
            strokeColor: '#0000FF',
            strokeOpacity: 0.8,
            strokeWeight: 1,
            map
          })
        );
      });

      // Unir os polígonos para fazer uma única requisição no serviço REST.
      let _rings = createGmapsPolygon(features);

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
    if (shapes[i].id === 'uhs') {
      shapes[i].features.forEach(f => {
        // Verificar se a coordenada está dentro do polígono da Unidade Hidrográfica.
        if (google.maps.geometry.poly.containsLocation(latLng, f)) {
          // Converter os polígonos do formato Google Maps para ArcGIS e obter informações da UH.
          let _rings = gmapsToArcGis(f.getPath().getArray());
          analises.setUHInfo(f.attributes, _rings);
        }
      });
    }
  }
}

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
}

/**
 * Criar um polígono do Google Maps a partir de um objeto GeoJSON com multipolígonos.
 * @param {object[]} json Array de objetos GeoJSON que representam polígonos.
 * @returns {google.maps.Polygon} Objeto Polygon do Google Maps resultante da união dos polígonos.
 */
const createGmapsPolygon = (json) => {
  const featureCollection = turf.featureCollection([...json.map((coords, i) => {
    return turf.polygon(coords.geometry.rings)
  })]);

  // Convert the Turf.js feature collection to JSTS geometries
  const reader = new jsts.io.GeoJSONReader();
  const jstsGeoms = featureCollection.features.map((feature) => reader.read(JSON.stringify(feature.geometry)));

  // Verifica performance a união de polígonos
  // const union_start = Date.now();

  // Une os polígonos em um só para solicitações no servidor
  const jstsUnion = jstsGeoms.reduce((accumulator, geometry) => accumulator.union(geometry));

  // const union_end = Date.now();
  // console.log(`jsts time execution: ${(union_end - union_start) / 1000} segundos`)

  //const gmaps_start = Date.now();
  let gmapsCoords = jstsUnion.getCoordinates().map(coords => {
    return { lat: coords.y, lng: coords.x }
  });
  //const gmaps_end = Date.now();
  //console.log(`jsts to gmaps time execution: ${(gmaps_end - gmaps_start) / 1000} segundos`)

  // Criar e retornar o novo polígono do Google Maps
  const newPolygon = new google.maps.Polygon({
    paths: gmapsCoords,
    strokeColor: '#FF0000',
    strokeOpacity: 0.3,
    strokeWeight: 0.3,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
  });

  return newPolygon;
}
