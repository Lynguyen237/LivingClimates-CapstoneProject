"use strict";

// ==== Listing favorite cities ====
function Favorites() {
  const [favoriteDict, setFavoriteDict] = React.useState({})
  
  React.useEffect(() => {
    fetch('/favorites.json')
    .then((response) => response.json())
    .then((data) => setFavoriteDict(data.favorites))
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

  return (
    <React.Fragment>
      <MapComponent title="My Favorites" favoriteDict={favoriteDict} map="map"></MapComponent>
      <br/>
      <div id="favorites">{favoriteData}</div>
    </React.Fragment>
  )
}

// ==== MAPS COMPONENT ====
function MapComponent(props) {

  const mapsdiv = React.useRef(null)

  React.useEffect( () => {
    const map = new google.maps.Map(mapsdiv.current);

    let marker;
    const bounds = new google.maps.LatLngBounds();

    if (props.favoriteDict) {
      for (const city of Object.keys(props.favoriteDict)) {
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(props.favoriteDict[city].lat,
                                          props.favoriteDict[city].lon),
          map: map,
          title: city
        });
        bounds.extend(marker.getPosition());
      }
    }
    map.fitBounds(bounds);
  }, [props.favoriteDict]);
    

  return (
    <React.Fragment>
    <h3>{props.title}</h3>
    <div ref={mapsdiv} id={props.map}></div>
    </React.Fragment>
  )
}
