  
function About() {
  return <div>About</div>
}

function App() {
  return (
      <nav>
          <ReactRouterDOM.BrowserRouter>
              <p>
                  <ReactRouterDOM.Link to='/about'>About
                  </ReactRouterDOM.Link>
              </p>
              <p>
                  <ReactRouterDOM.Link to='/favorites'>Saved Locations
                  </ReactRouterDOM.Link>
              </p>
              <p>
                  <ReactRouterDOM.Link to='/'>Homepage
                  </ReactRouterDOM.Link>
              </p>

              <ReactRouterDOM.Switch>
                  <ReactRouterDOM.Route path='/about'>
                      <About />
                  </ReactRouterDOM.Route>
                  
                  {/* <ReactRouterDOM.Route path='/favorites'>
                      <MapComponent />
                  </ReactRouterDOM.Route> */}

                  <ReactRouterDOM.Route path='/favorites'>
                      <Favorites />
                  </ReactRouterDOM.Route>

                  <ReactRouterDOM.Route path='/' exact>
                      <Homepage />
                  </ReactRouterDOM.Route>
              </ReactRouterDOM.Switch>
          </ReactRouterDOM.BrowserRouter>
      </nav>
  );
}


ReactDOM.render(<App />, document.querySelector('#navigation') )

// Demo: https://github.com/seemaullal/hackbright-solutions/tree/main/sharkwords