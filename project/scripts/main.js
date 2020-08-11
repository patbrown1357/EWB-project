  var map, infoWindow;
  var bounds = new Array();
  var shapes = [];
  var image = "../project/blackdot.png";
  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.42, lng: 150.90},
      zoom: 17
    });

    infoWindow = new google.maps.InfoWindow;

    //try geolocation
    if( navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position){
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        infoWindow.open(map);
        map.setCenter(pos);
        document.getElementById("location").innerHTML = "Current Location:<br>" + pos.lat + "<br>" + pos.lng;
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    handleLocationError(false,infoWindow,map.getCenter());
    }


    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWundow.setContent( browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
    }

    //modifies dom to include latitude and longitude
    google.maps.event.addListener(map, 'mousemove', function(event) {
      document.getElementById("p1").innerHTML = displayCoordinates(event.latLng);
    });

    function displayCoordinates(pnt) {
      var lat = pnt.lat();
      lat = lat.toFixed(4);
      var lng = pnt.lng();
      lnt = lng.toFixed(4);
      return "<strong>Latitude:</strong> " + lat + "<br><strong>Longitude:</strong> " + lng;
    }

  //dom add marker on click currently
    google.maps.event.addListener(map, 'click', function(event) {
      console.log("markers work");
      onLeftClick(event.latLng);
   });

   document.addEventListener("keypress", function(event) {
     if (event.keyCode == 13) {
       console.log("enter works");
       checkEnd(bounds);
       bounds = new Array();
     }
   });

   // google.maps.event.addListener(map, 'keypress', function(event) {
   //   console.log("atleast this works");
   //   if(event.which == 13) {
   //     console.log("this works");
   //    checkEnd(bounds);
   //    bounds = [{}];
   //  }
   // });
}


function onLeftClick(pnt) {
    var marker = new google.maps.Marker({
      position:pnt,
      map:map,
      icon:image
    });
    bounds.push({lat:pnt.lat(), lng:pnt.lng()});
    document.getElementById('bounds').innerHTML += "{ " + pnt.lat() + ", " + pnt.lng() + " }<br>";
}

function checkEnd(perim) {
  var shape = new google.maps.Polygon({
    paths: perim,
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35
  });
  shape.setMap(map);
  shapes.push(shape);
  document.getElementById('bounds').innerHTML = "";
}
