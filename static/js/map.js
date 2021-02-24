var latitude = "";
var longitude = "";
var map = null;

var initialZoomLevel = 15;

var muxiMarkerMessage = "Você está aqui";

getLocation();


function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getLocationSuccess);
  } else {
    x.innerHTML = "Geolocalização não é suportada pelo seu navegador";
  }
}

function getLocationSuccess(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    if (map == null) {

      setTimeout(function(){
        console.log(latitude, longitude)

        map = L.map('map').fitWorld();
        map.setView([latitude, longitude], 13)

        L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZW1hbnVlbGkiLCJhIjoiY2tna3ptc2l0MHZpejJ0cGR6MzB2dWw1ZyJ9.rSFnNj90H04hWiz_OvfdMg', {
          attribution: '&copy; Contribuidores do <a href="http://osm.org/copyright">OpenStreetMap</a>',     
          maxZoom: 18,
          tileSize: 512,
          zoomOffset: -1
        }).addTo(map);

        L.marker([latitude, longitude]).addTo(map)
        .bindPopup(muxiMarkerMessage)
      
      },6000);
      }
}


