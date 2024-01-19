/**
 * Cria polilinhas de rios e adiciona infowindow com informações do rio.
 *
 * @param {google.maps.Map} map - Objeto do Google Maps representando o mapa.
 * @param {Object} google - Objeto contendo as funcionalidades do Google Maps.
 * @param {Object} features - Objeto contendo informações das features dos rios.
 * @param {Array} shapes - Lista de shapes existentes no mapa.
 * @returns {Promise<void>}
 */
const usePolylinesRivers = async (map, google, features, shapes) => {

  // Checa se a 'shape' já existe na lista 'shapes'
  let s = shapes.find(sh => sh.id === features.id);

  // Seta ou remove do mapa, setMap(map) ou setMap(null)
  if (s !== undefined) { s.features.map(p => p.setMap(map)) }

  // Adiciona no mapa novas polilinhas
  if (s === undefined || s.id !== features.id) {
    let polylines = [];

    if (features) {
      features.features.map(feature => {

        const contentString =
       `
       <h3> Informações do Rio</h3>
       <p>Nome: ${feature.properties.nome}</p>
       <p>Afluente Esquerda: ${feature.properties.aflu_esq}</p>
       <p>Afluente Direita: ${feature.properties.aflu_dir}</p>
       <p>RA: ${feature.properties.ra}</p>
       <p>Extensão: ${feature.properties.extensao}</p>
       <p>Perene: ${feature.properties.perene}</p>
       `;

        const infowindow = new google.maps.InfoWindow({
          content: contentString,
          ariaLabel: feature.properties.nome,
        });

        if (feature.geometry.type === 'MultiLineString') {

          feature.geometry.coordinates.map(coordinates => {

            let strokeColor = '#' + Math.floor(Math.random()*16777215).toString(16);

            const polyline = new google.maps.Polyline({

              path: coordinates.map(coords => { return { lat: coords[1], lng: coords[0] } }),
              //geodesic: true,
              strokeColor: strokeColor,
              strokeOpacity: 1.0,
              strokeWeight: 4,

            });

            polyline.addListener('click', (e) => {
              console.log('clicked', e.latLng)
              infowindow.open({
                map
              });
              infowindow.setPosition(e.latLng);
            });

            polyline.setMap(map);
            polylines.push(polyline);

          })

        } else {

          let strokeColor = '#' + Math.floor(Math.random()*16777215).toString(16);

          const polyline = new google.maps.Polyline({

            path: feature.geometry.coordinates.map(coords => { return { lat: coords[1], lng: coords[0] } }),
            //geodesic: true,
            strokeColor: strokeColor,
            strokeOpacity: 1.0,
            strokeWeight: 4,

          });

          polyline.addListener('click', (e) => {
            
            infowindow.open({
              map
            });
            infowindow.setPosition(e.latLng);
          });
          
          polyline.setMap(map);
          polylines.push(polyline);

        }

        shapes.push({ id: features.id, class: '', features: polylines })
      })
    }

  }
}
