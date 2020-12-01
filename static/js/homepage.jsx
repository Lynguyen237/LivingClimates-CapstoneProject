"use strict";

// Create a component to show each continent in the searchResults
function Continent(props) {
 
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
  const [tavgLow, setTavgLow] = React.useState(15);
  const [tavgHigh, setTavgHigh] = React.useState(27);
  const [continent, setContinent] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [hasResults, setHasResults] = React.useState(false); // Set this var to true when the button is clicked
  const [favoriteDict, setFavoriteDict] = React.useState([])


  React.useEffect(() => {
    fetch('/favorites.json')
    .then((response) => response.json())
    .then((data) => setFavoriteDict(data.favorites))
  },[])


  // ==== Slider Component ==== https://material-ui.com/api/slider/
  
  const changeMinMax = (event, newValue) => {
    document.querySelector('#tavgLow').value = newValue[0]
    document.querySelector('#tavgHigh').value = newValue[1]
    // setTavgLow(newValue[0])
    // setTavgHigh(newValue[1])
  }

  const {
    Typography,
    makeStyles,
    Slider,
  } = MaterialUI;
  
  
  const useStyles = makeStyles({
    root: {
      width: 300,
    },
  });
  
  const marks = [
    {
      value: 0,
      label: '0°C',
    },
    {
      value: 20,
      label: '20°C',
    },
    {
      value: -20,
      label: '-20°C',
    },
  ];

  function valuetext(value) {
    return `${value}`;
  }
  function RangeSlider() {
    const classes = useStyles();
    const [value, setValue] = React.useState([tavgLow, tavgHigh]);
    // const [value, setValue] = React.useState([tavgLow, tavgHigh]);
    
    const handleChange = (event, newValue) => {
      setValue(newValue);
      // setTavgLow(newValue[0]);
      // setTavgHigh(newValue[1])
    };
  
    return (
      <div className={classes.root}>
        {/* <Typography id="range-slider" gutterBottom>
          Your ideal average temperature (°C)
        </Typography> */}
        <br/>
        <br/>
        <Slider
          value={value}
          onChange={handleChange}
          onChangeCommitted={changeMinMax}
          aria-labelledby="range-slider"
          min={-50}
          max={60}
          marks={marks}
          getAriaValueText={valuetext}
          valueLabelDisplay="on"
        />
      </div>
    );
  }
  // ==== End of Slider component ====


  // ==== Callback function, execute when the form Submit button is clicked ====
  function ShowResults(evt) {

    evt.preventDefault(); // Prevent page reload default behavior upon form submission

    setTavgLow(document.querySelector('#tavgLow').value) // Set new tavgLow and tavgHigh
    setTavgHigh(document.querySelector('#tavgHigh').value)

    const params = {
      month: month,
      tavgLow: document.querySelector('#tavgLow').value,
      tavgHigh: document.querySelector('#tavgHigh').value,
      continent: continent,
      country: country
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
  }


  return (
    <React.Fragment>
      <h1>Explore your ideal climates</h1>
      <ReactBootstrap.Form id="search_filter">

        <ReactBootstrap.Form.Group controlId="exampleForm.ControlSelect2">
        <ReactBootstrap.Form.Label>Month(s) you want to travel</ReactBootstrap.Form.Label>
        {/* https://stackoverflow.com/questions/28624763/retrieving-value-from-select-with-multiple-option-in-react */}
        <ReactBootstrap.Form.Control id="month-bootstrap" name="month" as="select" multiple
          value={month} 
          onChange={evt => {
            const selectedMonths=[];
            for (let i=0; i< evt.target.selectedOptions.length; i++) {
              selectedMonths.push(parseInt(evt.target.selectedOptions[i].value));
            }
            setMonth(selectedMonths);
          }}
        >
          <option value='1'>January</option>
          <option value='2'>February</option>
          <option value='3'>March</option>
          <option value='4'>April</option>
          <option value='5'>May</option>
          <option value='6'>Jun</option>
          <option value='7'>July</option>
          <option value='8'>August</option>
          <option value='9'>Septempber</option>
          <option value='10'>October</option>
          <option value='11'>November</option>
          <option value='12'>December</option>
        </ReactBootstrap.Form.Control>
        </ReactBootstrap.Form.Group>

        
        <ReactBootstrap.Form.Label>Your ideal average temperature (°C)</ReactBootstrap.Form.Label>
        <RangeSlider/>


        <p hidden>
          <label htmlFor="mintemp">What's your ideal lowest temperature? </label>
          <input value={tavgLow} onChange={evt => setTavgLow(evt.target.value)} id="tavgLow" type="number" name="tavgLow"/>
        </p>

        <p hidden>
          <label htmlFor="maxtemp">What's your ideal highest temperature? </label>
          <input value={tavgHigh} onChange={evt => setTavgHigh(evt.target.value)} id="tavgHigh" type="number" name="tavgHigh"/>
        </p>

        <p>
          <label htmlFor="continent">Which continent do you want to visit? </label>
          <select value={continent} onChange={evt => setContinent(evt.target.value)} id="continent" name="continent">
              <option ></option>
              <option value="Africa">Africa</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="North America">North America</option>
              <option value="Oceania">Oceania</option>
              <option value="South America">South America</option>
          </select>
        </p>

        <p>
          <label htmlFor="country">Which country do you want to visit? </label>
          <select value={country} onChange={evt => setCountry(evt.target.value)} id="country" name="country">
              <option></option>
              <option value="Japan">Japan</option>
              <option value="Indonesia">Indonesia</option>
          </select>
        </p>
        <ReactBootstrap.Button id="search-button" onClick={ShowResults}>Show me the world</ReactBootstrap.Button>{' '}

        
      </ReactBootstrap.Form>

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
//         Your ideal average temperature
//       </Typography>
//       <br/>
//       <br/>
//       <Slider
//         value={value}
//         onChange={handleChange}
//         aria-labelledby="range-slider"
//         max={60}
//         getAriaValueText={valuetext}
//         valueLabelDisplay="on"
//       />
//     </div>
//   );
// }
