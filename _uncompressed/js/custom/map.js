// 08. Maps
var mapBox = $('#mapCanvas');
var mapZoomRaw = parseInt($('.mapZoom').text());
var mapZoom = mapZoomRaw;
var mapLatRaw = parseFloat($('.propMapLat').text());
var mapLngRaw = parseFloat($('.propMapLng').text());
var mapLat = mapLatRaw;
var mapLng = mapLngRaw;
var mapOffsetXRaw = parseFloat($('.propMapLatOffset').text());
var mapOffsetYRaw = parseFloat($('.propMapLngOffset').text());
var customMarkerIcon = '';//'/wp-content/themes/penvale/assets/images/paw.png';

if (mapBox.length) {

  var mapStyle = [
    {
      "featureType":"landscape",
      "stylers":[
        {"saturation":-100},
        {"lightness":65},
        {"visibility":"on"}
      ]},
      {
        "featureType":"poi",
        "stylers":[
          {"saturation":-100},
          {"lightness":51},
          {"visibility":"simplified"}
        ]
      },
      {
        "featureType":"road.highway",
        "stylers":[
          {"saturation":-100},
          {"visibility":"simplified"}
        ]
      },
      {
        "featureType":"road.arterial",
        "stylers":[
          {"saturation":-100},
          {"lightness":30},
          {"visibility":"on"}
        ]
      },
      {
        "featureType":"road.local",
        "stylers":[
          {"saturation":-100},
          {"lightness":40},
          {"visibility":"on"}
        ]
      },
      {
        "featureType":"transit",
        "stylers":[
          {"saturation":-100},
          {"visibility":"simplified"}
        ]
      },
      {
        "featureType":"administrative.province",
        "stylers":[
          {"visibility":"off"}
        ]
      },
      {
        "featureType":"water",
        "elementType":"labels",
        "stylers":[
          {"visibility":"on"},
          {"lightness":-25},
          {"saturation":-100}
        ]
      },
      {
        "featureType":"water",
        "elementType":"geometry",
        "stylers":[
          {"hue":"#ffff00"},
          {"lightness":-25},
          {"saturation":-97}
        ]
      },
      {
        "featureType":"poi",
        "stylers":[
          {"visibility":"off"}
        ]
      }
    ];



  if(!isNaN(mapOffsetXRaw)){
    var mapOffsetX = mapOffsetXRaw;
    //console.log('mapOffsetX = '+mapOffsetX);
  }else{
    var mapOffsetX = 0;
    //console.log('mapOffsetX = null');
  }
  if(!isNaN(mapOffsetYRaw)){
    var mapOffsetY = mapOffsetYRaw;
  }else{
    var mapOffsetY = 0;
  }


// if(mapBox.length){
  //console.log('There is a map on this page.');

  var map;// Setup the Google Maps variable

  function initialize(){

    // Call in the target latitude and longitude
    var testingLat = window.mapLat;
    var testingLng = window.mapLng;

    // Call in the desired offset, and setup the offset latitude and longitude
    var testingOffsetLat = testingLat + mapOffsetX;
    var testingOffsetLng = testingLng + mapOffsetY;

    // Declare map centre position
    var currentTarget = new google.maps.LatLng(testingLat, testingLng);
    // Declare marker position
    var currentCentre = new google.maps.LatLng(testingOffsetLat, testingOffsetLng);

    // Setup map options
    var mapOptions = {
      center:currentCentre,
      zoom: window.mapZoom,
      scrollwheel: false,
      draggable: false,
      mapTypeId:google.maps.MapTypeId.MAP,
      disableDefaultUI: true,
      styles: mapStyle,
    }

    // Make the map
    map = new google.maps.Map(document.getElementById('mapCanvas'),
      mapOptions);

    // Set the marker marker
    var marker = new google.maps.Marker({
      position: currentTarget,
      map: map,
      icon: customMarkerIcon
    });

    google.maps.event.addListener(map, 'center_changed', function() {
      // 3 seconds after the center of the map has changed, pan back to the
      // marker.
      // window.setTimeout(function() {
        map.panTo(currentCentre);
      // }, 3000);
    });

    // // Set the Street View panorama
    // var panoramaOptions = {
    //   position:currentCentre,
    //   pov: {
    //     heading: -40,
    //     pitch: 0
    //   },
    //   enableCloseButton: true
    // };
    // // var panorama = new google.maps.StreetViewPanorama(document.getElementById("mapCanvas"), panoramaOptions);
    // // map.setStreetView(panorama);


    // google.maps.event.addListener(marker, 'click', function() {
    //   // console.log('marker clicked!');
    //   var panorama = new google.maps.StreetViewPanorama(document.getElementById("mapCanvas"), panoramaOptions);
    //   // map.setStreetView(panorama);
    // });


  }

  // The standard Google Maps load trigger
  google.maps.event.addDomListener(window, 'load', initialize);
}
