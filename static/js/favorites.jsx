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
                      lat={favoriteDict[c].lat} // To add info to the element only
                      lon={favoriteDict[c].lon} // To add info to the element only
                      favoriteDict={favoriteDict}
                      />)
  ))}

  return (
    <React.Fragment>
      <div className="container">
      <MapComponent title="My Favorites" favoriteDict={favoriteDict} map="map"></MapComponent>
      <br/>
      <div className="results" id="favorites">
        <p className="side-notes">Your favorites will be saved until you clear cache & cookies in your browser.</p>
        {favoriteData}
      </div>
      </div>
    </React.Fragment>
  )
}

