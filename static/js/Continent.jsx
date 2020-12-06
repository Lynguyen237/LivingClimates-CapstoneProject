// Create a component to show each continent in the searchResults
function Continent(props) {
 
    const countries = Object.keys(props.countries); // Get the keys of the object (dictionary) in an array (list)
    return (
      <React.Fragment>
        <h3 className="continent-name">{props.name}</h3>
        {/* Use .map() method to create a new array populated with the results of calling a function on every element in the calling array */}
        {countries.map(c => (
          <Country key={c} cities={props.countries[c]} name={c} favoriteDict={props.favoriteDict}/>
        ))}
      </React.Fragment>
    )
  }