  "Use strict";

  function App() {
  return (
    <React.Fragment>
    <ReactRouterDOM.BrowserRouter>
      <ReactBootstrap.Navbar bg="dark" variant="dark" expand="lg">
        
        <ReactBootstrap.Navbar.Brand as={ReactRouterDOM.Link} to="/">
          <img
            src="/static/img/leaflogo_teal.png"
            width="30"
            height="30"
            id="logo"
            className="d-inline-block align-top"
            alt="Living Climates Logo"
          />{' '} 
          Living Climates
        </ReactBootstrap.Navbar.Brand>

        {/* Show hamburger menu when the page width is too small */}
        <ReactBootstrap.Navbar.Toggle aria-controls="basic-navbar-nav" /> 
        

        <ReactBootstrap.Navbar.Collapse id="basic-navbar-nav">

          <ReactBootstrap.Nav className="mr-auto"> {/* Separate the route as lines or boxes */}

            <ReactBootstrap.Nav.Link as={ReactRouterDOM.Link} to='/favorites'>My Favorites
            </ReactBootstrap.Nav.Link>

            <ReactBootstrap.Nav.Link as={ReactRouterDOM.Link} to='/save-our-planet'>Save Our Planet
            </ReactBootstrap.Nav.Link>
        
            <ReactBootstrap.Nav.Link as={ReactRouterDOM.Link} to='/about'>About
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
            <MapComponent />
          </ReactRouterDOM.Route>

          <ReactRouterDOM.Route path='/save-our-planet'>
              <SavePlanet />
          </ReactRouterDOM.Route>

          <ReactRouterDOM.Route path='/' exact>
            <Homepage />
          </ReactRouterDOM.Route>
      </ReactRouterDOM.Switch>
      
      <ReactBootstrap.Container>
        <footer className="footer">
          <div className="row">
            <div className="col-12 py-5">
            <a href="https://www.linkedin.com/in/lynguyen237/" target="_blank"><i className="fab fa-linkedin-in"></i></a>  
            <a href="https://github.com/Lynguyen237" target="_blank"><i className="fab fa-github"></i></a>
            <a href="https://medium.com/@lynguyen237" target="_blank"><i className="fab fa-medium-m"></i></a>
            </div>
          </div>
        </footer>
      </ReactBootstrap.Container>
      
      

    </ReactRouterDOM.BrowserRouter>
    </React.Fragment>
  );
}


ReactDOM.render(<App />, document.querySelector('#navigation') )

// Demo: https://github.com/seemaullal/hackbright-solutions/tree/main/sharkwords
// https://stackoverflow.com/questions/54843302/reactjs-bootstrap-navbar-and-routing-not-working-together