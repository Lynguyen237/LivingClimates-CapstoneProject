"use strict";

function Homepage() {
  
  // Create state variables
  const [searchResults, updateSearchResults] = React.useState([]);
  const [month, setMonth] = React.useState([1]);
  const [tavg, setAvgTemp] = React.useState('10to20');
  const [tmin, setMinTemp] = React.useState('');
  const [tmax, setMaxTemp] = React.useState('');
  const [continent, setContinent] = React.useState('');
  const [hasResults, setHasResults] = React.useState(false);
 

  console.log(`searchResults: ${searchResults}`)

  // const center = { lat: searchResults[0]['lat'], lng: searchResults[0]['lon'] };

  const center = {lat: 34.052235, lng: -118.243683}
  const locations = [
      ['Los Angeles', 34.052235, -118.243683],
  ];

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
      updateSearchResults(data.city) //Update the searchResults with the data from the results.json route
    })
    
    // console.log(month) // Debug if all the months are captured after the submit button is clicked
    
    
    

    // Show Map after form button is clicked
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 9,
      center: center,
    });

    console.log(map);

    let infowindow = new google.maps.InfoWindow({});

    let marker, count;

    for (count=0; count < locations.length; count++) {
      marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[count][1],locations[count][2]),
      map: map,
      title: locations[count][0]
      });

      google.maps.event.addListener(marker, 'hover', (function (marker, count) {
        return function () {
          infowindow.setContent(locations[count][0]);
        }
      })(marker, count));
    }
  }


  // Create a function to show each city in the search result as a bullet point
  function CityInfo(props) {
    return (
      <React.Fragment>
        <li>{props.city_name} ({props.country})</li>
      </React.Fragment>
    )
  }

 
  // Create an empty list for the cities
  const cities = []

  // Loop through searchResults (list of objects from /results.json),
  // create a bullet point for each city using CityInfo function
  for (const city of searchResults) {
    cities.push(
      <CityInfo
      key={city.city_name}
      city_name={city.city_name}
      country={city.country}
      />
    )
  }
  

  return (
    <React.Fragment>
      <form id="search_filter">
        {/* <input type="checkbox" value='1'/>
        <label htmlFor="January">Jan</label>
        <input type="checkbox" value='2'/>
        <label htmlFor="February">Feb</label> */}

        {/* <input type="month"/> */}

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
              <option value="Asia">Asia</option>
              <option value="Africa">Africa</option>
          </select>
        </p>

        <input type="submit" onClick={ShowResults} value="Show me the world"/>

      </form>
      <br />
      <br />
      {searchResults.length==0 && hasResults? <div>Something</div>: <div>{cities}</div> }
    </React.Fragment>
  )

}

ReactDOM.render(<Homepage />, document.querySelector('#search_results'))
