
/**
*  Buscar outorgas que existem dentro de um polígono através do arcgis rest service.
*  @param {object[]} rings Lista de coordenadas
*/
async function usePointsInPolygon(rings) {

  console.log('rings - findSuperficialPointsInsidePolygon', rings)

  let features = await fetch('https://njs-drainage.ueredeveloper.repl.co/findSuperficialPointsInsidePolygon',
    {
      method: 'POST',
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(rings[0]),
    }).then(response => {
      return response.json();
    })
    

  features.map((f, i)=>{ if (i===0) console.log(f.q_seg_abr)})

  

  // mostrar informação sobre o ponto, como usuario, coordenadas...
  let infowindow = new google.maps.InfoWindow({});

  await features.forEach(feature => {
    // algumas latitudes e logitudes estão nulas no banco, não criar marcador com elas
    if (feature.latitude !== null) {

      // criar um marcador para o ponto encontrado.
      let marker = new google.maps.Marker({
        attributes: feature,
        position: { lat: parseFloat(feature.latitude), lng: parseFloat(feature.longitude) },
        // não mostrar no mapa, só mostrar os marcadores relacionados com a área de drenagem
        // map,
      });
      // ao clicar no marcador, mostrar informacoes sobre o ponto encontrado dentro do poligono (rings).
      marker.addListener("click", () => {
        infowindow.setMap(null);
        // let point = feature;
        infowindow.setContent(
          // setInfoWindowContent(point)
          // colocar tipo outorga, se prévia, direito de uso
          '<div><h2>' + feature.usuario + '</h2>' +
          '<p> <b>Processo:</b> ' + feature.num_proces + '</p>' +
          '<p><b>latitude:</b> ' + feature.latitude +
          ', <b>longitude:</b> ' + feature.longitude + '</p></div>'
        )
        infowindow.open({
          anchor: marker,
          map,
          shouldFocus: false,
        });
      });
      analises.uh.outorgas.push(marker);
    } else {
      // enviar para o lucas coordenadas nulas no banco
      ////console.log(feature.attributes.OBJECTID, feature.USUARIO, feature.attributes.NUM_PROCES, feature.attributes.Latitude, feature.attributes.Longitude)
    }
  })

  analises.uh.outorgas.forEach(m => {
    if (google.maps.geometry.poly.containsLocation(m.getPosition(), analises.secao.area_contribuicao.rings)) {
      // mostrar os marcadores dentro das áreas de drenagem
      m.setMap(map);
      analises.secao.outorgas.push(m)
    }
  });

  modificarValoresDosElementos();

  atualizarTabelaOutorgas('tb_outorgas', analises.secao.outorgas)

  // criar line chart
  createUpChart('up_chart', analises.secao);

  // criar line chart
  createUHChart('uh_chart', analises.uh);

} // fim usePoinstInsidePolygon


