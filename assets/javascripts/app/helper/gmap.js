app.helper.gmap = (function(window, document, $, self, undefined){

  self.maps = [];
  self.MIN_ZOOM = 12;

  self.load = function(){
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://maps.googleapis.com/maps/api/js?sensor=false&callback=app.helper.gmap.loaded";
    document.body.appendChild(script);
  };

  self.loaded = function(){
    self.ready = true;
    self.init();
  };

  self.init = function(){
    if (! self.ready) return;

    var id = 0;

    $('.gmap').each(function(){
      $(this).find('.gmap-inner').append($('<div class="gmap-canvas" id="gmap-dynamic'+id+'"></div>'));
      $(this).attr('data-gmap-id', id);

      var markerImage = "assets/images/gmap-marker.png";
      if ($(this).attr('data-marker')) markerImage = $(this).attr('data-marker');
      
      var mapOptions = {
        center: null,
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      var map = new google.maps.Map(document.getElementById('gmap-dynamic'+id), mapOptions);

      if ($(this).attr('data-locations')) {
        var latLngList = new Array();
        var bounds = new google.maps.LatLngBounds();
        var locations = $.parseJSON($(this).attr('data-locations'));

        for (var i = 0; i < locations.length; i++) {
          var myLatlng = new google.maps.LatLng(locations[i].lat, locations[i].lng);

          latLngList.push(myLatlng);
          bounds.extend(myLatlng);

          var directionsService = new google.maps.DirectionsService();
          var directionsDisplay = new google.maps.DirectionsRenderer();

          var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            icon: markerImage
          });

          if (locations[i].link) {
            self.addLink(marker, locations[i].link);
          }

          if (locations[i].detail) {
            self.addDetail(map, marker, locations[i].detail);
          }

          directionsDisplay.setMap(map);
        }

        map.fitBounds(bounds);

        if (locations.length <= 1) {
          self.zoom(map, self.MIN_ZOOM);
        }
      }

      // store map options
      var storedMap = {};
      storedMap.map = map;
      storedMap.bounds = bounds;
      storedMap.locations = locations;
      storedMap.options = mapOptions;
      storedMap.directionsService = directionsService;
      storedMap.directionsDisplay = directionsDisplay;

      self.maps[id] = storedMap;

      id++;
    });
  };

  self.addLink = function(marker, url){
    google.maps.event.addListener(marker, 'click', function() {
      window.location.href = url;
    });
  };

  self.addDetail = function(map, marker, detail){
    google.maps.event.addListener(marker, 'click', function() {
      var infoWindow = new google.maps.InfoWindow({
        maxWidth: 600,
        content: detail
      }).open(map, marker);
    });
  };

  self.resize = function(){
    var i, map, len;
    for (i = 0, len = self.maps.length; i < len; i++) {
      map = self.maps[i].map;
      google.maps.event.trigger(map, 'resize');
    }
  };

  self.center = function(){
    var i, map, len;
    for (i = 0, len = self.maps.length; i < len; i++) {
      map = self.maps[i].map;

      if (self.maps[i].bounds) {
        map.fitBounds(self.maps[i].bounds);

        if (self.maps[i].locations.length <= 1) {
          self.zoom(map, self.MIN_ZOOM);
        }
      }
    }
  };


  self.zoom = function(map, zoom){
    var listener = google.maps.event.addListener(map, "idle", function() { 
      if (map.getZoom() > zoom) map.setZoom(zoom);
      google.maps.event.removeListener(listener); 
    });
  };


  self.fit = function(mapID, latLng){
    var index = parseFloat( mapID.replace('gmap-dynamic', '') );
    var data = self.maps[index];
    var map = data.map;

    var bounds = new google.maps.LatLngBounds();
    bounds.extend(latLng);
    map.fitBounds(bounds);

    self.zoom(map, self.MIN_ZOOM);
  };

  return self;

})(window, window.document, jQuery, {});