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
  
      if (evt.target.checked) {
        fetch("/save_to_session?" + new URLSearchParams(params));
      } else {
        fetch("/unsave_to_session?" + new URLSearchParams(params));
      }
    }
    
    const isFavorite = Object.keys(props.favoriteDict).includes(props.name)
  
    return (
      <React.Fragment>
        <ReactBootstrap.Form.Group controlId="formBasicCheckbox">
          <ReactBootstrap.Form.Check type="checkbox" label={props.name} 
            data-lat={props.lat} 
            data-lon={props.lon}
            data-country={props.country}
            defaultChecked={isFavorite} 
            id={`${props.name.replace(" ","_")}`}
            onClick={saveFavorite}
          />
        </ReactBootstrap.Form.Group>
      </React.Fragment>
    )
  }