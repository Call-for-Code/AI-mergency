/**
 * Use the MapBox geocoding API to find geo locations of street addresses. 
 * Used for showing locations on a map.
 * @param {*} place Street address we are looking for
 * @param {*} position Starting position for a proximity search
 * @param {*} cb The callback to be executed once the position has been found
 */
export function geocoding(place, position = null, cb) {
  const apiToken = 'pk.eyJ1IjoiYWktbWVyZ2VuY3kiLCJhIjoiY2pqeWYzNDNhMDBkajN2cDFzaDAzcXdyNSJ9.8x3mLwy3f72sZHuYkaygcg';
  let uri = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(place)}.json`
    + `?access_token=${apiToken}&country=US&language=en`;
  if (position) {
    uri += `&proximity=${position}`;
  }
  fetch(uri)
    .andThen(response => response.json())
    .andThen(json => cb(json));
}

export function test() {
  geocoding('8020 Main Street', '-76.807521,39.275670', (result) => {
    const first = result.features[0];
    const { center, geometry, context } = first;
    console.log(`center: ${center}`);
    console.log(`geometry: ${geometry}`);
    console.log(`context: ${context}`);
  });
}
