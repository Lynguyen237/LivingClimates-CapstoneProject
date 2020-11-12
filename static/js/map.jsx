
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



// function MapComponent(props) {
//     console.log('rendering the map')
//     const options = props.options;
//     const ref = React.useRef();
    
//     const center = { lat: 34.052235, lng: -118.243683 };
    
//     React.useEffect(() => {
//       const createMap = () => props.setMap(new window.google.maps.Map(ref.current, options));
//       if (!window.google) { // Create an html element with a script tag in the DOM
//         const script = document.createElement('script');
//         script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB0U4k3HBpsTD9IkMfDSo-rALB5sKyVoY4';
//         document.head.append(script);
//         script.addEventListener('load', createMap);
//         console.log('and now there is a map')
//         return () => script.removeEventListener('load', createMap);
//       } else { // Initialize the map if a script element with google url IS found
//         createMap();
//         console.log('and now there is a map');
//       }
//     // }, [options.center.lat]); //Need the value of the lat of options because it does not change
//     }); //Need the value of the lat of options because it does not change

//     if (props.map) {
//       console.log('and the map exists')
//     } else { console.log('but there is no map')}
//     return (
//       <div id="map-div"
//         style={{ height: props.mapDimensions.height, 
//         //   margin: 1em 0, borderRadius: 0.5em, 
//           width: props.mapDimensions.width }}
//         ref={ref}
//       ></div>
//     )
//   }

// ReactDOM.render(<MapComponent />, document.querySelector('#map'))

// ==== With George's help ====

// function InitMap() {
//     const center = { lat: 34.052235, lng: -118.243683 };

//     const locations = [
//         ['Los Angeles', 34.052235, -118.243683],
//     ];

//     const map = new google.maps.Map(document.getElementById("map"), {
//         zoom: 9,
//         center: center,
//     });
    
//     let infowindow = new google.maps.InfoWindow({});

//     let marker, count;

//     for (count=0; count < locations.length; count++) {
//         marker = new google.maps.Marker({
//         position: new google.maps.LatLng(locations[count][1],locations[count][2]),
//         map: map,
//         title: locations[count][0]
//         });

//         google.maps.event.addListener(marker, 'hover', (function (marker, count) {
//         return function () {
//             infowindow.setContent(locations[count][0]);
//             // infowindow.open(map, marker);
//         }
//         })(marker, count));
//     }
  
    
function InitMap() {
    const center = { lat: 34.052235, lng: -118.243683 };

    const locations = [
        ['Los Angeles', 34.052235, -118.243683],
    ];

    function ShowMap() {
        const map = new google.maps.Map(document.getElementById("map"), {
            zoom: 9,
            center: center,
        });

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
                    // infowindow.open(map, marker);
                }
                })(marker, count));
            }
    }

    return (
      <React.Fragment>
        <input type="submit" value="Show Map" onClick={()=>ShowMap()}/>
        {/* <p>{map}</p> */}
      </React.Fragment>
    )
    // ReactDOM.render(<MapComponent title="hello1" />, document.querySelector('#map-react'))
}

// InitMap();


ReactDOM.render(<InitMap />, document.querySelector('#map-react'))
