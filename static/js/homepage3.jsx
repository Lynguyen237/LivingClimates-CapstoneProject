function Homepage() {

    const [searchresults, UpdateSearchResults] = React.useState([])

    // function ChangeResult() {
        
    //     const tmax = document.querySelector('#tmax').value;
        
    //     return (
    //         UpdateSearchResults(tmax)
    //     )
    // }

    function CityInfo(props) {
        return (
            <React.Fragment>
                <li key={props.city_name}>{props.city_name} ({props.country}): {props.tavg} ({props.month})</li>
            </React.Fragment>
        )
    }

    const cities = [];

    // function PrintResponse(x) {
    //     for (const city of x.city) {
    //         console.log(city.city_name);
    //         cities.push(
    //             <CityInfo 
    //                 city_name={city.city_name}
    //                 country={city.country}
    //                 tavg={city.tavg}
    //                 month={city.month}
    //             />
    //         );
    //     }
    //     console.log(cities);
    // }

    for (const city of searchresults) {
        cities.push(
            <CityInfo 
                key={city.city_name}
                city_name={city.city_name}
                country={city.country}
                tavg={city.tavg}
                month={city.month}
            />
        );
    }
    
    function ShowResult() {
        
        const params = {
            tmax: document.querySelector('#tmax').value
        }
        
        // $.get('/results_test.json', formData, PrintResponse)
        // Without PrintReponse function, use this:
        // $.get('/results_test.json', formData, (response) => console.log(response));
        // $.get('/results_test.json', formData, response => { 
        //     console.log(response.city);
        //     UpdateSearchResults(response.city) } );

        // Attempt to use fetch
        // const url='/results_test.json?tmax='+ formData.tmax;

        // Use the built-in URL class to parse parse the url https://javascript.info/url
        // fetch doc https://fetch.spec.whatwg.org/#fetch-api
        var url = new URL("http://0.0.0.0:5000/results_test.json")
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
        
        
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data.city);
            UpdateSearchResults(data.city);
        });
        
    }
    // console.log(searchresults);

    return (
        <React.Fragment>
            <label hmtlfor="maxtemp">What's your ideal highest temperature?</label>
            <input id="tmax" type="number" name="tmax"/>
            <button onClick={ShowResult}>Change results</button>
            <div>{cities}</div>
        </React.Fragment>
    );
}

ReactDOM.render(<Homepage />, document.querySelector('#test'))


// Basic onClick funtion
// function HelloClicker() {
//     function alertMessage() {
//       alert('You just handled an event!');
//     }
  
//     return (
//       <button onClick={alertMessage}>
//         Click me
//       </button>
//     );
//   }
  
// ReactDOM.render(
//     <HelloClicker />,
//     document.querySelector('#test')
//   );