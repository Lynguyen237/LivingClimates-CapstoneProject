// import Navbar from 'react-bootstrap/Navbar';

function Navigation() {
  return (
    <React.Fragment>

      <ReactBootstrap.Navbar bg="dark" variant="dark" expand="lg">

        <ReactBootstrap.Navbar.Brand href="/">Living Climate</ReactBootstrap.Navbar.Brand>
        
        {/* Show hamburger menu when the page width is too small */}
        <ReactBootstrap.Navbar.Toggle aria-controls="basic-navbar-nav" /> 
        
        <ReactBootstrap.Navbar.Collapse id="basic-navbar-nav">
          
          <ReactBootstrap.Nav className="mr-auto">
            <ReactBootstrap.Nav.Link href="#">About</ReactBootstrap.Nav.Link>
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

    </React.Fragment>
  )
}

ReactDOM.render(<Navigation />, document.querySelector('#navigation') )