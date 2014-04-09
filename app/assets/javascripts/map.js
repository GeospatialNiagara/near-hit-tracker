(function($) {  
  if ($('#map').length > 0) {
    var app = window.app = {};
    L.Icon.Default.imagePath = '/images';
  
    $(document).ready(function() {
      app.map       = L.map('map');
      app.layer     = new L.TileLayer('http://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png', { maxZoom: 18 });
      app.heatLayer = L.heatLayer([], {radius: 25, gradient: {0.4: 'aqua', 0.65: 'yellow', 1: 'pink'}});
      app.heatData  = [];
      app.cluster   = new L.MarkerClusterGroup({maxClusterRadius: 20, disableClusteringAtZoom: 16});
      app.icons     = {
        walking: L.AwesomeMarkers.icon({
          prefix:      'map-icon',
          icon:        'trail-walking',
          markerColor: 'cadetblue'
        }),
        running: L.AwesomeMarkers.icon({
          prefix:      'map-icon',
          icon:        'walking',
          markerColor: 'blue'
        }),
        cycling: L.AwesomeMarkers.icon({
          prefix:      'map-icon',
          icon:        'bicycling',
          markerColor: 'purple'
        })
      };
      app.incidents   = [];
      app.bounds      = [];
      app.settings    = {
        "category": {
          "collision": true,
          "near_collision": true,
          "hazard": true
        },
        "mode": {
          "walking": true,
          "running": true,
          "cycling": true
        },
        "time": {
          "morning": true,
          "afternoon": true,
          "evening": true,
          "night": true
        },
        "weather": {
          "sunny": true,
          "cloudy": true,
          "precipitating": true
        }
      };
    
      app.map.addLayer(app.layer);
      app.map.addLayer(app.cluster);
      app.map.addLayer(app.heatLayer);
      //map.setView([43.107854, -79.183083], 13)
    
      var request = $.ajax({
        url:  '/api/incidents',
        type: 'GET'
      });
    
      request.done(function(data) {
        for (var i = 0, max = data.length; i < max; i++) {
          var incident     = data[i];
        
          switch (incident.mode) {
            case 'walking':
              incident['icon'] = app.icons.walking;
              break;
            case 'running':
              incident['icon'] = app.icons.running;
              break;
            case 'cycling':
              incident['icon'] = app.icons.cycling;
              break;
          } 
        
          incident['marker'] = L.marker([incident.latitude, incident.longitude], { icon: incident['icon'] });
          app.incidents.push(incident);
        
          app.bounds.push([incident.latitude, incident.longitude]);
        }
      
        var bounds = new L.LatLngBounds(app.bounds);
        app.map.fitBounds(bounds);
      
        plotIncidents();
      });
    
      $('[data-category]').on('click', function(e) {
        var $self = $(this);
        $self.toggleClass('active');
      
        var category = $self.data('category');
        var value    = $self.data('value');
      
        app.settings[category][value] = $self.hasClass('active');
        plotIncidents();
      
        e.preventDefault();
      });
    });
  
    function plotIncidents() {
      app.heatData = [];
      
      for (var i = 0, max = app.incidents.length; i < max; i++) {
        var incident = app.incidents[i];
      
        if (showIncident(incident)) {
          app.cluster.addLayer(incident.marker);
          app.heatData.push([incident.latitude, incident.longitude]);
        } else {
          app.cluster.removeLayer(incident.marker);
        }
      }
      
      app.heatLayer.setLatLngs(app.heatData);
    }
  
    function showIncident(incident) {
      var show = true;
    
      if (app.settings.mode[incident.mode] === false) {
        show = false;
      }
    
      if (app.settings.category[incident.category] === false) {
        show = false;
      }
    
      if (app.settings.time[incident.time] === false) {
        show = false;
      }
    
      if (app.settings.weather[incident.weather] === false) {
        show = false;
      }
    
      return show;
    }
  }
})(jQuery);
