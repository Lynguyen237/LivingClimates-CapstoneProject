"use strict";

function MapComponent(props) {
  const mapdiv = React.useRef(null)

  console.log('rendering the map')
  
  const center = { lat: 34.052235, lng: -118.243683 };
  
  // Multiple locations
  const locations = [
    ['Los Angeles', 34.052235, -118.243683],
  ];

  // mapdiv is defined but not assigned
  // infowindow variable as a new Google Maps Info Window to display a marker's information

  React.useEffect( () => {
    const map = new google.maps.Map(mapdiv.current, {
    zoom: 9,
    center: center,
    });

    let marker, count;

    for (count=0; count < locations.length; count++) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[count][1],locations[count][2]),
        map: map,
        title: locations[count][0]
      });

      google.maps.event.addListener(marker, 'hover', (function (marker, count) {
        return function () {
          infowindow.setContent(locations[count][0]);
          // infowindow.open(map, marker);
        }
      })(marker, count));
    }
  }, []);


  return (
    <React.Fragment>
    <h3>My Favorites</h3>
    <div ref={mapdiv} id="map"></div>
    </React.Fragment>
  )
}



// ==== Listing favorite cities ====
function Favorites() {
  const [favoriteDict, setFavoriteDict] = React.useState([])
  
  React.useEffect(() => {
    fetch('/favorites.json')
    .then((response) => response.json())
    .then((data) => setFavoriteDict(data.favorites))
  },[])

  // Create an empty array of favorite cities then loop through the favoriteDict to add each city to the array
  const favoriteData = []
  for (const city of Object.keys(favoriteDict)) {
    favoriteData.push(<City 
                      key={city.replace(" ","_")} 
                      name={city}
                      lat={favoriteDict[city].lat}
                      lon={favoriteDict[city].lon}
                      favoriteDict={favoriteDict}
                      />)
  }

  return (
    <React.Fragment>
      <div id="favorites">{favoriteData}</div>
      {/* <MapComponent ></MapComponent> */}
    </React.Fragment>
  )
}

