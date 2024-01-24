let n = 0
/**
* Movimentoar o slide para a próxima div
*
*
*/
function goSlide() {
  n = n + 1;
  if (n > 2) {
    n = 0
  }
  let d = document.getElementsByClassName('sl')
  for (let i = 0; i < d.length; i++) {
    d[i].style.display = "none"
  }
  d[n].style.display = 'block'
}
/**
* Movimentar o slide para a div anterior
*
*
*/
function turnSlide() {
  n = n - 1;
  if (n < 0) n = 2;
  let d = document.getElementsByClassName('sl')
  for (let i = 0; i < d.length; i++) {
    // console.log('i', i)
    d[i].style.display = "none"
  }
  d[n].style.display = 'block'
}
/**
*  Copiar o texto dos inputs de latitude e longitude
*  @return string, ex: -15.55555, -47.65565
*/
function copyLatLng(idLat, idLng) {
  const elem = document.createElement('textarea');
  elem.value = document.getElementById(idLat).value + ',' + document.getElementById(idLng).value;
  document.body.appendChild(elem);
  elem.select();
  document.execCommand('copy');
  document.body.removeChild(elem);
}
/**
*  Converter o formato obtido no arcgis rest servie - [[-47,-15]] - para o formato da gmaps api - [{lat: ..., lng: ...}]
*  @param {object[]} features  Array no formato arcgis rest service, ex:  [[[-47,-15], ...]] 
*  @returns {object[]} gmaps Array no formato gmaps api, ex: [[{lat: ..., lng: ...}, ]]
*/
const arcGisToGmaps = (features) => {

  let gmaps = [];
  features.forEach(f => {
    let attributes = f.attributes
    let geometry = { rings: [] }
    f.geometry.rings.forEach((rr, i) => {
      let rings = [[]]
      rr.forEach(r => {
        rings[0].push({ lat: r[1], lng: r[0] });
      });
      geometry.rings.push(rings);
    });
    gmaps.push({ attributes, geometry });
  });

  return gmaps;
}

/**
*  Converter uma união de shapes feita na jtst com formato do gmaps api para o formato que possa ser utilizado na arcgis rest service.
*  @param {object[]} rings Array com coordenadas no formato gmaps api, ex: [{lat: -17, lng: -47},...]
*  @returns {object[]} toArcGis Array no formato Arg Gis, ex: [[[-47...,-15...],...,[-48...,-16...]]]
*/
const gmapsToArcGis = (rings) => {
  // arcGis = [[]] => [[[-47,-16], [-47,-17], [-47,-18]]]
  let arcGis = [[]];
  rings.forEach(r => {
    // adicionar tudo na posição 0 da array.
    arcGis[0].push([r.lng(), r.lat()])
  })
  return arcGis;
}
/**
* Limpar os pontos outorgados à montante (analises.montante.m) e os pontos outorgados na unidade hidrográfica (analises.uh.m)
*/

function clearPoints() {
  analises.secao.outorgas.forEach(m => m.setMap(null));
  analises.uh.outorgas.forEach(m => m.setMap(null));

  console.log(analises)
  if (analises.ll.marker !== null) {
    analises.ll.marker.setMap(null);
  }
  analises.uh.outorgas = [];
  //analises.gwf.uh.sf = []
  analises.secao.outorgas = [];
  //analises.gwf.upstream.sf = [];
}

