function SavePlanet() {
  return (
    <React.Fragment>
      <div className="container" id="saveplanet">
        <h1>Save Our Planet</h1>
        <div className="intro paragraph results">
          <p> 
              The climate data in this project is based on data collected during 1960-1990 period, 
              which sadly means it may not be as accurate for many areas
              impacted by climate change in the past decades.
          </p>
          <p>  
            Check out these initiatives and causes below for ways to preserve our beautiful homes on Earth.
          </p>
        </div>

        <ReactBootstrap.CardDeck>
            <ReactBootstrap.Card className="paragraph results">
                <ReactBootstrap.Card.Img variant="top" src="static/img/planetheros.png" />
                <ReactBootstrap.Card.Body>
                  <ReactBootstrap.Card.Title>Planet Hereos</ReactBootstrap.Card.Title>
                  <ReactBootstrap.Card.Text>
                    Planet Heroes is the first eco <b>crowdfunding</b> platform specializing in raising funds 
                    for clean-up actions taken by users.
                  </ReactBootstrap.Card.Text>
                </ReactBootstrap.Card.Body>
                <ReactBootstrap.Card.Footer>
                  <ReactBootstrap.Button 
                    variant="success" 
                    href="https://planetheroes.pl/articles/how-it-works" 
                    target="_blank">
                    Visit Site
                  </ReactBootstrap.Button>
                  {/* <small className="text-muted">PlanetHeros.pl</small> */}
                </ReactBootstrap.Card.Footer>
            </ReactBootstrap.Card>
        
            <ReactBootstrap.Card className="paragraph results">
              <ReactBootstrap.Card.Img variant="top" src="static/img/GivingGreen.png" />
              <ReactBootstrap.Card.Body>
                <ReactBootstrap.Card.Title>Giving Green</ReactBootstrap.Card.Title>
                <ReactBootstrap.Card.Text>
                  Giving Green is an evidence-based guide to help donors and volunteers fight climate change.
                </ReactBootstrap.Card.Text>
                {/* <ReactBootstrap.Button variant="success" href="https://www.givinggreen.earth/" target="_blank">Visit Site</ReactBootstrap.Button> */}
                </ReactBootstrap.Card.Body>
              <ReactBootstrap.Card.Footer>
                <ReactBootstrap.Button variant="success" href="https://www.givinggreen.earth/" target="_blank">Visit Site</ReactBootstrap.Button>
                {/* <small className="text-muted">GivingGreen.earth</small> */}
              </ReactBootstrap.Card.Footer>
            </ReactBootstrap.Card>
            
            <ReactBootstrap.Card className="paragraph results">
                <ReactBootstrap.Card.Img variant="top" src="static/img/EE-Logo-Hero.png" />
                <ReactBootstrap.Card.Body>
                  <ReactBootstrap.Card.Title>Elemental Excelerator</ReactBootstrap.Card.Title>
                  <ReactBootstrap.Card.Text>
                    Growth Accerlerator providing funding and bringing commercial opportunities to entreprenuers
                    in the climate space.
                    Refer a <b>climate-tech</b> startup you know or apply your own!
                  </ReactBootstrap.Card.Text>
                </ReactBootstrap.Card.Body>
                <ReactBootstrap.Card.Footer>
                  <ReactBootstrap.Button 
                    variant="success" 
                    href="https://elementalexcelerator.com/" 
                    target="_blank">
                    Visit Site
                  </ReactBootstrap.Button>
                  {/* <small className="text-muted">ElementalExcelerator.com</small> */}
                </ReactBootstrap.Card.Footer>
            </ReactBootstrap.Card>
        </ReactBootstrap.CardDeck>

      </div>
    </React.Fragment>
  )
}