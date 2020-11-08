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
  const options = props.options;
  const ref = React.useRef();
  
  React.useEffect(() => {
    const createMap = () => props.setMap(new window.google.maps.Map(ref.current, options));
    if (!window.google) { // Create an html element with a script tag in the DOM
      const script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBtYZMS7aWpKxyZ20XLWWNEMKb3eo6iOkY&libraries=places';
      document.head.append(script);
      script.addEventListener('load', createMap);
      console.log('and now there is a map')
      return () => script.removeEventListener('load', createMap);
    } else { // Initialize the map if a script element with google url IS found
      createMap();
      console.log('and now there is a map');
    }
  }, [options.center.lat]); //Need the value of the lat of options because it does not change
  
  if (props.map) {
    console.log('and the map exists')
  } else { console.log('but there is no map')}
  
  return (
    <div id="map"
      style={{ height: props.mapDimensions.height, 
        margin: 1,  
        borderRadius: 0.5, 
        width: props.mapDimensions.width }}
      ref={ref}
    ></div>
  )
}

ReactDOM.render(<MapComponent />, document.querySelector('#map'))
