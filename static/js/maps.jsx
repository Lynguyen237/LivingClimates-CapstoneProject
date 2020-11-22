"use strict";

function MapComponent(props) {
  console.log('rendering the map')
  
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
  
  return (
    <div id="map">
      <h3>My Favorites</h3>
    </div>
  )
}



// ==== Listing favorite cities ====
function City(props) {
  // function saveFavorite(evt) {
   
  //   let params = {
  //     // month:month,
  //     city_name:evt.target.id.replace("_"," "),
  //   }

  //   if (evt.target.checked) {
  //     console.log(`Maps: saved ${params.city_name}`);
  //     fetch("/save_to_session?" + new URLSearchParams(params));
  //   } else {
  //     console.log(`Maps: saved ${params.city_name}`);
  //     fetch("/unsave_to_session?" + new URLSearchParams(params));
  //   }
  // }

  let isFavorite = Object.keys(props.favoriteList).includes(props.name)

  return (
    <React.Fragment>
      <input type="checkbox"
             id={`${props.name.replace(" ","_")}`}
             defaultChecked={isFavorite}>
             {/* onClick={saveFavorite}>  */}
      </input>
      <label htmlFor={`${props.name}`}>{props.name}</label><br/>
    </React.Fragment>
  )
}


function Favorites() {
  const [favoriteList, setFavoriteList] = React.useState([])
  
  React.useEffect(() => {
    fetch('/favorites.json')
    .then((response) => response.json())
    .then((data) => setFavoriteList(data.favorites))
  },[])

  // Create an empty array of favorite cities then loop through the favoriteList to add each city to the array
  const favorites = []
  for (const city of Object.keys(favoriteList)) {
    favorites.push(<City key={city.replace(" ","_")} name={city} favoriteList={favoriteList}/>)
  }

  return (
    <React.Fragment>
      <div id="favorites">{favorites}</div>
    </React.Fragment>
  )
}

// ReactDOM.render(<Favorites />, document.querySelector('#favorites'))