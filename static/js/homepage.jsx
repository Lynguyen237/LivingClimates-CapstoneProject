// "use strict";
function Homepage() {
  
  // Create state variable searchResults
  const [searchResults, updateSearchResults] = React.useState([]);
  // const [month, setMonth] = React.useState([1,2]);
  // console.log(month);
  const [tavg, setAvgTemp] = React.useState('10to20');
  const [tmin, setMinTemp] = React.useState('');
  const [tmax, setMaxTemp] = React.useState('');

  // Callback function, execute when the form Submit button is clicked
  function ShowResults(evt) {

    evt.preventDefault();

    const params = {
      month: document.querySelector('#month').value,
      tavg: document.querySelector('#tavg').value,
      tmax: document.querySelector('#tmax').value,
      // tmin: document.querySelector('#tmin').value,
      tmin: tmin
    };
    
    // jQuery solution - only works if the <form></form> tag is removed
    // $.get("/results.json", params, (response) => updateSearchResults(response.city))
    
    // let url = new URL('http://0.0.0.0:5000/results.json?');
    // Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    // console.log(url)

    fetch("/results.json?" + new URLSearchParams(params), {
      mode: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then((response) => response.json())
    //Update the searchResults variable with the data from the results.json route
    .then((data) => {
      console.log(data.city);
      updateSearchResults(data.city)
    }) 

    console.log(searchResults) // Why this is printed out an empty list

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
        <p>
          <label htmlFor="month">Choose the month(s) you want to travel</label>
          {/* <select value={month} onChange={evt => setMonth(evt.target.value)} id="month" name="month" multiple> */}
          <select id="month" name="month" multiple>
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
            <label htmlFor="mintemp">What's your ideal lowest temperature?</label>
            <input value={tmin} onChange={evt => setMinTemp(evt.target.value)} id="tmin" type="number" name="tmin" />
        </p>

        <p>
            <label htmlFor="maxtemp">What's your ideal highest temperature?</label>
            <input value={tmax} onChange={evt => setMaxTemp(evt.target.value)} id="tmax" type="number" name="tmax"/>
        </p>

        <input type="submit" onClick={ShowResults} value="Show me the world"/>

      </form>
      <br />
      <br />
      <div>{cities}</div>
    </React.Fragment>
  )

}

ReactDOM.render(<Homepage />, document.querySelector('#search_results'))
