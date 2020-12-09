// ==== MAPS COMPONENT ====
function MapComponent(props) {

    const mapsdiv = React.useRef(null)
  
    React.useEffect( () => {
      const map = new google.maps.Map(mapsdiv.current);
  
      let marker;
      const bounds = new google.maps.LatLngBounds();

      if (props.favoriteDict) {
        for (const city of Object.keys(props.favoriteDict).slice(0,10)) {
          marker = new google.maps.Marker({
            position: new google.maps.LatLng(props.favoriteDict[city].lat,
                                            props.favoriteDict[city].lon),
            map: map,
            title: city,
          });
          bounds.extend(marker.getPosition());
        }
        
        if(Object.keys(props.favoriteDict).length == 0) {
          map.setZoom(1);
          map.setCenter({lat: 0, lng: 0})
        }
        if(Object.keys(props.favoriteDict).length == 1) {    
          map.setZoom(5);
          map.setCenter(marker.getPosition())
        } 
        if(Object.keys(props.favoriteDict).length > 1) {
          map.fitBounds(bounds);
        }
      }
    }, [props.favoriteDict]);
      
  
    return (
      <React.Fragment>
        <h1>{props.title}</h1>
        <div ref={mapsdiv} id={props.map}></div>
      </React.Fragment>
    )
  }
  