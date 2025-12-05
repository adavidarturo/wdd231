export function initMap(){
  // Basic Mapbox initialization using placeholder token
  try{
    if(typeof mapboxgl === 'undefined'){
      // Mapbox script missing — create a lightweight placeholder map
      const mapEl = document.getElementById('map');
      if(mapEl) mapEl.textContent = 'Map placeholder — add Mapbox script and token to enable.';
      return;
    }
    // Use the Mapbox token (example) — replace if you want a different token
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWRhdmlkYXJ0dXJvIiwiYSI6ImNtaWU3M2l3dzBlbGMybXByNjdjOHRmdjUifQ.06PFXM6-vOH4WqNCnae9GQ';
    // Gym (lng, lat) - Arequipa
    const gymLngLat = [-71.544904, -16.370679];
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/standard',
      projection: 'globe',
      zoom: 16,
      center: gymLngLat
    });
    map.addControl(new mapboxgl.NavigationControl());
    map.scrollZoom.disable();
    map.on('style.load', ()=> map.setFog({}));
    // Add a marker at the gym location
    new mapboxgl.Marker({color: '#E63946'}).setLngLat(gymLngLat).addTo(map);
  }catch(err){
    console.warn('Map initialization failed', err);
  }
}
