function initMap() {
    var map;
    var marker;
    var infowindow = new google.maps.InfoWindow();
    window.index = 0
  
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://covid19-data.p.rapidapi.com/geojson-ww",
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "covid19-data.p.rapidapi.com",
        "x-rapidapi-key": "f25776e273mshdeac69e2098339fp19fd7bjsne2f245613497"
      }
    }
    
    $.ajax(settings).done(function (response) {
      var map = new google.maps.Map(document.getElementById('mapel'), {
        zoom: 6,
        center: {lat: -33.872, lng: 151.252},
        styles: getStyles()
      });

      map.data.addGeoJson(response)
      map.data.setStyle(function(feature) {
        var color = feature.getProperty('color');
        return {
          fillColor: color,
          fillOpacity: 0,
          strokeWeight: 0
        };
      });
  
      map.data.addListener('click', function(event) {
        var feat = event.feature;
        var html = "<b>" +feat.getProperty('name') + "</b><br>" + event.feature.getProperty('active') + ' Active Cases<br>' + event.feature.getProperty('deaths') + ' Deaths<br>' + event.feature.getProperty('recovered') + ' Recovered'
        infowindow.setContent(html);
        infowindow.setPosition(event.latLng);
        infowindow.setOptions({pixelOffset: new google.maps.Size(0,-34)});
        infowindow.open(map);
     });
  
    });
      
  }
  
  function getStyles() {
    dark = localStorage.getItem('quicker')
    if (dark == 'dark') {
        $('#mapdarkmodeindicator').html('Dark')
        array = [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ]
        return array
    }
    else {
        $('#mapdarkmodeindicator').html('Light')
        array = []
        return array
    }

  }