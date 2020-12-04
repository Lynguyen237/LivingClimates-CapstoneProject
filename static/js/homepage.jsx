"use strict";

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


// Main Component
function Homepage() {
  
  // Create state variables
  const [searchResults, setSearchResults] = React.useState({});
  const [month, setMonth] = React.useState([3]);
  const [tavgLow, setTavgLow] = React.useState(15);
  const [tavgHigh, setTavgHigh] = React.useState(27);
  const [continent, setContinent] = React.useState('');
  const [iso2, setIso2] = React.useState('');
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
    makeStyles,
    Slider,
  } = MaterialUI;
  
  
  const useStyles = makeStyles({
    root: {
      width: 300,
      color: '#52af77',
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
    
    const handleChange = (event, newValue) => {
      setValue(newValue);
      // setTavgLow(newValue[0]);
      // setTavgHigh(newValue[1])
    };
  
    return (
      <div id="slider" className={classes.root}>
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
      iso2: iso2
    };
    
    // Retrieve the data from the json route given the parameters entered by users
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    fetch("/results.json?" + new URLSearchParams(params))
    .then((response) => response.json())
    .then((data) => {
      setHasResults(true);
      setSearchResults(data.results); // update the searchResults with the data from the results.json route
    }) 
  }

  const data = [] // Create an empty list to display search results on the homepage
  
  // Loop through searchResults (list of objects from /results.json)
  for (const cont in searchResults) {
    data.push(<Continent key={cont} name={cont} countries={searchResults[cont]} favoriteDict={favoriteDict} />)
  }


  return (
    <React.Fragment>
      <br/>
      <ReactBootstrap.Container fluid className="homepage">
      <div className="container" id="search_form">
        <h1>Explore your ideal climates</h1>
     
      <ReactBootstrap.Form>

        <ReactBootstrap.Form.Group controlId="month_group">
          <ReactBootstrap.Form.Label>Travel Month(s)</ReactBootstrap.Form.Label>
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
        
        <ReactBootstrap.Form.Group controlId="slider_group">
          <ReactBootstrap.Form.Label>Ideal average temperature (°C)</ReactBootstrap.Form.Label>
          <RangeSlider/>
        </ReactBootstrap.Form.Group>


        <p hidden>
          <label htmlFor="mintemp">What's your ideal lowest temperature? </label>
          <input value={tavgLow} onChange={evt => setTavgLow(evt.target.value)} id="tavgLow" type="number" name="tavgLow"/>
        </p>

        <p hidden>
          <label htmlFor="maxtemp">What's your ideal highest temperature? </label>
          <input value={tavgHigh} onChange={evt => setTavgHigh(evt.target.value)} id="tavgHigh" type="number" name="tavgHigh"/>
        </p>


        <div className="row">

          <ReactBootstrap.Form.Group controlId="continent-group" className="col-12 col-md-6">
          <ReactBootstrap.Form.Label>Continent</ReactBootstrap.Form.Label>
          <ReactBootstrap.Form.Control as="select" value={continent} onChange={evt => setContinent(evt.target.value)} name="continent">
              <option >Anywhere</option>
              <option value="Africa">Africa</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="North America">North America</option>
              <option value="Oceania">Oceania</option>
              <option value="South America">South America</option>
          </ReactBootstrap.Form.Control>
          </ReactBootstrap.Form.Group>

          <ReactBootstrap.Form.Group controlId="country-group" className="col-12 col-md-6">
          <ReactBootstrap.Form.Label>Country</ReactBootstrap.Form.Label>
          <ReactBootstrap.Form.Control as="select" value={iso2} onChange={evt => setIso2(evt.target.value)} name="iso2">
            <option >Anywhere</option>
            <option value="AF">Afghanistan</option>
            <option value="AX">Åland Islands</option>
            <option value="AL">Albania</option>
            <option value="DZ">Algeria</option>
            <option value="AS">American Samoa</option>
            <option value="AD">Andorra</option>
            <option value="AO">Angola</option>
            <option value="AI">Anguilla</option>
            <option value="AQ">Antarctica</option>
            <option value="AG">Antigua and Barbuda</option>
            <option value="AR">Argentina</option>
            <option value="AM">Armenia</option>
            <option value="AW">Aruba</option>
            <option value="AU">Australia</option>
            <option value="AT">Austria</option>
            <option value="AZ">Azerbaijan</option>
            <option value="BS">Bahamas</option>
            <option value="BH">Bahrain</option>
            <option value="BD">Bangladesh</option>
            <option value="BB">Barbados</option>
            <option value="BY">Belarus</option>
            <option value="BE">Belgium</option>
            <option value="BZ">Belize</option>
            <option value="BJ">Benin</option>
            <option value="BM">Bermuda</option>
            <option value="BT">Bhutan</option>
            <option value="BO">Bolivia, Plurinational State of</option>
            <option value="BQ">Bonaire, Sint Eustatius and Saba</option>
            <option value="BA">Bosnia and Herzegovina</option>
            <option value="BW">Botswana</option>
            <option value="BV">Bouvet Island</option>
            <option value="BR">Brazil</option>
            <option value="IO">British Indian Ocean Territory</option>
            <option value="BN">Brunei Darussalam</option>
            <option value="BG">Bulgaria</option>
            <option value="BF">Burkina Faso</option>
            <option value="BI">Burundi</option>
            <option value="KH">Cambodia</option>
            <option value="CM">Cameroon</option>
            <option value="CA">Canada</option>
            <option value="CV">Cape Verde</option>
            <option value="KY">Cayman Islands</option>
            <option value="CF">Central African Republic</option>
            <option value="TD">Chad</option>
            <option value="CL">Chile</option>
            <option value="CN">China</option>
            <option value="CX">Christmas Island</option>
            <option value="CC">Cocos (Keeling) Islands</option>
            <option value="CO">Colombia</option>
            <option value="KM">Comoros</option>
            <option value="CG">Congo</option>
            <option value="CD">Congo, the Democratic Republic of the</option>
            <option value="CK">Cook Islands</option>
            <option value="CR">Costa Rica</option>
            <option value="CI">Côte d'Ivoire</option>
            <option value="HR">Croatia</option>
            <option value="CU">Cuba</option>
            <option value="CW">Curaçao</option>
            <option value="CY">Cyprus</option>
            <option value="CZ">Czech Republic</option>
            <option value="DK">Denmark</option>
            <option value="DJ">Djibouti</option>
            <option value="DM">Dominica</option>
            <option value="DO">Dominican Republic</option>
            <option value="EC">Ecuador</option>
            <option value="EG">Egypt</option>
            <option value="SV">El Salvador</option>
            <option value="GQ">Equatorial Guinea</option>
            <option value="ER">Eritrea</option>
            <option value="EE">Estonia</option>
            <option value="ET">Ethiopia</option>
            <option value="FK">Falkland Islands (Malvinas)</option>
            <option value="FO">Faroe Islands</option>
            <option value="FJ">Fiji</option>
            <option value="FI">Finland</option>
            <option value="FR">France</option>
            <option value="GF">French Guiana</option>
            <option value="PF">French Polynesia</option>
            <option value="TF">French Southern Territories</option>
            <option value="GA">Gabon</option>
            <option value="GM">Gambia</option>
            <option value="GE">Georgia</option>
            <option value="DE">Germany</option>
            <option value="GH">Ghana</option>
            <option value="GI">Gibraltar</option>
            <option value="GR">Greece</option>
            <option value="GL">Greenland</option>
            <option value="GD">Grenada</option>
            <option value="GP">Guadeloupe</option>
            <option value="GU">Guam</option>
            <option value="GT">Guatemala</option>
            <option value="GG">Guernsey</option>
            <option value="GN">Guinea</option>
            <option value="GW">Guinea-Bissau</option>
            <option value="GY">Guyana</option>
            <option value="HT">Haiti</option>
            <option value="HM">Heard Island and McDonald Islands</option>
            <option value="VA">Holy See (Vatican City State)</option>
            <option value="HN">Honduras</option>
            <option value="HK">Hong Kong</option>
            <option value="HU">Hungary</option>
            <option value="IS">Iceland</option>
            <option value="IN">India</option>
            <option value="ID">Indonesia</option>
            <option value="IR">Iran, Islamic Republic of</option>
            <option value="IQ">Iraq</option>
            <option value="IE">Ireland</option>
            <option value="IM">Isle of Man</option>
            <option value="IL">Israel</option>
            <option value="IT">Italy</option>
            <option value="JM">Jamaica</option>
            <option value="JP">Japan</option>
            <option value="JE">Jersey</option>
            <option value="JO">Jordan</option>
            <option value="KZ">Kazakhstan</option>
            <option value="KE">Kenya</option>
            <option value="KI">Kiribati</option>
            <option value="KP">Korea, Democratic People's Republic of</option>
            <option value="KR">Korea, Republic of</option>
            <option value="KW">Kuwait</option>
            <option value="KG">Kyrgyzstan</option>
            <option value="LA">Lao People's Democratic Republic</option>
            <option value="LV">Latvia</option>
            <option value="LB">Lebanon</option>
            <option value="LS">Lesotho</option>
            <option value="LR">Liberia</option>
            <option value="LY">Libya</option>
            <option value="LI">Liechtenstein</option>
            <option value="LT">Lithuania</option>
            <option value="LU">Luxembourg</option>
            <option value="MO">Macao</option>
            <option value="MK">Macedonia, the former Yugoslav Republic of</option>
            <option value="MG">Madagascar</option>
            <option value="MW">Malawi</option>
            <option value="MY">Malaysia</option>
            <option value="MV">Maldives</option>
            <option value="ML">Mali</option>
            <option value="MT">Malta</option>
            <option value="MH">Marshall Islands</option>
            <option value="MQ">Martinique</option>
            <option value="MR">Mauritania</option>
            <option value="MU">Mauritius</option>
            <option value="YT">Mayotte</option>
            <option value="MX">Mexico</option>
            <option value="FM">Micronesia, Federated States of</option>
            <option value="MD">Moldova, Republic of</option>
            <option value="MC">Monaco</option>
            <option value="MN">Mongolia</option>
            <option value="ME">Montenegro</option>
            <option value="MS">Montserrat</option>
            <option value="MA">Morocco</option>
            <option value="MZ">Mozambique</option>
            <option value="MM">Myanmar</option>
            <option value="NA">Namibia</option>
            <option value="NR">Nauru</option>
            <option value="NP">Nepal</option>
            <option value="NL">Netherlands</option>
            <option value="NC">New Caledonia</option>
            <option value="NZ">New Zealand</option>
            <option value="NI">Nicaragua</option>
            <option value="NE">Niger</option>
            <option value="NG">Nigeria</option>
            <option value="NU">Niue</option>
            <option value="NF">Norfolk Island</option>
            <option value="MP">Northern Mariana Islands</option>
            <option value="NO">Norway</option>
            <option value="OM">Oman</option>
            <option value="PK">Pakistan</option>
            <option value="PW">Palau</option>
            <option value="PS">Palestinian Territory</option>
            <option value="PA">Panama</option>
            <option value="PG">Papua New Guinea</option>
            <option value="PY">Paraguay</option>
            <option value="PE">Peru</option>
            <option value="PH">Philippines</option>
            <option value="PN">Pitcairn</option>
            <option value="PL">Poland</option>
            <option value="PT">Portugal</option>
            <option value="PR">Puerto Rico</option>
            <option value="QA">Qatar</option>
            <option value="RE">Réunion</option>
            <option value="RO">Romania</option>
            <option value="RU">Russian Federation</option>
            <option value="RW">Rwanda</option>
            <option value="BL">Saint Barthélemy</option>
            <option value="SH">Saint Helena, Ascension and Tristan da Cunha</option>
            <option value="KN">Saint Kitts and Nevis</option>
            <option value="LC">Saint Lucia</option>
            <option value="MF">Saint Martin (French part)</option>
            <option value="PM">Saint Pierre and Miquelon</option>
            <option value="VC">Saint Vincent and the Grenadines</option>
            <option value="WS">Samoa</option>
            <option value="SM">San Marino</option>
            <option value="ST">Sao Tome and Principe</option>
            <option value="SA">Saudi Arabia</option>
            <option value="SN">Senegal</option>
            <option value="RS">Serbia</option>
            <option value="SC">Seychelles</option>
            <option value="SL">Sierra Leone</option>
            <option value="SG">Singapore</option>
            <option value="SX">Sint Maarten (Dutch part)</option>
            <option value="SK">Slovakia</option>
            <option value="SI">Slovenia</option>
            <option value="SB">Solomon Islands</option>
            <option value="SO">Somalia</option>
            <option value="ZA">South Africa</option>
            <option value="GS">South Georgia and the South Sandwich Islands</option>
            <option value="SS">South Sudan</option>
            <option value="ES">Spain</option>
            <option value="LK">Sri Lanka</option>
            <option value="SD">Sudan</option>
            <option value="SR">Suriname</option>
            <option value="SJ">Svalbard and Jan Mayen</option>
            <option value="SZ">Swaziland</option>
            <option value="SE">Sweden</option>
            <option value="CH">Switzerland</option>
            <option value="SY">Syrian Arab Republic</option>
            <option value="TW">Taiwan, Province of China</option>
            <option value="TJ">Tajikistan</option>
            <option value="TZ">Tanzania, United Republic of</option>
            <option value="TH">Thailand</option>
            <option value="TL">Timor-Leste</option>
            <option value="TG">Togo</option>
            <option value="TK">Tokelau</option>
            <option value="TO">Tonga</option>
            <option value="TT">Trinidad and Tobago</option>
            <option value="TN">Tunisia</option>
            <option value="TR">Turkey</option>
            <option value="TM">Turkmenistan</option>
            <option value="TC">Turks and Caicos Islands</option>
            <option value="TV">Tuvalu</option>
            <option value="UG">Uganda</option>
            <option value="UA">Ukraine</option>
            <option value="AE">United Arab Emirates</option>
            <option value="GB">United Kingdom</option>
            <option value="US">United States</option>
            <option value="UM">United States Minor Outlying Islands</option>
            <option value="UY">Uruguay</option>
            <option value="UZ">Uzbekistan</option>
            <option value="VU">Vanuatu</option>
            <option value="VE">Venezuela, Bolivarian Republic of</option>
            <option value="VN">Viet Nam</option>
            <option value="VG">Virgin Islands, British</option>
            <option value="VI">Virgin Islands, U.S.</option>
            <option value="WF">Wallis and Futuna</option>
            <option value="EH">Western Sahara</option>
            <option value="YE">Yemen</option>
            <option value="ZM">Zambia</option>
            <option value="ZW">Zimbabwe</option>
          </ReactBootstrap.Form.Control>
          </ReactBootstrap.Form.Group>

        </div>

        <ReactBootstrap.Button id="search-button" onClick={ShowResults}>Show Me The World</ReactBootstrap.Button>{' '}

      </ReactBootstrap.Form>
      </div>

      <br />
      {/* When the result is empty AND resResults == true, display error message, else display the result */}
      {Object.keys(searchResults).length == 0 && hasResults? 
        <div className="container results" id="no-result" > Your climate sadly does not exist. Try modifying your filters or expanding your search to the Galaxy!</div> : 
        <div hidden={!hasResults} className="container results">
          <p className="side-notes">These are your top 20 searches. Refine your search filters to see more results.</p>
          <p className="side-notes">Check the boxes to save your favorite destinations!</p>
          {data}
        </div>}
      </ReactBootstrap.Container>
    </React.Fragment>
  )

}