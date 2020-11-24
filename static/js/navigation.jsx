  "Use strict";

  function App() {
  return (
    <React.Fragment>
    <ReactRouterDOM.BrowserRouter>
      <ReactBootstrap.Navbar bg="dark" variant="dark" expand="lg">
        
        <ReactBootstrap.Navbar.Brand as={ReactRouterDOM.Link} to="/">Living Climates
        </ReactBootstrap.Navbar.Brand>
        
        {/* Show hamburger menu when the page width is too small */}
        <ReactBootstrap.Navbar.Toggle aria-controls="basic-navbar-nav" /> 
        

        <ReactBootstrap.Navbar.Collapse id="basic-navbar-nav">

          <ReactBootstrap.Nav className="mr-auto"> {/* Separate the route as lines or boxes */}

            <ReactBootstrap.Nav.Link as={ReactRouterDOM.Link} to='/about'>About
            </ReactBootstrap.Nav.Link>
        
            <ReactBootstrap.Nav.Link as={ReactRouterDOM.Link} to='/favorites'>My Favorites
            </ReactBootstrap.Nav.Link>

            <ReactBootstrap.Nav.Link as={ReactRouterDOM.Link} to='/save-our-planet'>Save Our Planet
            </ReactBootstrap.Nav.Link>
        
          </ReactBootstrap.Nav>
       
        </ReactBootstrap.Navbar.Collapse>


      </ReactBootstrap.Navbar>


      <ReactRouterDOM.Switch>
          <ReactRouterDOM.Route path='/about'>
              <About />
          </ReactRouterDOM.Route>

          <ReactRouterDOM.Route path='/favorites'>
            <Favorites />
            {/* <MapComponent /> */}
          </ReactRouterDOM.Route>

          <ReactRouterDOM.Route path='/save-our-planet'>
              <About />
          </ReactRouterDOM.Route>

          <ReactRouterDOM.Route path='/' exact>
            <Homepage />
            <RangeSlider />
          </ReactRouterDOM.Route>
      </ReactRouterDOM.Switch>
      

    </ReactRouterDOM.BrowserRouter>
    </React.Fragment>
  );
}


ReactDOM.render(<App />, document.querySelector('#navigation') )

// Demo: https://github.com/seemaullal/hackbright-solutions/tree/main/sharkwords
// https://stackoverflow.com/questions/54843302/reactjs-bootstrap-navbar-and-routing-not-working-together