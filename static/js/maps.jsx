"use strict";

function MapComponent(props) {
  console.log('Map Component runs')
  const mapsdiv = React.useRef(null)

  const center = { lat: 34.052235, lng: -118.243683 };
  
  // Multiple locations
  const locations = [
    ['Los Angeles', 34.052235, -118.243683],
  ];
  console.log(props.favoriteDict)
  
  console.log('Map component ends before useEffect')
  // mapdiv is defined but not assigned
  React.useEffect( () => {
    console.log(`useEffect runs`)
    const map = new google.maps.Map(mapsdiv.current, {
    zoom: 9,
    center: center,
    });

    let marker, count;
    
    console.log(mapsdiv.current)
    console.log(`Inside useEffect: ${props.favoriteDict}`)
    for (count=0; count < locations.length; count++) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[count][1],locations[count][2]),
        map: map,
        title: locations[count][0]
      });    
      
    // for (const city of Object.keys(props.favoriteDict)) {
    //   marker = new google.maps.Marker({
    //     position: new google.maps.LatLng(props.favoriteDict[city].lat,
    //                                      props.favoriteDict[city].lon),
    //     map: map,
    //     title: city
    //   });

      // infowindow variable as a new Google Maps Info Window to display a marker's information
      google.maps.event.addListener(marker, 'hover', (function (marker, count) {
        return function () {
          infowindow.setContent(locations[count][0]);
          // infowindow.open(map, marker);
        }
      })(marker, count));
    }
    console.log(`useEffect ENDs`)
  }, []);


  return (
    <React.Fragment>
    {console.log(`Map Component Return runs ${props.title}, ${props.map}`)}
    <h3>{props.title}</h3>
    <div ref={mapsdiv} id={props.map}></div>
    {console.log('Map Component Return ends')}
    </React.Fragment>
  )
}



// ==== Listing favorite cities ====
function Favorites() {
  console.log('Favorites function runs')
  const [favoriteDict, setFavoriteDict] = React.useState([])
  
  console.log('Before Favorites useEffect')
  React.useEffect(() => {
    console.log('Fetching starts')
    fetch('/favorites.json')
    .then((response) => response.json())
    .then((data) => setFavoriteDict(data.favorites))
    console.log('Fetching done')
  },[])

  // Create an empty array of favorite cities then loop through the favoriteDict to add each city to the array
  const favoriteData = []
  const cityNameList = Object.keys(favoriteDict)
  {cityNameList.map (c => (
    favoriteData.push(<City 
                      key={c.replace(" ","_")} 
                      name={c}
                      lat={favoriteDict[c].lat}
                      lon={favoriteDict[c].lon}
                      favoriteDict={favoriteDict}
                      />)
  ))}
  console.log(favoriteDict)
  console.log('Favorites function ends')
  return (
    <React.Fragment>
      {console.log('Final return runs')}
      <MapComponent title="My Favorite" favoriteDict={favoriteDict} map="map"></MapComponent>
      <br/>
      <div id="favorites">{favoriteData}</div>
      {console.log(favoriteDict)}
      {console.log('Final return ends')}
    </React.Fragment>
  )
}

//// MAP
  // console.log('rendering the map')
  
  // const center = { lat: 34.052235, lng: -118.243683 };
  
  // // Multiple locations
  // const locations = [
  //   ['Los Angeles', 34.052235, -118.243683],
  // ];
  // // The map, centered at Uluru
  // const map = new google.maps.Map(document.getElementById("map"), {
  //   zoom: 9,
  //   center: center,
  // });
  // // infowindow variable as a new Google Maps Info Window to display a marker's information
  // let infowindow = new google.maps.InfoWindow({});
  // let marker, count;
  // for (count=0; count < locations.length; count++) {
  //   marker = new google.maps.Marker({
  //     position: new google.maps.LatLng(locations[count][1],locations[count][2]),
  //     map: map,
  //     title: locations[count][0]
  //   });
  //   google.maps.event.addListener(marker, 'hover', (function (marker, count) {
  //     return function () {
  //       infowindow.setContent(locations[count][0]);
  //       // infowindow.open(map, marker);
  //     }
  //   })(marker, count));
  // }
