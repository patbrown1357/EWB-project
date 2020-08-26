  var map, infowindow;
  var bounds = new Array();
  var shapes = [];
  var image = "../project/marker.png";

//   function initMap() {
//     map = new google.maps.Map(document.getElementById('map'), {
//       center: {lat: -34.42, lng: 150.90},
//       zoom: 17
//     });
//
//     //placecs addition
//     //changePlace()
//     const input = document.getElementById("pac-input");
//     const autocomplete = new google.maps.places.Autocomplete(input);
//     autocomplete.bindTo("bounds", map);
//     //specify only the data you need
//     autocomplete.setFields(["place_id","geometry","name"]);
//     map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
//
//     //setPosition()
//     infowindow = new google.maps.InfoWindow();
//
//     //geolocation interjection
//     //try geolocation getLocation()
//     if( navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(function(position){
//         var pos = {
//           lat: position.coords.latitude,
//           lng: position.coords.longitude
//         };
//         //set Position
//         infowindow.setPosition(pos);
//         infowindow.setContent('Location found.');
//         infowindow.open(map);
//         map.setCenter(pos);
//         document.getElementById("location").innerHTML = "Current Location:<br>" + pos.lat + "<br>" + pos.lng;
//       }, function() {
//         handleLocationError(true, infowindow, map.getCenter());
//     });
//   } else {
//     handleLocationError(false,infowindow,map.getCenter());
//     }
//
//
//     function handleLocationError(browserHasGeolocation, infowindow, pos) {
//       infowindow.setPosition(pos);
//       infoWundow.setContent( browserHasGeolocation ?
//         'Error: The Geolocation service failed.' :
//         'Error: Your browser doesn\'t support geolocation.');
//         infowindow.open(map);
//     }
//
//
//
//
//
//     const infowindowContent = document.getElementById("infowindow-content");
//     infowindow.setContent(infowindowContent);
//     const marker = new google.maps.Marker({map:map});
//     marker.addListener("click", () => {
//       infowindow.open(map.marker);
//     });
//
//     autocomplete.addListener("place_changed", () => {
//       infowindow.close();
//       const place = autocomplete.getPlace();
//
//       if(!place.geometry) {
//         return;
//       }
//
//       if( place.geometry.viewport) {
//         map.fitBounds(place.geometry.viewport);
//       } else {
//         map.seCenter(place.geometry.location);
//         map.setZoom(17);
//       }
//
//       //set the position of hte marker using hte place id and Location
//       marker.setPlace({
//         placeId: place.place_id,
//         location: place.geometry.location
//       });
//
//       marker.setVisible(true);
//       infowindowContent.children.namedItem("place-name").textContent = place.name;
//       infowindowContent.children.namedItem("place-id").textContent = place.place_id;
//       infowindowContent.children.namedItem("place-address").textContent = place.formatted_address;
//       infowindow.open(map,marker);
//     });
//
//
//     //modifies dom to include latitude and longitude
//     google.maps.event.addListener(map, 'mousemove', function(event) {
//       document.getElementById("p1").innerHTML = displayCoordinates(event.latLng);
//     });
//
//     function displayCoordinates(pnt) {
//       var lat = pnt.lat();
//       lat = lat.toFixed(4);
//       var lng = pnt.lng();
//       lnt = lng.toFixed(4);
//       return "<strong>Latitude:</strong> " + lat + "<br><strong>Longitude:</strong> " + lng;
//     }
//
//   //dom add marker on click currently
//     google.maps.event.addListener(map, 'click', function(event) {
//       console.log("markers work");
//       onLeftClick(event.latLng);
//    });
//
//    document.addEventListener("keypress", function(event) {
//      if (event.keyCode == 13) {
//        console.log("enter works");
//        checkEnd(bounds);
//        bounds = new Array();
//      }
//    });
//
//    // google.maps.event.addListener(map, 'keypress', function(event) {
//    //   console.log("atleast this works");
//    //   if(event.which == 13) {
//    //     console.log("this works");
//    //    checkEnd(bounds);
//    //    bounds = [{}];
//    //  }
//    // });
// }


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

function showLocation(map) {
  if( navigator.geolocation) {
    navigator.geolocation.getCurrentPosition( (position, loc) => {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      map.setCenter(pos);
    });
  } else {
    //create error function for when position can't be obtained
  }
}

function changePlace(map) {
  const input = document.getElementById("pac-input");
  const autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo("bounds", map);
  autocomplete.setFields(["place_id","geometry","name"]);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  //infowindow = new google.maps.InfoWindow();
}

 async function initMap() {
  var locCurr = {lat:"lat",lng:"lng"};
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.42, lng: 150.90},
    zoom: 17
  });

  showLocation(map);
  changePlace(map);

}

async function connectDb() {

  var MongoClient = require('mongodb').MongoClient;


  //const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://gmapjs:*Pw8C18EC@gmapjs-test.vqhbv.mongodb.net/<dbname>?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    await client.connect();
    await listDatabases(client);

  } catch(e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
  databasesList.databases.forEach(db => document.getElementById("db").innerHTML += ` - ${db.name}` + "\n");
}

connectDb();
