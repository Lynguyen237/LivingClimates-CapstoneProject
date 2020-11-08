// Maps API function: https://developers.google.com/maps/documentation/javascript/reference
// Initialize and add the map

  
  alert(Hello())
  
  // The location of Uluru
  // const center = { lat: 34.052235, lng: -118.243683 };
  
  // Multiple locations
  // const locations = [
  //   ['Los Angeles', 34.052235, -118.243683],
  //   ['Santa Monica', 34.024212, -118.496475],
  //   ['Redondo Beach', 33.849182, -118.388405],
  //   ['Newport Beach', 33.628342, -117.927933],
  //   ['Long Beach', 33.770050, -118.193739]
  // ];
  
  // const locations = [
  //   ['Philz Coffee<br>\
  //   801 S Hope St A, Los Angeles, CA 90017<br>\
  //  <a href="https://goo.gl/maps/L8ETMBt7cRA2">Get Directions</a>', 34.046438, -118.259653],
  //   ['Philz Coffee<br>\
  //   525 Santa Monica Blvd, Santa Monica, CA 90401<br>\
  //  <a href="https://goo.gl/maps/PY1abQhuW9C2">Get Directions</a>', 34.017951, -118.493567],
  //   ['Philz Coffee<br>\
  //   146 South Lake Avenue #106, At Shoppers Lane, Pasadena, CA 91101<br>\
  //   <a href="https://goo.gl/maps/eUmyNuMyYNN2">Get Directions</a>', 34.143073, -118.132040],
  //   ['Philz Coffee<br>\
  //   21016 Pacific Coast Hwy, Huntington Beach, CA 92648<br>\
  //   <a href="https://goo.gl/maps/Cp2TZoeGCXw">Get Directions</a>', 33.655199, -117.998640],
  //   ['Philz Coffee<br>\
  //   252 S Brand Blvd, Glendale, CA 91204<br>\
  //  <a href="https://goo.gl/maps/WDr2ef3ccVz">Get Directions</a>', 34.142823, -118.254569]
  // ];


  // The map, centered at Uluru
  // const map = new google.maps.Map(document.getElementById("map"), {
  //   zoom: 9,
  //   center: center,
  // });
  

  // infowindow variable as a new Google Maps Info Window to display a marker's information
  // let infowindow = new google.maps.InfoWindow({});


  // The marker, positioned at Uluru
  // const marker = new google.maps.Marker({
  //   position: uluru,
  //   map: map,
  // });

//   let marker, count;

//   for (count=0; count < locations.length; count++) {
//     marker = new google.maps.Marker({
//       position: new google.maps.LatLng(locations[count][1],locations[count][2]),
//       map: map,
//       title: locations[count][0]
//     });

//     google.maps.event.addListener(marker, 'hover', (function (marker, count) {
//       return function () {
//         infowindow.setContent(locations[count][0]);
//         // infowindow.open(map, marker);
//       }
//     })(marker, count));
//   }
// }