"use strict";


// ===========================
// function MapComponent() {
//     const [text, updateText] = React.useState('result');
    
//     return (
//         <React.Fragment>
//             <p>{text}</p>
//             <button type="button" value="abc" onClick={evt => updateText(evt.target.value)}>Change Text</button>
//             <button type="button" onClick={() => updateText("anything")}>Change Text</button>
//         </React.Fragment>
//     )
// }

// ============================

function MapComponent(props) {
  console.log('rendering the map')
  // const options = props.options;
  // const ref = React.useRef();
  
  // React.useEffect(() => {
  //   const createMap = () => props.setMap(new window.google.maps.Map(ref.current, options));
  //   if (!window.google) { // Create an html element with a script tag in the DOM
  //     const script = document.createElement('script');
  //     script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBtYZMS7aWpKxyZ20XLWWNEMKb3eo6iOkY&libraries=places';
  //     document.head.append(script);
  //     script.addEventListener('load', createMap);
  //     console.log('and now there is a map')
  //     return () => script.removeEventListener('load', createMap);
  //   } else { // Initialize the map if a script element with google url IS found
  //     createMap();
  //     console.log('and now there is a map');
  //   }
  // }, [options.center.lat]); //Need the value of the lat of options because it does not change
  
  // if (props.map) {
  //   console.log('and the map exists')
  // } else { console.log('but there is no map')}
  
  return (
    <div id="map"
      // style={{ height: props.mapDimensions.height, 
      //   margin: 1,  
      //   borderRadius: 0.5, 
      //   width: props.mapDimensions.width }}
      // ref={ref}
    >
      <h3>My Favorites</h3>
    </div>
  )
}

// ReactDOM.render(<MapComponent />, document.querySelector('#map'))


// ==== List of favorite cities ====
function City(props) {
  function saveFavorite(evt) {
   
    let params = {
      // month:month,
      city_name:evt.target.id.replace("_"," ")
    }

    if (evt.target.checked) {
      console.log(`saved ${params.city_name}`);
      fetch("/save_to_session?" + new URLSearchParams(params));
    } else {
      console.log("unsaved");
      fetch("/unsave_to_session?" + new URLSearchParams(params));
    }
  }

  let isFavorite = props.favoriteList.includes(props.name)

  return (
    <React.Fragment>
      <input type="checkbox" defaultChecked={isFavorite} id={`${props.name}`} onClick={saveFavorite} />
      <label htmlFor={`${props.name}`}>{props.name}</label><br/>
    </React.Fragment>
  )
}


function Favorites() {
  const [favoriteList, setFavoriteList] = React.useState([])
  
  React.useEffect(() => {
    fetch('/favorites.json')
    .then((response) => response.json())
    .then((data) => setFavoriteList(data.favorites))
  },[])

  // Create an empty array of favorite cities then loop through the favoriteList to add each city to the array
  const favorites = []
  for (const city of favoriteList) {
    favorites.push(<City key={city.replace(" ","_")} name={city} favoriteList={favoriteList}/>)
  }

  return (
    <React.Fragment>
      <div id="favorites">{favorites}</div>
    </React.Fragment>
  )
}

// ReactDOM.render(<Favorites />, document.querySelector('#favorites'))