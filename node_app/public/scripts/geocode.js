/**
 * Use the MapBox geocoding API to find geo locations of street addresses.
 * Used for showing locations on a map.
 * @param {*} place Street address we are looking for
 * @param {*} position Starting position for a proximity search
 * @param {*} cb The callback to be executed once the position has been found
 */

const config = require('./mapbox-credentials.json');

export function geocoding(place, position = null, cb) {
  const apiToken = config.apiToken;
  let uri = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(place)}.json`
    + `?access_token=${apiToken}&country=US&language=en`;
  if (position) {
    uri += `&proximity=${position}`;
  }
  fetch(uri)
    .then(response => response.json())
    .then(json => cb(json))
    .catch(err => console.log(`Geocoding error: ${err}`));
}

export function geoCodeToIncident(geo) {
  if (geo === null || geo.features === null || geo.features.length === 0) {
    console.log('No geo information available.');
    return null;
  }
  const first = geo.features[0];
  const { text: street, address: houseNbr } = first;
  const [longitude, latitude] = first.center;
  const cityList = first.context
    .filter(x => x.id.startsWith('place.'));
  const city = (cityList.length > 0) ? cityList[0].text : '';
  return {
    ADDRESS_STREET: street,
    ADDRESS_STREET_NB: houseNbr,
    ADDRESS_CITY: city,
    LATITUDE: latitude,
    LONGITUDE: longitude,
  };
}

export function test() {
  geocoding('1231 Oella Ave', '-76.807521,39.275670', (result) => {
    console.log(result);
    console.log(geoCodeToIncident(result));
  });
}
