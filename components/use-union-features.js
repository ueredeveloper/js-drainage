/**
* Unir os polígonos à montante para buscar as outorgas.
* @requires jsts 
* @param features {object[]} Features que serão unidas.
* @return retorna um polígono resultado da união de várias áreas de drenagem (polígonos)
*/
function useUnionFeatures(features) {

  console.log(features)

  let _features = features

  let f = _features.map(f => {
    return new google.maps.Polygon({
      paths: f.geometry.rings[0],
    });
  });

  if (f.length != 0) {

    var googleMaps2JSTS = function(boundaries) {
      var coordinates = [];
      for (var i = 0; i < boundaries.getLength(); i++) {
        coordinates.push(new jsts.geom.Coordinate(
          boundaries.getAt(i).lat(), boundaries.getAt(i).lng()));
      }
      return coordinates;
    };
    var jsts2googleMaps = function(geometry) {
      var coordArray = geometry.getCoordinates();
      GMcoords = [];
      for (var i = 0; i < coordArray.length; i++) {
        GMcoords.push(new google.maps.LatLng(coordArray[i].x, coordArray[i].y));
      }
      return GMcoords;
    }

    var bounds = new google.maps.LatLngBounds();

    f.forEach(sh => {
      sh.getPath().getArray().forEach(s => {
        bounds.extend(new google.maps.LatLng(s.lat(), s.lng()));
      });
    });
    map.fitBounds(bounds);

    var geometryFactory = new jsts.geom.GeometryFactory();

    let union = [];
    f.forEach(sh => {
      var JSTSpoly = geometryFactory.createPolygon(geometryFactory.createLinearRing(googleMaps2JSTS(sh.getPath())));
      JSTSpoly.normalize();
      union.push(JSTSpoly)
    });
    var JSTSpolyUnion = union[0]
    let i = 1

    while (i < union.length) {
      JSTSpolyUnion = JSTSpolyUnion.union(union[i])
      i++;
    }
    var unionShapes = jsts2googleMaps(JSTSpolyUnion);

    console.log('unionshapes', unionShapes)

    let p = new google.maps.Polygon({
      // attributes: attributes,
      paths: unionShapes,
      strokeColor: '#FFC0CB',
      strokeOpacity: 0.4,
      strokeWeight: 0.4,
      fillColor: '#FFC0CB',
      fillOpacity: 0.7,
      //map// NÃO MOSTRAR NO MAPA
    });

    return p;

  } else { return null }

}