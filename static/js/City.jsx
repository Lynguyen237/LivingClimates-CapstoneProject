// Create a component to show each city in the searchResults as a checkbox
function City(props) {
  
  function saveFavorite(evt) {
    
    let params = {
      // month:month, //Future feature
      city_name: evt.target.id.replace("_"," "),
      lat: evt.target.dataset.lat,
      lon: evt.target.dataset.lon,
      country: evt.target.dataset.country
    }

    if (evt.target.className === "far fa-star") {
      evt.target.className = "fas fa-star";
      fetch("/save_to_session?" + new URLSearchParams(params));
    } else {
      evt.target.className = "far fa-star";
      fetch("/unsave_to_session?" + new URLSearchParams(params));
    }
  }
  
  let favoriteStatus
  const starred = "fas fa-star"; // FontAwesome default class 
  const notStarred = "far fa-star"; // FontAwesome default class 
  
  Object.keys(props.favoriteDict).includes(props.name) ? favoriteStatus = starred : favoriteStatus = notStarred

  return (
    <React.Fragment>
      <p className="city-name">
        <i className={favoriteStatus}
            data-lat={props.lat} 
            data-lon={props.lon}
            data-country={props.country} 
            id={`${props.name.replace(" ","_")}`}
            onClick={saveFavorite}>
        </i> 
          {props.name}
      </p>
    </React.Fragment>
  )
}