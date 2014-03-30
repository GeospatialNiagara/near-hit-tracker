(function($) {
  window.app = {
    settings: {
      imgPath: '/assets',
      tiles:   'http://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png',
      zoom:    13,
      maxZoom: 18
    },
    coords: [43.107854, -79.183083],
    incidents: []
  };

  $(document).ready(function() {
    var map = L.map('map');

    // Set path to icons.
    L.Icon.Default.imagePath = app.settings.imgPath;

    // Create and add tile layer.
    var layer = new L.TileLayer(app.settings.tiles, { maxZoom: app.settings.maxZoom });
    map.addLayer(layer);
    map.setView(app.coords, app.settings.zoom);

    // Populate the map
    var request = $.ajax({
      url:  '/api/incidents',
      type: 'GET'
    });

    request.done(function(data) {
      app.incidents = data;
      _.each(app.incidents, function(incident) {
        var marker = L.marker([incident.latitude, incident.longitude]);
        map.addLayer(marker);
      });
    });
  });
})(jQuery);
