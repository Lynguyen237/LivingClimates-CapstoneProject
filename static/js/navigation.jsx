// import Navbar from 'react-bootstrap/Navbar';

function About() {
  return (
    <p>This is great</p>
  )
}

function Navigation() {
  return (
    <React.Fragment>
      {/* <ReactRouterDOM.BrowerRouter> */}


        <ReactBootstrap.Navbar bg="dark" variant="dark" expand="lg">
          
          <ReactBootstrap.Navbar.Brand href="/">Living Climates</ReactBootstrap.Navbar.Brand>
          {/* Show hamburger menu when the page width is too small */}
          <ReactBootstrap.Navbar.Toggle aria-controls="basic-navbar-nav" /> 
          
          <ReactBootstrap.Navbar.Collapse id="basic-navbar-nav">
            
            <ReactBootstrap.Nav className="mr-auto">
              {/* <ReactBootstrap.Nav.Link>
                <ReactRouterDOM.Link to='/about'>About</ReactRouterDOM.Link>
              </ReactBootstrap.Nav.Link> */}

              <ReactBootstrap.Nav.Link href="/About">About</ReactBootstrap.Nav.Link>
              <ReactBootstrap.Nav.Link href="/maps">Saved Locations</ReactBootstrap.Nav.Link>
              <ReactBootstrap.Nav.Link href="#">Save the Planet</ReactBootstrap.Nav.Link>
            </ReactBootstrap.Nav>
            
            {/* Search from inside the navbar */}
            <ReactBootstrap.Form inline>
              <ReactBootstrap.FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <ReactBootstrap.Button variant="outline-success">Search</ReactBootstrap.Button>
            </ReactBootstrap.Form>
          
          </ReactBootstrap.Navbar.Collapse>
        
        </ReactBootstrap.Navbar>


        {/* <ReactRouterDOM.Switch>
          <ReactRouterDOM.Route path="/about">
            <About />
          </ReactRouterDOM.Route>
        </ReactRouterDOM.Switch> */}


      {/* </ReactRouterDOM.BrowerRouter> */}
    </React.Fragment>
  )
}

ReactDOM.render(<Navigation />, document.querySelector('#navigation') )