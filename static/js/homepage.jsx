"use strict";

// Create a component to show each continent in the searchResults
function Continent(props) {
  // console.log(props)
  const countries = Object.keys(props.countries); // Get the keys of the object (dictionary) in an array (list)
  return (
    <React.Fragment>
      <div className="continent">
        <h3>{props.name}</h3>
      </div>
      
      {/* Use .map() method to create a new array populated with the results of calling a function on every element in the calling array */}
      {countries.map(c => (
        <Country key={c} cities={props.countries[c]} name={c} favoriteDict={props.favoriteDict}/>
      ))}
    </React.Fragment>
  )
}


// Create a component to show each country in the searchResults
function Country(props) {
  const cities = Object.keys(props.cities);
  return (
    <React.Fragment>
      <p>{props.name}</p>
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


// Create a component to show each city in the searchResults as a checkbox
function City(props) {

  function saveFavorite(evt) {
   
    let params = {
      // month:month,
      city_name:evt.target.id.replace("_"," "),
      lat:evt.target.dataset.lat,
      lon:evt.target.dataset.lon,
      country:evt.target.dataset.country
    }

    console.log(params)
    if (evt.target.checked) {
      console.log(`Home: saved ${params.city_name}`);
      fetch("/save_to_session?" + new URLSearchParams(params));
    } else {
      console.log(`Home: unsaved ${params.city_name}`);
      fetch("/unsave_to_session?" + new URLSearchParams(params));
    }
  }
  
  const isFavorite = Object.keys(props.favoriteDict).includes(props.name)

  return (
    <React.Fragment>
      <input type="checkbox" 
             data-lat={props.lat} 
             data-lon={props.lon}
             data-country={props.country}
             defaultChecked={isFavorite} 
             id={`${props.name.replace(" ","_")}`} 
             onClick={saveFavorite}/>
      <label htmlFor={`${props.name.replace(" ","_")}`}>{props.name}</label><br/>
    </React.Fragment>
  )
}


// Main Component
function Homepage() {
  
  // Create state variables
  const [searchResults, setSearchResults] = React.useState({});
  const [month, setMonth] = React.useState([1]);
  const [tavg, setAvgTemp] = React.useState('10to20');
  const [tmin, setMinTemp] = React.useState(5);
  const [tmax, setMaxTemp] = React.useState(20);
  const [continent, setContinent] = React.useState('');
  const [hasResults, setHasResults] = React.useState(false); // Set this var to true when the button is clicked
  const [favoriteDict, setFavoriteDict] = React.useState([])


  React.useEffect(() => {
    fetch('/favorites.json')
    .then((response) => response.json())
    .then((data) => setFavoriteDict(data.favorites))
  },[])

  // Callback function, execute when the form Submit button is clicked
  function ShowResults(evt) {

    evt.preventDefault(); // Prevent page reload default behavior upon form submission

    const params = {
      month: month,
      tavg: tavg,
      tmax: tmax,
      tmin: tmin, // If not using React state variables, can use JavaScript tmin: document.querySelector('#tmin').value
      continent: continent
    };
    
    // Retrieve the data from the json route given the parameters entered by users
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    fetch("/results.json?" + new URLSearchParams(params))
    .then((response) => response.json())
    .then((data) => {
      setHasResults(true);
      setSearchResults(data.results); // update the searchResults with the data from the results.json route
    }) 
    // console.log(month) // Debug if all the months are captured after the submit button is clicked
  }

  // Create an empty list to display search results on the homepage
  const data = []
  
  // Loop through searchResults (list of objects from /results.json)
  for (const cont in searchResults) {
    data.push(<Continent key={cont} name={cont} countries={searchResults[cont]} favoriteDict={favoriteDict} />)
    // console.log(data) // data is a list of React elements / components
  }


  return (
    <React.Fragment>
      <h1>Explore your ideal climates</h1>
      <form id="search_filter">

        <p>
          <label htmlFor="month">Choose the month(s) you want to travel </label>
          <select /* https://stackoverflow.com/questions/28624763/retrieving-value-from-select-with-multiple-option-in-react */
            value={month} 
            onChange={evt => {
              const selectedMonths=[];
              for (let i=0; i< evt.target.selectedOptions.length; i++) {
                selectedMonths.push(parseInt(evt.target.selectedOptions[i].value));
              }
              setMonth(selectedMonths);
            }} 
            id="month" 
            name="month"
            size="5" 
            multiple
          >
              <option value='1'>Jan</option>
              <option value='2'>Feb</option>
              <option value='3'>Mar</option>
              <option value='4'>Apr</option>
              <option value='5'>May</option>
              <option value='6'>Jun</option>
              <option value='7'>Jul</option>
              <option value='8'>Aug</option>
              <option value='9'>Sep</option>
              <option value='10'>Oct</option>
              <option value='11'>Nov</option>
              <option value='12'>Dec</option>
          </select>
        </p>

        <p>
          <label htmlFor="avgtemp">What's your ideal average temperature?</label>
          <select value={tavg} onChange={evt => setAvgTemp(evt.target.value)} id="tavg" name="tavg">
              <option value='under10'>Under 10</option>
              <option value='10to20'>Between 10-20</option>
              <option value='above20'>From 20</option>
          </select>
        </p>

        <p>
          <label htmlFor="mintemp">What's your ideal lowest temperature? </label>
          <input value={tmin} onChange={evt => setMinTemp(evt.target.value)} id="tmin" type="number" name="tmin" />
        </p>

        <p>
          <label htmlFor="maxtemp">What's your ideal highest temperature? </label>
          <input value={tmax} onChange={evt => setMaxTemp(evt.target.value)} id="tmax" type="number" name="tmax"/>
        </p>

        <p>
          <label htmlFor="continent">Which continent you want to visit? </label>
          <select value={continent} onChange={evt => setContinent(evt.target.value)} id="continent" name="continent">
              <option></option>
              <option value="Africa">Africa</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="North America">North America</option>
              <option value="Oceania">Oceania</option>
              <option value="South America">South America</option>
          </select>
        </p>

        <input type="submit" onClick={ShowResults} value="Show me the world"/>



      </form>
      <br />
      <br />
      {/* When the result is empty AND resResults == true, display error message, else display the result */}
      {Object.keys(searchResults).length == 0 && hasResults? <div> Your climate does not exist on Earth!</div> : <div>{data}</div>}
    </React.Fragment>
  )

}



// Test slider
// const {
//   Typography,
//   makeStyles,
//   withStyles,
//   Slider,
// } = MaterialUI;

// const useStyles = makeStyles({
//   root: {
//     width: 250,
//   },
// });

// function valuetext(value) {
//   return `${value}`;
// }

// function RangeSlider() {
//   const classes = useStyles();
//   const [value, setValue] = React.useState([20, 37]);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <div className={classes.root}>
//       <Typography id="range-slider" gutterBottom>
//         Temperature range
//       </Typography>
//       <Slider
//         value={value}
//         onChange={handleChange}
//         aria-labelledby="range-slider"
//         max={50}
//         getAriaValueText={valuetext}
//         valueLabelDisplay="on"
//       />
//     </div>
//   );
// }
