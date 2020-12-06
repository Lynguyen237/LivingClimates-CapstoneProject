// Create a component to show each country in the searchResults
function Country(props) {
    const cities = Object.keys(props.cities);
    return (
      <React.Fragment>
        <h5 className="country-name">{props.name}</h5>
        {cities.map(c => (
          <City 
            key={`${c}_${props.cities[c]['iso2']}`} 
            name={c} 
            lat={props.cities[c]['lat']} 
            lon={props.cities[c]['lon']}
            country={props.name}
            iso2={props.cities[c]['iso2']}
            favoriteDict={props.favoriteDict}/>
        ))}
      </React.Fragment>
    )
  }