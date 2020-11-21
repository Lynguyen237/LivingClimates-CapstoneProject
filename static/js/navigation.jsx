  "Use strict";

  function App() {
  return (
    <ReactRouterDOM.BrowserRouter>
      {/* <ReactBootstrap.Navbar bg="dark" variant="dark" expand="lg"> */}
        
        <ReactRouterDOM.Link to='/about'>About
        </ReactRouterDOM.Link>
    
    
        <ReactRouterDOM.Link to='/favorites'>Saved Locations
        </ReactRouterDOM.Link>
    
    
        <ReactRouterDOM.Link to='/'>Homepage
        </ReactRouterDOM.Link>
       

        <ReactRouterDOM.Switch>
            <ReactRouterDOM.Route path='/about'>
                <About />
            </ReactRouterDOM.Route>

            <ReactRouterDOM.Route path='/favorites'>
              <MapComponent />
                <Favorites />
            </ReactRouterDOM.Route>

            <ReactRouterDOM.Route path='/' exact>
                <Homepage />
            </ReactRouterDOM.Route>
        </ReactRouterDOM.Switch>
      
      {/* </ReactBootstrap.Navbar> */}
    </ReactRouterDOM.BrowserRouter>
  );
}


ReactDOM.render(<App />, document.querySelector('#navigation') )

// Demo: https://github.com/seemaullal/hackbright-solutions/tree/main/sharkwords