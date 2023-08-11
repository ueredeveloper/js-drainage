/**
 * Cria polígonos de acordo com a API do Google Maps.
 * @param {object} map Objeto representando o mapa do Google.
 * @param {object} google Objeto contendo as funcionalidades da API do Google Maps.
 * @param {object} shape Objeto representando a forma (shape) a ser criada.
 * @param {string} shape.id Identificador único da forma.
 * @param {Array<object>} shape.features Lista de features (atributos) da forma.
 * @param {Array<object>} shapes Lista de formas existentes no mapa.
 */
const usePolygons = (map, google, shape, shapes) => {
  // Verificar se a `shape` existe na lista `shapes`.
  let s = shapes.find(sh => sh.id === shape.id);

  // Adicionar ou remover os polígonos do mapa utilizando setMap(map) ou setMap(null).
  if (s !== undefined) {
    s.features.map(p => p.setMap(map));
  }
 
  if (s === undefined || s.id !== shape.id) {
    let polygons = [];
    shape.features.forEach((f, i) => {
      // Adicionar atributos que serão buscados no polígono através do método contains.
      let attributes = f.attributes;
   
      // Cor dos polígonos randomizada.
      // shape.montante ? '#ff0000' : '#' + Math.floor(Math.random() * 16777215).toString(16)
      let fillColor = '#' + Math.floor(Math.random() * 16777215).toString(16);

      // Tratar polígonos e multipolígonos de acordo com a API do Google Maps.
      let rings = f.geometry.rings.map(r => { return r[0] });

      // Criar polígono.
      const polygon = new google.maps.Polygon({
        attributes: attributes,
        paths: rings,
        strokeColor: fillColor,
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: fillColor,
        fillOpacity: 0.35,
      });

      polygon.setMap(map);
      polygons.push(polygon);
    }); 

    shapes.push({ id: shape.id, features: polygons });
  }
};
