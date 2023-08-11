/**
* Cria polilinha no mapa de acordom com a api gmaps
* @param google
* @param map 
* @param shape => {id: cb.id, class: 'drain', features: data.features}
* @param shapes Variável global
*/
const usePolylines = (map, google, shape, shapes) => {
  // checar se a ´shape´ já existe na lista ´shapes´
  let s = shapes.find(sh => sh.id === shape.id);
  // setMap(map) or setMap(null) 
  if (s !== undefined) { s.features.map(p => p.setMap(map)) }

  if (s === undefined || s.id !== shape.id) {
    let polylines = [];
    shape.features.map((f) => {
      // adicionar atributos no poligono para futura utilização
      let attributes = f.attributes;
      // criar cores aleatórias para cada polilinha
      let fillColor = '#FF0000';

      const polyline = new google.maps.Polyline({
        attributes: attributes,
        path: f.geometry.rings[0][0],
        //geodesic: true,
        strokeColor: fillColor,
        strokeOpacity: 1.0,
        strokeWeight: 1,

      });
      polyline.setMap(map);
      polylines.push(polyline);
    });
    shapes.push({ id: shape.id, class: shape.class, features: polylines })
  }
};


