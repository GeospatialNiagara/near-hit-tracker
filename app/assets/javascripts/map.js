(function($) {
  window.app = {
    settings: {
      imgPath: '/assets',
      tiles:   'http://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png',
      zoom:    13,
      maxZoom: 18
    },
    coords: [43.107854, -79.183083],
    markers: {
      walking: L.AwesomeMarkers.icon({
        prefix: 'map-icon',
        icon: 'trail-walking',
        markerColor: 'blue'
      }),
      running: L.AwesomeMarkers.icon({
        prefix: 'map-icon',
        icon: 'walking',
        markerColor: 'red'
      }),
      cycling: L.AwesomeMarkers.icon({
        prefix: 'map-icon',
        icon: 'bicycling',
        markerColor: 'green'
      })
    },
    incidents: [],
    intensities: [],
    bounds: []
  };

  $(document).ready(function() {
    var map = L.map('map');

    // Set path to icons.
    L.Icon.Default.imagePath = app.settings.imgPath;

    // Create and add tile layer.
    var layer = new L.TileLayer(app.settings.tiles, { maxZoom: app.settings.maxZoom });
    map.addLayer(layer);
    map.setView(app.coords, app.settings.zoom);
    
    var heatMap = L.heatLayer([], { radius: 75 }).addTo(map);

    // Populate the map
    var request = $.ajax({
      url:  '/api/incidents',
      type: 'GET'
    });

    request.done(function(data) {
      app.incidents = data;
      
      for (var i = 0, max = app.incidents.length; i < max; i++) {
        var incident = app.incidents[i];
        var icon     = app.markers.walking;
        var marker;
        
        switch (incident.mode) {
          case 'walking':
            icon = app.markers.walking;
            break;
          case 'running':
            icon = app.markers.running;
            break;
          case 'cycling':
            icon = app.markers.cycling;
            break;
        }
        
        marker = L.marker([incident.latitude, incident.longitude], { icon: icon });
        map.addLayer(marker);
        
        heatMap.addLatLng([incident.latitude, incident.longitude]);
        app.bounds.push([incident.latitude, incident.longitude]);
      }
      
      var bounds = new L.LatLngBounds(app.bounds);
      map.fitBounds(bounds);
    }); 
  });
})(jQuery);
