(function($) {
  if ($('#draggable').length > 0) {
    L.Icon.Default.imagePath = '/images';
  
    var map    = L.map('draggable');
    var layer  = new L.TileLayer('http://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png', {maxZoom: 18});
    var marker = L.marker(new L.LatLng(43.107854, -79.183083), {
      draggable: true,
      icon: L.AwesomeMarkers.icon({
          markerColor: 'red'
        })
    });
  
    map.addLayer(layer);
    map.setView([43.107854, -79.183083], 13);
    map.addLayer(marker);
    
    var $form = $('form');
    var $latitude  = $('form').find('[name="incident[latitude]"]').first();
    var $longitude = $('form').find('[name="incident[longitude]"]').first();
    var $mode      = $('form').find('[name="incident[mode]"]').first();
    var $time      = $('form').find('[name="incident[time]"]').first();
    var $weather   = $('form').find('[name="incident[weather]"]').first();
    var $category  = $('form').find('[name="incident[category]"]').first(); 
    
    $latitude.val('43.107854');
    $longitude.val('-79.183083');
    
    marker.on('dragend', function(e) {
      var marker   = e.target;
      var position = marker.getLatLng();
      
      $latitude.val(position.lat);
      $longitude.val(position.lng);
    });
  }
})(jQuery);